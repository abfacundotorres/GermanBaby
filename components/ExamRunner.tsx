"use client";

import { useEffect, useRef, useState } from "react";
import type { Exam } from "@/lib/content/exams";
import type { ListenQuestion } from "@/lib/curriculum";
import { matchFill } from "@/lib/text";
import { speakDialogue, stopSpeaking } from "@/lib/speech";
import { callAi } from "@/lib/ai";
import { checkFree, countSentences } from "@/lib/freecheck";
import { addXp } from "@/lib/progress";
import { examVerdict, saveExamRecord } from "@/lib/examhistory";
import type { FreeResult } from "@/app/api/free/route";

type Phase = "lesen" | "hoeren" | "schreiben" | "grading" | "result";
type Item = { key: string; q: ListenQuestion; part: string };

const MAX_PLAYS = 2;

function isRight(q: ListenQuestion, a: string | undefined) {
  if (a === undefined || a === "") return false;
  if (q.type === "choice") return a === q.answer;
  if (q.type === "tf") return a === String(q.answer);
  return matchFill(a, q.answers);
}
const correctText = (q: ListenQuestion) => (q.type === "choice" ? q.answer : q.type === "tf" ? (q.answer ? "Verdadero" : "Falso") : q.answers[0]);
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

function Question({ item, n, value, onChange }: { item: Item; n: number; value?: string; onChange: (v: string) => void }) {
  const { q } = item;
  const pick = (v: string, label: string) => (
    <button key={v} type="button" className={`btn ${value === v ? "btn-primary" : ""}`} style={{ textAlign: "left" }} onClick={() => onChange(v)}>{label}</button>
  );
  return (
    <div className="card stack" style={{ gap: 8, textAlign: "left" }}>
      <div><b>{n}.</b> {q.q}</div>
      {q.type === "choice" && <div className="stack" style={{ gap: 6 }}>{[...q.options].sort().map((o) => pick(o, o))}</div>}
      {q.type === "tf" && <div className="row" style={{ gap: 8 }}>{pick("true", "Verdadero")}{pick("false", "Falso")}</div>}
      {q.type === "fill" && <input className="input" inputMode="text" autoComplete="off" value={value ?? ""} placeholder="Tu respuesta" onChange={(e) => onChange(e.target.value)} />}
    </div>
  );
}

export function ExamRunner({ exam, onExit }: { exam: Exam; onExit: () => void }) {
  const [phase, setPhase] = useState<Phase>("lesen");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [plays, setPlays] = useState<number[]>(() => exam.hoeren.map(() => 0));
  const [playing, setPlaying] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [writing, setWriting] = useState<FreeResult | null>(null);
  const [writingFailed, setWritingFailed] = useState(false);
  const finished = useRef(false);

  const lesen: Item[] = exam.lesen.flatMap((t, ti) => t.questions.map((q, qi) => ({ key: `l${ti}.${qi}`, q, part: t.title })));
  const hoeren: Item[] = exam.hoeren.flatMap((t, ti) => t.questions.map((q, qi) => ({ key: `h${ti}.${qi}`, q, part: t.title })));
  const set = (key: string) => (v: string) => setAnswers((a) => ({ ...a, [key]: v }));

  useEffect(() => () => stopSpeaking(), []);

  const play = async (i: number) => {
    if (playing !== null || plays[i] >= MAX_PLAYS) return;
    setPlays((p) => p.map((x, j) => (j === i ? x + 1 : x)));
    setPlaying(i);
    try {
      await speakDialogue(exam.hoeren[i].lines.map((l) => ({ text: l.de, who: l.who })));
    } catch { /* sin audio: el simulacro sigue, pero esa escucha cuenta como jugada */ }
    setPlaying(null);
  };

  const local = checkFree(text, exam.schreiben.minSentences);
  const enough = countSentences(text) >= exam.schreiben.minSentences;

  const submit = async () => {
    setPhase("grading");
    let w: FreeResult | null = null;
    try {
      w = await callAi<FreeResult>("/api/free", { prompt: exam.schreiben.prompt, focus: exam.schreiben.focus, answer: text.trim(), level: "B2", minSentences: exam.schreiben.minSentences }, "correct");
    } catch { setWritingFailed(true); }
    setWriting(w);
    setPhase("result");
  };

  if (phase === "grading") {
    return <main className="container center stack" style={{ paddingTop: 40 }}><div className="mascot">🫏</div><div className="h2"><span className="spinner" /> Corrigiendo tu texto…</div></main>;
  }

  if (phase === "result") {
    const l = lesen.filter((i) => isRight(i.q, answers[i.key])).length;
    const h = hoeren.filter((i) => isRight(i.q, answers[i.key])).length;
    const lp = pct(l, lesen.length), hp = pct(h, hoeren.length);
    const wp = writing ? (writing.verdict === "correct" && writing.usedFocus ? 100 : writing.verdict === "incorrect" ? 40 : 75) : null;
    const parts = [lp, hp, ...(wp !== null ? [wp] : [])];
    const total = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
    if (!finished.current) {
      finished.current = true;
      saveExamRecord({ id: exam.id, title: exam.title, at: Date.now(), lesen: lp, hoeren: hp, schreiben: wp, total });
      addXp(30);
    }
    const v = examVerdict(total);
    const wrong = [...lesen, ...hoeren].filter((i) => !isRight(i.q, answers[i.key]));
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">Resultado</div>
        <div className="card stack center">
          <div style={{ fontSize: 40, fontWeight: 800 }}>{total} %</div>
          <div className="h2" style={{ margin: 0 }}>{v.title}</div>
          <div className="muted small">{v.detail}</div>
        </div>
        <div className="card stack" style={{ gap: 6 }}>
          <div>📖 Lectura: <b>{lp} %</b> ({l} de {lesen.length})</div>
          <div>🎧 Escucha: <b>{hp} %</b> ({h} de {hoeren.length})</div>
          <div>✍️ Escritura: <b>{wp === null ? "sin corregir" : `${wp} %`}</b></div>
          {writingFailed && <div className="small muted">No pude corregir el texto con IA. El total cuenta solo lectura y escucha.</div>}
          <div className="small muted">Es la prueba de la app, no un puntaje oficial. La referencia de aprobación de los exámenes oficiales es de 60 % por módulo.</div>
        </div>
        {writing && (
          <div className="card stack" style={{ gap: 6, textAlign: "left" }}>
            <b>Tu texto, corregido</b>
            <div lang="de">{writing.corrected}</div>
            {writing.errors.map((e, i) => <div key={i} className="small"><s>{e.fragment}</s> → <b>{e.fix}</b>. {e.explanation}</div>)}
            {!writing.usedFocus && <div className="small">💡 Te faltó usar: {(writing.missingFocus?.length ? writing.missingFocus : exam.schreiben.focus).join(" · ")}.</div>}
            <div className="small muted">{writing.feedback}</div>
          </div>
        )}
        {wrong.length > 0 && (
          <div className="stack">
            <div className="h2">Para repasar ({wrong.length})</div>
            {wrong.map((i) => (
              <div key={i.key} className="card stack" style={{ gap: 4, textAlign: "left" }}>
                <div className="small muted">{i.part}</div>
                <div>{i.q.q}</div>
                <div className="small">Tu respuesta: <b>{answers[i.key] === undefined ? "(en blanco)" : answers[i.key] === "true" ? "Verdadero" : answers[i.key] === "false" ? "Falso" : answers[i.key]}</b> · Correcta: <b>{correctText(i.q)}</b></div>
                {i.q.why && <div className="small muted">{i.q.why}</div>}
              </div>
            ))}
          </div>
        )}
        <button className="btn btn-primary btn-block" onClick={onExit}>Volver</button>
      </main>
    );
  }

  const steps: Phase[] = ["lesen", "hoeren", "schreiben"];
  const label = { lesen: "📖 Lectura", hoeren: "🎧 Escucha", schreiben: "✍️ Escritura" } as const;
  return (
    <main className="container stack" style={{ paddingTop: 16 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <b>{exam.title}</b>
        <button className="btn" onClick={() => { if (confirm("¿Salir del simulacro? Se pierde lo respondido.")) onExit(); }}>✕</button>
      </div>
      <div className="row" style={{ gap: 6 }}>{steps.map((s) => <span key={s} className="chip" style={{ opacity: s === phase ? 1 : 0.5 }}>{label[s as keyof typeof label]}</span>)}</div>

      {phase === "lesen" && (
        <>
          <div className="muted small">Leé los textos y respondé. Sin ayudas ni traducción; las respuestas se corrigen al final.</div>
          {exam.lesen.map((t, ti) => (
            <section key={ti} className="stack">
              <div className="card stack" style={{ gap: 8, textAlign: "left" }}>
                <div className="h2" lang="de" style={{ margin: 0 }}>{t.title}</div>
                {t.text.map((p, i) => <p key={i} lang="de" style={{ margin: 0 }}>{p}</p>)}
              </div>
              {lesen.filter((x) => x.key.startsWith(`l${ti}.`)).map((it) => <Question key={it.key} item={it} n={lesen.indexOf(it) + 1} value={answers[it.key]} onChange={set(it.key)} />)}
            </section>
          ))}
          <button className="btn btn-primary btn-block" onClick={() => { window.scrollTo(0, 0); setPhase("hoeren"); }}>Siguiente: escucha</button>
        </>
      )}

      {phase === "hoeren" && (
        <>
          <div className="muted small">Cada audio se puede escuchar {MAX_PLAYS} veces, como en un examen. Respondé mientras escuchás o después.</div>
          {exam.hoeren.map((t, ti) => (
            <section key={ti} className="stack">
              <div className="card stack center" style={{ gap: 8 }}>
                <div className="h2" style={{ margin: 0 }}>{t.title}</div>
                <div className="small muted">{t.setting}</div>
                <button className="btn btn-primary" disabled={playing !== null || plays[ti] >= MAX_PLAYS} onClick={() => void play(ti)}>
                  {playing === ti ? "🔊 Reproduciendo…" : plays[ti] >= MAX_PLAYS ? "Sin escuchas disponibles" : `▶️ Escuchar (${MAX_PLAYS - plays[ti]} ${MAX_PLAYS - plays[ti] === 1 ? "vez" : "veces"})`}
                </button>
              </div>
              {hoeren.filter((x) => x.key.startsWith(`h${ti}.`)).map((it) => <Question key={it.key} item={it} n={hoeren.indexOf(it) + 1} value={answers[it.key]} onChange={set(it.key)} />)}
            </section>
          ))}
          <button className="btn btn-primary btn-block" disabled={playing !== null} onClick={() => { stopSpeaking(); window.scrollTo(0, 0); setPhase("schreiben"); }}>Siguiente: escritura</button>
        </>
      )}

      {phase === "schreiben" && (
        <>
          <div className="card stack" style={{ gap: 8, textAlign: "left" }}>
            <div className="prompt-label">Escribí en alemán</div>
            <div>{exam.schreiben.prompt}</div>
            <div className="small muted">Mínimo {exam.schreiben.minSentences} frases. Incluí: {exam.schreiben.focus.join(" · ")}.</div>
            {exam.schreiben.hint && <div className="small muted">💡 {exam.schreiben.hint}</div>}
          </div>
          <textarea className="input" style={{ minHeight: 180, resize: "vertical", fontFamily: "inherit" }} value={text} placeholder="Escribí en alemán…" autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setText(e.target.value)} />
          <div className="umlauts">{["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((ch) => <button key={ch} type="button" onClick={() => setText(text + ch)}>{ch}</button>)}</div>
          {enough && local.blockers.map((b) => <div key={b} className="small" style={{ color: "var(--bad, #c0392b)" }}>⚠️ {b}</div>)}
          <button className="btn btn-primary btn-block" disabled={!enough || local.blockers.length > 0} onClick={() => void submit()}>
            {enough ? "Entregar y ver el resultado" : `Faltan frases (${countSentences(text)}/${exam.schreiben.minSentences})`}
          </button>
          <button className="btn btn-block" onClick={() => { setWritingFailed(false); setWriting(null); setPhase("result"); }}>Entregar sin escribir</button>
        </>
      )}
    </main>
  );
}
