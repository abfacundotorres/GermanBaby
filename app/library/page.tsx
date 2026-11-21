"use client";

import { useState } from "react";
import Link from "next/link";
import { LIBRARY, type LibraryText } from "@/lib/content/library";
import { completeLesson, useProgress } from "@/lib/progress";
import type { Step } from "@/lib/session";
import { LessonPlayer } from "@/components/LessonPlayer";
import { shuffle } from "@/lib/text";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const keyOf = (t: LibraryText) => `library/${t.id}`;
const wordCount = (t: LibraryText) => t.reading.text.join(" ").split(/\s+/).length;

function stepsFor(t: LibraryText): Step[] {
  const r = t.reading;
  return [
    { kind: "section", emoji: t.emoji, title: r.title, text: "Leé el texto con calma y respondé las preguntas. Después vas a ver la traducción." },
    // La respuesta correcta está primera en los datos: se mezclan las opciones para que no quede siempre arriba.
    ...r.questions.map((question, i): Step => ({ kind: "readq", reading: r, question: question.type === "choice" ? { ...question, options: shuffle(question.options) } : question, n: i + 1, total: r.questions.length })),
  ];
}

export default function LibraryPage() {
  const p = useProgress();
  const [current, setCurrent] = useState<LibraryText | null>(null);

  if (current) {
    return (
      <LessonPlayer
        steps={stepsFor(current)}
        title={current.reading.title}
        level={current.level}
        source="lesson"
        onFinish={({ accuracy }) => {
          const { stars, unlocked } = completeLesson(keyOf(current), accuracy, []);
          return { extraXp: 10, stars, achievements: unlocked };
        }}
      />
    );
  }

  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="h1">📖 Biblioteca de lecturas</div>
      <p className="muted">Textos graduados con preguntas y traducción. Elegí uno de tu nivel o uno un escalón más arriba.</p>
      {LEVELS.map((lv) => (
        <section key={lv} className="stack">
          <div className="h2">Nivel {lv}</div>
          {LIBRARY.filter((t) => t.level === lv).map((t) => {
            const done = p.lessons[keyOf(t)];
            return (
              <button key={t.id} className="card row" style={{ textAlign: "left" }} onClick={() => setCurrent(t)}>
                <span style={{ fontSize: 28 }}>{t.emoji}</span>
                <span style={{ flex: 1 }}>
                  <b>{t.topic}</b>
                  <span className="small muted" style={{ display: "block" }}>{t.reading.title} · {wordCount(t)} palabras</span>
                </span>
                <span>{done ? "⭐".repeat(done.stars) : "›"}</span>
              </button>
            );
          })}
        </section>
      ))}
      <Link href="/review" className="btn btn-block">Volver al repaso</Link>
    </main>
  );
}
