// Prueba de humo de la interfaz: abre cada pantalla en un Chromium real y recorre los flujos nuevos.
// Uso:  npm run build && npx next start -p 3100   y en otra terminal:   npm run smoke -- --url http://localhost:3100
// Requiere Playwright (npm i -D playwright; npx playwright install chromium). Sin claves: la IA se simula.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require("playwright"); } catch { /* sigue */ }
  try { return require(require.resolve("playwright", { paths: [execSync("npm root -g", { encoding: "utf8" }).trim()] })); } catch { /* sigue */ }
  console.error("Falta Playwright. Instalalo con:  npm i -D playwright  y después  npx playwright install chromium");
  process.exit(2);
}

const i = process.argv.indexOf("--url");
const URL = i > 0 ? process.argv[i + 1] : "http://localhost:3100";
const { chromium } = loadPlaywright();

const failures = [];
// isVisible() no espera: se espera a que aparezca (hasta 5 s).
const visible = (loc) => loc.waitFor({ state: "visible", timeout: 5000 }).then(() => true, () => false);
const check = (ok, msg) => { console.log(`${ok ? "✔" : "✘"} ${msg}`); if (!ok) failures.push(msg); };

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 400, height: 800 } })).newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));

// 1) Todas las pantallas responden.
for (const p of ["/", "/review", "/library", "/words", "/exam", "/mixed", "/glosario", "/perfil", "/nivel", "/schreiben", "/sprechen", "/hoeren"]) {
  const r = await page.goto(URL + p, { waitUntil: "networkidle" });
  check(r?.status() === 200, `${p} responde 200`);
}

// 2) Test de nivel: se puede recorrer hasta el resultado.
await page.goto(URL + "/nivel", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Empezar" }).click();
let done = false;
for (let n = 0; n < 40 && !done; n++) {
  await page.locator("main button.card").first().click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  done = (await page.getByText("Tu nivel").count()) > 0;
}
check(done, "el test de nivel llega al resultado");

// 3) Escritura con rúbrica (la IA se simula): se ve el puntaje.
await page.route("**/api/rubric", (r) => r.fulfill({ json: {
  task: { score: 4, comment: "ok" }, structure: { score: 3, comment: "ok" }, vocab: { score: 3, comment: "ok" }, grammar: { score: 2, comment: "ok" },
  coveredPoints: [], missingPoints: [], errors: [], corrected: "Hallo.", feedback: "Bien.", _usage: { input: 1, output: 1, model: "claude-haiku-5-5" },
} }));
await page.goto(URL + "/schreiben", { waitUntil: "networkidle" });
await page.getByText("Presentarte").click();
await page.fill("textarea", "Ich heiße Anna und ich komme aus Argentinien. Ich wohne in Buenos Aires und ich bin zwanzig Jahre alt. Ich spiele gern Fußball.");
await page.getByRole("button", { name: "Corregir" }).click();
check(await visible(page.getByText("Resultado: 12/20")), "la escritura muestra 12/20 con la rúbrica simulada");

// 4) Oral sin micrófono: avisa en vez de romperse.
await page.goto(URL + "/sprechen", { waitUntil: "networkidle" });
await page.getByText("Presentarte").click();
await page.click("[aria-label=Grabar]");
check(await visible(page.locator(".notice").first()), "sin micrófono, /sprechen muestra un aviso");

// 5) Escucha libre: abre una pieza con varias voces y preguntas.
await page.goto(URL + "/hoeren", { waitUntil: "networkidle" });
await page.getByText("Cena en el departamento compartido").click();
await page.getByRole("button", { name: "Entendido" }).click();
await page.waitForTimeout(500);
check(await visible(page.getByRole("button", { name: "Jonas" }).or(page.getByRole("button", { name: "Lena" })).first()), "la escucha de tres voces muestra preguntas");

// 6) Biblioteca: abre un texto y muestra opciones.
await page.goto(URL + "/library", { waitUntil: "networkidle" });
await page.getByText("Reparieren statt wegwerfen").click();
await page.getByRole("button", { name: "Entendido" }).click();
check(await visible(page.locator("button.option").first()), "la biblioteca abre un texto con preguntas");

// 7) «No me acuerdo»: en una lección con escritura se puede ver la respuesta sin corrección.
await page.goto(URL + "/lesson/hallo/gruesse", { waitUntil: "networkidle" });
let gaveUp = false;
for (let n = 0; n < 80 && !gaveUp; n++) {
  if (await page.getByText("No me acuerdo").count()) {
    await page.getByText("No me acuerdo").click();
    gaveUp = await visible(page.getByText(/Así se (escribe|dice|arma)/));
    break;
  }
  const next = page.getByRole("button", { name: /continuar|entendido|siguiente|empezar|ver el texto/i }).first();
  if (await next.count()) await next.click().catch(() => {});
  else if (await page.locator("button.option").count()) await page.locator("button.option").first().click().catch(() => {});
  await page.waitForTimeout(120);
}
check(gaveUp, "«No me acuerdo» muestra la respuesta correcta");

// 8) Inicio: la sección Practicar está.
await page.goto(URL + "/", { waitUntil: "networkidle" });
check(await visible(page.getByText("Escribir").first()), "el inicio muestra los atajos de práctica");

check(pageErrors.length === 0, `sin errores de JavaScript (${pageErrors.length})`);
await browser.close();
if (failures.length) { console.error(`\n${failures.length} fallo(s).`); process.exit(1); }
console.log("\nTodo en orden.");
