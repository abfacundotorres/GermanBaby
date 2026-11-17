// Revisión local (sin IA) de un texto de producción libre, antes de mandarlo a Claude.
// Detecta lo que no vale la pena pagar por corregir: texto en español, frases repetidas o
// demasiado cortas, y descuidos de forma (mayúscula inicial, punto final).

const sentences = (t: string) => t.split(/[.!?\n]+/).map((x) => x.trim()).filter(Boolean);
const words = (s: string) => s.split(/\s+/).filter(Boolean);

export const countSentences = (t: string) => sentences(t).filter((x) => words(x).length >= 2).length;

// Palabras muy frecuentes en español que no existen en alemán (ni se confunden con una palabra alemana).
const SPANISH = new Set(["el", "los", "las", "una", "unos", "que", "porque", "pero", "muy", "con", "para", "por", "como", "cuando", "donde", "yo", "mi", "mis", "tengo", "soy", "estoy", "es", "está", "son", "hay", "más", "también", "y", "pero", "no", "sí", "me", "se", "lo", "le", "del", "al", "esta", "este", "eso", "hace", "años", "día", "casa", "trabajo"]);
// «es», «no», «so» y similares también existen en alemán: no cuentan solos.
const AMBIGUOUS = new Set(["es", "no", "me", "se", "al", "son"]);

export type FreeCheck = {
  /** Problemas que impiden corregir: hay que arreglarlos antes. */
  blockers: string[];
  /** Descuidos que conviene arreglar, pero no impiden corregir. */
  tips: string[];
};

export function checkFree(text: string, minSentences: number): FreeCheck {
  const blockers: string[] = [];
  const tips: string[] = [];
  const all = sentences(text);
  const real = all.filter((x) => words(x).length >= 2);
  if (!real.length) return { blockers, tips };

  const toks = text.toLowerCase().replace(/[.,!?¿¡;:"«»()]/g, " ").split(/\s+/).filter(Boolean);
  const spanish = toks.filter((w) => SPANISH.has(w) && !AMBIGUOUS.has(w)).length;
  if (toks.length >= 4 && spanish / toks.length > 0.25) blockers.push("Parece que escribiste en español. La idea es escribirlo en alemán, aunque salga con errores.");
  if (/[¿¡]/.test(text)) tips.push("En alemán no se usan «¿» ni «¡» al principio.");

  const norm = real.map((x) => x.toLowerCase().replace(/\s+/g, " "));
  if (new Set(norm).size < norm.length) blockers.push("Hay frases repetidas. Cada frase tiene que decir algo distinto.");

  if (real.length >= minSentences && real.filter((x) => words(x).length >= 4).length < Math.ceil(minSentences / 2)) {
    blockers.push("Las frases son muy cortas. Sumales un dato: cuándo, dónde, con quién o por qué.");
  }

  if (real.some((x) => /^[a-zäöü]/.test(x))) tips.push("Cada frase empieza con mayúscula.");
  if (!/[.!?]\s*$/.test(text.trim())) tips.push("Cerrá la última frase con punto.");
  return { blockers, tips };
}
