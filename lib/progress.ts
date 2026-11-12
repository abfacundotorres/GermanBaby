"use client";

// Progreso local (un solo usuario): se guarda en localStorage.

import { useSyncExternalStore } from "react";
import { BONUS_PREV, LESSON_ORDER } from "./curriculum";
import type { MistakeInput } from "./mistakes";
import type { Step } from "./session";
import { costUsd } from "./pricing";

export type SrsItem = { box: number; due: string }; // due = YYYY-MM-DD

export type Mistake = MistakeInput & {
  id: string;
  at: string; // ISO
  source: "lesson" | "review" | "practice" | "chat";
  prompt?: string; // consigna en español, si la hay
  step?: Step; // ejercicio original, para repetirlo
  resolved?: boolean;
};

export type Daily = { date: string; xp: number; lessons: number; correct: number; claimed: string[] };

/** Uso de IA (Claude): del día y del mes, con costo estimado a precios de lista. */
export type AiUsage = {
  date: string;
  calls: number;
  month: string; // YYYY-MM
  monthCalls: number;
  monthIn: number;
  monthOut: number;
  monthCost: number; // USD
  unpriced: boolean; // hubo llamadas de un modelo sin precio conocido
  model: string | null;
};

/** Funciones que usan Claude, para el desglose del gasto. */
export type Feature = "correct" | "chat" | "practice";
export const FEATURES: Feature[] = ["correct", "chat", "practice"];

/** Uso del mes por servicio: lo de Claude por función, y lo de Azure (voz y micrófono). */
export type Meter = {
  month: string; // YYYY-MM
  claude: Record<Feature, { calls: number; input: number; output: number; cost: number }>;
  ttsChars: number; // caracteres que Azure convirtió en voz
  ttsPlays: number;
  sttSeconds: number; // segundos de micrófono enviados a Azure (aprox.)
  sttAttempts: number;
  unpriced: boolean;
};

export type Progress = {
  updatedAt: number;
  fastMic: boolean; // la grabación corta apenas dejás de hablar (no espera el silencio largo de Azure)
  meter: Meter; // ms desde 1970; la sincronización decide qué copia es más nueva
  xp: number;
  aiDailyLimit: number; // llamadas a IA por día: 0 = sin IA, -1 = sin límite
  aiMonthlyBudget: number; // USD por mes: 0 = sin tope
  ai: AiUsage;
  gems: number;
  freezes: number; // congeladores de racha (máx. 2)
  history: Record<string, number>; // XP por día (últimos 30)
  sound: boolean;
  daily: Daily;
  dailyGoal: number;
  streak: { count: number; lastDate: string | null };
  lessons: Record<string, { stars: number; bestAccuracy: number; completedAt: string }>;
  srs: Record<string, SrsItem>;
  achievements: string[];
  stats: { bestPron: number; chats: number; spoken: number; bestStreak: number };
  voice: string;
  mistakes: Mistake[];
};

const KEY = "germanbaby.progress.v1";

const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD local
const addDays = (date: string, n: number) => {
  const d = new Date(date + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("sv-SE");
};

const freshMeter = (): Meter => ({
  month: today().slice(0, 7),
  claude: { correct: { calls: 0, input: 0, output: 0, cost: 0 }, chat: { calls: 0, input: 0, output: 0, cost: 0 }, practice: { calls: 0, input: 0, output: 0, cost: 0 } },
  ttsChars: 0, ttsPlays: 0, sttSeconds: 0, sttAttempts: 0, unpriced: false,
});

const freshAi = (): AiUsage => ({
  date: today(), calls: 0, month: today().slice(0, 7), monthCalls: 0, monthIn: 0, monthOut: 0, monthCost: 0, unpriced: false, model: null,
});

const freshDaily = (): Daily => ({ date: today(), xp: 0, lessons: 0, correct: 0, claimed: [] });

const DEFAULT: Progress = {
  updatedAt: 0,
  fastMic: true,
  meter: freshMeter(),
  xp: 0,
  aiDailyLimit: 60,
  aiMonthlyBudget: 3,
  ai: freshAi(),
  gems: 0,
  freezes: 0,
  history: {},
  sound: true,
  daily: freshDaily(),
  dailyGoal: 50,
  streak: { count: 0, lastDate: null },
  lessons: {},
  srs: {},
  achievements: [],
  stats: { bestPron: 0, chats: 0, spoken: 0, bestStreak: 0 },
  voice: "de-DE-KatjaNeural",
  mistakes: [],
};

let cache: Progress | null = null;
const listeners = new Set<() => void>();

/** Reinicia el contador del día o del mes cuando cambia la fecha. */
function rollAi(a: AiUsage) {
  const t = today();
  if (a.date !== t) { a.date = t; a.calls = 0; }
  if (a.month !== t.slice(0, 7)) {
    a.month = t.slice(0, 7); a.monthCalls = 0; a.monthIn = 0; a.monthOut = 0; a.monthCost = 0; a.unpriced = false;
  }
}

/** Completa campos que falten (datos de versiones anteriores) y reinicia lo diario. */
function normalize(raw: Partial<Progress>): Progress {
  const p = { ...structuredClone(DEFAULT), ...raw } as Progress;
  p.stats = { ...DEFAULT.stats, ...raw.stats };
  p.daily = { ...freshDaily(), ...raw.daily };
  p.daily.claimed ??= [];
  if (p.daily.date !== today()) p.daily = freshDaily();
  p.ai = { ...freshAi(), ...raw.ai };
  rollAi(p.ai);
  const fm = freshMeter();
  p.meter = { ...fm, ...raw.meter, claude: { ...fm.claude, ...raw.meter?.claude } };
  if (p.meter.month !== fm.month) p.meter = fm;
  return p;
}

function load(): Progress {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = normalize(raw ? JSON.parse(raw) : {});
  } catch {
    cache = normalize({});
  }
  return cache!;
}

export const getProgress = load;

/** Para la sincronización: avisa de cada cambio y permite reemplazar el progreso entero. */
export function subscribeProgress(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
export const replaceProgress = (p: Progress) => save(normalize(p));

function save(p: Progress) {
  p.updatedAt = Date.now();
  cache = p;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* modo privado o almacenamiento lleno: seguimos en memoria */
  }
  listeners.forEach((l) => l());
}

export function update(fn: (p: Progress) => Progress) {
  save(fn(structuredClone(load())));
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    load,
    () => DEFAULT,
  );
}

// ---------- Gamificación ----------

export const levelFor = (xp: number) => Math.floor(Math.sqrt(xp / 25)) + 1;
export const xpForLevel = (level: number) => (level - 1) ** 2 * 25;

export const ACHIEVEMENTS: Record<string, { title: string; emoji: string; desc: string }> = {
  first_lesson: { title: "Primer paso", emoji: "🐣", desc: "Completaste tu primera lección." },
  perfect: { title: "Perfekt!", emoji: "💎", desc: "Una lección sin errores." },
  streak3: { title: "Constancia", emoji: "🔥", desc: "Racha de 3 días." },
  streak7: { title: "Semana alemana", emoji: "🏆", desc: "Racha de 7 días." },
  pron90: { title: "Acento nativo", emoji: "🎙️", desc: "90 puntos o más de pronunciación." },
  first_chat: { title: "Gesprächig", emoji: "💬", desc: "Tu primera conversación." },
  unit_done: { title: "Unidad completa", emoji: "🎓", desc: "Terminaste una unidad entera." },
};

const daysBetween = (a: string, b: string) =>
  Math.round((new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime()) / 86400_000);

function ensureToday(p: Progress) {
  if (p.daily.date !== today()) p.daily = freshDaily();
}

/** Suma XP, mantiene meta diaria y racha. Devuelve logros nuevos. */
export function addXp(amount: number): string[] {
  const unlocked: string[] = [];
  update((p) => {
    const t = today();
    ensureToday(p);
    p.daily.xp += amount;
    p.xp += amount;
    p.history[t] = (p.history[t] ?? 0) + amount;
    const keep = Object.keys(p.history).sort().slice(-30);
    p.history = Object.fromEntries(keep.map((k) => [k, p.history[k]]));
    if (p.streak.lastDate !== t) {
      const gap = p.streak.lastDate ? daysBetween(p.streak.lastDate, t) : null;
      if (gap === 1) p.streak.count += 1;
      else if (gap === 2 && p.freezes > 0) {
        // Faltó un solo día: un congelador salva la racha.
        p.freezes -= 1;
        p.streak.count += 1;
      } else p.streak.count = 1;
      p.streak.lastDate = t;
    }
    p.stats.bestStreak = Math.max(p.stats.bestStreak, p.streak.count);
    if (p.streak.count >= 3) unlock(p, "streak3", unlocked);
    if (p.streak.count >= 7) unlock(p, "streak7", unlocked);
    return p;
  });
  return unlocked;
}

function unlock(p: Progress, id: string, out: string[]) {
  if (!p.achievements.includes(id)) {
    p.achievements.push(id);
    out.push(id);
  }
}

export function grantAchievement(id: string): boolean {
  let isNew = false;
  update((p) => {
    const out: string[] = [];
    unlock(p, id, out);
    isNew = out.length > 0;
    return p;
  });
  return isNew;
}

export function completeLesson(key: string, accuracy: number, vocab: string[]): { stars: number; unlocked: string[] } {
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
  const unlocked: string[] = [];
  update((p) => {
    const prev = p.lessons[key];
    p.lessons[key] = {
      stars: Math.max(stars, prev?.stars ?? 0),
      bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
      completedAt: new Date().toISOString(),
    };
    // El vocabulario nuevo entra al repaso espaciado mañana.
    for (const de of vocab) {
      if (!p.srs[de]) p.srs[de] = { box: 1, due: addDays(today(), 1) };
    }
    ensureToday(p);
    p.daily.lessons += 1;
    if (!prev) p.gems += 10 + (accuracy === 1 ? 5 : 0); // repetir una lección no da gemas
    unlock(p, "first_lesson", unlocked);
    if (accuracy === 1) unlock(p, "perfect", unlocked);
    const unitId = key.split("/")[0];
    const unitLessons = LESSON_ORDER.filter((k) => k.startsWith(unitId + "/"));
    if (unitLessons.every((k) => p.lessons[k])) unlock(p, "unit_done", unlocked);
    return p;
  });
  return { stars, unlocked };
}

export function isUnlocked(p: Progress, key: string) {
  const bonusPrev = BONUS_PREV[key];
  if (bonusPrev) return Boolean(p.lessons[bonusPrev]);
  const i = LESSON_ORDER.indexOf(key);
  return i <= 0 || Boolean(p.lessons[LESSON_ORDER[i - 1]]);
}

export function recordPronunciation(score: number) {
  let isNew = false;
  update((p) => {
    p.stats.spoken += 1;
    p.stats.bestPron = Math.max(p.stats.bestPron, score);
    if (score >= 90 && !p.achievements.includes("pron90")) {
      p.achievements.push("pron90");
      isNew = true;
    }
    return p;
  });
  return isNew;
}

// ---------- Repaso espaciado (cajas de Leitner) ----------

const INTERVALS = [0, 1, 3, 7, 16, 35]; // días por caja (1..5)

export function dueItems(p: Progress): string[] {
  const t = today();
  return Object.entries(p.srs)
    .filter(([, s]) => s.due <= t)
    .sort((a, b) => a[1].box - b[1].box)
    .map(([de]) => de);
}

export function reviewItem(de: string, correct: boolean) {
  update((p) => {
    const item = p.srs[de] ?? { box: 1, due: today() };
    item.box = correct ? Math.min(item.box + 1, 5) : 1;
    item.due = addDays(today(), correct ? INTERVALS[item.box] : 0);
    p.srs[de] = item;
    return p;
  });
}

/** Racha vigente: si no practicaste ni hoy ni ayer, vuelve a 0. */
export function currentStreak(p: Progress) {
  const t = today();
  if (!p.streak.lastDate) return 0;
  const gap = daysBetween(p.streak.lastDate, t);
  return gap <= 1 || (gap === 2 && p.freezes > 0) ? p.streak.count : 0;
}

// ---------- Registro de errores ----------

const MAX_MISTAKES = 150;

export function logMistakes(items: Omit<Mistake, "id" | "at">[]) {
  if (!items.length) return;
  update((p) => {
    const at = new Date().toISOString();
    const fresh = items.map((m) => ({ ...m, id: crypto.randomUUID(), at }));
    p.mistakes = [...fresh, ...p.mistakes].slice(0, MAX_MISTAKES);
    return p;
  });
}

export function resolveMistakes(ids: string[]) {
  if (!ids.length) return;
  update((p) => {
    p.mistakes = p.mistakes.map((m) => (ids.includes(m.id) ? { ...m, resolved: true } : m));
    return p;
  });
}

/** Errores pendientes de las últimas dos semanas, lo más reciente primero. */
export function openMistakes(p: Progress, days = 14) {
  const since = Date.now() - days * 86400_000;
  return p.mistakes.filter((m) => !m.resolved && Date.parse(m.at) >= since);
}

/** Una palabra fallada vuelve a la caja 1 y se repasa hoy. */
export function markVocabWeak(de: string) {
  update((p) => {
    p.srs[de] = { box: 1, due: today() };
    return p;
  });
}

/** true solo en el navegador, una vez leído localStorage (evita parpadeos al hidratar). */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

// ---------- Misiones diarias, gemas y tienda ----------

export type Quest = { id: string; title: string; emoji: string; target: number; reward: number; value: (d: Daily) => number };

export const QUESTS: Quest[] = [
  { id: "xp", title: "Ganá 40 XP", emoji: "⭐", target: 40, reward: 10, value: (d) => d.xp },
  { id: "lesson", title: "Completá 1 lección", emoji: "📘", target: 1, reward: 10, value: (d) => d.lessons },
  { id: "correct", title: "Acertá 15 ejercicios", emoji: "🎯", target: 15, reward: 10, value: (d) => d.correct },
];
export const CHEST_REWARD = 20;
export const FREEZE_COST = 50;
export const MAX_FREEZES = 2;

export function questState(p: Progress) {
  const d = p.daily.date === today() ? p.daily : freshDaily();
  const quests = QUESTS.map((q) => {
    const value = Math.min(q.value(d), q.target);
    return { ...q, progress: value, done: value >= q.target, claimed: d.claimed.includes(q.id) };
  });
  const allClaimed = quests.every((q) => q.claimed);
  return { quests, chest: { reward: CHEST_REWARD, ready: allClaimed && !d.claimed.includes("chest"), claimed: d.claimed.includes("chest") } };
}

/** Un ejercicio acertado cuenta para la misión «acertá 15». */
export function tickCorrect() {
  update((p) => {
    ensureToday(p);
    p.daily.correct += 1;
    return p;
  });
}

export function claimQuest(id: string): number {
  let gained = 0;
  update((p) => {
    ensureToday(p);
    if (p.daily.claimed.includes(id)) return p;
    if (id === "chest") {
      if (!QUESTS.every((q) => p.daily.claimed.includes(q.id))) return p;
      gained = CHEST_REWARD;
    } else {
      const q = QUESTS.find((x) => x.id === id);
      if (!q || q.value(p.daily) < q.target) return p;
      gained = q.reward;
    }
    p.daily.claimed.push(id);
    p.gems += gained;
    return p;
  });
  return gained;
}

export function buyFreeze(): "ok" | "poor" | "max" {
  let res: "ok" | "poor" | "max" = "ok";
  update((p) => {
    if (p.freezes >= MAX_FREEZES) res = "max";
    else if (p.gems < FREEZE_COST) res = "poor";
    else {
      p.gems -= FREEZE_COST;
      p.freezes += 1;
    }
    return p;
  });
  return res;
}

// ---------- Ajustes y copia de seguridad ----------

export function setSetting<K extends "sound" | "voice" | "dailyGoal" | "aiDailyLimit" | "aiMonthlyBudget" | "fastMic">(key: K, value: Progress[K]) {
  update((p) => {
    p[key] = value;
    return p;
  });
}

export const exportProgress = () => JSON.stringify(load());

export function importProgress(text: string): boolean {
  try {
    const raw = JSON.parse(text);
    if (typeof raw !== "object" || raw === null || typeof raw.xp !== "number" || typeof raw.lessons !== "object") return false;
    save(normalize(raw));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress() {
  save(normalize({}));
}

/** Últimos `n` días con su XP (el más viejo primero). */
export function lastDays(p: Progress, n = 7) {
  const t = today();
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(t, i - (n - 1));
    return { date, xp: p.history[date] ?? 0 };
  });
}

// ---------- Uso de IA: contador y topes ----------

export function aiAllowance(p: Progress) {
  const t = today();
  const callsToday = p.ai.date === t ? p.ai.calls : 0;
  const monthCost = p.ai.month === t.slice(0, 7) ? p.ai.monthCost : 0;
  const limit = p.aiDailyLimit;
  let reason: string | null = null;
  if (limit === 0) reason = "La IA está desactivada (modo sin IA). Podés activarla en Perfil.";
  else if (limit > 0 && callsToday >= limit) reason = `Llegaste al límite diario de IA (${limit} usos). Se renueva mañana, o lo subís en Perfil.`;
  else if (p.aiMonthlyBudget > 0 && monthCost >= p.aiMonthlyBudget) reason = `Llegaste al tope mensual de gasto (USD ${p.aiMonthlyBudget}). Lo subís en Perfil.`;
  return { allowed: reason === null, reason, callsToday, limit, monthCost, budget: p.aiMonthlyBudget };
}

function rollMeter(p: Progress) {
  if (p.meter.month !== today().slice(0, 7)) p.meter = freshMeter();
}

/** Voz de Azure: cuenta los caracteres sintetizados (cada reproducción se cobra de nuevo). */
export function recordTts(chars: number) {
  update((p) => {
    rollMeter(p);
    p.meter.ttsChars += chars;
    p.meter.ttsPlays += 1;
    return p;
  });
}

/** Micrófono con Azure: segundos de audio enviados. */
export function recordStt(seconds: number) {
  update((p) => {
    rollMeter(p);
    p.meter.sttSeconds += seconds;
    p.meter.sttAttempts += 1;
    return p;
  });
}

/** Registra una llamada a IA y, si hay datos de tokens, su costo estimado. */
export function recordAi(usage: { input: number; output: number; model: string } | null, feature: Feature) {
  update((p) => {
    rollAi(p.ai);
    rollMeter(p);
    const f = p.meter.claude[feature];
    f.calls += 1;
    if (usage) {
      f.input += usage.input;
      f.output += usage.output;
      const c = costUsd(usage.model, usage.input, usage.output);
      if (c === null) p.meter.unpriced = true;
      else f.cost += c;
    }
    p.ai.calls += 1;
    p.ai.monthCalls += 1;
    if (usage) {
      p.ai.monthIn += usage.input;
      p.ai.monthOut += usage.output;
      p.ai.model = usage.model;
      const c = costUsd(usage.model, usage.input, usage.output);
      if (c === null) p.ai.unpriced = true;
      else p.ai.monthCost += c;
    }
    return p;
  });
}
