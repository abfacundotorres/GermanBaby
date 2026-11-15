// Tope de uso de las rutas que llaman a Claude, para que un bucle, un error o una cookie filtrada
// no puedan gastar sin límite. App de un solo usuario: el tope es global, por minuto y por día.
// Con Upstash el conteo se comparte entre instancias; sin él, es en memoria de cada instancia.
import { defaultStore, type Store } from "./ratelimit.ts";

export const AI_LIMITS = {
  perMinute: Number(process.env.AI_LIMIT_PER_MINUTE) || 20,
  perDay: Number(process.env.AI_LIMIT_PER_DAY) || 300,
};

/** Suma una llamada. Devuelve null si pasa, o los segundos de espera y el motivo si se pasó del tope. */
export async function takeAiCall(
  store: Store = defaultStore(),
  now: () => number = Date.now,
  limits = AI_LIMITS,
): Promise<{ wait: number; reason: "minute" | "day" } | null> {
  const t = now();
  const day = new Date(t).toISOString().slice(0, 10);
  const minute = Math.floor(t / 60000);
  const [m, d] = await Promise.all([
    store.incr(`ai:m:${minute}`, 90),
    store.incr(`ai:d:${day}`, 26 * 3600),
  ]);
  if (d > limits.perDay) return { wait: 3600, reason: "day" };
  if (m > limits.perMinute) return { wait: 60, reason: "minute" };
  return null;
}

/** Úsalo al principio de cada ruta de IA: devuelve una respuesta 429 si hay que frenar, o null. */
export async function aiQuotaResponse(): Promise<Response | null> {
  let over: Awaited<ReturnType<typeof takeAiCall>> = null;
  try { over = await takeAiCall(); } catch (e) { console.error("quota", e); return null; } // si Redis falla, no bloquea
  if (!over) return null;
  const error = over.reason === "day"
    ? "Llegaste al tope diario de correcciones con IA. Vuelve a funcionar mañana (se cambia con AI_LIMIT_PER_DAY)."
    : "Demasiadas solicitudes seguidas. Esperá un minuto.";
  return Response.json({ error }, { status: 429, headers: { "Retry-After": String(over.wait) } });
}
