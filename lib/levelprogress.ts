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
  srs: Record<string, unknown>; // palabra → { box, due } (ver lib/progress.ts); otras formas cuentan como caja 1
  today?: string; // YYYY-MM-DD; por defecto, hoy
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

/** Condiciones para dar un nivel por completo. `exams` y `tasks` son mínimos (se acotan a lo que el nivel ofrece). */
export const PASS = { lessons: 100, words: 80, reading: 70, listening: 70, exam: 70, exams: 2, rubric: 12, tasks: 3, consolidated: 60, overdue: 15 };

const srsItem = (v: unknown): { box: number; due: string | null } => {
  const o = (typeof v === "object" && v ? v : {}) as { box?: unknown; due?: unknown };
  return { box: typeof o.box === "number" ? o.box : 1, due: typeof o.due === "string" ? o.due : null };
};

export function levelStats(input: LevelInput): LevelStats[] {
  return LEVELS.map((lv) => {
    const units = UNITS.filter((u) => ((u.level ?? "A1") as Lv) === lv);
    const lessonKeys = LESSON_ORDER.filter((k) => levelOfUnit(k.split("/")[0]) === lv);
    const doneLessons = lessonKeys.filter((k) => input.lessons[k]).length;

    const vocabSet = new Set<string>([...units.flatMap((u) => u.lessons.flatMap((l) => l.vocab.map((v) => v.de))), ...CORE_VOCAB.filter((v) => v.level === lv).map((v) => v.de)]);
    const learnedWords = [...vocabSet].filter((w) => input.srs[w]);
    const learned = learnedWords.length;
    const todayStr = input.today ?? new Date().toISOString().slice(0, 10);
    const items = learnedWords.map((w) => srsItem(input.srs[w]));
    const consolidated = items.filter((i) => i.box >= 3).length;
    const overdue = items.filter((i) => i.due !== null && i.due < todayStr).length;

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
    const passedExams = new Set(taken.filter((e) => e.total >= PASS.exam).map((e) => e.id)).size;
    const examsNeeded = Math.min(PASS.exams, examIds.size);

    const rub = (ids: Set<string>) => {
      const bestBy = new Map<string, number>();
      for (const r of input.writing) if (ids.has(r.id)) bestBy.set(r.id, Math.max(bestBy.get(r.id) ?? 0, r.total));
      const vals = [...bestBy.values()];
      return { tasks: vals.length, avg: vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null };
    };
    const w = rub(new Set(WRITING.filter((t) => t.level === lv).map((t) => t.id)));
    const s = rub(new Set(SPEAKING.filter((t) => t.level === lv).map((t) => t.id)));
    const wAvail = WRITING.filter((t) => t.level === lv).length;
    const sAvail = SPEAKING.filter((t) => t.level === lv).length;
    const wNeeded = Math.min(PASS.tasks, wAvail);
    const sNeeded = Math.min(PASS.tasks, sAvail);

    const lessons = measure(doneLessons, lessonKeys.length);
    const wordsM = measure(learned, vocabSet.size);
    const reading = measure(readDone, readTotal);
    const listening = measure(Math.round(listenDone / 150), Math.round(listenTotal / 150));
    const checks = [
      { id: "lessons", label: "Todas las lecciones del camino", ok: lessons.pct >= PASS.lessons },
      { id: "words", label: `Palabras aprendidas (${PASS.words} %)`, ok: wordsM.pct >= PASS.words },
      { id: "reading", label: `Lectura (${PASS.reading} % de lo disponible)`, ok: reading.pct >= PASS.reading },
      { id: "listening", label: `Escucha (${PASS.listening} % de lo disponible)`, ok: listening.pct >= PASS.listening },
      { id: "retention", label: `Repaso sostenido: ${PASS.consolidated} % de tus palabras consolidadas y no más de ${PASS.overdue} % vencidas`, ok: learned > 0 && Math.round((consolidated / learned) * 100) >= PASS.consolidated && Math.round((overdue / learned) * 100) <= PASS.overdue },
      { id: "exam", label: `${examsNeeded === 1 ? "Un simulacro" : `${examsNeeded} simulacros distintos`} con ${PASS.exam} % o más`, ok: examsNeeded > 0 && passedExams >= examsNeeded },
      { id: "writing", label: `Escritura: ${wNeeded} consignas con ${PASS.rubric}/20 de promedio`, ok: wNeeded > 0 && w.tasks >= wNeeded && (w.avg ?? 0) >= PASS.rubric },
      { id: "speaking", label: `Oral: ${sNeeded} consignas con ${PASS.rubric}/20 de promedio`, ok: sNeeded > 0 && s.tasks >= sNeeded && (s.avg ?? 0) >= PASS.rubric },
    ];
    return {
      level: lv, lessons, words: wordsM, reading, listening,
      exam: { best, taken: taken.length, available: examIds.size },
      writing: { ...w, available: wAvail },
      speaking: { ...s, available: sAvail },
      checks, complete: checks.every((c) => c.ok),
    };
  });
}
