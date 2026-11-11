"use client";

import { useEffect, useRef, useState } from "react";
import type { Dialogue } from "@/lib/curriculum";
import { speakDialogue, stopSpeaking } from "@/lib/speech";

const ICON = { f: "👩", m: "👨" } as const;

/** Reproductor de un diálogo con dos voces. El texto queda oculto hasta que `reveal` es verdadero. */
export function DialoguePlayer({ dialogue, autoPlay = false, reveal = false }: { dialogue: Dialogue; autoPlay?: boolean; reveal?: boolean }) {
  const [state, setState] = useState<"idle" | "playing">("idle");
  const [line, setLine] = useState(-1);
  const run = useRef(0); // identifica la reproducción vigente: una cortada no pisa el estado de la nueva

  const stop = () => { run.current++; stopSpeaking(); setState("idle"); setLine(-1); };

  const play = async (slow: boolean) => {
    const mine = ++run.current;
    setState("playing");
    try {
      await speakDialogue(dialogue.lines.map((l) => ({ text: l.de, who: l.who })), {
        slow,
        onLine: (i) => run.current === mine && setLine(i),
      });
    } catch (e) {
      console.warn(e);
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
      {reveal && (
        <div className="stack" style={{ gap: 8, textAlign: "left" }}>
          {dialogue.lines.map((l, i) => (
            <div key={i} className="transcript-line">
              <b>{ICON[l.who]} {l.name}:</b> <span lang="de">{l.de}</span>
              <div className="small muted">{l.es}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
