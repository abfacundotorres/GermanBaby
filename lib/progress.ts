"use client";

// Progreso local (un solo usuario): se guarda en localStorage.

import { useSyncExternalStore } from "react";
import { LESSON_ORDER } from "./curriculum";

export type SrsItem = { box: number; due: string }; // due = YYYY-MM-DD

export type Progress = {
  xp: number;
  daily: { date: string; xp: number };
  dailyGoal: number;
  streak: { count: number; lastDate: string | null };
  lessons: Record<string, { stars: number; bestAccuracy: number; completedAt: string }>;
  srs: Record<string, SrsItem>;
  achievements: string[];
  stats: { bestPron: number; chats: number; spoken: number };
  voice: string;
};

const KEY = "germanbaby.progress.v1";

const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD local
const addDays = (date: string, n: number) => {
  const d = new Date(date + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("sv-SE");
};

const DEFAULT: Progress = {
  xp: 0,
  daily: { date: today(), xp: 0 },
  dailyGoal: 50,
  streak: { count: 0, lastDate: null },
  lessons: {},
  srs: {},
  achievements: [],
  stats: { bestPron: 0, chats: 0, spoken: 0 },
  voice: "de-DE-KatjaNeural",
};

let cache: Progress | null = null;
const listeners = new Set<() => void>();

function load(): Progress {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch {
    cache = { ...DEFAULT };
  }
  return cache!;
}

function save(p: Progress) {
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

/** Suma XP, mantiene meta diaria y racha. Devuelve logros nuevos. */
export function addXp(amount: number): string[] {
  const unlocked: string[] = [];
  update((p) => {
    const t = today();
    if (p.daily.date !== t) p.daily = { date: t, xp: 0 };
    p.daily.xp += amount;
    p.xp += amount;
    if (p.streak.lastDate !== t) {
      p.streak.count = p.streak.lastDate === addDays(t, -1) ? p.streak.count + 1 : 1;
      p.streak.lastDate = t;
    }
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
  return p.streak.lastDate === t || p.streak.lastDate === addDays(t, -1) ? p.streak.count : 0;
}
