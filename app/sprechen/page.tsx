"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SPEAKING, type SpeakingTask } from "@/lib/content/speaking";
import { WRITING_CRITERIA } from "@/lib/content/writing";
import type { RubricResult } from "@/app/api/rubric/route";
import { callAi } from "@/lib/ai";
import { addXp } from "@/lib/progress";
import { assessSpeech, MicError, prewarmSpeech, SpeechNotConfigured, type SpeechResult } from "@/lib/speech";
import { PronunciationReport } from "@/components/PronunciationReport";
import { loadWriting, saveWriting, type WritingRecord } from "@/lib/writinghistory";

export default function SprechenPage() {
  const [task, setTask] = useState<SpeakingTask | null>(null);
  const [phase, setPhase] = useState<"idle" | "listening" | "processing" | "grading">("idle");
  const [level, setLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [speech, setSpeech] = useState<SpeechResult | null>(null);
  const [rubric, setRubric] = useState<RubricResult | null>(null);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [hist, setHist] = useState<WritingRecord[]>([]);
  const finishRef = useRef<(() => void) | null>(null);
  useEffect(() => prewarmSpeech(), []);
  useEffect(() => { if (!task) setHist(loadWriting()); }, [task]);
  useEffect(() => {
    if (phase !== "listening") return;
    const t0 = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 500);
    return () => clearInterval(id);
  }, [phase]);

  const back = () => { setTask(null); setSpeech(null); setRubric(null); setError(""); setPhase("idle"); };

  const record = async (t: SpeakingTask) => {
    setPhase("listening"); setError(""); setElapsed(0);
    let s: SpeechResult;
    try {
      s = await assessSpeech(t.maxSeconds, { onLevel: setLevel, onProcessing: () => setPhase("processing"), registerFinish: (f) => { finishRef.current = f; } });
    } catch (e) {
      if (e instanceof SpeechNotConfigured) setNotConfigured(true);
      else setError(e instanceof MicError ? e.message : (e as Error).message || "No pude usar el micrófono.");
      setPhase("idle"); setLevel(0); finishRef.current = null;
      return;
    }
    setSpeech(s); setLevel(0); finishRef.current = null; setPhase("grading");
    try {
      const r = await callAi<RubricResult>("/api/rubric", { prompt: t.prompt, genre: t.genre, register: t.register, points: t.points, minWords: t.minSeconds, maxWords: t.maxSeconds, answer: s.transcript, level: t.level, spoken: true, seconds: s.seconds }, "correct");
      setRubric(r);
      const scores = { task: r.task.score, structure: r.structure.score, vocab: r.vocab.score, grammar: r.grammar.score };
      const total = scores.task + scores.structure + scores.vocab + scores.grammar;
      saveWriting({ id: t.id, at: Date.now(), total, scores });
      addXp(10 + Math.round(total / 2));
    } catch (e) { setError(`No pude puntuar el contenido (${e instanceof Error ? e.message : "error"}). Igual tenés las medidas de la voz.`); }
    setPhase("idle");
  };

  if (!task) {
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">🗣️ Expresión oral</div>
        <p className="muted">Monólogos de medio minuto a dos minutos. Grabás, se transcribe y se mide fluidez y pronunciación (Azure); después se puntúa el contenido con la misma rúbrica de escritura (IA).</p>
        {(["A1", "A2", "B1", "B2", "C1"] as const).map((lv) => (
          <section key={lv} className="stack">
            <div className="h2">Nivel {lv}</div>
            {SPEAKING.filter((t) => t.level === lv).map((t) => {
              const last = hist.find((h) => h.id === t.id);
              return (
                <button key={t.id} className="card row" style={{ textAlign: "left" }} onClick={() => setTask(t)}>
                  <span style={{ fontSize: 28 }}>{t.emoji}</span>
                  <span style={{ flex: 1 }}>
                    <b>{t.title}</b>
                    <span className="small muted" style={{ display: "block" }}>{t.genre} · {t.minSeconds}–{t.maxSeconds} s{last ? ` · último: ${last.total}/20` : ""}</span>
                  </span>
                  <span>›</span>
                </button>
              );
            })}
          </section>
        ))}
        <Link href="/review" className="btn btn-block">Volver al repaso</Link>
      </main>
    );
  }

  if (speech && phase !== "listening") {
    const total = rubric ? rubric.task.score + rubric.structure.score + rubric.vocab.score + rubric.grammar.score : null;
    const pace = speech.wordsPerMinute;
    const paceMsg = pace < 70 ? "Ritmo lento: probá encadenar más las ideas." : pace > 170 ? "Ritmo muy rápido: cuidá la claridad." : "Ritmo natural.";
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">{total === null ? "Tu grabación" : `Resultado: ${total}/20`}</div>
        <div className="card stack" style={{ gap: 6 }}>
          <div className="scores">
            <div className="score"><b>{speech.fluency}</b><span className="small">Fluidez</span></div>
            <div className="score"><b>{speech.accuracy}</b><span className="small">Precisión</span></div>
            <div className="score"><b>{speech.wordsPerMinute}</b><span className="small">palabras/min</span></div>
            <div className="score"><b>{speech.seconds}</b><span className="small">segundos</span></div>
          </div>
          <div className="small muted">{paceMsg} {speech.seconds < task.minSeconds ? `Hablaste menos de los ${task.minSeconds} s pedidos.` : ""}</div>
        </div>
        {phase === "grading" && <div className="card"><span className="spinner" /> Puntuando el contenido…</div>}
        {rubric && (
          <>
            <div className="card stack" style={{ gap: 8 }}>
              {WRITING_CRITERIA.map((c) => <div key={c.id}><b>{c.name}: {rubric[c.id].score}/5</b><div className="small muted">{rubric[c.id].comment}</div></div>)}
            </div>
            {rubric.missingPoints.length > 0 && <div className="card small">💡 Faltó cubrir: {rubric.missingPoints.join(" · ")}.</div>}
            <div className="card stack" style={{ gap: 6, textAlign: "left" }}>
              <b>Tu texto, corregido</b>
              <div lang="de">{rubric.corrected}</div>
              {rubric.errors.map((e, i) => <div key={i} className="small"><s>{e.fragment}</s> → <b>{e.fix}</b>. {e.explanation}</div>)}
              <div className="small muted">{rubric.feedback}</div>
            </div>
          </>
        )}
        {error && <div className="small" style={{ color: "var(--bad, #c0392b)" }}>⚠️ {error}</div>}
        <PronunciationReport compact result={{ recognized: speech.transcript, pronScore: speech.pronScore, accuracy: speech.accuracy, fluency: speech.fluency, completeness: 100, words: speech.words, audio: speech.audio }} />
        {phase === "idle" && <button className="btn btn-primary btn-block" onClick={back}>Volver a las consignas</button>}
        {phase === "idle" && <button className="btn btn-block" onClick={() => { setSpeech(null); setRubric(null); setError(""); }}>Grabar de nuevo</button>}
      </main>
    );
  }

  return (
    <main className="container stack center" style={{ paddingTop: 20 }}>
      <div className="h2">{task.emoji} {task.title} · {task.level}</div>
      <div className="card stack" style={{ gap: 6, textAlign: "left" }}>
        <div>{task.prompt}</div>
        <div className="small muted">{task.genre} · registro: {task.register === "Sie" ? "formal (Sie)" : task.register === "du" ? "informal (du)" : "neutro"} · {task.minSeconds}–{task.maxSeconds} segundos</div>
        <div className="small"><b>Tenés que cubrir:</b> {task.points.join(" · ")}</div>
        <div className="small muted">💡 {task.tip}</div>
      </div>
      {notConfigured ? (
        <div className="notice" style={{ textAlign: "left" }}>La expresión oral necesita Azure Speech: configurá <code>AZURE_SPEECH_KEY</code> y <code>AZURE_SPEECH_REGION</code>.</div>
      ) : (
        <>
          <div>
            <button
              className={`btn btn-round btn-mic ${phase === "listening" ? "recording" : ""}`}
              style={phase === "listening" ? { boxShadow: `0 0 0 ${6 + level * 26}px rgba(214,69,61,0.28)` } : undefined}
              onClick={() => (phase === "listening" ? finishRef.current?.() : void record(task))}
              disabled={phase === "processing"}
              aria-label={phase === "listening" ? "Terminé" : "Grabar"}
            >
              {phase === "processing" ? <span className="spinner" /> : phase === "listening" ? "✓" : "🎤"}
            </button>
          </div>
          <div className="muted small">
            {phase === "listening" ? `Grabando… ${elapsed} s (máx. ${task.maxSeconds} s). Tocá ✓ cuando termines.` : phase === "processing" ? "Analizando tu voz…" : "Pensá 20 segundos, tocá el micrófono y hablá. Se corta solo con un silencio largo."}
          </div>
        </>
      )}
      {error && <div className="notice" style={{ textAlign: "left" }}>{error}</div>}
      {phase === "idle" && <button className="btn btn-block" onClick={back}>Volver</button>}
    </main>
  );
}
