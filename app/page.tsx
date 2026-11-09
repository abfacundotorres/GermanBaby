"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LESSON_ORDER, UNITS, lessonKey } from "@/lib/curriculum";
import { isUnlocked, levelFor, useHydrated, useProgress, xpForLevel } from "@/lib/progress";
import { sfx } from "@/lib/sfx";
import Mascot from "@/components/Mascot";
import Quests from "@/components/Quests";

const COLORS: [string, string][] = [
  ["#d99a14", "#a8730a"], ["#3b9ae1", "#2672b0"], ["#9b6bdf", "#7b4cc0"], ["#e0597a", "#b83d5e"],
  ["#2e9e5b", "#1f7d45"], ["#e07a2e", "#b85a14"], ["#2bb3a8", "#1b8a80"], ["#7a8bd6", "#5566b3"],
];
const OFFSETS = [0, 46, 74, 46, 0, -46, -74, -46];

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
      <section className="card row" style={{ marginTop: 4 }}>
        <Mascot mood={p.xp === 0 ? "happy" : "cheer"} size={72} />
        <div style={{ flex: 1 }}>
          <div className="h2" style={{ margin: 0 }}>{p.xp === 0 ? "Hallo! Soy Brezi." : "Willkommen zurück!"}</div>
          <div className="muted small">Nivel {level} · {p.xp - from}/{to - from} XP al siguiente</div>
          <div className="progress" style={{ marginTop: 8 }}>
            <div style={{ width: `${((p.xp - from) / (to - from)) * 100}%` }} />
          </div>
        </div>
      </section>

      <Quests />

      {UNITS.map((unit, ui) => {
        const [uc, ucd] = COLORS[ui % COLORS.length];
        const chatUnlocked = Boolean(p.lessons[lessonKey(unit.id, unit.lessons[0].id)]);
        const style = { ["--uc" as string]: uc, ["--ucd" as string]: ucd } as React.CSSProperties;
        const chatKey = `chat/${unit.id}`;
        return (
          <section key={unit.id} style={style}>
            <div className="unit-banner">
              <div>
                <div className="kicker">UNIDAD {ui + 1}</div>
                <div className="name">{unit.title}</div>
                <div className="desc">{unit.description}</div>
              </div>
              <span className="uemoji">{unit.emoji}</span>
            </div>

            <div className="path">
              {unit.lessons.map((lesson) => {
                const key = lessonKey(unit.id, lesson.id);
                const done = p.lessons[key];
                const unlocked = isUnlocked(p, key);
                const isCurrent = key === currentKey;
                const dx = OFFSETS[slot++ % OFFSETS.length];
                return (
                  <div key={key} style={{ width: "100%" }}>
                    <div className="path-row" ref={isCurrent ? currentRef : undefined}>
                      <div className="node-wrap" style={{ transform: `translateX(${dx}px)` }}>
                        {isCurrent && selected !== key && <div className="start-bubble">EMPEZAR</div>}
                        <button
                          className={`node ${done ? "done" : unlocked ? "" : "locked"} ${isCurrent ? "current" : ""}`}
                          aria-label={`${lesson.title}${done ? `, ${done.stars} estrellas` : unlocked ? "" : ", bloqueada"}`}
                          onClick={() => { sfx.tap(); setSelected(selected === key ? null : key); }}
                        >
                          {done ? "✓" : unlocked ? "★" : "🔒"}
                        </button>
                        {done && <div className="node-stars">{"★".repeat(done.stars)}{"☆".repeat(3 - done.stars)}</div>}
                      </div>
                    </div>
                    {selected === key && (
                      <div className={`node-pop ${unlocked ? "" : "lockedpop"}`}>
                        <div className="t">{lesson.title}</div>
                        <div className="g">{unlocked ? lesson.goal : "Completá la lección anterior para desbloquear esta."}</div>
                        {unlocked && (
                          <Link href={`/lesson/${unit.id}/${lesson.id}`} className="btn btn-block btn-lg">
                            {done ? "Practicar de nuevo" : "Empezar"} · +20 XP
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ width: "100%" }}>
                <div className="path-row">
                  <div className="node-wrap" style={{ transform: `translateX(${OFFSETS[slot++ % OFFSETS.length]}px)` }}>
                    <button
                      className={`node chat ${chatUnlocked ? "" : "locked"}`}
                      aria-label={`Charla: ${unit.chat.title}`}
                      onClick={() => { sfx.tap(); setSelected(selected === chatKey ? null : chatKey); }}
                    >
                      💬
                    </button>
                  </div>
                </div>
                {selected === chatKey && (
                  <div className={`node-pop ${chatUnlocked ? "" : "lockedpop"}`}>
                    <div className="t">Charla: {unit.chat.title}</div>
                    <div className="g">
                      {chatUnlocked ? "Practicá hablando con un personaje. Te corrige en cada turno." : "Se desbloquea al terminar la primera lección de la unidad."}
                    </div>
                    {chatUnlocked && <Link href={`/chat/${unit.id}`} className="btn btn-block btn-lg">Hablar</Link>}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
