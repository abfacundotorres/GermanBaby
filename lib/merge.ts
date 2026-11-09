// Fusión de dos copias del progreso (por ejemplo, el celular y la nube) sin perder nada.
// Solo importa tipos: se puede probar con `npm test`.

import type { Mistake, Progress } from "./progress";

export const isPristine = (p: Progress) =>
  p.xp === 0 && p.gems === 0 && Object.keys(p.lessons).length === 0 && p.mistakes.length === 0;

const maxRecord = (a: Record<string, number>, b: Record<string, number>) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
};

/**
 * Lo que solo crece (XP, lecciones, logros, estadísticas, errores) se une o toma el máximo.
 * Lo que puede bajar o es una preferencia (gemas, congeladores, repaso, ajustes) lo decide la copia más nueva.
 */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const n = b.updatedAt > a.updatedAt ? b : a; // copia más nueva
  const o = n === a ? b : a;
  const out: Progress = structuredClone(n);

  out.updatedAt = Math.max(a.updatedAt, b.updatedAt);
  out.xp = Math.max(a.xp, b.xp);
  out.achievements = [...new Set([...a.achievements, ...b.achievements])];
  out.stats = {
    bestPron: Math.max(a.stats.bestPron, b.stats.bestPron),
    chats: Math.max(a.stats.chats, b.stats.chats),
    spoken: Math.max(a.stats.spoken, b.stats.spoken),
    bestStreak: Math.max(a.stats.bestStreak, b.stats.bestStreak),
  };

  out.lessons = structuredClone(o.lessons);
  for (const [k, v] of Object.entries(n.lessons)) {
    const w = out.lessons[k];
    out.lessons[k] = w
      ? { stars: Math.max(v.stars, w.stars), bestAccuracy: Math.max(v.bestAccuracy, w.bestAccuracy), completedAt: v.completedAt > w.completedAt ? v.completedAt : w.completedAt }
      : structuredClone(v);
  }

  out.history = maxRecord(a.history, b.history);
  out.srs = { ...structuredClone(o.srs), ...structuredClone(n.srs) };

  // Racha: la copia con el último día más reciente; a igual día, la más larga.
  const la = a.streak.lastDate ?? "";
  const lb = b.streak.lastDate ?? "";
  out.streak = la !== lb ? structuredClone(la > lb ? a.streak : b.streak) : { lastDate: a.streak.lastDate, count: Math.max(a.streak.count, b.streak.count) };

  // Día de hoy: si es el mismo día se suman los máximos y las misiones cobradas.
  if (a.daily.date === b.daily.date) {
    out.daily = {
      date: a.daily.date,
      xp: Math.max(a.daily.xp, b.daily.xp),
      lessons: Math.max(a.daily.lessons, b.daily.lessons),
      correct: Math.max(a.daily.correct, b.daily.correct),
      claimed: [...new Set([...a.daily.claimed, ...b.daily.claimed])],
    };
  } else out.daily = structuredClone(a.daily.date > b.daily.date ? a.daily : b.daily);

  // Uso de IA: el contador más reciente; si es el mismo período, el mayor de cada uno.
  if (a.ai.date === b.ai.date && a.ai.month === b.ai.month) {
    out.ai = {
      ...n.ai,
      calls: Math.max(a.ai.calls, b.ai.calls),
      monthCalls: Math.max(a.ai.monthCalls, b.ai.monthCalls),
      monthIn: Math.max(a.ai.monthIn, b.ai.monthIn),
      monthOut: Math.max(a.ai.monthOut, b.ai.monthOut),
      monthCost: Math.max(a.ai.monthCost, b.ai.monthCost),
      unpriced: a.ai.unpriced || b.ai.unpriced,
    };
  } else out.ai = structuredClone(a.ai.date > b.ai.date ? a.ai : b.ai);

  // Errores: unión por id; un error resuelto en cualquiera de las copias queda resuelto.
  const byId = new Map<string, Mistake>();
  for (const m of [...a.mistakes, ...b.mistakes]) {
    const prev = byId.get(m.id);
    byId.set(m.id, prev ? { ...prev, resolved: Boolean(prev.resolved || m.resolved) } : structuredClone(m));
  }
  out.mistakes = [...byId.values()].sort((x, y) => (x.at < y.at ? 1 : x.at > y.at ? -1 : 0)).slice(0, 150);

  return out;
}
