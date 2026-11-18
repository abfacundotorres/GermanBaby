"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WRITING, WRITING_CRITERIA, type WritingTask } from "@/lib/content/writing";
import type { RubricResult } from "@/app/api/rubric/route";
import { callAi } from "@/lib/ai";
import { addXp } from "@/lib/progress";
import { loadWriting, saveWriting, type WritingRecord } from "@/lib/writinghistory";

const wordCount = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

export default function SchreibenPage() {
  const [task, setTask] = useState<WritingTask | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<RubricResult | null>(null);
  const [err, setErr] = useState("");
  const [hist, setHist] = useState<WritingRecord[]>([]);
  useEffect(() => { if (!task) setHist(loadWriting()); }, [task]);

  const back = () => { setTask(null); setText(""); setRes(null); setErr(""); };

  if (!task) {
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">✍️ Escritura con rúbrica</div>
        <p className="muted">Consignas por nivel con puntos de contenido, registro y largo. La corrección puntúa cuatro criterios de 0 a 5 y usa IA.</p>
        {(["A1", "A2", "B1", "B2"] as const).map((lv) => (
          <section key={lv} className="stack">
            <div className="h2">Nivel {lv}</div>
            {WRITING.filter((t) => t.level === lv).map((t) => {
              const last = hist.find((h) => h.id === t.id);
              return (
                <button key={t.id} className="card row" style={{ textAlign: "left" }} onClick={() => setTask(t)}>
                  <span style={{ fontSize: 28 }}>{t.emoji}</span>
                  <span style={{ flex: 1 }}>
                    <b>{t.title}</b>
                    <span className="small muted" style={{ display: "block" }}>{t.genre} · {t.minWords}–{t.maxWords} palabras{last ? ` · último: ${last.total}/20` : ""}</span>
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

  const n = wordCount(text);
  const submit = async () => {
    setBusy(true); setErr("");
    try {
      const r = await callAi<RubricResult>("/api/rubric", { prompt: task.prompt, genre: task.genre, register: task.register, points: task.points, minWords: task.minWords, maxWords: task.maxWords, answer: text.trim(), level: task.level }, "correct");
      setRes(r);
      const scores = { task: r.task.score, structure: r.structure.score, vocab: r.vocab.score, grammar: r.grammar.score };
      const total = scores.task + scores.structure + scores.vocab + scores.grammar;
      saveWriting({ id: task.id, at: Date.now(), total, scores });
      addXp(10 + Math.round(total / 2));
    } catch (e) { setErr(e instanceof Error ? e.message : "No pude corregir el texto."); }
    setBusy(false);
  };

  if (busy) return <main className="container center stack" style={{ paddingTop: 40 }}><div className="mascot">🫏</div><div className="h2"><span className="spinner" /> Corrigiendo tu texto…</div></main>;

  if (res) {
    const total = res.task.score + res.structure.score + res.vocab.score + res.grammar.score;
    return (
      <main className="container stack" style={{ paddingTop: 20 }}>
        <div className="h1">Resultado: {total}/20</div>
        <div className="card stack" style={{ gap: 8 }}>
          {WRITING_CRITERIA.map((c) => {
            const r = res[c.id];
            return <div key={c.id}><b>{c.name}: {r.score}/5</b><div className="small muted">{r.comment}</div></div>;
          })}
        </div>
        {res.missingPoints.length > 0 && <div className="card small">💡 Faltó cubrir: {res.missingPoints.join(" · ")}.</div>}
        <div className="card stack" style={{ gap: 6, textAlign: "left" }}>
          <b>Tu texto, corregido</b>
          <div lang="de">{res.corrected}</div>
          {res.errors.map((e, i) => <div key={i} className="small"><s>{e.fragment}</s> → <b>{e.fix}</b>. {e.explanation}</div>)}
          <div className="small muted">{res.feedback}</div>
        </div>
        <button className="btn btn-primary btn-block" onClick={back}>Volver a las consignas</button>
        <button className="btn btn-block" onClick={() => { setRes(null); }}>Reescribir y corregir de nuevo</button>
      </main>
    );
  }

  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="h2">{task.emoji} {task.title} · {task.level}</div>
      <div className="card stack" style={{ gap: 6, textAlign: "left" }}>
        <div>{task.prompt}</div>
        <div className="small muted">{task.genre} · registro: {task.register === "Sie" ? "formal (Sie)" : task.register === "du" ? "informal (du)" : "neutro"} · {task.minWords}–{task.maxWords} palabras</div>
        <div className="small"><b>Tenés que cubrir:</b> {task.points.join(" · ")}</div>
        <div className="small muted">💡 {task.tip}</div>
      </div>
      <textarea className="input" style={{ minHeight: 220, resize: "vertical", fontFamily: "inherit" }} value={text} placeholder="Escribí en alemán…" autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setText(e.target.value)} />
      <div className="umlauts">{["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((ch) => <button key={ch} type="button" onClick={() => setText(text + ch)}>{ch}</button>)}</div>
      <div className="small muted">{n} palabras (pedidas: {task.minWords}–{task.maxWords})</div>
      {err && <div className="small" style={{ color: "var(--bad, #c0392b)" }}>⚠️ {err}</div>}
      <button className="btn btn-primary btn-block" disabled={n < Math.ceil(task.minWords / 2)} onClick={() => void submit()}>Corregir</button>
      <button className="btn btn-block" onClick={back}>Volver</button>
    </main>
  );
}
