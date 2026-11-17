import { test } from "node:test";
import assert from "node:assert/strict";
import { compareLocal, normalize, tiles } from "../lib/text.ts";
import { azureCost, costUsd } from "../lib/pricing.ts";

test("la puntuación y la mayúscula inicial no cuentan", () => {
  assert.equal(compareLocal("hallo, guten Abend!", "Hallo, guten Abend"), "correct");
});

test("un sustantivo sin mayúscula no es del todo correcto", () => {
  assert.equal(compareLocal("hallo guten abend", "Hallo, guten Abend"), "almost");
  assert.equal(compareLocal("Ich möchte einen kaffee", "Ich möchte einen Kaffee"), "almost");
});

test("los errores de gramática en una frase NO se toman por typos", () => {
  assert.equal(compareLocal("Ich habe ein Bruder", "Ich habe einen Bruder"), "incorrect");
  assert.equal(compareLocal("Wo wohnt du", "Wo wohnst du"), "incorrect");
  assert.equal(compareLocal("Er hat", "Er ist"), "incorrect");
});

test("ae/oe/ue/ss valen como ä/ö/ü/ß, con aviso", () => {
  assert.equal(compareLocal("Tschuess", "Tschüss"), "almost");
  assert.equal(compareLocal("wie heissen Sie", "Wie heißen Sie"), "almost");
});

test("un typo en una palabra suelta se tolera, en una palabra larga distinta no", () => {
  assert.equal(compareLocal("Frühstuck", "Frühstück"), "almost");
  assert.equal(compareLocal("zen", "zehn"), "almost");
  assert.equal(compareLocal("Montag", "Dienstag"), "incorrect");
});

test("con ignoreCase (fichas) las mayúsculas no importan", () => {
  assert.equal(compareLocal("um sechs Uhr stehe Ich auf", "Um sechs Uhr stehe ich auf", { ignoreCase: true }), "correct");
});

test("normalize y tiles", () => {
  assert.equal(normalize("  Hallo,   Welt! "), "hallo welt");
  assert.deepEqual(tiles("Wie geht's du?"), ["Wie", "geht's", "du"]);
});

test("azureCost: dentro de la cuota gratuita no cuesta nada", () => {
  assert.deepEqual(azureCost({ ttsChars: 120_000, sttSeconds: 600 }), { stt: 0, tts: 0 });
  const over = azureCost({ ttsChars: 1_500_000, sttSeconds: 6 * 3600 });
  assert.equal(over.tts, 15);
  assert.equal(Number(over.stt.toFixed(2)), 1);
});

test("costUsd: precios conocidos y modelo desconocido", () => {
  assert.equal(costUsd("claude-haiku-5-5", 700, 450)?.toFixed(6), "0.000295");
  assert.equal(costUsd("claude-opus-5-5", 1_000_000, 1_000_000), 24);
  assert.equal(costUsd("modelo-inexistente", 1, 1), null);
});

test("producción libre: la revisión local frena el español, las repeticiones y las frases mínimas", async () => {
  const { checkFree, countSentences } = await import("../lib/freecheck.ts");
  assert.equal(countSentences("Ich wohne in Berlin. Ja. Ich arbeite viel."), 2);
  const ok = checkFree("Früher wohnte ich in Madrid. Ich hatte kein Auto. Seit zwei Jahren lerne ich Deutsch.", 3);
  assert.deepEqual(ok, { blockers: [], tips: [] });
  assert.ok(checkFree("Yo vivía en Madrid porque tengo trabajo. No tenía auto. Estudio alemán hace dos años.", 3).blockers.some((b) => b.includes("español")));
  assert.ok(checkFree("Ich lerne Deutsch gern. Ich lerne Deutsch gern. Ich arbeite hier.", 3).blockers.some((b) => b.includes("repetidas")));
  assert.ok(checkFree("Ich lerne. Ich esse. Ich schlafe.", 3).blockers.some((b) => b.includes("cortas")));
  const tips = checkFree("ich wohne in Berlin. Es ist sehr schön hier. Ich arbeite in einem Büro", 3);
  assert.equal(tips.blockers.length, 0);
  assert.equal(tips.tips.length, 2);
  assert.deepEqual(checkFree("", 3), { blockers: [], tips: [] });
});
