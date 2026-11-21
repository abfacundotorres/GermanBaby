"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PLACEMENT, PLACEMENT_PASS, levelSettled, placementResult, type PlacementLevel } from "@/lib/content/placement";
import { UNITS, lessonKey } from "@/lib/curriculum";
import { skipBefore, undoSkip, useProgress } from "@/lib/progress";
import { speak, stopSpeaking } from "@/lib/speech";

const LEVELS: PlacementLevel[] = ["A1", "A2", "B1", "B2", "C1"];

function shuffled<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

export default function NivelPage() {
  const [step, setStep] = useState<"intro" | "test" | "done">("intro");
  const [i, setI] = useState(0);
  const [tally, setTally] = useState<Partial<Record<PlacementLevel, { c: number; w: number }>>>({});
  const scores = Object.fromEntries(Object.entries(tally).map(([lv, t]) => [lv, t.c])) as Partial<Record<PlacementLevel, number>>;
  const [picked, setPicked] = useState<string | null>(null);
  const [skipped, setSkipped] = useState<string[] | null>(null);

  const prog = useProgress();
  const [listenTally, setListenTally] = useState({ c: 0, w: 0 });
  const [plays, setPlays] = useState(0);
  const q = PLACEMENT[i];
  const options = useMemo(() => (q ? shuffled(q.options) : []), [q]);

  // Las preguntas de escucha suenan solas al aparecer (y se pueden repetir hasta 3 veces).
  const playQ = () => {
    if (!q?.listen) return;
    setPlays((n) => n + 1);
    stopSpeaking();
    void speak(q.listen, { voice: prog.voice }).catch(() => {});
  };
  useEffect(() => {
    setPlays(0);
    if (step === "test" && q?.listen) {
      const t = setTimeout(() => { setPlays(1); stopSpeaking(); void speak(q.listen!, { voice: prog.voice }).catch(() => {}); }, 400);
      return () => { clearTimeout(t); stopSpeaking(); };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, step]);

  function answer(o: string) {
    if (picked) return;
    setPicked(o);
  }
  function next(skipped = false) {
    const right = !skipped && picked === q.options[0];
    if (q.listen && !skipped) setListenTally((l) => ({ c: l.c + (right ? 1 : 0), w: l.w + (right ? 0 : 1) }));
    const cur = tally[q.level] ?? { c: 0, w: 0 };
    const t = skipped ? cur : { c: cur.c + (right ? 1 : 0), w: cur.w + (right ? 0 : 1) };
    setTally({ ...tally, [q.level]: t });
    setPicked(null);
    // Un nivel se cierra apenas queda aprobado o ya no se puede aprobar; si no se aprobó, la prueba termina.
    let j = i + 1;
    if (levelSettled(t.c, t.w)) while (j < PLACEMENT.length && PLACEMENT[j].level === q.level) j++;
    const nextQ = PLACEMENT[j];
    const levelOver = !nextQ || nextQ.level !== q.level;
    if (!nextQ || (levelOver && t.c < PLACEMENT_PASS)) { setStep("done"); return; }
    setI(j);
  }

  if (step === "intro") {
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">🎯 Test de nivel</div>
        <p className="muted">
          Hasta 75 preguntas de gramática, vocabulario y escucha (con sonido), de A1 a C1, sin ayudas. Termina sola cuando un nivel te resulta difícil. Al final te sugiero por dónde empezar.
        </p>
        <button className="btn btn-primary btn-block" onClick={() => setStep("test")}>Empezar</button>
        <Link href="/review" className="btn btn-block">Volver</Link>
      </main>
    );
  }

  if (step === "done") {
    const r = placementResult(scores);
    // Primera lección de la primera unidad del nivel siguiente al aprobado (o de A1 si no aprobó nada).
    const passedA1 = (scores.A1 ?? 0) >= PLACEMENT_PASS;
    const startLevel: PlacementLevel = !passedA1 ? "A1" : r.partial ? LEVELS[LEVELS.indexOf(r.level) + 1] : "C1";
    const unit = UNITS.find((u) => (u.level ?? "A1") === startLevel);
    const key = unit ? lessonKey(unit.id, unit.lessons[0].id) : null;
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">Tu nivel: {passedA1 ? r.level : "A1 (inicio)"}</div>
        <div className="card stack">
          {LEVELS.filter((lv) => scores[lv] !== undefined).map((lv) => (
            <div key={lv}>{lv}: <b>{tally[lv]!.c} de {tally[lv]!.c + tally[lv]!.w}</b> {(scores[lv] ?? 0) >= PLACEMENT_PASS ? "✅" : "· para reforzar"}</div>
          ))}
        </div>
        <p className="muted">
          {listenTally.c + listenTally.w >= 3 && listenTally.c / (listenTally.c + listenTally.w) < 0.5 && " Tu comprensión oral salió más baja que tu gramática: practicá con la escucha libre."}
          {r.partial ? `Te recomiendo empezar por ${startLevel}.` : "Aprobaste todos los niveles hasta C1: pasá a los simulacros de C1 y a la práctica libre."}
          {" "}Es una estimación de gramática y vocabulario: no mide comprensión oral ni expresión.
        </p>
        {key && skipped === null && startLevel !== "A1" && (
          <button className="btn btn-primary btn-block" onClick={() => { if (confirm(`Esto marca como hechas las lecciones anteriores a ${startLevel}. ¿Seguro?`)) setSkipped(skipBefore(key)); }}>
            Empezar desde {startLevel} (marca lo anterior como hecho)
          </button>
        )}
        {skipped !== null && (
          <div className="card stack">
            <div>Listo: {skipped.length} lecciones marcadas. Volvé a «Aprender».</div>
            {skipped.length > 0 && <button className="btn" onClick={() => { undoSkip(skipped); setSkipped(null); }}>Deshacer</button>}
          </div>
        )}
        <Link href="/" className="btn btn-block">Ir a Aprender</Link>
      </main>
    );
  }

  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="small muted">Nivel {q.level} · pregunta {i + 1} de {PLACEMENT.length}</div>
      <div className="h2">{q.q}</div>
      {q.listen && (
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-round btn-primary" style={{ width: 64, height: 64, fontSize: 26 }} disabled={plays >= 3 || !!picked} onClick={playQ} aria-label="Escuchar la frase">🔊</button>
          <span className="small muted">{plays >= 3 ? "Ya no quedan escuchas." : `Podés escucharla ${3 - plays} ${3 - plays === 1 ? "vez" : "veces"} más.`}</span>
        </div>
      )}
      <div className="stack">
        {options.map((o) => {
          const right = o === q.options[0];
          const style = picked ? (right ? { outline: "2px solid var(--green, #2e9e4f)" } : o === picked ? { outline: "2px solid var(--red, #d33)" } : {}) : {};
          return <button key={o} className="card" style={{ textAlign: "left", ...style }} onClick={() => answer(o)}>{o}</button>;
        })}
      </div>
      {q.listen && !picked && <button className="btn btn-block" onClick={() => next(true)}>No puedo escuchar: saltear esta pregunta</button>}
      {picked && (
        <>
          <p className="muted small">{picked === q.options[0] ? "✅ " : "❌ "}{q.why}</p>
          <button className="btn btn-primary btn-block" onClick={() => next()}>Siguiente</button>
        </>
      )}
    </main>
  );
}
