"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LESSON_ORDER, UNITS, lessonKey, type Vocab } from "@/lib/curriculum";
import { isUnlocked, levelFor, useHydrated, useProgress, xpForLevel } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { sfx } from "@/lib/sfx";
import Mascot from "@/components/Mascot";
import Quests from "@/components/Quests";

const COLORS: [string, string][] = [
  ["#d99a14", "#a8730a"], ["#3b9ae1", "#2672b0"], ["#9b6bdf", "#7b4cc0"], ["#e0597a", "#b83d5e"],
  ["#2e9e5b", "#1f7d45"], ["#e07a2e", "#b85a14"], ["#2bb3a8", "#1b8a80"], ["#7a8bd6", "#5566b3"],
];
// Desplazamiento horizontal (px) de cada nodo: el camino serpentea.
const OFFSETS = [0, 46, 74, 46, 0, -46, -74, -46];

type PathNode = { kind: "lesson" | "chat"; key: string; dx: number };

export default function Home() {
  const hydrated = useHydrated();
  const p = useProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const scrolled = useRef(false);

  const level = levelFor(p.xp);
  const from = xpForLevel(level);
  const to = xpForLevel(level + 1);
  const currentKey = LESSON_ORDER.find((k) => !p.lessons[k]);

  // Frase del día: una palabra o frase ya estudiada (o de la primera lección), distinta cada día.
  const phrase = useMemo<Vocab>(() => {
    const studied = UNITS.flatMap((u) => u.lessons.filter((l) => p.lessons[lessonKey(u.id, l.id)]).flatMap((l) => l.vocab));
    const pool = studied.length ? studied : UNITS[0].lessons[0].vocab;
    return pool[Math.floor(Date.now() / 86400000) % pool.length];
  }, [p.lessons]);

  useEffect(() => {
    if (hydrated && !scrolled.current && currentRef.current) {
      scrolled.current = true;
      currentRef.current.scrollIntoView({ block: "center", behavior: "auto" });
    }
  }, [hydrated]);

  if (!hydrated) return <main className="container" />;

  let slot = 0;
  return (
    <main className="container">
      <section className="hero anim-in">
        <Mascot mood={p.xp === 0 ? "happy" : "cheer"} size={96} />
        <div className="say">
          <div className="say-de">{p.xp === 0 ? "Hallo! Ich bin Donki." : "Willkommen zurück!"}</div>
          <div className="say-es">{p.xp === 0 ? "¡Hola! Soy Donki. ¡Aprendamos alemán juntos!" : "¡Bienvenido de vuelta!"}</div>
          <div className="row small muted" style={{ marginTop: 8, gap: 8 }}>
            <b style={{ color: "var(--primary)" }}>Nivel {level}</b>
            <div className="progress" style={{ height: 10, flex: 1 }}><div style={{ width: `${((p.xp - from) / (to - from)) * 100}%` }} /></div>
            <span>{p.xp - from}/{to - from}</span>
          </div>
        </div>
      </section>

      <button className="phrase anim-in" style={{ ["--i" as string]: 1 } as React.CSSProperties} onClick={() => void speak(phrase.de, { voice: p.voice }).catch(() => {})}>
        <span className="phrase-ico">{phrase.emoji ?? "💬"}</span>
        <span style={{ flex: 1, textAlign: "left" }}>
          <span className="kicker">FRASE DEL DÍA</span>
          <span className="phrase-de">{phrase.de}</span>
          <span className="phrase-es">{phrase.es}</span>
        </span>
        <span className="phrase-play">🔊</span>
      </button>

      <Quests />

      {UNITS.map((unit, ui) => {
        const [uc, ucd] = COLORS[ui % COLORS.length];
        const done = unit.lessons.filter((l) => p.lessons[lessonKey(unit.id, l.id)]).length;
        const chatUnlocked = Boolean(p.lessons[lessonKey(unit.id, unit.lessons[0].id)]);
        const style = { ["--uc" as string]: uc, ["--ucd" as string]: ucd } as React.CSSProperties;
        const chatKey = `chat/${unit.id}`;
        const nodes: PathNode[] = [
          ...unit.lessons.map((l) => ({ kind: "lesson" as const, key: lessonKey(unit.id, l.id), dx: OFFSETS[slot++ % OFFSETS.length] })),
          { kind: "chat", key: chatKey, dx: OFFSETS[slot++ % OFFSETS.length] },
        ];
        return (
          <section key={unit.id} style={style}>
            <div className="unit-banner anim-in">
              <div style={{ flex: 1 }}>
                <div className="kicker">UNIDAD {ui + 1} · {done}/{unit.lessons.length} lecciones</div>
                <div className="name">{unit.title}</div>
                <div className="desc">{unit.description}</div>
                <div className="unit-bar"><div style={{ width: `${(done / unit.lessons.length) * 100}%` }} /></div>
              </div>
              <span className="uemoji">{unit.emoji}</span>
            </div>

            <div className="path">
              {nodes.map((n, i) => {
                const prev = nodes[i - 1];
                const lesson = n.kind === "lesson" ? unit.lessons[i] : null;
                const record = lesson ? p.lessons[n.key] : undefined;
                const unlocked = lesson ? isUnlocked(p, n.key) : chatUnlocked;
                const isCurrent = lesson ? n.key === currentKey : false;
                const filled = Boolean(prev && (prev.kind === "lesson" ? p.lessons[prev.key] : false));
                return (
                  <div key={n.key} style={{ width: "100%", ["--x" as string]: `${n.dx}px` } as React.CSSProperties}>
                    {prev && (
                      <div className={`path-gap ${filled ? "filled" : ""}`} aria-hidden>
                        {[0.25, 0.5, 0.75].map((t, k) => (
                          <i key={k} className="dot" style={{ top: 22 + k * 15, transform: `translateX(${prev.dx + (n.dx - prev.dx) * t - 5}px)` }} />
                        ))}
                      </div>
                    )}
                    <div className="path-row" ref={isCurrent ? currentRef : undefined}>
                      <div className="node-wrap" style={{ transform: `translateX(${n.dx}px)` }}>
                        {isCurrent && selected !== n.key && <div className="start-bubble">EMPEZAR</div>}
                        {isCurrent && (
                          <div className="node-donkey" style={n.dx > 0 ? { right: "calc(100% + 8px)" } : n.dx < 0 ? { left: "calc(100% + 8px)" } : { right: "calc(100% + 8px)" }}>
                            <Mascot mood="cheer" size={58} />
                          </div>
                        )}
                        <button
                          className={`node ${n.kind === "chat" ? "chat" : ""} ${record ? "done" : unlocked ? "" : "locked"} ${isCurrent ? "current" : ""}`}
                          style={{ animationDelay: `${i * 70}ms` }}
                          aria-label={lesson ? `${lesson.title}${record ? `, ${record.stars} estrellas` : unlocked ? "" : ", bloqueada"}` : `Charla: ${unit.chat.title}`}
                          onClick={() => { sfx.tap(); setSelected(selected === n.key ? null : n.key); }}
                        >
                          {n.kind === "chat" ? (unlocked ? "💬" : "🔒") : record ? "✓" : unlocked ? lesson!.icon ?? lesson!.vocab[0]?.emoji ?? "★" : "🔒"}
                        </button>
                        {record && <div className="node-stars">{"★".repeat(record.stars)}{"☆".repeat(3 - record.stars)}</div>}
                      </div>
                    </div>
                    {selected === n.key && lesson && (
                      <div className={`node-pop ${unlocked ? "" : "lockedpop"}`}>
                        <div className="t">{lesson.title}</div>
                        <div className="g">{unlocked ? lesson.goal : "Completá la lección anterior para desbloquear esta."}</div>
                        {unlocked && (
                          <Link href={`/lesson/${unit.id}/${lesson.id}`} className="btn btn-block btn-lg">
                            {record ? "Practicar de nuevo" : "Empezar"} · +20 XP
                          </Link>
                        )}
                      </div>
                    )}
                    {selected === n.key && n.kind === "chat" && (
                      <div className={`node-pop ${unlocked ? "" : "lockedpop"}`}>
                        <div className="t">Charla: {unit.chat.title}</div>
                        <div className="g">
                          {unlocked ? "Practicá hablando con un personaje. Te corrige en cada turno." : "Se desbloquea al terminar la primera lección de la unidad."}
                        </div>
                        {unlocked && <Link href={`/chat/${unit.id}`} className="btn btn-block btn-lg">Hablar</Link>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
