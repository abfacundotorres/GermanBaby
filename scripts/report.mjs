// Informe de cobertura por nivel: cuánto contenido hay de verdad y cuánto falta contra una referencia aproximada.
// Uso: npm run report
import { UNITS } from "../lib/curriculum.ts";
import { CORE_VOCAB } from "../lib/content/core-vocab.ts";
import { LIBRARY } from "../lib/content/library.ts";

// Referencia APROXIMADA de vocabulario acumulado (orden de magnitud según las listas de los exámenes del Goethe-Institut; B2 no tiene lista oficial).
const TARGET = { A1: 650, A2: 1300, B1: 2400, B2: 4000 };
const ORDER = ["A1", "A2", "B1", "B2", "C1"];
const tok = (s) => s.toLowerCase().replace(/[.,!?¿¡«»()…]/g, " ").split(/\s+/).filter((w) => w.length > 1);

const rows = Object.fromEntries(ORDER.map((lv) => [lv, { units: 0, main: 0, bonus: 0, words: new Set(), trainer: new Set(), rules: 0, dlg: 0, long: 0, audioWords: 0, reads: 0, readWords: 0, free: 0 }]));
for (const u of UNITS) {
  const r = rows[u.level ?? "A1"];
  r.units++;
  for (const l of u.lessons) {
    l.bonus ? r.bonus++ : r.main++;
    l.vocab.forEach((v) => tok(v.de).forEach((w) => r.words.add(w)));
    r.rules += (l.grammar ?? []).length;
    r.free += l.exercises.filter((e) => e.kind === "free").length;
    if (l.dialogue) { l.id === "escucha-larga" ? r.long++ : r.dlg++; r.audioWords += l.dialogue.lines.reduce((a, x) => a + x.de.split(/\s+/).length, 0); }
    if (l.reading) { r.reads++; r.readWords += l.reading.text.join(" ").split(/\s+/).length; }
  }
}
CORE_VOCAB.forEach((v) => tok(v.de).forEach((w) => rows[v.level].trainer.add(w)));
for (const t of LIBRARY) { rows[t.level].reads++; rows[t.level].readWords += t.reading.text.join(" ").split(/\s+/).length; }

const acc = new Set(); const pad = (s, n) => String(s).padEnd(n);
console.log(pad("Nivel", 6) + pad("Unid.", 7) + pad("Lecc.", 7) + pad("Bonus", 7) + pad("Palabras", 10) + pad("c/entren.", 11) + pad("Meta", 7) + pad("Cobert.", 9) + pad("Reglas", 8) + pad("Diál.", 7) + pad("Larg.", 7) + pad("Lect.", 7) + pad("P.lect.", 9) + "Audio(p.)");
for (const lv of ORDER) {
  const r = rows[lv];
  r.words.forEach((w) => acc.add(w));
  const withTrainer = new Set(acc); r.trainer.forEach((w) => withTrainer.add(w));
  const total = withTrainer.size; const meta = TARGET[lv];
  console.log(pad(lv, 6) + pad(r.units, 7) + pad(r.main, 7) + pad(r.bonus, 7) + pad(acc.size, 10) + pad(total, 11) + pad(meta ?? "-", 7) + pad(meta ? Math.round((total / meta) * 100) + "%" : "-", 9) + pad(r.rules, 8) + pad(r.dlg, 7) + pad(r.long, 7) + pad(r.reads, 7) + pad(r.readWords, 9) + r.audioWords);
  r.trainer.forEach((w) => acc.add(w));
}
console.log("\nPalabras = formas distintas acumuladas. «c/entren.» suma el entrenador (/words). Meta = referencia aproximada acumulada; cobertura = c/entren. ÷ meta.");
console.log(`Entrenador: ${CORE_VOCAB.length} entradas · Biblioteca: ${LIBRARY.length} textos · Audio: ~150 palabras/min → ${Math.round(Object.values(rows).reduce((a, r) => a + r.audioWords, 0) / 150)} min de diálogos en total`);
