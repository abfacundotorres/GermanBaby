"use client";

import { useState } from "react";
import Link from "next/link";
import { CORE_VOCAB } from "@/lib/content/core-vocab";
import { buildCoreSession } from "@/lib/session";
import { learnWords, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";

const BATCH = 10;

export default function WordsPage() {
  const p = useProgress();
  const [session, setSession] = useState<{ steps: ReturnType<typeof buildCoreSession>; words: string[] } | null>(null);
  const learned = CORE_VOCAB.filter((v) => p.srs[v.de]).length;
  const next = CORE_VOCAB.filter((v) => !p.srs[v.de]).slice(0, BATCH);

  if (!session) {
    return (
      <main className="container center stack" style={{ paddingTop: 30 }}>
        <div className="mascot">📚</div>
        <div className="h1">Palabras nuevas</div>
        <p className="muted">
          Vocabulario de uso muy frecuente que las lecciones no enseñan como palabra suelta. Se estudian de a {BATCH}, cada una con un ejemplo, y después entran al repaso espaciado.
        </p>
        <div className="card">Aprendiste <b>{learned}</b> de <b>{CORE_VOCAB.length}</b> palabras</div>
        {next.length ? (
          <button className="btn btn-primary btn-block" onClick={() => setSession({ steps: buildCoreSession(next), words: next.map((v) => v.de) })}>
            Estudiar {next.length} palabras nuevas
          </button>
        ) : (
          <p className="muted">Ya viste todas las palabras de esta tanda. Seguí con el repaso: ahí vuelven cuando toca.</p>
        )}
        <Link href="/review" className="btn btn-block">Volver al repaso</Link>
      </main>
    );
  }

  return (
    <LessonPlayer
      steps={session.steps}
      title="Palabras nuevas"
      source="review"
      onFinish={() => {
        learnWords(session.words);
        return { extraXp: 15 };
      }}
    />
  );
}
