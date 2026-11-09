import { COOKIE, safeEqual, tokenFor } from "@/lib/access";

export async function POST(req: Request) {
  const expected = process.env.ACCESS_CODE;
  if (!expected) return Response.json({ ok: true });
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  const ok = typeof code === "string" && safeEqual(await tokenFor(code.trim()), await tokenFor(expected));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 700)); // frena la fuerza bruta
    return Response.json({ error: "Código incorrecto." }, { status: 401 });
  }
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
