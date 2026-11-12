"use client";

import { useEffect, useRef, useState } from "react";
import type { Dialogue } from "@/lib/curriculum";
import { DIALOGUE_VOICES, speak, speakDialogue, stopSpeaking } from "@/lib/speech";
import { glossFor } from "@/lib/gloss";

const ICON = { f: "👩", m: "👨" } as const;

/** Reproductor de un diálogo con dos voces. El texto queda oculto hasta que `reveal` es verdadero. */
export function DialoguePlayer({ dialogue, autoPlay = false, reveal = false }: { dialogue: Dialogue; autoPlay?: boolean; reveal?: boolean }) {
  const [state, setState] = useState<"idle" | "playing">("idle");
  const [line, setLine] = useState(-1);
  const [blocked, setBlocked] = useState(false);
  const run = useRef(0); // identifica la reproducción vigente: una cortada no pisa el estado de la nueva

  const stop = () => { run.current++; stopSpeaking(); setState("idle"); setLine(-1); };

  const play = async (slow: boolean) => {
    const mine = ++run.current;
    setState("playing");
    setBlocked(false);
    try {
      await speakDialogue(dialogue.lines.map((l) => ({ text: l.de, who: l.who })), {
        slow,
        onLine: (i) => run.current === mine && setLine(i),
      });
    } catch (e) {
      console.warn(e);
      // Safari y otros bloquean el audio que no nace de un toque.
      if (run.current === mine && (e as Error).name === "NotAllowedError") setBlocked(true);
    } finally {
      if (run.current === mine) { setState("idle"); setLine(-1); }
    }
  };

  useEffect(() => {
    if (autoPlay) void play(false);
    return () => { run.current++; stopSpeaking(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Personajes distintos, en orden de aparición.
  const cast = dialogue.lines.filter((l, i, a) => a.findIndex((x) => x.name === l.name) === i);

  return (
    <div className="card stack" style={{ gap: 12 }}>
      <div className="row" style={{ justifyContent: "center", gap: 18 }}>
        {cast.map((c) => (
          <span key={c.name} className={`cast ${line >= 0 && dialogue.lines[line].name === c.name ? "on" : ""}`}>
            <span style={{ fontSize: 28 }}>{ICON[c.who]}</span> {c.name}
          </span>
        ))}
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        {state === "idle" ? (
          <>
            <button className="btn btn-round btn-primary" style={{ width: 80, height: 80, fontSize: 34 }} onClick={() => play(false)} aria-label="Escuchar el diálogo">▶</button>
            <button className="btn btn-round" onClick={() => play(true)} aria-label="Escuchar el diálogo lento" title="Lento">🐢</button>
          </>
        ) : (
          <button className="btn btn-round" style={{ width: 80, height: 80, fontSize: 30 }} onClick={stop} aria-label="Parar">⏹</button>
        )}
      </div>
      {blocked && <div className="notice small" role="alert">El navegador bloqueó el audio automático. Tocá ▶ para escuchar el diálogo.</div>}
      {reveal && (
        <div className="stack" style={{ gap: 8, textAlign: "left" }}>
          {dialogue.lines.map((l, i) => (
            <div key={i} className="transcript-line row" style={{ alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <b>{ICON[l.who]} {l.name}:</b> <span lang="de">{l.de}</span>
                <div className="small muted">{l.es}</div>
              </div>
              <button className="btn" style={{ padding: "2px 8px" }} aria-label={`Escuchar la línea ${i + 1}`} onClick={() => { stopSpeaking(); void speak(l.de, { voice: DIALOGUE_VOICES[l.who] }).catch(() => {}); }}>🔊</button>
            </div>
          ))}
          {glossFor(dialogue.lines.map((l) => l.de)).length > 0 && (
            <div className="small muted" style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}>
              <b>Palabras del diálogo:</b>{" "}
              {glossFor(dialogue.lines.map((l) => l.de)).map(([w, es], i) => (
                <span key={w}>{i > 0 && " · "}<span lang="de">{w}</span> = {es}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
