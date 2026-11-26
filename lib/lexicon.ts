// Herramientas de contenido: qué palabras se pueden usar en cada punto del currículo y qué reglas de vocabulario se rompen.
// Las usan tests/content.test.ts, `npm run preflight` y `npm run lexicon` (una sola fuente de verdad para las reglas).

import { UNITS, ALL_VOCAB } from "./curriculum.ts";
import type { Lesson } from "./curriculum.ts";
import { GLOSS, PROPER, isNumberWord, tokenize } from "./gloss.ts";
import { CORE_VOCAB } from "./content/core-vocab.ts";
import { LIBRARY } from "./content/library.ts";
import { LISTENING } from "./content/listening.ts";

const quoted = (s: string) => [...s.matchAll(/«([^»]+)»/g)].map((m) => m[1]);
const strip = (s: string) => s.toLowerCase().replace(/^(der|die|das|ein|eine|sich)\s+/, "").replace(/[.,!?¿¡]/g, "").trim();

/** Suma a `known` las palabras que una lección enseña (vocabulario, notas entre « » y gramática). */
export function addTaught(l: Lesson, known: Set<string>) {
  const add = (s: string) => tokenize(s).forEach((w) => known.add(w));
  for (const v of l.vocab) { add(v.de); if (v.note) quoted(v.note).forEach(add); }
  for (const g of l.grammar ?? []) {
    g.body.forEach((b) => quoted(b).forEach(add));
    g.examples?.forEach((e) => add(e.de));
    g.table?.rows.forEach((r) => r.forEach(add));
  }
}

/** Frases en alemán de una lección que deben usar solo palabras conocidas, y los nombres de los hablantes. */
export function usedTexts(l: Lesson): { used: string[]; names: Set<string> } {
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
  return { used, names };
}

/** ¿Es una palabra que se puede usar sin enseñarla? (glosario, nombre propio, número o adjetivo ya enseñado con terminación). */
export function isAllowed(w: string, known: Set<string>, names: Set<string> = new Set()) {
  const inflected = ["e", "en", "er", "es", "em", "n"].some((e) => w.endsWith(e) && known.has(w.slice(0, -e.length)));
  return known.has(w) || w in GLOSS || PROPER.has(w) || names.has(w) || isNumberWord(w) || inflected;
}

/** Palabras sin enseñar ni glosar, por lección (en el orden del currículo). */
export function auditWords(): { lesson: string; words: string[] }[] {
  const known = new Set<string>();
  const out: { lesson: string; words: string[] }[] = [];
  for (const u of UNITS) for (const l of u.lessons) {
    addTaught(l, known);
    const { used, names } = usedTexts(l);
    const unknown = new Set<string>();
    for (const text of used) for (const w of tokenize(text)) if (!isAllowed(w, known, names)) unknown.add(w);
    if (unknown.size) out.push({ lesson: `${u.id}/${l.id}`, words: [...unknown] });
  }
  return out;
}

/** Palabras conocidas hasta el final de una unidad (o de todo el currículo si no se indica). */
export function knownThrough(unitId?: string): Set<string> {
  const known = new Set<string>();
  for (const u of UNITS) {
    for (const l of u.lessons) addTaught(l, known);
    if (u.id === unitId) break;
  }
  return known;
}

/** Palabras sin enseñar de un texto, dado lo conocido hasta cierta unidad. */
export function unknownIn(text: string, unitId?: string): string[] {
  const known = knownThrough(unitId);
  return [...new Set(tokenize(text).filter((w) => !isAllowed(w, known)))];
}

/** Dónde está ocupada una palabra de vocabulario (lección o entrenador), o null si está libre. */
export function occupiedBy(de: string): string | null {
  const k = strip(de);
  for (const u of UNITS) for (const l of u.lessons) for (const v of l.vocab) if (strip(v.de) === k) return `lección ${u.id}/${l.id}`;
  if (CORE_VOCAB.some((v) => strip(v.de) === k)) return "entrenador (core-vocab)";
  return null;
}

/** Conflictos de vocabulario nuevo: repetidas entre lecciones o ya presentes en el entrenador. */
export function vocabProblems(): string[] {
  const out: string[] = [];
  const seen = new Map<string, string>();
  for (const u of UNITS) for (const l of u.lessons) for (const v of l.vocab) {
    const k = v.de.toLowerCase();
    if (seen.has(k)) out.push(`«${v.de}» está en ${u.id}/${l.id} y en ${seen.get(k)}`);
    else seen.set(k, `${u.id}/${l.id}`);
  }
  const taught = new Set(ALL_VOCAB.map((v) => strip(v.de)));
  for (const v of CORE_VOCAB) if (taught.has(strip(v.de))) out.push(`«${v.de}» del entrenador ya se enseña en una lección`);
  return out;
}

/** Todo el alemán del contenido (lecciones, biblioteca y escucha libre), con su origen. */
export function allGermanText(): { src: string; text: string }[] {
  const out: { src: string; text: string }[] = [];
  for (const u of UNITS) for (const l of u.lessons) {
    const src = `${u.id}/${l.id}`;
    for (const t of l.reading?.text ?? []) out.push({ src, text: t });
    for (const x of l.dialogue?.lines ?? []) out.push({ src, text: x.de });
    for (const v of l.vocab) { out.push({ src, text: v.de }); if (v.example) out.push({ src, text: v.example.de }); }
    for (const g of l.grammar ?? []) for (const e of g.examples ?? []) out.push({ src, text: e.de });
  }
  for (const t of LIBRARY) for (const x of t.reading.text) out.push({ src: `lib/${t.id}`, text: x });
  for (const t of LISTENING) for (const x of t.dialogue.lines) out.push({ src: `hoeren/${t.id}`, text: x.de });
  return out;
}
