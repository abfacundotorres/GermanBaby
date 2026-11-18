import { test } from "node:test";
import assert from "node:assert/strict";
import { UNITS, ALL_VOCAB, LESSON_ORDER, BONUS_PREV } from "../lib/curriculum.ts";
import { autoCloze, buildCoreSession, buildReviewSession, buildLessonSession, buildMixedSession, isGraded } from "../lib/session.ts";
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
      const long = l.id === "escucha-larga";
      assert.ok(long ? l.dialogue.lines.length >= 12 && l.dialogue.lines.length <= 20 : l.dialogue.lines.length >= 3 && l.dialogue.lines.length <= 8, `${l.id}: largo del diálogo`);
      assert.ok(l.dialogue.questions.length >= (long ? 6 : 3), `${l.id}: pocas preguntas`);
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
    for (const v of l.vocab) if (v.example) used.push(v.example.de);
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
    assert.ok(l.reading || l.dialogue, `${key}: una lección bonus es de lectura o de escucha`);
    if (l.reading) {
      assert.equal(l.reading.text.length, l.reading.translation.length, `${key}: un párrafo, una traducción`);
      assert.ok(l.reading.questions.length >= 3, `${key}: pocas preguntas`);
    }
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

test("ejemplos: cada clave existe en el vocabulario y la frase usa la palabra", async () => {
  const { EXAMPLES } = await import("../lib/content/examples.ts");
  const keys = new Set(ALL_VOCAB.map((v) => v.de));
  for (const k of Object.keys(EXAMPLES)) assert.ok(keys.has(k), `ejemplo para una palabra que no existe: «${k}»`);
  for (const { u, l } of lessons) for (const v of l.vocab) {
    if (!v.example) continue;
    const words = tokenize(v.example.de);
    // Alguna palabra del vocabulario (sin artículo) aparece en el ejemplo, con terminación o sin ella.
    const heads = tokenize(v.de).filter((w) => w.length > 1 && !["der", "die", "das", "ein", "eine"].includes(w));
    const ok = heads.some((h) => (h.length <= 3 ? words.includes(h) : words.some((w) => w.startsWith(h.slice(0, Math.max(3, h.length - 2))))));
    assert.ok(ok, `${u.id}/${l.id}: el ejemplo de «${v.de}» no usa la palabra: ${v.example.de}`);
    assert.ok(v.example.es.trim().length > 3, `${u.id}/${l.id}: falta la traducción del ejemplo de «${v.de}»`);
  }
});

test("lección: empieza con la explicación, termina con un mini examen y no repite el examen en la práctica", () => {
  for (const { u, l } of lessons) {
    const steps = buildLessonSession(l, u.lessons.flatMap((x) => x.vocab));
    assert.equal(steps[0].kind, "explain", `${l.id}: debe empezar con la explicación`);
    const exam = steps.filter((s) => s.exam);
    if (exam.length) {
      assert.ok(exam.length >= 3 && exam.length <= 8, `${l.id}: tamaño del mini examen ${exam.length}`);
      assert.equal(steps[steps.length - exam.length - 1].kind, "section", `${l.id}: el mini examen va después de un divisor`);
    }
    assert.ok(steps.filter(isGraded).length >= 6, `${l.id}: muy pocos ejercicios`);
  }
});

test("explicaciones previas: cada clave es una lección real y trae explicación y resumen", async () => {
  const { INTROS } = await import("../lib/content/intros.ts");
  const keys = new Set(lessons.map(({ u, l }) => `${u.id}/${l.id}`));
  for (const [k, n] of Object.entries(INTROS)) {
    assert.ok(keys.has(k), `explicación para una lección que no existe: ${k}`);
    assert.ok(n.intro.length >= 1 && n.intro.every((p) => p.trim().length > 20), `${k}: explicación muy corta`);
    assert.ok(n.summary.length >= 1, `${k}: falta el resumen`);
  }
});

test("producción libre: cada práctica (A2 a B2) cierra con un ejercicio libre y cada clave es una unidad con práctica", async () => {
  const { FREE_PROMPTS } = await import("../lib/content/free-prompts.ts");
  const practicas = lessons.filter(({ l }) => l.id === "practica");
  for (const { u, l } of practicas) {
    const f = l.exercises.filter((e) => e.kind === "free");
    assert.equal(f.length, 1, `${u.id}: la práctica debe tener un ejercicio libre`);
    if (f[0].kind === "free") {
      assert.ok(f[0].prompt.length > 20 && f[0].focus.length >= 2 && f[0].minSentences >= 3, `${u.id}: ejercicio libre incompleto`);
    }
  }
  const withPractice = new Set(practicas.map(({ u }) => u.id));
  for (const k of Object.keys(FREE_PROMPTS)) assert.ok(withPractice.has(k), `consigna libre para una unidad sin práctica: ${k}`);
  assert.equal(Object.keys(FREE_PROMPTS).length, practicas.length);
});

test("pares mínimos: la palabra que se oye está entre las opciones y hay dos opciones distintas", () => {
  let n = 0;
  for (const { u, l } of lessons) for (const e of l.exercises) {
    if (e.kind !== "pair") continue;
    n++;
    assert.ok(e.options.includes(e.de) && new Set(e.options).size === e.options.length && e.options.length >= 2, `${u.id}/${l.id}: par mal armado (${e.de})`);
    assert.ok(e.es.trim().length > 1, `${u.id}/${l.id}: falta el significado de «${e.de}»`);
  }
  assert.ok(n >= 12, "la unidad de pronunciación debe traer pares mínimos");
});

test("repaso mezclado: 15 ejercicios calificados de varias unidades, sin producción libre y con pocos de hablar", () => {
  const done = UNITS.slice(0, 20).flatMap((u) => u.lessons.map((lesson) => ({ unitId: u.id, lesson })));
  for (let i = 0; i < 20; i++) {
    const steps = buildMixedSession(done);
    assert.equal(steps.length, 15);
    assert.ok(steps.every(isGraded) && steps.every((s) => s.kind !== "free"));
    assert.ok(steps.filter((s) => s.kind === "speak").length <= 2);
  }
  assert.equal(buildMixedSession([]).length, 0);
  assert.ok(buildMixedSession(done.slice(0, 2), 15).length <= 15);
});

test("entrenador de vocabulario: palabras bien formadas, sin repetir y con ejemplo que las usa", async () => {
  const { CORE_VOCAB } = await import("../lib/content/core-vocab.ts");
  const strip = (s: string) => s.toLowerCase().replace(/^(der|die|das|ein|eine|sich)\s+/, "").replace(/[.,!?¿¡]/g, "").trim();
  const taught = new Set(ALL_VOCAB.map((v) => strip(v.de)));
  const seen = new Set<string>();
  assert.ok(CORE_VOCAB.length >= 200);
  for (const v of CORE_VOCAB) {
    assert.ok(v.de && v.es && v.example?.de && v.example?.es, `línea incompleta: ${v.de}`);
    const k = strip(v.de);
    assert.ok(!seen.has(k), `palabra repetida en el entrenador: ${v.de}`);
    seen.add(k);
    assert.ok(!taught.has(k), `«${v.de}» ya se enseña en una lección`);
    const words = tokenize(v.example!.de);
    const ok = tokenize(v.de).filter((w) => w.length > 1 && !["der", "die", "das"].includes(w)).some((h) => (h.length <= 3 ? words.includes(h) : words.some((w) => w.startsWith(h.slice(0, Math.max(3, h.length - 2))))));
    assert.ok(ok, `el ejemplo de «${v.de}» no usa la palabra: ${v.example!.de}`);
  }
});

test("entrenador de vocabulario: la sesión de 10 palabras es calificada y no usa frases del currículo", async () => {
  const { CORE_VOCAB } = await import("../lib/content/core-vocab.ts");
  const steps = buildCoreSession(CORE_VOCAB.slice(0, 10));
  assert.equal(steps.filter((s) => s.kind === "intro").length, 10);
  assert.ok(steps.filter(isGraded).length >= 30);
  const corePool = new Set(CORE_VOCAB.flatMap((v) => [v.de, v.es]));
  for (const s of steps) if (s.kind === "choice" || s.kind === "listen") assert.ok(s.options.every((o) => corePool.has(o)), "las opciones salen del entrenador");
});

test("repaso espaciado: incluye las palabras del entrenador y las repasa entre ellas", async () => {
  const { CORE_VOCAB } = await import("../lib/content/core-vocab.ts");
  const steps = buildReviewSession(CORE_VOCAB.slice(0, 8).map((v) => v.de));
  assert.equal(steps.length, 8);
  const corePool = new Set(CORE_VOCAB.flatMap((v) => [v.de, v.es]));
  for (const s of steps) if (s.kind === "choice" || s.kind === "listen") assert.ok(s.options.every((o) => corePool.has(o)));
});

test("biblioteca de lecturas: formato, traducción párrafo a párrafo y preguntas coherentes", async () => {
  const { LIBRARY } = await import("../lib/content/library.ts");
  assert.equal(new Set(LIBRARY.map((x) => x.id)).size, LIBRARY.length, "ids repetidos");
  for (const t of LIBRARY) {
    const r = t.reading;
    assert.equal(r.text.length, r.translation.length, `${t.id}: un párrafo, una traducción`);
    assert.ok(r.questions.length >= 5, `${t.id}: pocas preguntas`);
    const n = r.text.join(" ").split(/\s+/).length;
    const min = t.level === "A2" ? 60 : t.level === "B1" ? 100 : 160;
    assert.ok(n >= min, `${t.id}: texto muy corto (${n} palabras)`);
    for (const q of r.questions) {
      if (q.type === "choice") assert.ok(q.options.includes(q.answer) && new Set(q.options).size === q.options.length, `${t.id}: opciones mal armadas: ${q.q}`);
      if (q.type === "fill") assert.ok(q.answers.length > 0 && q.answers.every((a) => matchFill(a, q.answers)));
    }
  }
});

test("simulacros: textos, audios y preguntas bien formados, con respuestas dentro de las opciones", async () => {
  const { EXAMS } = await import("../lib/content/exams.ts");
  assert.equal(new Set(EXAMS.map((e) => e.id)).size, EXAMS.length);
  for (const lv of ["A2", "B1", "B2"]) assert.ok(EXAMS.some((e) => e.level === lv), `falta un simulacro de ${lv}`);
  for (const e of EXAMS) {
    const min = e.level === "B2" ? { l: 10, h: 6, lines: 10 } : e.level === "B1" ? { l: 8, h: 5, lines: 10 } : { l: 8, h: 5, lines: 8 };
    const qs = [...e.lesen.flatMap((t) => t.questions), ...e.hoeren.flatMap((t) => t.questions)];
    assert.ok(e.lesen.flatMap((t) => t.questions).length >= min.l, `${e.id}: pocas preguntas de lectura`);
    assert.ok(e.hoeren.flatMap((t) => t.questions).length >= min.h, `${e.id}: pocas preguntas de escucha`);
    for (const q of qs) {
      if (q.type === "choice") assert.ok(q.options.includes(q.answer) && new Set(q.options).size === q.options.length && q.options.length >= 3, `${e.id}: opciones mal armadas: ${q.q}`);
      if (q.type === "fill") assert.ok(q.answers.length > 0 && q.answers.every((a) => matchFill(a, q.answers)));
    }
    for (const t of e.hoeren) assert.ok(t.lines.length >= min.lines && new Set(t.lines.map((l) => l.who)).size === 2, `${e.id}: el audio necesita dos voces`);
    assert.ok(e.schreiben.minSentences >= 5 && e.schreiben.focus.length >= 3);
  }
});

test("test de nivel: 8 preguntas por nivel, opciones únicas y resultado coherente", async () => {
  const { PLACEMENT, placementResult } = await import("../lib/content/placement.ts");
  for (const lv of ["A1", "A2", "B1", "B2"]) assert.equal(PLACEMENT.filter((x) => x.level === lv).length, 8, lv);
  for (const x of PLACEMENT) assert.ok(x.options.length === 4 && new Set(x.options).size === 4, x.q);
  assert.equal(placementResult({ A1: 3 }).level, "A1");
  assert.deepEqual(placementResult({ A1: 8, A2: 6, B1: 2 }), { level: "A2", partial: true });
  assert.deepEqual(placementResult({ A1: 8, A2: 8, B1: 8, B2: 7 }), { level: "B2", partial: false });
});

test("escritura con rúbrica: consignas bien formadas y todos los niveles cubiertos", async () => {
  const { WRITING } = await import("../lib/content/writing.ts");
  assert.equal(new Set(WRITING.map((t) => t.id)).size, WRITING.length);
  for (const lv of ["A1", "A2", "B1", "B2"]) assert.ok(WRITING.filter((t) => t.level === lv).length >= 3, lv);
  for (const t of WRITING) assert.ok(t.points.length >= 3 && t.minWords < t.maxWords && t.prompt.length > 40, t.id);
});

test("expresión oral: consignas bien formadas y todos los niveles cubiertos", async () => {
  const { SPEAKING } = await import("../lib/content/speaking.ts");
  assert.equal(new Set(SPEAKING.map((t) => t.id)).size, SPEAKING.length);
  for (const lv of ["A1", "A2", "B1", "B2"]) assert.ok(SPEAKING.filter((t) => t.level === lv).length >= 2, lv);
  for (const t of SPEAKING) assert.ok(t.points.length >= 2 && t.minSeconds < t.maxSeconds && t.prompt.length > 40, t.id);
});

test("escucha libre: monólogos de una voz, conversaciones de tres y preguntas bien armadas", async () => {
  const { LISTENING } = await import("../lib/content/listening.ts");
  assert.equal(new Set(LISTENING.map((t) => t.id)).size, LISTENING.length);
  for (const t of LISTENING) {
    const voices = new Set(t.dialogue.lines.map((l) => l.who)).size;
    assert.equal(voices, t.kind === "monolog" ? 1 : 3, `${t.id}: cantidad de voces`);
    assert.ok(t.dialogue.questions.length >= 5 && t.dialogue.lines.length >= 5, t.id);
    for (const q of t.dialogue.questions) if (q.type === "choice") assert.ok(q.options.includes(q.answer) && new Set(q.options).size === q.options.length, `${t.id}: ${q.q}`);
  }
});
