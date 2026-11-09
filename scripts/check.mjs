// Comprueba la configuración con tus claves reales y dice qué falla y cómo arreglarlo.
// Uso: npm run check        (lee .env.local; o usá las variables de entorno del sistema)
// Gasta una fracción de centavo: una llamada mínima a Claude.

import fs from "node:fs";

// --- carga .env.local sin dependencias (no pisa variables ya definidas) ---
try {
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.log("ℹ️  No encontré .env.local en esta carpeta; uso las variables de entorno del sistema.\n");
}

const env = (k) => (process.env[k] ?? "").trim();
let problems = 0;
const ok = (m) => console.log(`✅ ${m}`);
const warn = (m, hint) => { console.log(`⚠️  ${m}`); if (hint) console.log(`   → ${hint}`); };
const bad = (m, hint) => { problems++; console.log(`❌ ${m}`); if (hint) console.log(`   → ${hint}`); };
const timeout = () => AbortSignal.timeout(12000);

// --- Node ---
const major = Number(process.versions.node.split(".")[0]);
major >= 20 ? ok(`Node ${process.versions.node}`) : bad(`Node ${process.versions.node} es muy viejo`, "Instalá Node 20 o superior desde nodejs.org");

// --- Código de acceso ---
const code = env("ACCESS_CODE");
if (!code) warn("ACCESS_CODE vacío", "En local no hace falta, pero publicada la app rechaza las llamadas a Claude y Azure sin este código.");
else if (code.length < 16) warn(`ACCESS_CODE tiene ${code.length} caracteres`, "Usá 16 o más: nada limita los intentos contra /login.");
else ok(`ACCESS_CODE configurado (${code.length} caracteres)`);

// --- Claude ---
const model = env("CLAUDE_MODEL") || "claude-haiku-5-5";
if (!env("ANTHROPIC_API_KEY") && !env("ANTHROPIC_AUTH_TOKEN")) {
  bad("Falta ANTHROPIC_API_KEY", "Creala en platform.claude.com → API Keys y pegala en .env.local");
} else {
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ timeout: 20000, maxRetries: 0 });
    const r = await client.messages.create({ model, max_tokens: 300, messages: [{ role: "user", content: "Respondé solo con la palabra: listo" }] });
    ok(`Claude responde con ${r.model} (${r.usage.input_tokens} tokens de entrada, ${r.usage.output_tokens} de salida)`);
  } catch (e) {
    const s = e?.status;
    const msg = String(e?.message ?? e);
    if (s === 401) bad("Claude rechazó la clave (401)", "Revisá que ANTHROPIC_API_KEY esté completa, sin espacios ni comillas.");
    else if (s === 400 && /credit|balance/i.test(msg)) bad("Tu cuenta de Claude no tiene saldo", "Cargá saldo en platform.claude.com → Billing.");
    else if (s === 404) bad(`El modelo «${model}» no existe para tu cuenta`, "Borrá CLAUDE_MODEL para usar el predeterminado, o usá claude-sonnet-5-5.");
    else if (s === 429) bad("Claude responde 429 (demasiadas solicitudes)", "Esperá un minuto y probá de nuevo.");
    else bad(`No pude llamar a Claude: ${msg.slice(0, 160)}`, "Revisá tu conexión a internet.");
  }
}

// --- Azure Speech ---
const key = env("AZURE_SPEECH_KEY");
const region = env("AZURE_SPEECH_REGION");
if (!key || !region) {
  bad("Falta AZURE_SPEECH_KEY o AZURE_SPEECH_REGION", "Portal de Azure → tu recurso Speech → Keys and Endpoint.");
} else if (!/^[a-z0-9]+$/.test(region)) {
  bad(`AZURE_SPEECH_REGION «${region}» no tiene el formato correcto`, "Va en minúsculas y sin espacios, por ejemplo brazilsouth, eastus o westeurope.");
} else {
  try {
    const r = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
      method: "POST", headers: { "Ocp-Apim-Subscription-Key": key, "Content-Length": "0" }, signal: timeout(),
    });
    if (r.status === 401 || r.status === 403) bad(`Azure rechazó la clave (${r.status})`, "La clave y la región tienen que ser del MISMO recurso Speech. Copiá «KEY 1» y «Location/Region» juntas.");
    else if (!r.ok) bad(`Azure respondió ${r.status}`, "Revisá la región.");
    else {
      ok(`Azure Speech acepta la clave (región ${region})`);
      // Voz alemana: pide un audio de prueba
      const token = await r.text();
      const t = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3", "User-Agent": "germanbaby-check" },
        body: `<speak version="1.0" xml:lang="de-DE"><voice name="de-DE-KatjaNeural">Hallo!</voice></speak>`, signal: timeout(),
      });
      const bytes = (await t.arrayBuffer()).byteLength;
      t.ok && bytes > 500 ? ok(`La voz alemana (Katja) funciona: ${bytes} bytes de audio`) : bad(`La voz alemana falló (${t.status})`, "Probá con otra región, por ejemplo westeurope.");
    }
  } catch (e) {
    bad(`No pude conectarme con Azure: ${String(e?.message ?? e).slice(0, 120)}`, "Revisá la región y tu conexión.");
  }
  console.log("ℹ️  La evaluación de pronunciación no se puede comprobar sin micrófono: probala en la app (ejercicios «Decilo en voz alta»).");
}

// --- Nube (opcional) ---
const rUrl = env("UPSTASH_REDIS_REST_URL") || env("KV_REST_API_URL");
const rTok = env("UPSTASH_REDIS_REST_TOKEN") || env("KV_REST_API_TOKEN");
if (!rUrl || !rTok) {
  warn("Guardado en la nube sin configurar (opcional)", "Sin esto el progreso vive solo en el navegador. Ver README, «Guardar el progreso en la nube».");
} else {
  const cmd = async (c) => {
    const r = await fetch(rUrl, { method: "POST", headers: { Authorization: `Bearer ${rTok}`, "Content-Type": "application/json" }, body: JSON.stringify(c), signal: timeout() });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) throw new Error(j.error ?? `HTTP ${r.status}`);
    return j.result;
  };
  try {
    if ((await cmd(["PING"])) !== "PONG") throw new Error("PING no devolvió PONG");
    await cmd(["SET", "germanbaby:check", "ok"]);
    const v = await cmd(["GET", "germanbaby:check"]);
    await cmd(["DEL", "germanbaby:check"]);
    v === "ok" ? ok("Upstash Redis conectado: lee y escribe bien") : bad("Upstash no devolvió lo escrito");
  } catch (e) {
    bad(`Upstash falló: ${String(e?.message ?? e).slice(0, 140)}`, "Usá el token REST con permiso de escritura (no el «read-only») y la URL que empieza con https://.");
  }
}

console.log(problems ? `\n${problems} problema${problems > 1 ? "s" : ""} para arreglar.` : "\n🎉 Todo listo.");
process.exit(problems ? 1 : 0);
