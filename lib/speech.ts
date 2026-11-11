"use client";

// Voz con Azure AI Speech desde el navegador.
// La clave nunca llega al cliente: /api/speech-token entrega un token de 10 min.

import { getProgress, recordStt, recordTts } from "./progress";
import { startCapture, type CaptureEnd } from "./capture";
import { clipKey, getClip, putClip } from "./audiocache";

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

/** Carga el SDK y el token con anticipación para que el toque en el micrófono responda enseguida. */
export function prewarmSpeech() {
  void loadSdk();
  void getToken().catch(() => {});
}

// ---------------- Micrófono ----------------

export type MicErrorKind = "insecure" | "unsupported" | "denied" | "notfound" | "busy" | "other";
export class MicError extends Error {
  constructor(public kind: MicErrorKind, message: string, public raw?: string) {
    super(message);
  }
}

/**
 * Pide el micrófono. Hay que llamarla DENTRO del toque del usuario y antes de cualquier espera de red:
 * en Android e iOS el permiso y el audio se pueden bloquear si llegan después de una espera.
 */
export async function getMic(): Promise<MediaStream> {
  if (typeof window === "undefined" || !window.isSecureContext) {
    throw new MicError("insecure", "El micrófono solo funciona con una conexión segura (https).");
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new MicError("unsupported", "Este navegador no permite usar el micrófono. Probá con Chrome.");
  }
  // Si el permiso ya está bloqueado, el navegador ni siquiera vuelve a preguntar: avisamos cómo desbloquearlo.
  const blockedMsg =
    "El micrófono está bloqueado. En Android: Ajustes del teléfono → Apps → Chrome → Permisos → Micrófono → Permitir. Y en Chrome: ⋮ → Configuración → Configuración de sitios → Micrófono → permitilo para este sitio.";
  try {
    const perm = await navigator.permissions?.query({ name: "microphone" as PermissionName });
    if (perm?.state === "denied") throw new MicError("denied", blockedMsg, "permission-denied");
  } catch (e) {
    if (e instanceof MicError) throw e; // el navegador no informa el estado: seguimos
  }
  try {
    return await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
  } catch (e) {
    const name = (e as DOMException)?.name ?? "";
    if (name === "NotSupportedError") {
      throw new MicError("unsupported", "El navegador no pudo pedir el permiso del micrófono. Abrí la app en Chrome (no dentro de otra app) y probá de nuevo.", name);
    }
    if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") {
      throw new MicError("denied", blockedMsg, name);
    }
    if (name === "NotFoundError" || name === "OverconstrainedError") throw new MicError("notfound", "No encuentro un micrófono en este dispositivo.", name);
    if (name === "NotReadableError" || name === "AbortError") throw new MicError("busy", "Otra app está usando el micrófono. Cerrala y probá de nuevo.", name);
    throw new MicError("other", `No pude abrir el micrófono (${name || (e as Error)?.message || "error desconocido"}).`, name);
  }
}

const stopMic = (stream: MediaStream) => stream.getTracks().forEach((t) => t.stop());

// ---------------- Voz de salida (TTS) ----------------

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

let currentAudio: HTMLAudioElement | null = null;

function play(blob: Blob) {
  currentAudio?.pause();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.onended = audio.onerror = () => URL.revokeObjectURL(url);
  currentAudio = audio;
  return audio.play();
}

/** Pide el audio a Azure (sin reproducirlo) y devuelve el MP3. */
async function synthesize(text: string, voice: string, slow: boolean): Promise<Blob> {
  const { sdk, cfg } = await speechConfig();
  const synth = new sdk.SpeechSynthesizer(cfg, null as unknown as import("microsoft-cognitiveservices-speech-sdk").AudioConfig);
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="de-DE">` +
    `<voice name="${voice}"><prosody rate="${slow ? "-35%" : "-5%"}">${escapeXml(text)}</prosody></voice></speak>`;
  return new Promise<Blob>((resolve, reject) => {
    synth.speakSsmlAsync(
      ssml,
      (r) => {
        synth.close();
        if (r.reason === sdk.ResultReason.SynthesizingAudioCompleted && r.audioData.byteLength > 0) {
          recordTts(text.length);
          resolve(new Blob([r.audioData], { type: "audio/mpeg" }));
        } else reject(new Error(r.errorDetails || "Azure no devolvió audio."));
      },
      (e) => {
        synth.close();
        reject(new Error(e));
      },
    );
  });
}

export async function speak(text: string, opts: { slow?: boolean; voice?: string } = {}) {
  const voice = opts.voice ?? "de-DE-KatjaNeural";
  const slow = !!opts.slow;
  try {
    const key = clipKey(voice, slow, text);
    let blob = await getClip(key);
    if (!blob) {
      blob = await synthesize(text, voice, slow);
      void putClip(key, blob);
    }
    await play(blob);
  } catch (err) {
    // Sin Azure (o sin red): voz del navegador como respaldo.
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = slow ? 0.6 : 0.95;
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
  /** Cómo se grabó y cuánto tardó Azure en responder desde que se cortó el audio (ms). */
  mode?: "rapido" | "compatible";
  latencyMs?: number;
  endReason?: CaptureEnd;
};

/** Ganchos de la interfaz durante una grabación. */
export type RecordHooks = {
  onLevel?: (level: number) => void; // volumen de 0 a 1, para animar el botón
  onProcessing?: () => void; // dejó de grabar: Azure está analizando
  registerFinish?: (finish: () => void) => void; // para el botón «listo»
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
export async function assessPronunciation(referenceText: string, hooks: RecordHooks = {}): Promise<PronunciationResult> {
  // 1) El micrófono se pide ya, dentro del toque; el token y el SDK se cargan en paralelo.
  const cfgPromise = speechConfig();
  cfgPromise.catch(() => {});
  const stream = await getMic();
  const started = Date.now();
  let sent = false;
  let secondsSent: number | null = null; // en modo rápido es exacto: bytes de audio enviados
  try {
    const { sdk, cfg } = await cfgPromise;
    sent = true;
    if (getProgress().fastMic !== false) {
      try {
        const r = await recognizeFast(sdk, cfg, stream, referenceText, hooks);
        secondsSent = r.seconds;
        return r.result;
      } catch (e) {
        if (!(e instanceof FastUnavailable)) throw e;
        // Sin AudioWorklet: seguimos con el modo compatible.
      }
    }
    return await recognize(sdk, cfg, stream, referenceText, hooks);
  } finally {
    stopMic(stream);
    if (sent) recordStt(secondsSent ?? (Date.now() - started) / 1000);
  }
}

class FastUnavailable extends Error {}
type SpeechCfg = import("microsoft-cognitiveservices-speech-sdk").SpeechConfig;
type Recognizer = import("microsoft-cognitiveservices-speech-sdk").SpeechRecognizer;
type RecognitionResult = import("microsoft-cognitiveservices-speech-sdk").SpeechRecognitionResult;

function setupAssessment(sdk: SDK, recognizer: Recognizer, referenceText: string) {
  const pa = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    Boolean(referenceText), // detectar omisiones/inserciones solo si hay guion
  );
  pa.phonemeAlphabet = "IPA";
  // Sin evaluación de prosodia: la app no la muestra y Azure parece cobrarla aparte (complemento «enhanced»).
  pa.applyTo(recognizer);
}

function toPronunciationResult(sdk: SDK, result: RecognitionResult): PronunciationResult {
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

/**
 * Modo rápido: capturamos el audio nosotros, detectamos cuándo dejaste de hablar y le cerramos el
 * flujo a Azure en ese momento, para que responda enseguida en vez de esperar su silencio largo.
 */
async function recognizeFast(
  sdk: SDK,
  cfg: SpeechCfg,
  stream: MediaStream,
  referenceText: string,
  hooks: RecordHooks,
): Promise<{ result: PronunciationResult; seconds: number }> {
  const push = sdk.AudioInputStream.createPushStream(sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1));
  const recognizer = new sdk.SpeechRecognizer(cfg, sdk.AudioConfig.fromStreamInput(push));
  setupAssessment(sdk, recognizer, referenceText);

  let endedAt = 0;
  let endReason: CaptureEnd | undefined;
  const resultPromise = new Promise<RecognitionResult>((resolve, reject) => recognizer.recognizeOnceAsync(resolve, (e) => reject(new Error(e))));
  resultPromise.catch(() => {});

  let capture;
  try {
    capture = await startCapture(
      stream,
      {
        onPcm: (b) => push.write(b),
        onLevel: hooks.onLevel,
        onEnd: (reason) => {
          endedAt = Date.now();
          endReason = reason;
          push.close(); // Azure recibe el final del audio y devuelve el resultado
          hooks.onProcessing?.();
        },
      },
      { silenceMs: 700, initialSilenceMs: 6000, maxMs: 12000 },
    );
  } catch {
    push.close();
    recognizer.close();
    throw new FastUnavailable();
  }
  hooks.registerFinish?.(() => capture.finish());

  try {
    const res = await resultPromise;
    const result = toPronunciationResult(sdk, res);
    result.mode = "rapido";
    result.latencyMs = endedAt ? Date.now() - endedAt : undefined;
    result.endReason = endReason;
    return { result, seconds: capture.bytes / 32000 };
  } finally {
    capture.stop();
    recognizer.close();
  }
}

/** Modo compatible: el SDK captura el micrófono y Azure decide cuándo terminaste (más lento). */
async function recognize(sdk: SDK, cfg: SpeechCfg, stream: MediaStream, referenceText: string, hooks: RecordHooks): Promise<PronunciationResult> {
  // Azure espera menos silencio antes de cerrar la frase.
  cfg.setProperty(sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, "700");
  cfg.setProperty(sdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, "6000");
  const recognizer = new sdk.SpeechRecognizer(cfg, sdk.AudioConfig.fromStreamInput(stream));
  setupAssessment(sdk, recognizer, referenceText);
  // Aquí no hay forma de cortar antes: el botón «listo» no hace nada.
  hooks.registerFinish?.(() => {});
  const result = await new Promise<RecognitionResult>((resolve, reject) =>
    recognizer.recognizeOnceAsync(resolve, (e) => reject(new Error(e))),
  ).finally(() => recognizer.close());
  const out = toPronunciationResult(sdk, result);
  out.mode = "compatible";
  return out;
}

// ---------------- Probador de micrófono ----------------

export type DiagStep = { label: string; ok: boolean | null; detail?: string }; // ok null = en curso

/** Revisa paso por paso qué falla con el micrófono y lo cuenta en castellano. */
export async function diagnoseMic(report: (steps: DiagStep[]) => void): Promise<void> {
  const steps: DiagStep[] = [];
  const set = (i: number, st: DiagStep) => {
    steps[i] = st;
    report([...steps]);
  };
  let i = 0;

  set(i++, { label: "Conexión segura (https)", ok: window.isSecureContext, detail: window.isSecureContext ? undefined : "Abrí la app con https." });
  const hasApi = Boolean(navigator.mediaDevices?.getUserMedia);
  set(i++, { label: "El navegador permite usar el micrófono", ok: hasApi, detail: hasApi ? undefined : "Probá con Chrome actualizado." });
  if (!hasApi) return;

  try {
    const perm = await navigator.permissions.query({ name: "microphone" as PermissionName });
    set(i++, {
      label: "Permiso del sitio",
      ok: perm.state !== "denied",
      detail: perm.state === "granted" ? "Permitido" : perm.state === "prompt" ? "Todavía no te lo pidió (te lo va a preguntar ahora)" : "BLOQUEADO: habilitalo en la configuración de sitios de Chrome",
    });
  } catch {
    set(i++, { label: "Permiso del sitio", ok: null, detail: "Este navegador no informa el estado; sigo igual." });
  }

  // Acceso al micrófono
  set(i, { label: "Acceso al micrófono (aceptá el permiso si te lo pide)", ok: null });
  let stream: MediaStream;
  try {
    stream = await getMic();
    const track = stream.getAudioTracks()[0];
    set(i++, { label: "Acceso al micrófono", ok: true, detail: track?.label || "micrófono por defecto" });
  } catch (e) {
    set(i++, { label: "Acceso al micrófono", ok: false, detail: `${(e as Error).message}${(e as MicError).raw ? ` [${(e as MicError).raw}]` : ""}` });
    return;
  }

  try {
    // Nivel de audio: ¿llega sonido de verdad?
    set(i, { label: "Sonido captado: hablá ahora durante 3 segundos", ok: null });
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    await ctx.resume();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const buf = new Uint8Array(analyser.fftSize);
    let peak = 0;
    const t0 = Date.now();
    while (Date.now() - t0 < 3000) {
      analyser.getByteTimeDomainData(buf);
      let max = 0;
      for (const v of buf) max = Math.max(max, Math.abs(v - 128));
      peak = Math.max(peak, Math.round((max / 128) * 100));
      await new Promise((r) => setTimeout(r, 50));
    }
    const state = ctx.state;
    await ctx.close();
    set(i++, {
      label: "Sonido captado",
      ok: peak >= 4,
      detail: peak >= 4 ? `Nivel máximo ${peak}/100 (audio: ${state})` : `No llega sonido (nivel ${peak}/100, audio: ${state}). Revisá que el micrófono no esté silenciado o tapado.`,
    });

    // Captura rápida: ¿llega audio por el AudioWorklet?
    set(i, { label: "Captura rápida", ok: null });
    try {
      let bytes = 0;
      const cap = await startCapture(stream, { onPcm: (b) => (bytes += b.byteLength), onEnd: () => {} }, { silenceMs: 60000, maxMs: 60000 });
      await new Promise((r) => setTimeout(r, 1200));
      cap.stop();
      set(i++, { label: "Captura rápida", ok: bytes > 0, detail: bytes > 0 ? `Funciona: ${(bytes / 32000).toFixed(1)} s de audio capturado` : "No llegó audio: se usará el modo compatible (más lento)." });
    } catch {
      set(i++, { label: "Captura rápida", ok: true, detail: "Este navegador no la soporta: se usará el modo compatible (más lento)." });
    }

    // Azure: el mismo camino que usa la app
    stopMic(stream);
    set(i, { label: "Azure te entiende: decí «Hallo, ich heiße…» y tu nombre; se corta solo cuando terminás", ok: null });
    const r = await assessPronunciation("");
    set(i++, {
      label: "Azure te entiende",
      ok: true,
      detail: `Escuchó: «${r.recognized}» · modo ${r.mode === "rapido" ? "rápido" : "compatible"}${r.latencyMs != null ? ` · Azure respondió ${(r.latencyMs / 1000).toFixed(1)} s después de que terminaste` : ""}`,
    });
  } catch (e) {
    set(i++, { label: "Azure te entiende", ok: false, detail: (e as Error).message });
  } finally {
    stopMic(stream);
  }
}
