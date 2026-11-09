import { tokenFor } from "@/lib/access";

// Guarda el progreso en Upstash Redis (se conecta desde Vercel → Storage). Sin cuentas:
// la clave se deriva del código de acceso. Se habla con la API REST por HTTPS, sin dependencias.
const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const MAX_BYTES = 900_000; // el límite por pedido de Upstash es ~1 MB

type Record_ = { rev: number; data: unknown };

async function redis(cmd: string[]): Promise<string | null> {
  const res = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const json = (await res.json().catch(() => ({}))) as { result?: string | null; error?: string };
  if (!res.ok || json.error) throw new Error(json.error ?? `Redis ${res.status}`);
  return json.result ?? null;
}

async function key() {
  const code = process.env.ACCESS_CODE;
  return `germanbaby:v1:${code ? (await tokenFor(`sync:${code}`)).slice(0, 32) : "local"}`;
}

const notConfigured = () => Response.json({ configured: false }, { status: 503 });
const looksLikeProgress = (d: unknown): d is { xp: number; lessons: object } =>
  typeof d === "object" && d !== null && typeof (d as { xp?: unknown }).xp === "number" && typeof (d as { lessons?: unknown }).lessons === "object";

async function current(k: string): Promise<Record_ | null> {
  const raw = await redis(["GET", k]);
  return raw ? (JSON.parse(raw) as Record_) : null;
}

export async function GET() {
  if (!URL_ || !TOKEN) return notConfigured();
  try {
    return Response.json({ configured: true, record: await current(await key()) });
  } catch (e) {
    console.error("sync GET", e);
    return Response.json({ error: "No pude leer la nube." }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  if (!URL_ || !TOKEN) return notConfigured();
  const text = await req.text();
  if (text.length > MAX_BYTES) return Response.json({ error: "El progreso es demasiado grande." }, { status: 413 });
  let body: { data?: unknown; baseRev?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  if (!looksLikeProgress(body.data) || typeof body.baseRev !== "number") {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  try {
    const k = await key();
    const cur = await current(k);
    // Control optimista: si otro dispositivo guardó en el medio, se devuelve su copia para fusionar.
    if ((cur?.rev ?? 0) !== body.baseRev) return Response.json({ conflict: true, record: cur }, { status: 409 });
    const next: Record_ = { rev: body.baseRev + 1, data: body.data };
    await redis(["SET", k, JSON.stringify(next)]);
    return Response.json({ ok: true, rev: next.rev });
  } catch (e) {
    console.error("sync PUT", e);
    return Response.json({ error: "No pude guardar en la nube." }, { status: 502 });
  }
}
