"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EXAMS, type Exam } from "@/lib/content/exams";
import { ExamRunner } from "@/components/ExamRunner";
import { loadExamHistory, type ExamRecord } from "@/lib/examhistory";

export default function ExamPage() {
  const [current, setCurrent] = useState<Exam | null>(null);
  const [history, setHistory] = useState<ExamRecord[]>([]);
  useEffect(() => { if (!current) setHistory(loadExamHistory()); }, [current]);

  if (current) return <ExamRunner exam={current} onExit={() => setCurrent(null)} />;

  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="h1">📝 Simulacros</div>
      <p className="muted">
        Pruebas con el formato de un examen de nivel B2: comprensión lectora, auditiva y expresión escrita. No hay ayudas ni corrección hasta el final, y cada audio se escucha dos veces. Sirven para ver dónde estás; no son materiales oficiales.
      </p>
      {EXAMS.map((e) => (
        <button key={e.id} className="card row" style={{ textAlign: "left" }} onClick={() => setCurrent(e)}>
          <span style={{ fontSize: 28 }}>📝</span>
          <span style={{ flex: 1 }}>
            <b>{e.title}</b>
            <span className="small muted" style={{ display: "block" }}>{e.lesen.reduce((a, t) => a + t.questions.length, 0)} preguntas de lectura · {e.hoeren.reduce((a, t) => a + t.questions.length, 0)} de escucha · 1 texto · unos 45 min</span>
          </span>
          <span>›</span>
        </button>
      ))}
      {history.length > 0 && (
        <section className="stack">
          <div className="h2">Tus resultados</div>
          {history.map((r) => (
            <div key={r.at} className="card" style={{ textAlign: "left" }}>
              <b>{r.title}</b> · {r.total} % <span className="small muted">({new Date(r.at).toLocaleDateString("es-AR")})</span>
              <div className="small muted">Lectura {r.lesen} % · Escucha {r.hoeren} % · Escritura {r.schreiben === null ? "–" : `${r.schreiben} %`}</div>
            </div>
          ))}
        </section>
      )}
      <Link href="/review" className="btn btn-block">Volver al repaso</Link>
    </main>
  );
}
