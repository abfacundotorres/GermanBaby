"use client";

// Voz con Azure AI Speech desde el navegador.
// La clave nunca llega al cliente: /api/speech-token entrega un token de 10 min.

type SDK = typeof import("microsoft-cognitiveservices-speech-sdk");

let sdkPromise: Promise<SDK> | null = null;
const loadSdk = () => (sdkPromise ??= import("microsoft-cognitiveservices-speech-sdk"));

let tokenCache: { token: string; region: string; expires: number } | null = null;

export class SpeechNotConfigured extends Error {}

async function getToken() {
  if (tokenCache && tokenCache.expires > Date.now()) return tokenCache;
  const res = await fetch("/api/speech-token", { method: "POST" });
  if (res.status === 503) throw new SpeechNotConfigured("Azure Speech no está configurado.");
  if (!res.ok) throw new Error(`No pude obtener el token de voz (${res.status}).`);
  const { token, region } = await res.json();
  tokenCache = { token, region, expires: Date.now() + 9 * 60 * 1000 };
  return tokenCache;
}

async function speechConfig() {
  const sdk = await loadSdk();
  const { token, region } = await getToken();
  const cfg = sdk.SpeechConfig.fromAuthorizationToken(token, region);
  cfg.speechRecognitionLanguage = "de-DE";
  return { sdk, cfg };
}

// ---------------- Voz de salida (TTS) ----------------

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

let currentPlayer: { pause(): void } | null = null;

export async function speak(text: string, opts: { slow?: boolean; voice?: string } = {}) {
  const voice = opts.voice ?? "de-DE-KatjaNeural";
  try {
    const { sdk, cfg } = await speechConfig();
    currentPlayer?.pause();
    const player = new sdk.SpeakerAudioDestination();
    currentPlayer = player;
    const synth = new sdk.SpeechSynthesizer(cfg, sdk.AudioConfig.fromSpeakerOutput(player));
    const ssml =
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="de-DE">` +
      `<voice name="${voice}"><prosody rate="${opts.slow ? "-35%" : "-5%"}">${escapeXml(text)}</prosody></voice></speak>`;
    await new Promise<void>((resolve, reject) => {
      synth.speakSsmlAsync(
        ssml,
        (r) => {
          synth.close();
          r.reason === sdk.ResultReason.SynthesizingAudioCompleted ? resolve() : reject(new Error(r.errorDetails));
        },
        (e) => {
          synth.close();
          reject(new Error(e));
        },
      );
    });
  } catch (err) {
    // Sin Azure (o sin red): voz del navegador como respaldo.
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = opts.slow ? 0.6 : 0.95;
      window.speechSynthesis.speak(u);
      return;
    }
    throw err;
  }
}

// ---------------- Evaluación de pronunciación ----------------

export type PhonemeScore = { phoneme: string; score: number };
export type WordScore = {
  word: string;
  score: number;
  errorType: string; // None | Mispronunciation | Omission | Insertion | ...
  phonemes: PhonemeScore[];
};
export type PronunciationResult = {
  recognized: string;
  pronScore: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  prosody?: number;
  words: WordScore[];
};

type RawWord = {
  Word: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
  Phonemes?: { Phoneme?: string; PronunciationAssessment?: { AccuracyScore?: number } }[];
};

/**
 * Graba una frase por el micrófono y la compara con `referenceText`.
 * Con referenceText vacío hace evaluación libre (sin guion), útil en la charla.
 */
export async function assessPronunciation(referenceText: string): Promise<PronunciationResult> {
  const { sdk, cfg } = await speechConfig();
  const audio = sdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new sdk.SpeechRecognizer(cfg, audio);

  const pa = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    Boolean(referenceText), // detectar omisiones/inserciones solo si hay guion
  );
  pa.phonemeAlphabet = "IPA";
  pa.enableProsodyAssessment = true;
  pa.applyTo(recognizer);

  const result = await new Promise<import("microsoft-cognitiveservices-speech-sdk").SpeechRecognitionResult>(
    (resolve, reject) => recognizer.recognizeOnceAsync(resolve, (e) => reject(new Error(e))),
  ).finally(() => recognizer.close());

  if (result.reason === sdk.ResultReason.NoMatch) {
    throw new Error("No te escuché bien. Acercate al micrófono y probá de nuevo.");
  }
  if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
    throw new Error(result.errorDetails || "El reconocimiento falló.");
  }

  const json = JSON.parse(result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
  const best = json?.NBest?.[0] ?? {};
  const pa0 = best.PronunciationAssessment ?? {};
  const words: WordScore[] = ((best.Words ?? []) as RawWord[]).map((w) => ({
    word: w.Word,
    score: w.PronunciationAssessment?.AccuracyScore ?? 0,
    errorType: w.PronunciationAssessment?.ErrorType ?? "None",
    phonemes: (w.Phonemes ?? []).map((ph) => ({
      phoneme: ph.Phoneme ?? "?",
      score: ph.PronunciationAssessment?.AccuracyScore ?? 0,
    })),
  }));

  return {
    recognized: result.text,
    pronScore: Math.round(pa0.PronScore ?? 0),
    accuracy: Math.round(pa0.AccuracyScore ?? 0),
    fluency: Math.round(pa0.FluencyScore ?? 0),
    completeness: Math.round(pa0.CompletenessScore ?? 0),
    prosody: pa0.ProsodyScore != null ? Math.round(pa0.ProsodyScore) : undefined,
    words,
  };
}
