import { COOKIE, safeEqual, tokenFor } from "@/lib/access";
import { blockedFor, clientIp, defaultStore, recordFailure, recordSuccess, type Store } from "@/lib/ratelimit";

// Si Upstash falla, el límite sigue funcionando en memoria de la instancia.
async function safe<T>(store: Store, fn: (s: Store) => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(store); } catch (e) { console.error("ratelimit", e); return fallback; }
}

export async function POST(req: Request) {
  const expected = process.env.ACCESS_CODE;
  if (!expected) return Response.json({ ok: true });
  const ip = clientIp(req);
  const store = defaultStore();
  const wait = await safe(store, (s) => blockedFor(s, ip), 0);
  if (wait > 0) {
    return Response.json(
      { error: "Demasiados intentos fallidos. Esperá unos minutos y probá de nuevo." },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  const ok = typeof code === "string" && safeEqual(await tokenFor(code.trim()), await tokenFor(expected));
  if (!ok) {
    await safe(store, (s) => recordFailure(s, ip), undefined);
    await new Promise((r) => setTimeout(r, 700)); // frena la fuerza bruta
    return Response.json({ error: "Código incorrecto." }, { status: 401 });
  }
  await safe(store, (s) => recordSuccess(s, ip), undefined);
  const res = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.headers.append(
    "Set-Cookie",
    `${COOKIE}=${await tokenFor(expected)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secure}`,
  );
  return res;
}

export async function DELETE() {
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return res;
}
