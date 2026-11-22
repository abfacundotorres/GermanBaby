import { test } from "node:test";
import assert from "node:assert/strict";
import { LESSON_ORDER, UNITS } from "../lib/curriculum.ts";
import { levelStats } from "../lib/levelprogress.ts";

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
  assert.ok(a2.checks.find((c) => c.id === "exam")!.ok);
  assert.ok(a2.checks.find((c) => c.id === "writing")!.ok);
  assert.ok(!a2.checks.find((c) => c.id === "speaking")!.ok, "una sola consigna oral no alcanza");
});
