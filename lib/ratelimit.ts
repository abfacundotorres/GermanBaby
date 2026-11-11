// Límite de intentos fallidos de login. Cuenta por IP y también en total, para que
// cambiar de IP no sirva. Usa Upstash si está configurado (compartido entre instancias
// de Vercel); si no, memoria de la instancia (mejor que nada, pero no es compartida).

export type Store = {
  /** Suma 1 al contador y devuelve el valor nuevo; la ventana arranca en el primer aumento. */
  incr(key: string, windowSec: number): Promise<number>;
  count(key: string): Promise<number>;
  del(key: string): Promise<void>;
};

export const LIMITS = {
  perIp: { max: 8, windowSec: 15 * 60 },
  global: { max: 40, windowSec: 60 * 60 },
};

export function memoryStore(now: () => number = Date.now): Store {
  const m = new Map<string, { n: number; until: number }>();
  const live = (k: string) => {
    const e = m.get(k);
    if (e && e.until <= now()) m.delete(k);
    return m.get(k);
  };
  return {
    async incr(k, windowSec) {
      const e = live(k);
      if (e) return ++e.n;
      if (m.size > 5000) for (const [key, v] of m) if (v.until <= now()) m.delete(key);
      m.set(k, { n: 1, until: now() + windowSec * 1000 });
      return 1;
    },
    async count(k) { return live(k)?.n ?? 0; },
    async del(k) { m.delete(k); },
  };
}

export function upstashStore(url: string, token: string): Store {
  const call = async (cmd: (string | number)[]) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    const json = (await res.json().catch(() => ({}))) as { result?: unknown; error?: string };
    if (!res.ok || json.error) throw new Error(json.error ?? `Redis ${res.status}`);
    return json.result;
  };
  return {
    async incr(k, windowSec) {
      const n = Number(await call(["INCR", k]));
      if (n === 1) await call(["EXPIRE", k, windowSec]);
      return n;
    },
    async count(k) { return Number((await call(["GET", k])) ?? 0); },
    async del(k) { await call(["DEL", k]); },
  };
}

/** ¿Está bloqueado este IP (o todo el login)? Devuelve segundos de espera, o 0 si puede intentar. */
export async function blockedFor(store: Store, ip: string): Promise<number> {
  const [a, g] = await Promise.all([store.count(`login:ip:${ip}`), store.count("login:all")]);
  if (a >= LIMITS.perIp.max) return LIMITS.perIp.windowSec;
  if (g >= LIMITS.global.max) return LIMITS.global.windowSec;
  return 0;
}

export async function recordFailure(store: Store, ip: string) {
  await Promise.all([
    store.incr(`login:ip:${ip}`, LIMITS.perIp.windowSec),
    store.incr("login:all", LIMITS.global.windowSec),
  ]);
}

export const recordSuccess = (store: Store, ip: string) => store.del(`login:ip:${ip}`);

let shared: Store | null = null;
export function defaultStore(): Store {
  if (!shared) {
    const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
    shared = url && token ? upstashStore(url, token) : memoryStore();
  }
  return shared;
}

/** IP del cliente. En Vercel `x-forwarded-for` lo pone la plataforma. */
export function clientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return xff || req.headers.get("x-real-ip") || "unknown";
}
