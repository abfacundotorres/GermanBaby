"use client";

import Link from "next/link";
import { UNITS, lessonKey } from "@/lib/curriculum";
import { ACHIEVEMENTS, dueItems, isUnlocked, levelFor, openMistakes, useProgress, xpForLevel } from "@/lib/progress";

export default function Home() {
  const p = useProgress();
  const due = dueItems(p).length;
  const mistakes = openMistakes(p).length;
  const level = levelFor(p.xp);
  const from = xpForLevel(level);
  const to = xpForLevel(level + 1);

  return (
    <main className="container">
      <section className="card row" style={{ marginTop: 8 }}>
        <span className="mascot" aria-hidden>🥨</span>
        <div style={{ flex: 1 }}>
          <div className="h2">Hallo! Soy Brezi.</div>
          <div className="muted small">
            Nivel {level} · {p.xp - from}/{to - from} XP para el siguiente
          </div>
          <div className="progress" style={{ marginTop: 8 }}>
            <div style={{ width: `${((p.xp - from) / (to - from)) * 100}%` }} />
          </div>
        </div>
      </section>

      <Link href="/review" className={`lesson-node ${due ? "" : "locked"}`} style={{ marginTop: 14 }}>
        <div className="node-dot">🔁</div>
        <div style={{ flex: 1 }}>
          <b>Repaso del día</b>
          <div className="muted small">
            {due ? `${due} palabra${due > 1 ? "s" : ""} para repasar` : "No tenés repasos pendientes. ¡Bien!"}
          </div>
        </div>
      </Link>

      <Link href="/practice" className="lesson-node" style={{ marginTop: 10 }}>
        <div className="node-dot">🎯</div>
        <div style={{ flex: 1 }}>
          <b>Mis errores</b>
          <div className="muted small">
            {mistakes ? `${mistakes} error${mistakes > 1 ? "es" : ""} para practicar` : "Acá vas a ver tus errores para practicarlos."}
          </div>
        </div>
      </Link>

      {UNITS.map((unit) => {
        const unitStarted = isUnlocked(p, lessonKey(unit.id, unit.lessons[0].id));
        const chatUnlocked = Boolean(p.lessons[lessonKey(unit.id, unit.lessons[0].id)]);
        return (
          <section key={unit.id} className="unit">
            <div className="unit-header">
              <span className="unit-emoji">{unit.emoji}</span>
              <div>
                <div className="h2" style={{ margin: 0 }}>{unit.title}</div>
                <div className="muted small">{unit.description}</div>
              </div>
            </div>
            <div className="lesson-path">
              {unit.lessons.map((lesson, i) => {
                const key = lessonKey(unit.id, lesson.id);
                const done = p.lessons[key];
                const unlocked = isUnlocked(p, key);
                return (
                  <Link
                    key={key}
                    href={`/lesson/${unit.id}/${lesson.id}`}
                    className={`lesson-node ${done ? "done" : ""} ${unlocked ? "" : "locked"}`}
                  >
                    <div className="node-dot">{done ? "✓" : unlocked ? i + 1 : "🔒"}</div>
                    <div style={{ flex: 1 }}>
                      <b>{lesson.title}</b>
                      <div className="muted small">{lesson.goal}</div>
                    </div>
                    {done && <span className="stars">{"★".repeat(done.stars)}{"☆".repeat(3 - done.stars)}</span>}
                  </Link>
                );
              })}
              <Link
                href={`/chat/${unit.id}`}
                className={`lesson-node chat-node ${chatUnlocked && unitStarted ? "" : "locked"}`}
              >
                <div className="node-dot">💬</div>
                <div style={{ flex: 1 }}>
                  <b>Charla: {unit.chat.title}</b>
                  <div className="muted small">
                    {chatUnlocked ? "Practicá hablando con un personaje." : "Se desbloquea con la primera lección."}
                  </div>
                </div>
              </Link>
            </div>
          </section>
        );
      })}

      <section className="unit">
        <div className="h2">Logros</div>
        <div className="grid2">
          {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
            const has = p.achievements.includes(id);
            return (
              <div key={id} className="card row" style={{ opacity: has ? 1 : 0.45, padding: 12 }}>
                <span style={{ fontSize: 28 }}>{has ? a.emoji : "🔒"}</span>
                <div>
                  <b>{a.title}</b>
                  <div className="muted small">{a.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
