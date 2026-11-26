// Qué palabras podés usar al escribir contenido nuevo.
// Uso:
//   npm run lexicon -- unit <id>            palabras conocidas hasta el final de esa unidad (se pueden usar en sus lecciones nuevas)
//   npm run lexicon -- check <id> "texto"   de ese texto, cuáles palabras faltan enseñar o glosar
//   npm run lexicon -- free "der Hund" ...  si una palabra de vocabulario nuevo está libre (no repite lecciones ni el entrenador)
import { knownThrough, unknownIn, occupiedBy } from "../lib/lexicon.ts";
import { GLOSS, PROPER } from "../lib/gloss.ts";

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "unit" && rest[0]) {
  const known = knownThrough(rest[0]);
  const extra = new Set([...Object.keys(GLOSS), ...PROPER]);
  console.log(`Enseñadas hasta «${rest[0]}»: ${known.size} palabras. Más el glosario (${Object.keys(GLOSS).length}) y los nombres propios (${PROPER.size}).\n`);
  console.log([...known].sort().join(", "));
  console.log("\nGlosario: " + [...extra].sort().join(", "));
} else if (cmd === "check" && rest[0] && rest[1]) {
  const u = unknownIn(rest.slice(1).join(" "), rest[0]);
  console.log(u.length ? `Faltan (agregalas a lib/gloss.ts o enseñalas):\n${u.map((w) => `${w}: "",`).join(" ")}` : "✅ Todas las palabras están enseñadas o glosadas.");
} else if (cmd === "free" && rest.length) {
  for (const w of rest) { const o = occupiedBy(w); console.log(`${w.padEnd(28)} ${o ? "OCUPADA → " + o : "libre"}`); }
} else {
  console.log("Uso:\n  npm run lexicon -- unit <id>\n  npm run lexicon -- check <id> \"texto\"\n  npm run lexicon -- free \"der Hund\" ...");
}
