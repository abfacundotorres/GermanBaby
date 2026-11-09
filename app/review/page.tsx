"use client";

import { useState } from "react";
import Link from "next/link";
import { buildReviewSession } from "@/lib/session";
import { dueItems, reviewItem, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";

export default function ReviewPage() {
  const p = useProgress();
  const [steps, setSteps] = useState<ReturnType<typeof buildReviewSession> | null>(null);
  const due = dueItems(p);

  if (!steps) {
    return (
      <main className="container center stack" style={{ paddingTop: 30 }}>
        <div className="mascot">🔁</div>
        <div className="h1">Repaso espaciado</div>
        <p className="muted">
          Las palabras que sabés bien vuelven cada vez más espaciadas (1, 3, 7, 16 y 35 días). Las que fallás vuelven hoy mismo.
        </p>
        {due.length ? (
          <button className="btn btn-primary btn-block" onClick={() => setSteps(buildReviewSession(due))}>
            Repasar {Math.min(due.length, 12)} palabras
          </button>
        ) : (
          <Link href="/" className="btn btn-block">No hay nada pendiente: volver</Link>
        )}
      </main>
    );
  }

  return (
    <LessonPlayer
      steps={steps}
      title="Repaso"
      onStepResult={(step, ok) => {
        if ("vocab" in step && step.vocab) reviewItem(step.vocab.de, ok);
      }}
      onFinish={() => ({ extraXp: 10 })}
    />
  );
}
