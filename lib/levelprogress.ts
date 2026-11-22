// «Mi nivel»: qué parte de cada nivel completaste, medido sobre lo que la app ofrece en ese nivel.
// Es una función pura (recibe el progreso y los historiales) para poder probarla.

import { LESSON_ORDER, UNITS, lessonKey } from "./curriculum.ts";
import { CORE_VOCAB } from "./content/core-vocab.ts";
import { LIBRARY } from "./content/library.ts";
import { LISTENING } from "./content/listening.ts";
import { EXAMS } from "./content/exams.ts";
import { WRITING } from "./content/writing.ts";
import { SPEAKING } from "./content/speaking.ts";

export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export type Lv = (typeof LEVELS)[number];

export type LevelInput = {
  lessons: Record<string, unknown>;
  srs: Record<string, unknown>;
  exams: { id: string; total: number }[];
  writing: { id: string; total: number }[]; // total sobre 20 (escritura y oral comparten historial)
};

export type Measure = { done: number; total: number; pct: number };
export type LevelStats = {
  level: Lv;
  lessons: Measure;
  words: Measure;
  reading: Measure; // palabras leídas / disponibles
  listening: Measure; // minutos escuchados / disponibles (~150 palabras por minuto)
  exam: { best: number | null; taken: number; available: number };
  writing: { tasks: number; available: number; avg: number | null };
  speaking: { tasks: number; available: number; avg: number | null };
  checks: { id: string; label: string; ok: boolean }[];
  complete: boolean;
};

const words = (a: string[]) => a.join(" ").split(/\s+/).filter(Boolean).length;
const measure = (done: number, total: number): Measure => ({ done, total, pct: total ? Math.min(100, Math.round((done / total) * 100)) : 0 });
const levelOfUnit = (id: string): Lv => (UNITS.find((u) => u.id === id)?.level ?? "A1") as Lv;

export const PASS = { lessons: 100, words: 80, reading: 70, listening: 70, exam: 70, rubric: 12, tasks: 2 };

export function levelStats(input: LevelInput): LevelStats[] {
  return LEVELS.map((lv) => {
    const units = UNITS.filter((u) => ((u.level ?? "A1") as Lv) === lv);
    const lessonKeys = LESSON_ORDER.filter((k) => levelOfUnit(k.split("/")[0]) === lv);
    const doneLessons = lessonKeys.filter((k) => input.lessons[k]).length;

    const vocabSet = new Set<string>([...units.flatMap((u) => u.lessons.flatMap((l) => l.vocab.map((v) => v.de))), ...CORE_VOCAB.filter((v) => v.level === lv).map((v) => v.de)]);
    const learned = [...vocabSet].filter((w) => input.srs[w]).length;

    let readTotal = 0, readDone = 0, listenTotal = 0, listenDone = 0;
    for (const u of units) for (const l of u.lessons) {
      const done = Boolean(input.lessons[lessonKey(u.id, l.id)]);
      if (l.reading) { const n = words(l.reading.text); readTotal += n; if (done) readDone += n; }
      if (l.dialogue) { const n = words(l.dialogue.lines.map((x) => x.de)); listenTotal += n; if (done) listenDone += n; }
    }
    for (const t of LIBRARY.filter((x) => x.level === lv)) { const n = words(t.reading.text); readTotal += n; if (input.lessons[`library/${t.id}`]) readDone += n; }
    for (const t of LISTENING.filter((x) => x.level === lv)) { const n = words(t.dialogue.lines.map((x) => x.de)); listenTotal += n; if (input.lessons[`hoeren/${t.id}`]) listenDone += n; }

    const examIds = new Set(EXAMS.filter((e) => e.level === lv).map((e) => e.id));
    const taken = input.exams.filter((e) => examIds.has(e.id));
    const best = taken.length ? Math.max(...taken.map((e) => e.total)) : null;

    const rub = (ids: Set<string>) => {
      const bestBy = new Map<string, number>();
      for (const r of input.writing) if (ids.has(r.id)) bestBy.set(r.id, Math.max(bestBy.get(r.id) ?? 0, r.total));
      const vals = [...bestBy.values()];
      return { tasks: vals.length, avg: vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null };
    };
    const w = rub(new Set(WRITING.filter((t) => t.level === lv).map((t) => t.id)));
    const s = rub(new Set(SPEAKING.filter((t) => t.level === lv).map((t) => t.id)));

    const lessons = measure(doneLessons, lessonKeys.length);
    const wordsM = measure(learned, vocabSet.size);
    const reading = measure(readDone, readTotal);
    const listening = measure(Math.round(listenDone / 150), Math.round(listenTotal / 150));
    const checks = [
      { id: "lessons", label: "Todas las lecciones del camino", ok: lessons.pct >= PASS.lessons },
      { id: "words", label: `Palabras aprendidas (${PASS.words} %)`, ok: wordsM.pct >= PASS.words },
      { id: "reading", label: `Lectura (${PASS.reading} % de lo disponible)`, ok: reading.pct >= PASS.reading },
      { id: "listening", label: `Escucha (${PASS.listening} % de lo disponible)`, ok: listening.pct >= PASS.listening },
      { id: "exam", label: `Un simulacro con ${PASS.exam} % o más`, ok: best !== null && best >= PASS.exam },
      { id: "writing", label: `Escritura: ${PASS.tasks} consignas con ${PASS.rubric}/20 de promedio`, ok: w.tasks >= PASS.tasks && (w.avg ?? 0) >= PASS.rubric },
      { id: "speaking", label: `Oral: ${PASS.tasks} consignas con ${PASS.rubric}/20 de promedio`, ok: s.tasks >= PASS.tasks && (s.avg ?? 0) >= PASS.rubric },
    ];
    return {
      level: lv, lessons, words: wordsM, reading, listening,
      exam: { best, taken: taken.length, available: examIds.size },
      writing: { ...w, available: WRITING.filter((t) => t.level === lv).length },
      speaking: { ...s, available: SPEAKING.filter((t) => t.level === lv).length },
      checks, complete: checks.every((c) => c.ok),
    };
  });
}
