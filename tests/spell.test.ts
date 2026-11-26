import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { suspectWords } from "../lib/spell.ts";

// Las palabras que el corrector no reconoce deben estar revisadas a mano en tests/spell-ok.txt.
test("ortografía: no hay palabras sospechosas sin revisar en el alemán del contenido", () => {
  const ok = new Set(fs.readFileSync(new URL("./spell-ok.txt", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")));
  const bad = suspectWords().filter((s) => !ok.has(s.word.toLowerCase()));
  assert.deepEqual(bad.map((s) => `${s.word} (${s.src}): …${s.text.slice(Math.max(0, s.text.indexOf(s.word) - 30), s.text.indexOf(s.word) + 40)}…`), [], "Palabras no reconocidas: corregí la errata o, si es correcta, agregala a tests/spell-ok.txt");
});
