"use client";

import type { Lesson, Unit } from "@/lib/curriculum";
import { splitArticle, pluralFromNote } from "@/lib/vocab";
import { speak } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { GENDER_ES, WordText } from "./WordText";

/** «Lo que aprendiste»: meta, palabras con su artículo y ejemplo, reglas y frases del texto. */
export function LessonRecap({ unit, lesson }: { unit: Unit; lesson: Lesson }) {
  const { voice } = useProgress();
  const say = (t: string) => void speak(t, { voice }).catch(() => {});
  const lines = lesson.dialogue?.lines ?? [];
  return (
    <div className="stack recap" style={{ textAlign: "left" }}>
      <div className="prompt-label" style={{ marginBottom: 0 }}>{unit.title} · {lesson.title}</div>
      <div className="h1" style={{ margin: 0 }}>📘 Lo que aprendiste</div>
      <div className="card">Aprendiste a: <b>{lesson.goal}</b></div>
      {lesson.intro?.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
      {lesson.summary && lesson.summary.length > 0 && (
        <ul className="recap-list">{lesson.summary.map((x) => <li key={x}>{x}</li>)}</ul>
      )}

      {lesson.vocab.length > 0 && (
        <section className="stack" style={{ gap: 8 }}>
          <div className="h2" style={{ margin: 0 }}>Palabras y frases ({lesson.vocab.length})</div>
          {lesson.vocab.map((v) => {
            const { art } = splitArticle(v.de);
            const plural = pluralFromNote(v.note);
            return (
              <div key={v.de} className="card recap-word">
                <div className="row" style={{ gap: 10 }}>
                  <span className="recap-emoji">{v.emoji ?? "•"}</span>
                  <div style={{ flex: 1 }}>
                    <div className="recap-de"><b><WordText de={v.de} /></b></div>
                    <div className="muted">{v.es}</div>
                    {art && <div className="small muted">{art} = {GENDER_ES[art]}{plural ? ` · plural: ${plural}` : ""}</div>}
                  </div>
                  <button className="btn btn-round" aria-label={`Escuchar ${v.de}`} onClick={() => say(v.de)}>🔊</button>
                </div>
                {v.example && (
                  <div className="small recap-ex">
                    <span lang="de">{v.example.de}</span> <span className="muted">— {v.example.es}</span>{" "}
                    <button className="linklike" aria-label="Escuchar el ejemplo" onClick={() => say(v.example!.de)}>🔊</button>
                  </div>
                )}
                {v.note && <div className="small muted" style={{ marginTop: 4 }}>💡 {v.note}</div>}
              </div>
            );
          })}
        </section>
      )}

      {lesson.grammar && lesson.grammar.length > 0 && (
        <section className="stack" style={{ gap: 8 }}>
          <div className="h2" style={{ margin: 0 }}>Gramática</div>
          {lesson.grammar.map((r) => (
            <div key={r.title} className="card stack" style={{ gap: 8 }}>
              <b>{r.title}</b>
              {r.body.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
              {r.table && (
                <div className="table-wrap">
                  <table className="gtable">
                    <thead><tr>{r.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{r.table.rows.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {r.examples?.map((e) => (
                <div key={e.de} className="small"><span lang="de"><b>{e.de}</b></span> <span className="muted">— {e.es}</span></div>
              ))}
            </div>
          ))}
        </section>
      )}

      {lines.length > 0 && (
        <section className="stack" style={{ gap: 6 }}>
          <div className="h2" style={{ margin: 0 }}>El diálogo: «{lesson.dialogue!.title}»</div>
          {lines.map((l, i) => (
            <div key={i} className="row small" style={{ gap: 8, alignItems: "flex-start" }}>
              <b style={{ minWidth: 64 }}>{l.name}</b>
              <div style={{ flex: 1 }}><span lang="de">{l.de}</span><div className="muted">{l.es}</div></div>
              <button className="linklike" aria-label="Escuchar la línea" onClick={() => say(l.de)}>🔊</button>
            </div>
          ))}
        </section>
      )}

      {lesson.reading && (
        <section className="stack" style={{ gap: 6 }}>
          <div className="h2" style={{ margin: 0 }}>El texto: «{lesson.reading.title}»</div>
          {lesson.reading.text.map((t, i) => (
            <div key={i} className="small"><span lang="de">{t}</span><div className="muted">{lesson.reading!.translation[i]}</div></div>
          ))}
        </section>
      )}
    </div>
  );
}
