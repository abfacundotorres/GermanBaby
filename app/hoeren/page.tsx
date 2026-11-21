"use client";

import { useState } from "react";
import Link from "next/link";
import { LISTENING, type ListenPiece } from "@/lib/content/listening";
import { completeLesson, useProgress } from "@/lib/progress";
import type { Step } from "@/lib/session";
import { LessonPlayer } from "@/components/LessonPlayer";
import { shuffle } from "@/lib/text";

const keyOf = (t: ListenPiece) => `hoeren/${t.id}`;

function stepsFor(t: ListenPiece): Step[] {
  const d = t.dialogue;
  const n = d.questions.length;
  return [
    { kind: "section", emoji: t.emoji, title: d.title, text: `${d.setting}. Podés escucharlo lento 🐢, normal ▶ o rápido ⚡. El texto aparece al responder.` },
    ...d.questions.map((question, i): Step => ({
      kind: "listenq",
      dialogue: d,
      question: question.type === "choice" ? { ...question, options: shuffle(question.options) } : question,
      n: i + 1,
      total: n,
    })),
  ];
}

export default function HoerenPage() {
  const p = useProgress();
  const [current, setCurrent] = useState<ListenPiece | null>(null);

  if (current) {
    return (
      <LessonPlayer
        steps={stepsFor(current)}
        title={current.dialogue.title}
        level={current.level}
        source="lesson"
        onFinish={({ accuracy }) => {
          const { stars, unlocked } = completeLesson(keyOf(current), accuracy, []);
          return { extraXp: 10, stars, achievements: unlocked };
        }}
      />
    );
  }

  const groups: { title: string; kind: ListenPiece["kind"] }[] = [
    { title: "🎙️ Monólogos (una voz)", kind: "monolog" },
    { title: "👥 Conversaciones de tres voces", kind: "dreier" },
  ];
  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="h1">🎧 Escucha libre</div>
      <p className="muted">Anuncios, pronósticos, conferencias y conversaciones de tres personas. Escuchalos lentos, normales o rápidos, respondé y después leé el texto.</p>
      {groups.map((g) => (
        <section key={g.kind} className="stack">
          <div className="h2">{g.title}</div>
          {LISTENING.filter((t) => t.kind === g.kind).map((t) => {
            const done = p.lessons[keyOf(t)];
            return (
              <button key={t.id} className="card row" style={{ textAlign: "left" }} onClick={() => setCurrent(t)}>
                <span style={{ fontSize: 28 }}>{t.emoji}</span>
                <span style={{ flex: 1 }}>
                  <b>{t.topic}</b>
                  <span className="small muted" style={{ display: "block" }}>{t.level} · {t.dialogue.lines.length} intervenciones · {t.dialogue.questions.length} preguntas</span>
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
