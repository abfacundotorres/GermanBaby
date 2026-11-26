// Tiempo estimado de primera pasada por nivel (no hay telemetría: son supuestos de segundos por tipo de ejercicio).
// Uso: npm run report:time
import { UNITS } from "../lib/curriculum.ts";
import { buildLessonSession } from "../lib/session.ts";
import { LIBRARY } from "../lib/content/library.ts";

const SEC = { explain: 60, intro: 12, choice: 12, section: 3, write: 30, listen: 12, dictation: 40, speak: 20, build: 25, listenq: 25, cloze: 15, free: 120, quiz: 15, pair: 30, rule: 45, readq: 30 };
const READ_WPM = { A1: 60, A2: 60, B1: 90, B2: 90, C1: 90 };
const words = (a) => a.join(" ").split(/\s+/).length;
const R = {};
for (const u of UNITS) {
  const lv = u.level ?? "A1";
  for (const l of u.lessons) {
    const steps = buildLessonSession(l, u.lessons.flatMap((x) => x.vocab));
    let t = steps.reduce((a, s) => a + (SEC[s.kind] ?? 15), 0);
    if (l.reading) t += (words(l.reading.text) / READ_WPM[lv]) * 60;
    if (l.dialogue) t += l.dialogue.lines.length * 6;
    const r = (R[lv] ??= { core: [], bonus: [], lib: 0, libN: 0 });
    (l.bonus ? r.bonus : r.core).push(t / 60);
  }
}
for (const t of LIBRARY) { const r = R[t.level]; r.libN++; r.lib += words(t.reading.text) / READ_WPM[t.level] + t.reading.questions.length * 0.4; }
const sum = (a) => a.reduce((x, y) => x + y, 0);
const h = (m) => (m / 60).toFixed(1).padStart(5);
console.log("Nivel  base(n)  min/lec  horas | bonus(n)  min/lec  horas | biblioteca(n)  horas | TOTAL h");
let all = 0;
for (const lv of ["A1", "A2", "B1", "B2", "C1"]) {
  const r = R[lv]; const tot = sum(r.core) + sum(r.bonus) + r.lib; all += tot;
  console.log(`${lv}     ${String(r.core.length).padStart(6)}  ${(sum(r.core) / r.core.length).toFixed(1).padStart(7)}  ${h(sum(r.core))} | ${String(r.bonus.length).padStart(7)}  ${(sum(r.bonus) / (r.bonus.length || 1)).toFixed(1).padStart(7)}  ${h(sum(r.bonus))} | ${String(r.libN).padStart(13)}  ${h(r.lib)} | ${h(tot)}`);
}
console.log(`Total: ${(all / 60).toFixed(1)} h`);
