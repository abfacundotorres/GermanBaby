// Corrector ortográfico alemán (hunspell) para detectar erratas en el contenido. Solo lo usan scripts y pruebas.
// El diccionario no arma palabras compuestas, así que una palabra se acepta si se parte en piezas válidas
// (con las «eses» y «enes» de unión): así las erratas reales («gesichtert») no se confunden con compuestos legítimos.

import nspell from "nspell";
import dictionary from "dictionary-de";
import { allGermanText } from "./lexicon.ts";

export type Suspect = { word: string; count: number; src: string; text: string };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const JOINS = ["", "s", "n", "en", "e", "es", "er", "ens"];

export function makeSpeller() {
  const sp = nspell({ aff: Buffer.from(dictionary.aff), dic: Buffer.from(dictionary.dic) });
  const ok = (w: string) => w.length >= 2 && (sp.correct(w) || sp.correct(cap(w.toLowerCase())) || sp.correct(w.toLowerCase()));
  const compound = (w: string, depth = 0): boolean => {
    if (ok(w)) return true;
    if (depth >= 3 || w.length < 6) return false;
    for (let i = 3; i <= w.length - 3; i++) {
      const left = w.slice(0, i), right = w.slice(i);
      for (const j of JOINS) {
        if (j && !left.endsWith(j)) continue;
        const stem = j ? left.slice(0, -j.length) : left;
        if (stem.length >= 3 && ok(stem) && compound(right, depth + 1)) return true;
      }
    }
    return false;
  };
  return { correct: (w: string) => compound(w) };
}

/** Palabras que ni el diccionario ni un corte en piezas reconocen. Las raras suelen ser erratas. */
export function suspectWords(): Suspect[] {
  const sp = makeSpeller();
  const map = new Map<string, Suspect>();
  for (const { src, text } of allGermanText()) {
    for (const w of text.match(/[A-Za-zÄÖÜäöüßéèêáàç]{4,}/g) ?? []) {
      if (sp.correct(w)) continue;
      const k = w.toLowerCase();
      const cur = map.get(k);
      if (cur) cur.count++;
      else map.set(k, { word: w, count: 1, src, text });
    }
  }
  return [...map.values()].sort((a, b) => a.word.localeCompare(b.word));
}
