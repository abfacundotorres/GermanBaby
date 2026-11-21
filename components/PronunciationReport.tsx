"use client";

import type { PronunciationResult, WordScore } from "@/lib/speech";
import { speak, stopSpeaking } from "@/lib/speech";
import { alignWords } from "@/lib/text";
import { useProgress } from "@/lib/progress";
import { useEffect, useRef, useState } from "react";
import { tipsFor } from "@/lib/phonemeTips";

const lvl = (s: number) => (s >= 80 ? "lvl-good" : s >= 60 ? "lvl-mid" : "lvl-bad");

const ERROR_LABEL: Record<string, string> = {
  Mispronunciation: "mal pronunciada",
  Omission: "no la dijiste",
  Insertion: "sobra",
  UnexpectedBreak: "pausa de más",
  MissingBreak: "faltó una pausa",
  Monotone: "entonación plana",
};

const clean = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
const isWeak = (w: WordScore) => w.score < 80 || (w.errorType !== "None" && w.errorType !== "Monotone");

/** `reference`: la frase que había que decir; con ella se muestra qué palabras escuchó Azure en lugar de las tuyas. */
export function PronunciationReport({ result, compact = false, reference }: { result: PronunciationResult; compact?: boolean; reference?: string }) {
  const p = useProgress();
  const tips = tipsFor(result.words);
  const weak = result.words.filter(isWeak);
  const align = reference ? alignWords(reference, result.recognized) : null;
  const differs = align?.some((a) => a.kind !== "same") ?? false;

  // Tu grabación (solo en memoria): se reproduce para compararla con el modelo.
  const [mine, setMine] = useState<"idle" | "playing">("idle");
  const urlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => () => { audioRef.current?.pause(); if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);
  const playMine = () => {
    if (!result.audio) return;
    stopSpeaking();
    audioRef.current?.pause();
    if (!urlRef.current) urlRef.current = URL.createObjectURL(result.audio);
    const a = new Audio(urlRef.current);
    audioRef.current = a;
    a.onended = a.onpause = a.onerror = () => setMine("idle");
    setMine("playing");
    void a.play().catch(() => setMine("idle"));
  };

  const say = (word: string, slow: boolean) => {
    audioRef.current?.pause();
    stopSpeaking();
    void speak(clean(word), { voice: p.voice, slow }).catch(() => {});
  };

  return (
    <div className="card stack" style={{ textAlign: "left", gap: 10 }}>
      {!compact && (
        <div className="scores">
          <div className="score"><b>{result.pronScore}</b><span className="small">Total</span></div>
          <div className="score"><b>{result.accuracy}</b><span className="small">Precisión</span></div>
          <div className="score"><b>{result.fluency}</b><span className="small">Fluidez</span></div>
          <div className="score"><b>{result.completeness}</b><span className="small">Completitud</span></div>
        </div>
      )}

      {result.audio && (
        <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
          <button className="btn" onClick={mine === "playing" ? () => audioRef.current?.pause() : playMine} aria-label="Escuchar tu grabación">
            {mine === "playing" ? "⏹ Parar" : "▶ Escuchá tu voz"}
          </button>
          {reference && (
            <button className="btn" onClick={() => { audioRef.current?.pause(); stopSpeaking(); void speak(reference, { voice: p.voice }).catch(() => {}); }} aria-label="Escuchar el modelo">
              🔊 Escuchá el modelo
            </button>
          )}
          <span className="small muted">Comparalos. Tu grabación no se guarda.</span>
        </div>
      )}

      {align && differs ? (
        <div className="stack" style={{ gap: 4 }}>
          <div className="small muted">Lo que escuché, comparado con lo que había que decir:</div>
          <div lang="de">
            {align.map((a, i) => (
              <span key={i}>
                {a.kind === "same" && <span>{a.heard} </span>}
                {a.kind === "diff" && <span><del style={{ color: "var(--bad)" }}>{a.heard}</del> <b style={{ color: "var(--ok)" }}>{a.ref}</b> </span>}
                {a.kind === "missing" && <span title="no la dijiste" style={{ color: "var(--bad)" }}>[falta: <b>{a.ref}</b>] </span>}
                {a.kind === "extra" && <span title="sobra"><del style={{ color: "var(--bad)" }}>{a.heard}</del> </span>}
              </span>
            ))}
          </div>
          <div className="small muted">Tachado: lo que escuché. En verde: lo que correspondía.</div>
        </div>
      ) : (
        <div className="small muted">
          Escuché: «{result.recognized}»
          {result.latencyMs != null && <> · ⏱ Azure respondió en {(result.latencyMs / 1000).toFixed(1)} s</>}
        </div>
      )}

      <div className="small muted">Tocá una palabra para escucharla sola.</div>
      <div className="word-chips">
        {result.words.map((w, i) => (
          <button
            key={i}
            type="button"
            onClick={() => say(w.word, false)}
            className={`word-chip ${w.errorType === "Omission" ? "lvl-bad" : lvl(w.score)}`}
            title={`${w.score}/100 · tocá para escuchar`}
            style={{ cursor: "pointer", font: "inherit" }}
            aria-label={`Escuchar «${clean(w.word)}», puntaje ${w.score}`}
          >
            {w.word}
            {w.errorType !== "None" && ERROR_LABEL[w.errorType] && (
              <span className="small" style={{ fontWeight: 600 }}> · {ERROR_LABEL[w.errorType]}</span>
            )}
          </button>
        ))}
      </div>

      {weak.length > 0 && (
        <div className="stack" style={{ gap: 6 }}>
          <div className="small"><b>Para practicar</b></div>
          {weak.map((w, i) => {
            const bad = w.phonemes.filter((ph) => ph.score < 70).sort((a, b) => a.score - b.score).slice(0, 3);
            const heard = align?.find((a) => a.kind === "diff" && a.ref && clean(a.ref).toLowerCase() === clean(w.word).toLowerCase())?.heard;
            return (
              <div key={i} className="row" style={{ gap: 8, alignItems: "center" }}>
                <button className="btn" style={{ padding: "2px 10px" }} aria-label={`Escuchar «${clean(w.word)}»`} onClick={() => say(w.word, false)}>🔊</button>
                <button className="btn" style={{ padding: "2px 10px" }} aria-label={`Escuchar «${clean(w.word)}» lento`} onClick={() => say(w.word, true)}>🐢</button>
                <span style={{ flex: 1 }}>
                  <b lang="de">{clean(w.word)}</b> <span className="small muted">{w.score}/100</span>
                  <span className="small muted" style={{ display: "block" }}>
                    {w.errorType === "Omission" ? "No la dijiste." : heard ? <>Escuché «{clean(heard)}».</> : null}
                    {bad.length > 0 && <> Sonidos flojos: {bad.map((ph) => `/${ph.phoneme}/ ${ph.score}`).join(", ")}.</>}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!compact && result.words.some((w) => w.score < 80 && w.phonemes.length > 0) && (
        <details>
          <summary className="small">Ver detalle por sonido</summary>
          {result.words.filter((w) => w.score < 80).map((w, i) => (
            <div key={i} className="phonemes">
              <b>{w.word}:</b>{" "}
              {w.phonemes.map((ph, j) => (
                <span key={j} style={{ color: ph.score >= 80 ? "var(--ok)" : ph.score >= 60 ? "var(--warn)" : "var(--bad)" }}>
                  /{ph.phoneme}/{ph.score}{" "}
                </span>
              ))}
            </div>
          ))}
        </details>
      )}
      {tips.map((t) => (
        <div key={t.title} className="small">
          🗣️ <b>{t.title}</b> (en «{t.word}»): {t.tip}
        </div>
      ))}
    </div>
  );
}
