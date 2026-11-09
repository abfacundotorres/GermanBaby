"use client";

import type { PronunciationResult } from "@/lib/speech";
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

export function PronunciationReport({ result, compact = false }: { result: PronunciationResult; compact?: boolean }) {
  const tips = tipsFor(result.words);
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
      <div className="small muted">Escuché: «{result.recognized}»</div>
      <div className="word-chips">
        {result.words.map((w, i) => (
          <span key={i} className={`word-chip ${w.errorType === "Omission" ? "lvl-bad" : lvl(w.score)}`} title={`${w.score}/100`}>
            {w.word}
            {w.errorType !== "None" && ERROR_LABEL[w.errorType] && (
              <span className="small" style={{ fontWeight: 600 }}> · {ERROR_LABEL[w.errorType]}</span>
            )}
          </span>
        ))}
      </div>
      {!compact && result.words.some((w) => w.score < 80 && w.phonemes.length > 0) && (
        <details>
          <summary className="small">Ver detalle por sonido</summary>
          {result.words.filter((w) => w.score < 80).map((w, i) => (
            <div key={i} className="phonemes">
              <b>{w.word}:</b>{" "}
              {w.phonemes.map((p, j) => (
                <span key={j} style={{ color: p.score >= 80 ? "var(--ok)" : p.score >= 60 ? "var(--warn)" : "var(--bad)" }}>
                  /{p.phoneme}/{p.score}{" "}
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
