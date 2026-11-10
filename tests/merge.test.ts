import { test } from "node:test";
import assert from "node:assert/strict";
import { isPristine, mergeProgress } from "../lib/merge.ts";
import type { Progress } from "../lib/progress.ts";

const zero = { calls: 0, input: 0, output: 0, cost: 0 };
const base = (over: Partial<Progress> = {}): Progress => ({
  updatedAt: 1000, meter: { month: "2026-11", claude: { correct: { ...zero }, chat: { ...zero }, practice: { ...zero } }, ttsChars: 0, ttsPlays: 0, sttSeconds: 0, sttAttempts: 0, unpriced: false }, xp: 0, gems: 0, freezes: 0, history: {}, sound: true, aiDailyLimit: 60, aiMonthlyBudget: 3,
  ai: { date: "2026-11-09", calls: 0, month: "2026-11", monthCalls: 0, monthIn: 0, monthOut: 0, monthCost: 0, unpriced: false, model: null },
  daily: { date: "2026-11-09", xp: 0, lessons: 0, correct: 0, claimed: [] }, dailyGoal: 50,
  streak: { count: 0, lastDate: null }, lessons: {}, srs: {}, achievements: [],
  stats: { bestPron: 0, chats: 0, spoken: 0, bestStreak: 0 }, voice: "de-DE-KatjaNeural", mistakes: [], ...over,
});
const lesson = (stars: number, at = "2026-11-09T10:00:00Z") => ({ stars, bestAccuracy: stars / 3, completedAt: at });

test("no se pierde nada: lecciones, XP y logros se unen", () => {
  const a = base({ updatedAt: 2000, xp: 120, lessons: { "hallo/gruesse": lesson(2) }, achievements: ["first_lesson"] });
  const b = base({ updatedAt: 3000, xp: 90, lessons: { "hallo/gruesse": lesson(3), "hallo/vorstellen": lesson(1) }, achievements: ["perfect"] });
  const m = mergeProgress(a, b);
  assert.equal(m.xp, 120);
  assert.equal(m.lessons["hallo/gruesse"].stars, 3);
  assert.ok(m.lessons["hallo/vorstellen"]);
  assert.deepEqual([...m.achievements].sort(), ["first_lesson", "perfect"]);
});

test("las gemas y los ajustes los decide la copia más nueva (gastar gemas no se deshace)", () => {
  const viejo = base({ updatedAt: 1000, gems: 80, freezes: 0, voice: "de-DE-ConradNeural" });
  const nuevo = base({ updatedAt: 5000, gems: 30, freezes: 1, voice: "de-DE-AmalaNeural" });
  for (const m of [mergeProgress(viejo, nuevo), mergeProgress(nuevo, viejo)]) {
    assert.equal(m.gems, 30);
    assert.equal(m.freezes, 1);
    assert.equal(m.voice, "de-DE-AmalaNeural");
  }
});

test("un error resuelto en cualquier copia queda resuelto, y no se duplican", () => {
  const e = { id: "m1", at: "2026-11-09T09:00:00Z", source: "lesson" as const, category: "gramática" as const, wrong: "ein", right: "einen" };
  const a = base({ mistakes: [e] });
  const b = base({ mistakes: [{ ...e, resolved: true }, { ...e, id: "m2", at: "2026-11-09T11:00:00Z" }] });
  const m = mergeProgress(a, b);
  assert.equal(m.mistakes.length, 2);
  assert.equal(m.mistakes.find((x) => x.id === "m1")?.resolved, true);
  assert.equal(m.mistakes[0].id, "m2"); // lo más reciente primero
});

test("racha: gana el último día; el XP del día toma el máximo", () => {
  const a = base({ streak: { count: 5, lastDate: "2026-11-09" }, daily: { date: "2026-11-09", xp: 40, lessons: 1, correct: 5, claimed: ["xp"] } });
  const b = base({ streak: { count: 9, lastDate: "2026-11-07" }, daily: { date: "2026-11-09", xp: 70, lessons: 0, correct: 9, claimed: ["lesson"] } });
  const m = mergeProgress(a, b);
  assert.deepEqual(m.streak, { count: 5, lastDate: "2026-11-09" });
  assert.equal(m.daily.xp, 70);
  assert.equal(m.daily.lessons, 1);
  assert.deepEqual([...m.daily.claimed].sort(), ["lesson", "xp"]);
});

test("fusionar es idempotente y no depende del orden en lo que importa", () => {
  const a = base({ updatedAt: 2000, xp: 50, lessons: { x: lesson(1) }, history: { "2026-11-08": 30 } });
  const b = base({ updatedAt: 4000, xp: 80, lessons: { y: lesson(2) }, history: { "2026-11-08": 10, "2026-11-09": 20 } });
  assert.deepEqual(mergeProgress(a, a), a);
  const ab = mergeProgress(a, b), ba = mergeProgress(b, a);
  assert.deepEqual(ab, ba);
  assert.deepEqual(ab.history, { "2026-11-08": 30, "2026-11-09": 20 });
});

test("isPristine: un progreso vacío nunca debe pisar la nube", () => {
  assert.equal(isPristine(base()), true);
  assert.equal(isPristine(base({ xp: 5 })), false);
  assert.equal(isPristine(base({ lessons: { a: lesson(1) } })), false);
});

test("el medidor de gasto toma el mayor de cada contador en el mismo mes", () => {
  const a = base(), b = base();
  a.meter.ttsChars = 1200; a.meter.claude.chat = { calls: 3, input: 900, output: 600, cost: 0.002 };
  b.meter.ttsChars = 800; b.meter.sttSeconds = 40; b.meter.claude.chat = { calls: 5, input: 700, output: 500, cost: 0.003 };
  const m = mergeProgress(a, b);
  assert.equal(m.meter.ttsChars, 1200);
  assert.equal(m.meter.sttSeconds, 40);
  assert.deepEqual(m.meter.claude.chat, { calls: 5, input: 900, output: 600, cost: 0.003 });
});
