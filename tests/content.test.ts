import { test } from "node:test";
import assert from "node:assert/strict";
import { UNITS, ALL_VOCAB, LESSON_ORDER, BONUS_PREV } from "../lib/curriculum.ts";
import { autoCloze, buildLessonSession, isGraded } from "../lib/session.ts";
import { matchFill, tiles } from "../lib/text.ts";
import { GLOSS, PROPER, isNumberWord, tokenize } from "../lib/gloss.ts";

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
    for (const q of [...(l.dialogue?.questions ?? []), ...(l.reading?.questions ?? [])]) {
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

const quoted = (s: string) => [...s.matchAll(/«([^»]+)»/g)].map((m) => m[1]);

test("contenido: los diálogos y los ejercicios solo usan palabras enseñadas, glosadas o nombres propios", () => {
  const known = new Set<string>();
  const add = (s: string) => tokenize(s).forEach((w) => known.add(w));
  const problems: string[] = [];
  for (const { u, l } of lessons) {
    for (const v of l.vocab) { add(v.de); if (v.note) quoted(v.note).forEach(add); }
    for (const g of l.grammar ?? []) {
      g.body.forEach((b) => quoted(b).forEach(add));
      g.examples?.forEach((e) => add(e.de));
      g.table?.rows.forEach((r) => r.forEach(add));
    }
    const used: string[] = [];
    for (const e of l.exercises) {
      if (e.kind === "speak" || e.kind === "dictation") used.push(e.de);
      if (e.kind === "build") used.push(e.answer);
      if (e.kind === "write") used.push(e.references[0]);
      if (e.kind === "cloze") used.push(e.sentence.replace("___", e.answer));
    }
    for (const t of l.reading?.text ?? []) used.push(t);
    const names = new Set<string>();
    for (const line of l.dialogue?.lines ?? []) { used.push(line.de); tokenize(line.name).forEach((w) => names.add(w)); }
    // Un adjetivo ya enseñado con terminación (schwarz → schwarzen) se enseña por regla, no por palabra.
    const inflected = (w: string) => ["e", "en", "er", "es", "em", "n"].some((e) => w.endsWith(e) && known.has(w.slice(0, -e.length)));
    const unknown = new Set<string>();
    for (const text of used) for (const w of tokenize(text)) {
      if (!known.has(w) && !(w in GLOSS) && !PROPER.has(w) && !names.has(w) && !isNumberWord(w) && !inflected(w)) unknown.add(w);
    }
    if (unknown.size) problems.push(`${u.id}/${l.id}: ${[...unknown].join(", ")}`);
  }
  assert.deepEqual(problems, [], "Palabras sin enseñar: agregalas al vocabulario o a lib/gloss.ts");
});

test("lecciones bonus: no entran en el orden lineal y se desbloquean con la anterior de su unidad", () => {
  const bonus = lessons.filter(({ l }) => l.bonus);
  for (const { u, l } of bonus) {
    const key = `${u.id}/${l.id}`;
    assert.ok(!LESSON_ORDER.includes(key), `${key} no debe estar en LESSON_ORDER`);
    assert.ok(BONUS_PREV[key], `${key} necesita una lección anterior`);
    assert.ok(l.reading, `${key}: una lección bonus es de lectura`);
    assert.equal(l.reading!.text.length, l.reading!.translation.length, `${key}: un párrafo, una traducción`);
    assert.ok(l.reading!.questions.length >= 3, `${key}: pocas preguntas`);
  }
});

test("completar la frase: respuesta entre las opciones y un solo hueco", () => {
  for (const { l } of lessons) for (const e of l.exercises) {
    if (e.kind !== "cloze") continue;
    assert.equal(e.sentence.split("___").length, 2, `${l.id}: la frase debe tener un solo «___»`);
    assert.ok(e.options.includes(e.answer), `${l.id}: la respuesta no está en las opciones`);
    assert.equal(new Set(e.options).size, e.options.length);
  }
});

test("completar la frase automático: tapa la palabra que se confunde con un distractor", () => {
  const c = autoCloze({ es: "Voy en colectivo", answer: "Ich fahre mit dem Bus", extra: ["der", "den", "Zug"] });
  assert.ok(c);
  assert.equal(c!.answer, "dem");
  assert.equal(c!.sentence, "Ich fahre mit ___ Bus");
  assert.ok(c!.options.includes("dem") && c!.options.includes("den") && c!.options.length >= 2);
  // sin distractores parecidos no inventa un ejercicio
  assert.equal(autoCloze({ es: "x", answer: "Hallo Welt", extra: ["zzzzzz"] }), null);
});

test("cada lección con armar frases genera algún completar la frase", () => {
  let withCloze = 0;
  const withBuild = lessons.filter(({ l }) => l.exercises.some((e) => e.kind === "build"));
  for (const { u, l } of withBuild) {
    const steps = buildLessonSession(l, u.lessons.flatMap((x) => x.vocab));
    if (steps.some((s) => s.kind === "cloze")) withCloze++;
  }
  assert.ok(withCloze >= withBuild.length * 0.8, `solo ${withCloze} de ${withBuild.length} lecciones generan un completar la frase`);
});
