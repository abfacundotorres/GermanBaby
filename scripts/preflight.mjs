// Revisión rápida de contenido antes de correr toda la batería: junta TODOS los problemas de vocabulario y ortografía de una vez.
// Uso: npm run preflight        (sale con código 1 si hay problemas)
import fs from "node:fs";
import { auditWords, vocabProblems } from "../lib/lexicon.ts";
import { suspectWords } from "../lib/spell.ts";

let bad = 0;
const words = auditWords();
if (words.length) {
  bad++;
  console.log("❌ Palabras sin enseñar ni glosar:");
  for (const p of words) console.log(`   ${p.lesson}: ${p.words.join(", ")}`);
  const uniq = [...new Set(words.flatMap((p) => p.words))];
  console.log("\n   Esqueleto para lib/gloss.ts (completá las traducciones; los nombres propios van a PROPER):");
  console.log("   " + uniq.map((w) => `${w}: "",`).join(" ") + "\n");
}
const vp = vocabProblems();
if (vp.length) {
  bad++;
  console.log("❌ Conflictos de vocabulario nuevo:");
  vp.forEach((x) => console.log("   " + x));
  console.log("");
}
const ok = new Set(fs.readFileSync("tests/spell-ok.txt", "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")));
const sus = suspectWords().filter((s) => !ok.has(s.word.toLowerCase()));
if (sus.length) {
  bad++;
  console.log("❌ Palabras que el corrector no reconoce (¿errata?):");
  for (const s of sus) console.log(`   ${s.word}  [${s.src}]  …${s.text.slice(Math.max(0, s.text.indexOf(s.word) - 30), s.text.indexOf(s.word) + 40)}…`);
  console.log("   Si son correctas, agregalas (en minúsculas) a tests/spell-ok.txt.\n");
}
console.log(bad ? `Hay ${bad} grupo(s) de problemas. Corregí y volvé a correr npm run preflight.` : "✅ Vocabulario, glosario y ortografía en orden. Corré npm test para el resto.");
process.exit(bad ? 1 : 0);
