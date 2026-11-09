"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getLesson, lessonKey } from "@/lib/curriculum";
import { buildLessonSession } from "@/lib/session";
import { completeLesson, isUnlocked, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";

export default function LessonPage({ params }: { params: Promise<{ unitId: string; lessonId: string }> }) {
  const { unitId, lessonId } = use(params);
  const found = getLesson(unitId, lessonId);
  const p = useProgress();
  const [steps] = useState(() =>
    found ? buildLessonSession(found.lesson, found.unit.lessons.flatMap((l) => l.vocab)) : [],
  );

  if (!found) {
    return <main className="container"><p>No existe esa lección. <Link href="/">Volver</Link></p></main>;
  }
  const key = lessonKey(unitId, lessonId);
  if (!isUnlocked(p, key)) {
    return <main className="container"><p>🔒 Completá la lección anterior primero. <Link href="/">Volver</Link></p></main>;
  }

  return (
    <LessonPlayer
      steps={steps}
      title={found.lesson.title}
      onFinish={({ accuracy }) => {
        const { stars, unlocked } = completeLesson(key, accuracy, found.lesson.vocab.map((v) => v.de));
        return { extraXp: 20 + (accuracy === 1 ? 10 : 0), stars, achievements: unlocked };
      }}
    />
  );
}
