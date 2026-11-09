// Cambia la clave de Azure por un token de corta duración (10 min) para el navegador.
export async function POST() {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) {
    return Response.json({ error: "Falta AZURE_SPEECH_KEY o AZURE_SPEECH_REGION en .env.local" }, { status: 503 });
  }
  const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    method: "POST",
    headers: { "Ocp-Apim-Subscription-Key": key, "Content-Length": "0" },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!res) return Response.json({ error: "No pude conectarme con Azure Speech." }, { status: 502 });
  if (!res.ok) {
    return Response.json({ error: `Azure rechazó la clave (${res.status}). Revisá clave y región.` }, { status: 502 });
  }
  return Response.json({ token: await res.text(), region });
}
