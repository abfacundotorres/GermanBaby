import { test } from "node:test";
import assert from "node:assert/strict";
import { UNITS, ALL_VOCAB, LESSON_ORDER } from "../lib/curriculum.ts";
import { buildLessonSession, isGraded } from "../lib/session.ts";
import { matchFill, tiles } from "../lib/text.ts";

const lessons = UNITS.flatMap((u) => u.lessons.map((l) => ({ u, l })));

test("contenido: ids únicos y orden de lecciones", () => {
  assert.equal(new Set(UNITS.map((u) => u.id)).size, UNITS.length);
  assert.equal(new Set(LESSON_ORDER).size, LESSON_ORDER.length);
  assert.equal(new Set(ALL_VOCAB.map((v) => v.de)).size, ALL_VOCAB.length, "palabras repetidas entre lecciones");
});

test("contenido: «armar la frase» usa solo fichas de la respuesta y no repite distractores", () => {
  for (const { l } of lessons) for (const e of l.exercises) {
    if (e.kind !== "build") continue;
    const ans = tiles(e.answer);
    for (const x of e.extra) assert.ok(!ans.includes(x), `${l.id}: la ficha extra «${x}» ya está en la respuesta «${e.answer}»`);
    assert.equal(new Set(e.extra).size, e.extra.length, `${l.id}: extras repetidos`);
  }
});

test("contenido: preguntas de opción múltiple y de escucha son coherentes", () => {
  for (const { l } of lessons) {
    for (const e of l.exercises) if (e.kind === "quiz") {
      assert.ok(e.options.includes(e.answer), `${l.id}: la respuesta no está en las opciones: ${e.question}`);
      assert.equal(new Set(e.options).size, e.options.length, `${l.id}: opciones repetidas: ${e.question}`);
    }
    for (const q of l.dialogue?.questions ?? []) {
      if (q.type === "choice") {
        assert.ok(q.options.includes(q.answer), `${l.id}: la respuesta no está en las opciones: ${q.q}`);
        assert.equal(new Set(q.options).size, q.options.length);
      }
      if (q.type === "fill") assert.ok(q.answers.length > 0 && q.answers.every((a) => matchFill(a, q.answers)));
    }
    if (l.dialogue) {
      assert.ok(l.dialogue.lines.length >= 3 && l.dialogue.lines.length <= 8, `${l.id}: largo del diálogo`);
      assert.ok(l.dialogue.questions.length >= 3, `${l.id}: pocas preguntas`);
      assert.ok(new Set(l.dialogue.lines.map((x) => x.who)).size === 2, `${l.id}: el diálogo debe tener dos voces`);
    }
  }
});

test("contenido: cada lección arma una sesión con ejercicios calificados", () => {
  for (const { u, l } of lessons) {
    const steps = buildLessonSession(l, u.lessons.flatMap((x) => x.vocab));
    assert.ok(steps.filter(isGraded).length >= 4, `${l.id}: muy pocos ejercicios`);
    if (l.grammar) assert.equal(steps.filter((s) => s.kind === "rule").length, l.grammar.length);
    if (l.dialogue) assert.equal(steps.filter((s) => s.kind === "listenq").length, l.dialogue.questions.length);
  }
});

test("matchFill: números, palabras, euros y decimales", () => {
  assert.ok(matchFill("600", ["600", "sechshundert"]));
  assert.ok(matchFill(" Sechs hundert ", ["600", "sechshundert"]));
  assert.ok(matchFill("7,50 €", ["7,50", "7.50"]));
  assert.ok(matchFill("halb vier", ["halb vier"]));
  assert.ok(matchFill("15 Uhr", ["15"]));
  assert.ok(!matchFill("", ["0"]));
  assert.ok(!matchFill("60", ["600"]));
});
