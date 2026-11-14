// Bot que resuelve las lecciones por la interfaz, con un navegador de tamaño de celular, y comprueba que:
//  · todas las lecciones se pueden terminar respondiendo con las respuestas del propio currículo,
//  · ninguna respuesta correcta se marca como mala (no se pierde ningún corazón),
//  · al final aparece el mini examen y el resumen «Lo que aprendiste».
// NO prueba que el alemán sea correcto: solo que el contenido es coherente y resoluble.
//
// Cómo usarlo (con la app corriendo en otra terminal: `npm run dev` o `npm run build && npm start`):
//   npm run bot                           una lección de muestra por unidad (rápido)
//   npm run bot -- --practice             las lecciones «Práctica» (A2 a B2)
//   npm run bot -- --unit cafe            todas las lecciones de una unidad
//   npm run bot -- --lesson cafe/bestellen   una lección
//   npm run bot -- --all                  las 225 lecciones (tarda un buen rato)
//   Opciones: --url http://localhost:3000  --code <código de acceso>  --headed  --limit 20
//
// Requiere Playwright:  npm i -D playwright  y después  npx playwright install chromium
// (si lo instalaste global, también lo encuentra). Nunca pegues tu código de acceso en un chat.

import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { UNITS, LESSON_ORDER, BONUS_PREV, lessonKey } from "../lib/curriculum.ts";

const require = createRequire(import.meta.url);

function loadPlaywright() {
  try { return require("playwright"); } catch { /* sigue */ }
  try {
    const root = execSync("npm root -g", { encoding: "utf8" }).trim();
    return require(require.resolve("playwright", { paths: [root] }));
  } catch { /* sigue */ }
  console.error("Falta Playwright. Instalalo con:  npm i -D playwright  y después  npx playwright install chromium");
  process.exit(2);
}

// ---------- argumentos ----------
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const URL = opt("url", "http://localhost:3000").replace(/\/$/, "");
const CODE = opt("code", process.env.BOT_ACCESS_CODE ?? "");
const LIMIT = Number(opt("limit", "0"));
const MAX_STEPS = 220;

// ---------- qué lecciones ----------
const all = UNITS.flatMap((u) => u.lessons.map((l) => ({ unit: u, lesson: l, key: lessonKey(u.id, l.id) })));
let targets;
if (flag("all")) targets = all;
else if (opt("lesson")) targets = all.filter((t) => t.key === opt("lesson"));
else if (opt("unit")) targets = all.filter((t) => t.unit.id === opt("unit"));
else if (flag("practice")) targets = all.filter((t) => t.lesson.id === "practica");
else targets = UNITS.map((u) => all.find((t) => t.unit.id === u.id && !t.lesson.bonus && t.lesson.vocab.length > 0)).filter(Boolean);
if (LIMIT) targets = targets.slice(0, LIMIT);
if (!targets.length) { console.error("No hay lecciones que coincidan con esas opciones."); process.exit(2); }

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const exactText = (s) => new RegExp(`^\\s*${esc(s)}\\s*$`);
/** Igual que lib/text.ts: las fichas de «armar la frase» son las palabras sin puntuación. */
const tilesOf = (sentence) => sentence.replace(/[.,!?]/g, "").split(/\s+/).filter(Boolean);

async function reachable() {
  try { const r = await fetch(URL + "/login", { redirect: "manual" }); return r.status < 500; } catch { return false; }
}

async function openContext(browser, key) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 860 }, locale: "es-AR" });
  if (CODE) await ctx.request.post(URL + "/api/login", { data: { code: CODE } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(6000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // Progreso sembrado: todas las lecciones del camino principal completadas, menos la que se prueba.
  const done = LESSON_ORDER.filter((k) => k !== key);
  await page.goto(URL + "/login").catch(() => {});
  await page.evaluate((keys) => {
    const lessons = {};
    for (const k of keys) lessons[k] = { stars: 3, best: 1, at: Date.now() };
    localStorage.setItem("germanbaby.progress.v1", JSON.stringify({ v: 1, xp: 0, gems: 0, lessons }));
  }, done);
  return { ctx, page, errors };
}

/** Lee del propio navegador el paso actual: la app guarda la cola de pasos y el índice al avanzar. */
async function currentStep(page, key) {
  return page.evaluate((k) => {
    try {
      const s = JSON.parse(localStorage.getItem("germanbaby.session.v1.lesson/" + k) ?? "null");
      return s ? { step: s.queue[s.index], index: s.index, total: s.queue.length } : null;
    } catch { return null; }
  }, key);
}

const hearts = async (page) => Number(((await page.innerText("body")).match(/❤️\s*(\d)/) ?? [])[1] ?? NaN);

async function clickContinue(page) {
  const b = page.locator("button:has-text('Continuar')").first();
  try { await b.waitFor({ state: "visible", timeout: 2500 }); await b.click(); return true; } catch { return false; }
}

/** Responde un paso con la respuesta correcta del currículo. Devuelve un texto de error o null. */
async function answer(page, step) {
  const option = (text) => page.locator("button.option", { hasText: exactText(text) }).first().click();
  const check = () => page.locator("button:has-text('Comprobar')").first().click();
  const type = (text) => page.locator("textarea, input[type=text], input:not([type])").first().fill(text);
  switch (step.kind) {
    case "explain": case "section": case "intro": case "rule":
      await page.locator("button:has-text('Entendido')").first().click();
      return null;
    case "choice": await option(step.direction === "de-es" ? step.vocab.es : step.vocab.de); return null;
    case "listen": await option(step.vocab.de); return null;
    case "quiz": await option(step.answer); return null;
    case "cloze": await option(step.answer); return null;
    case "build":
      for (const t of tilesOf(step.answer)) {
        await page.locator(".tiles:not(.answer-line) button.tile:not(.used):not([disabled])", { hasText: exactText(t) }).first().click();
      }
      await check();
      return null;
    case "dictation": await type(step.de); await check(); return null;
    case "write": await type(step.references[0]); await check(); return null;
    case "speak": {
      const mic = page.locator("button:has-text('🎤')");
      if (await mic.count()) { await mic.first().click().catch(() => {}); }
      const skip = page.locator("button:has-text('Saltear')").first();
      await skip.waitFor({ state: "visible", timeout: 5000 });
      await skip.click();
      return null;
    }
    case "listenq": case "readq": {
      const q = step.question;
      if (q.type === "choice") await option(q.answer);
      else if (q.type === "tf") await option(q.answer ? "Verdadero" : "Falso");
      else { await type(q.answers[0]); await check(); }
      return null;
    }
    default: return `tipo de paso desconocido: ${step.kind}`;
  }
}

async function solve(browser, t) {
  const { ctx, page, errors } = await openContext(browser, t.key);
  const problems = [];
  let steps = 0, minHearts = 5, finished = false, sawExam = false;
  try {
    await page.goto(`${URL}/lesson/${t.key}`);
    await page.waitForTimeout(1200);
    for (let i = 0; i < MAX_STEPS; i++) {
      if (await page.locator("a[href='/']:has-text('Continuar')").count()) { finished = true; break; }
      await page.waitForTimeout(220);
      const cur = await currentStep(page, t.key);
      // Sin sesión guardada todavía: estamos en el primer paso, que es la explicación previa.
      const step = cur?.step ?? { kind: "explain" };
      if (step.exam) sawExam = true;
      const read = ["explain", "section", "intro", "rule"].includes(step.kind);
      try {
        const err = await answer(page, step);
        if (err) { problems.push(err); break; }
      } catch (e) {
        problems.push(`no pude resolver el paso ${cur ? cur.index + 1 : 1} (${step.kind}): ${String(e.message).split("\n")[0]}`);
        break;
      }
      steps++;
      if (!read) {
        const h = await hearts(page);
        if (h < minHearts) { minHearts = h; problems.push(`perdió un corazón en el paso ${cur.index + 1} (${step.kind}) con la respuesta correcta`); break; }
        await clickContinue(page);
      }
    }
    if (!finished) problems.push("no llegó a la pantalla final");
    else {
      const body = await page.innerText("body");
      if (!/Lo que aprendiste/.test(body)) problems.push("la pantalla final no muestra el resumen «Lo que aprendiste»");
      if (sawExam && !/Mini examen: \d+ de \d+/.test(body)) problems.push("la pantalla final no muestra el resultado del mini examen");
    }
    if (errors.length) problems.push(`errores de la página: ${errors[0]}`);
  } finally {
    await ctx.close();
  }
  return { key: t.key, steps, finished, problems };
}

// ---------- main ----------
if (!(await reachable())) {
  console.error(`No encuentro la app en ${URL}. Arrancala en otra terminal con  npm run dev  (o  npm run build && npm start)  y volvé a probar.`);
  process.exit(2);
}
const { chromium } = loadPlaywright();
const browser = await chromium.launch({ headless: !flag("headed") });
console.log(`Resolviendo ${targets.length} lección(es) en ${URL}…\n`);
let bad = 0;
const t0 = Date.now();
for (const t of targets) {
  const r = await solve(browser, t);
  const tag = BONUS_PREV[t.key] ? " (bonus)" : "";
  if (r.problems.length) { bad++; console.log(`❌ ${r.key}${tag}  pasos=${r.steps}\n   ${r.problems.join("\n   ")}`); }
  else console.log(`✅ ${r.key}${tag}  pasos=${r.steps}`);
}
await browser.close();
console.log(`\n${bad ? `❌ ${bad} lección(es) con problemas` : "✅ Todas se resuelven bien"} de ${targets.length} · ${Math.round((Date.now() - t0) / 1000)} s`);
process.exit(bad ? 1 : 0);
