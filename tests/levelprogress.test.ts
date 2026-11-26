import { test } from "node:test";
import assert from "node:assert/strict";
import { LESSON_ORDER, UNITS } from "../lib/curriculum.ts";
import { levelStats } from "../lib/levelprogress.ts";
import { CORE_VOCAB } from "../lib/content/core-vocab.ts";

const empty = { lessons: {}, srs: {}, exams: [], writing: [] };

test("mi nivel: sin progreso todo está en cero y ningún nivel está completo", () => {
  const s = levelStats(empty);
  assert.equal(s.length, 5);
  for (const l of s) {
    assert.equal(l.lessons.done, 0);
    assert.ok(l.lessons.total > 0 && l.words.total > 0 && l.reading.total > 0, l.level);
    assert.equal(l.complete, false);
    assert.equal(l.exam.best, null);
  }
});

test("mi nivel: las lecciones se cuentan en el nivel de su unidad", () => {
  const a1 = LESSON_ORDER.filter((k) => (UNITS.find((u) => u.id === k.split("/")[0])?.level ?? "A1") === "A1");
  const lessons = Object.fromEntries(a1.map((k) => [k, { stars: 3 }]));
  const [A1, A2] = levelStats({ ...empty, lessons });
  assert.equal(A1.lessons.pct, 100);
  assert.equal(A2.lessons.done, 0);
  assert.ok(A1.checks.find((c) => c.id === "lessons")!.ok);
});

test("mi nivel: simulacros, escritura y oral se miden por nivel con el mejor intento", () => {
  const s = levelStats({
    ...empty,
    exams: [{ id: "a2-1", total: 55 }, { id: "a2-2", total: 82 }, { id: "b1-1", total: 40 }],
    writing: [{ id: "a2-absage", total: 10 }, { id: "a2-absage", total: 14 }, { id: "a2-dank", total: 12 }, { id: "s-a2-gestern", total: 15 }],
  });
  const a2 = s[1], b1 = s[2];
  assert.equal(a2.exam.best, 82);
  assert.equal(a2.exam.taken, 2);
  assert.equal(b1.exam.best, 40);
  assert.equal(a2.writing.tasks, 2);
  assert.equal(a2.writing.avg, 13); // mejor de cada consigna: 14 y 12
  assert.equal(a2.speaking.tasks, 1);
  assert.ok(!a2.checks.find((c) => c.id === "exam")!.ok, "un solo simulacro aprobado no alcanza");
  assert.ok(!a2.checks.find((c) => c.id === "writing")!.ok, "dos consignas escritas no alcanzan");
  assert.ok(!a2.checks.find((c) => c.id === "speaking")!.ok, "una sola consigna oral no alcanza");
});

test("mi nivel: salir de A1 exige dos simulacros, tres consignas por habilidad y un repaso sostenido", () => {
  const a1 = UNITS.filter((u) => (u.level ?? "A1") === "A1");
  const words = [...new Set([...a1.flatMap((u) => u.lessons.flatMap((l) => l.vocab.map((v) => v.de))), ...CORE_VOCAB.filter((v) => v.level === "A1").map((v) => v.de)])];
  const lessons = Object.fromEntries(LESSON_ORDER.filter((k) => (UNITS.find((u) => u.id === k.split("/")[0])?.level ?? "A1") === "A1").map((k) => [k, { stars: 3 }]));
  const today = "2026-06-10";
  const consolidated = Object.fromEntries(words.map((w) => [w, { box: 4, due: "2026-06-20" }]));
  const full = {
    lessons, srs: consolidated, today,
    exams: [{ id: "a1-1", total: 80 }, { id: "a1-2", total: 75 }],
    writing: [{ id: "a1-tag", total: 14 }, { id: "a1-familie", total: 13 }, { id: "a1-wohnung", total: 12 }, { id: "s-a1-tag", total: 13 }, { id: "s-a1-familie", total: 14 }, { id: "s-a1-wohnung", total: 12 }],
  };
  const check = (s: ReturnType<typeof levelStats>, id: string) => s[0].checks.find((c) => c.id === id)!.ok;
  // Tienen que cumplirse las lecciones, la lectura y la escucha completas para que el nivel cierre; acá solo se miden las condiciones nuevas.
  const s = levelStats(full);
  for (const id of ["lessons", "words", "retention", "exam", "writing", "speaking"]) assert.ok(check(s, id), id);
  // Un simulacro solo no alcanza.
  assert.ok(!check(levelStats({ ...full, exams: [{ id: "a1-1", total: 90 }] }), "exam"));
  // El mismo simulacro repetido tampoco: tienen que ser dos distintos.
  assert.ok(!check(levelStats({ ...full, exams: [{ id: "a1-1", total: 90 }, { id: "a1-1", total: 95 }] }), "exam"));
  // Dos consignas no alcanzan.
  assert.ok(!check(levelStats({ ...full, writing: full.writing.slice(0, 2) }), "writing"));
  // Palabras vistas pero sin consolidar (caja 1) no cuentan como repaso sostenido.
  const fresh = Object.fromEntries(words.map((w) => [w, { box: 1, due: "2026-06-11" }]));
  assert.ok(!check(levelStats({ ...full, srs: fresh }), "retention"));
  // Palabras consolidadas pero muy vencidas tampoco.
  const stale = Object.fromEntries(words.map((w) => [w, { box: 4, due: "2026-05-01" }]));
  assert.ok(!check(levelStats({ ...full, srs: stale }), "retention"));
});
