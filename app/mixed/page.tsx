"use client";

import { useState } from "react";
import Link from "next/link";
import { UNITS, lessonKey } from "@/lib/curriculum";
import { buildMixedSession } from "@/lib/session";
import { reviewItem, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";

export default function MixedPage() {
  const p = useProgress();
  const [steps, setSteps] = useState<ReturnType<typeof buildMixedSession> | null>(null);
  const done = UNITS.flatMap((u) => u.lessons.filter((l) => p.lessons[lessonKey(u.id, l.id)]).map((lesson) => ({ unitId: u.id, lesson })));
  const units = new Set(done.map((d) => d.unitId)).size;

  if (!steps) {
    return (
      <main className="container center stack" style={{ paddingTop: 30 }}>
        <div className="mascot">🔀</div>
        <div className="h1">Repaso mezclado</div>
        <p className="muted">
          15 ejercicios tomados al azar de las unidades que ya hiciste: armar, completar, escribir, escuchar y decir. Sirve para que lo viejo no se oxide. No usa IA.
        </p>
        {units >= 2 ? (
          <button className="btn btn-primary btn-block" onClick={() => setSteps(buildMixedSession(done))}>
            Mezclar {units} unidades
          </button>
        ) : (
          <p className="muted small">Se activa cuando tengas lecciones hechas en 2 unidades o más.</p>
        )}
        <Link href="/review" className="btn btn-block">Volver al repaso</Link>
      </main>
    );
  }

  return (
    <LessonPlayer
      steps={steps}
      title="Repaso mezclado"
      source="review"
      onStepResult={(step, ok) => {
        if ("vocab" in step && step.vocab && (step.kind === "choice" || step.kind === "listen")) reviewItem(step.vocab.de, ok);
      }}
      onFinish={() => ({ extraXp: 15 })}
    />
  );
}
