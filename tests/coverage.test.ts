// Cobertura del currículo: que lo nuevo no rompa los criterios del nivel ni deje lecciones huérfanas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { UNITS } from "../lib/curriculum.ts";
import { levelStats } from "../lib/levelprogress.ts";
import { LIBRARY } from "../lib/content/library.ts";
import { LONG_LISTENINGS } from "../lib/content/long-listening.ts";
import { LONG_LISTENINGS_A2 } from "../lib/content/long-listening-a2.ts";
import { LONG_LISTENINGS_A1 } from "../lib/content/long-listening-a1.ts";
import { LONG_B2X } from "../lib/content/b2-extras.ts";

const empty = { lessons: {}, srs: {}, exams: [], writing: [] };
const lvOf = (u: { level?: string }) => u.level ?? "A1";
const bonusIds = (u: (typeof UNITS)[number]) => u.lessons.filter((l) => l.bonus).map((l) => l.id);

test("lectura acumulada: cada nivel llega al volumen del criterio (A1 1.000, A2 3.000, B1 8.000, B2 20.000)", () => {
  const need: Record<string, number> = { A1: 1000, A2: 3000, B1: 8000, B2: 20000 };
  const stats = levelStats(empty);
  for (const [lv, min] of Object.entries(need)) {
    const s = stats.find((x) => (x as { level?: string; lv?: string }).level === lv || (x as { lv?: string }).lv === lv);
    assert.ok(s, `falta el nivel ${lv}`);
    assert.ok(s.reading.total >= min, `${lv}: lectura ${s.reading.total} < ${min}`);
  }
});

test("escuchas largas: cada clave corresponde a una unidad real (si no, se ignora en silencio)", () => {
  const ids = new Set(UNITS.map((u) => u.id));
  for (const [name, rec] of Object.entries({ LONG_LISTENINGS, LONG_LISTENINGS_A2, LONG_LISTENINGS_A1, LONG_B2X })) {
    for (const k of Object.keys(rec)) assert.ok(ids.has(k), `${name}: la unidad «${k}» no existe`);
  }
});

test("cobertura: A2 a C1 traen lectura, práctica y vocabulario; también escucha larga", () => {
  for (const u of UNITS) {
    const lv = lvOf(u);
    if (lv === "A1" || /^aussprache/.test(u.id)) continue;
    const b = bonusIds(u);
    for (const need of ["lesen", "practica", "wortschatz"]) {
      assert.ok(b.includes(need), `${u.id}: falta la lección «${need}»`);
    }
    if (lv !== "A1") assert.ok(b.includes("escucha-larga"), `${u.id}: falta la escucha larga`);
  }
});

test("biblioteca: ids únicos y ningún tema nuevo repetido (los 3 repetidos conocidos están anotados)", () => {
  assert.equal(new Set(LIBRARY.map((t) => t.id)).size, LIBRARY.length, "ids repetidos en la biblioteca");
  const known = new Set(["Buscar departamento", "Turismo masivo", "Dormir bien"]);
  const seen = new Map<string, number>();
  for (const t of LIBRARY) seen.set(t.topic, (seen.get(t.topic) ?? 0) + 1);
  const dup = [...seen].filter(([k, n]) => n > 1 && !known.has(k)).map(([k]) => k);
  assert.deepEqual(dup, [], "tema repetido en la biblioteca");
  for (const k of known) assert.ok((seen.get(k) ?? 0) <= 2, `«${k}» aparece más de dos veces`);
});
