"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ALL_VOCAB, getLesson, lessonKey } from "@/lib/curriculum";
import { buildLessonSession } from "@/lib/session";
import { completeLesson, dueItems, isUnlocked, useHydrated, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";
import { LessonRecap } from "@/components/LessonRecap";

export default function LessonPage({ params }: { params: Promise<{ unitId: string; lessonId: string }> }) {
  const { unitId, lessonId } = use(params);
  const hydrated = useHydrated();
  const p = useProgress();
  const found = getLesson(unitId, lessonId);

  if (!found) {
    return <main className="container"><p>No existe esa lección. <Link href="/">Volver</Link></p></main>;
  }
  if (!hydrated) return null;
  if (!isUnlocked(p, lessonKey(unitId, lessonId))) {
    return <main className="container"><p>🔒 Completá la lección anterior primero. <Link href="/">Volver</Link></p></main>;
  }
  return <Lesson found={found} />;
}

function Lesson({ found }: { found: NonNullable<ReturnType<typeof getLesson>> }) {
  const p = useProgress();
  const key = lessonKey(found.unit.id, found.lesson.id);
  // Se arma una sola vez, ya con el progreso real cargado.
  const [steps] = useState(() => {
    const own = new Set(found.lesson.vocab.map((v) => v.de));
    const due = dueItems(p)
      .filter((de) => !own.has(de))
      .map((de) => ALL_VOCAB.find((v) => v.de === de))
      .filter((v) => v !== undefined);
    return buildLessonSession(found.lesson, found.unit.lessons.flatMap((l) => l.vocab), due);
  });

  return (
    <LessonPlayer
      steps={steps}
      title={found.lesson.title}
      level={found.unit.level ?? "A1"}
      resumeKey={`lesson/${key}`}
      recap={<LessonRecap unit={found.unit} lesson={found.lesson} />}
      onFinish={({ accuracy }) => {
        const { stars, unlocked } = completeLesson(key, accuracy, found.lesson.vocab.map((v) => v.de));
        return { extraXp: 20 + (accuracy === 1 ? 10 : 0), stars, achievements: unlocked };
      }}
    />
  );
}
