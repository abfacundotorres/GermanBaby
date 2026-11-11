import { ALL_VOCAB, type Dialogue, type GrammarRule, type HandExercise, type ListenQuestion, type Lesson, type Vocab } from "./curriculum.ts";
import { shuffle } from "./text.ts";

type BaseStep =
  | { kind: "intro"; vocab: Vocab }
  | { kind: "choice"; vocab: Vocab; direction: "de-es" | "es-de"; options: string[] }
  | { kind: "listen"; vocab: Vocab; options: string[] }
  | { kind: "rule"; rule: GrammarRule; n: number; total: number }
  | { kind: "listenq"; dialogue: Dialogue; question: ListenQuestion; n: number; total: number }
  | (HandExercise & { vocab?: Vocab });

/** fromReview: palabra vencida intercalada en una lección. mistakeId: repetición de un error. */
export type Step = BaseStep & { fromReview?: boolean; mistakeId?: string };

export const isGraded = (s: Step) => s.kind !== "intro" && s.kind !== "rule";
/** Pasos que solo se leen: se avanzan con «Entendido». */
export const isReadOnly = (s: Step) => s.kind === "intro" || s.kind === "rule";

function distractors(target: Vocab, pool: Vocab[], field: "de" | "es", n = 3) {
  const others = shuffle(pool.filter((v) => v[field] !== target[field])).map((v) => v[field]);
  const unique = [...new Set(others)].slice(0, n);
  return shuffle([target[field], ...unique]);
}

const choice = (v: Vocab, pool: Vocab[]): Step => {
  const direction = Math.random() < 0.5 ? "de-es" : "es-de";
  return { kind: "choice", vocab: v, direction, options: distractors(v, pool, direction === "de-es" ? "es" : "de") };
};

const listen = (v: Vocab, pool: Vocab[]): Step => ({ kind: "listen", vocab: v, options: distractors(v, pool, "de") });

/**
 * Lección: tarjetas nuevas intercaladas con práctica, después ejercicios mixtos
 * y hasta 2 palabras vencidas de lecciones anteriores.
 */
export function buildLessonSession(lesson: Lesson, unitVocab: Vocab[], dueVocab: Vocab[] = []): Step[] {
  const pool = unitVocab.length >= 4 ? unitVocab : ALL_VOCAB;
  const steps: Step[] = [];
  lesson.vocab.forEach((v, i) => {
    steps.push({ kind: "intro", vocab: v });
    if (i % 2 === 1) steps.push(choice(lesson.vocab[i - 1], pool), choice(v, pool));
  });
  if (lesson.vocab.length % 2 === 1) steps.push(choice(lesson.vocab[lesson.vocab.length - 1], pool));
  const rules: Step[] = (lesson.grammar ?? []).map((rule, i, all) => ({ kind: "rule", rule, n: i + 1, total: all.length }));
  const mixed = shuffle([
    ...lesson.exercises.map((e): Step => (e.kind === "quiz" ? { ...e, options: shuffle(e.options) } : e)),
    ...shuffle(lesson.vocab).slice(0, 3).map((v) => listen(v, pool)),
    ...dueVocab.slice(0, 2).map((v): Step => ({ ...choice(v, ALL_VOCAB), fromReview: true })),
  ]);
  const d = lesson.dialogue;
  const listening: Step[] = d
    ? d.questions.map((q, i): Step => ({
        kind: "listenq", dialogue: d, n: i + 1, total: d.questions.length,
        question: q.type === "choice" ? { ...q, options: shuffle(q.options) } : q,
      }))
    : [];
  return [...rules, ...steps, ...mixed, ...listening];
}

/** Repaso: un ejercicio por palabra vencida, alternando tipos. */
export function buildReviewSession(dueDe: string[], limit = 12): Step[] {
  const items = dueDe
    .slice(0, limit)
    .map((de) => ALL_VOCAB.find((v) => v.de === de))
    .filter((v): v is (typeof ALL_VOCAB)[number] => Boolean(v));
  return items.map((v, i): Step => {
    switch (i % 4) {
      case 0:
        return choice(v, ALL_VOCAB);
      case 1:
        return listen(v, ALL_VOCAB);
      case 2:
        return { kind: "speak", de: v.de, es: v.es, vocab: v };
      default:
        return { kind: "write", es: v.es, references: [v.de], vocab: v };
    }
  });
}
