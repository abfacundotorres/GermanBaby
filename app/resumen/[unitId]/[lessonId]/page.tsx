"use client";

import { use } from "react";
import Link from "next/link";
import { getLesson, lessonKey } from "@/lib/curriculum";
import { isUnlocked, useHydrated, useProgress } from "@/lib/progress";
import { LessonRecap } from "@/components/LessonRecap";

export default function RecapPage({ params }: { params: Promise<{ unitId: string; lessonId: string }> }) {
  const { unitId, lessonId } = use(params);
  const hydrated = useHydrated();
  const p = useProgress();
  const found = getLesson(unitId, lessonId);
  if (!found) return <main className="container"><p>No existe esa lección. <Link href="/">Volver</Link></p></main>;
  if (!hydrated) return null;
  if (!isUnlocked(p, lessonKey(unitId, lessonId))) {
    return <main className="container"><p>🔒 Todavía no llegaste a esta lección. <Link href="/">Volver</Link></p></main>;
  }
  return (
    <main className="container stack" style={{ paddingBottom: 40 }}>
      <Link href="/" className="btn">← Volver</Link>
      <LessonRecap unit={found.unit} lesson={found.lesson} />
      <Link href={`/lesson/${unitId}/${lessonId}`} className="btn btn-primary btn-block btn-lg">Practicar esta lección de nuevo</Link>
    </main>
  );
}
