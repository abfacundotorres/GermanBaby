import { test } from "node:test";
import assert from "node:assert/strict";
import { compareLocal, normalize, tiles } from "../lib/text.ts";
import { costUsd } from "../lib/pricing.ts";

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

test("costUsd: precios conocidos y modelo desconocido", () => {
  assert.equal(costUsd("claude-haiku-5-5", 700, 450)?.toFixed(6), "0.000295");
  assert.equal(costUsd("claude-opus-5-5", 1_000_000, 1_000_000), 24);
  assert.equal(costUsd("modelo-inexistente", 1, 1), null);
});
