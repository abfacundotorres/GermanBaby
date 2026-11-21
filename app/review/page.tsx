"use client";

import { useState } from "react";
import Link from "next/link";
import { buildReviewSession } from "@/lib/session";
import { dueItems, openMistakes, reviewItem, useProgress } from "@/lib/progress";
import { LessonPlayer } from "@/components/LessonPlayer";

export default function ReviewPage() {
  const p = useProgress();
  const [steps, setSteps] = useState<ReturnType<typeof buildReviewSession> | null>(null);
  const due = dueItems(p);
  const mistakes = openMistakes(p).length;

  if (!steps) {
    return (
      <main className="container center stack" style={{ paddingTop: 30 }}>
        <div className="mascot">🔁</div>
        <div className="h1">Repaso espaciado</div>
        <p className="muted">
          Las palabras que sabés bien vuelven cada vez más espaciadas (1, 3, 7, 16 y 35 días). Las que fallás vuelven hoy mismo.
        </p>
        {due.length ? (
          <button className="btn btn-primary btn-block" onClick={() => setSteps(buildReviewSession(due))}>
            Repasar {Math.min(due.length, 12)} palabras
          </button>
        ) : (
          <Link href="/" className="btn btn-block">No hay nada pendiente: volver</Link>
        )}
        <Link href="/nivel" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>🎯 Test de nivel</b>
          <span className="muted small">Hasta 48 preguntas de A1 a B2 para ver por dónde conviene empezar.</span>
        </Link>
        <Link href="/schreiben" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>✍️ Escritura con rúbrica</b>
          <span className="muted small">Consignas de A1 a B2 con puntos a cubrir; puntúa consigna, estructura, vocabulario y gramática.</span>
        </Link>
        <Link href="/sprechen" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>🗣️ Expresión oral</b>
          <span className="muted small">Monólogos de A1 a B2: grabás, medimos fluidez y pronunciación y puntuamos el contenido.</span>
        </Link>
        <Link href="/hoeren" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>🎧 Escucha libre</b>
          <span className="muted small">Monólogos y conversaciones de tres voces, a velocidad lenta, normal o rápida.</span>
        </Link>
        <Link href="/exam" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>📝 Simulacros de examen</b>
          <span className="muted small">Lectura, escucha y escritura con el formato de un examen de A2, B1 o B2, para ver dónde estás.</span>
        </Link>
        <Link href="/library" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>📖 Biblioteca de lecturas</b>
          <span className="muted small">Textos graduados de A2 a B2, con preguntas y traducción.</span>
        </Link>
        <Link href="/words" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>📚 Palabras nuevas</b>
          <span className="muted small">Vocabulario de uso frecuente, de a 10, con ejemplo y repaso espaciado. Sin IA.</span>
        </Link>
        <Link href="/mixed" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>🔀 Repaso mezclado</b>
          <span className="muted small">15 ejercicios al azar de las unidades que ya hiciste. Sin IA.</span>
        </Link>
        <Link href="/practice" className="card stack" style={{ textAlign: "left", textDecoration: "none", color: "inherit" }}>
          <b>🎯 Mis errores{mistakes > 0 ? ` (${mistakes})` : ""}</b>
          <span className="muted small">{mistakes > 0 ? "Practicá lo que fallaste, con ejercicios armados a medida." : "No tenés errores pendientes. Si fallás algo, aparece acá."}</span>
        </Link>
      </main>
    );
  }

  return (
    <LessonPlayer
      steps={steps}
      title="Repaso"
      source="review"
      resumeKey="review"
      onStepResult={(step, ok) => {
        if ("vocab" in step && step.vocab) reviewItem(step.vocab.de, ok);
      }}
      onFinish={() => ({ extraXp: 10 })}
    />
  );
}
