"use client";

import { useState } from "react";
import Link from "next/link";
import type { Step } from "@/lib/session";
import { shuffle } from "@/lib/text";
import { CATEGORY_EMOJI, type MistakeCategory } from "@/lib/mistakes";
import { openMistakes, resolveMistakes, useHydrated, useProgress, type Mistake } from "@/lib/progress";
import { callAi } from "@/lib/ai";
import { LessonPlayer } from "@/components/LessonPlayer";
import type { PracticeResult } from "@/app/api/practice/route";

type Session = { steps: Step[]; focus?: string; resolveOnPass: string[]; started: boolean };

const stepKey = (s: Step) => JSON.stringify({ ...s, mistakeId: undefined, fromReview: undefined });

/**
 * Ejercicio para rehacer un error. Si se guardó el original (lecciones y repaso) se usa ese; si no
 * (errores de la charla o secundarios), se arma uno con lo registrado: lo que escribiste y lo correcto.
 */
function stepForMistake(m: Mistake): Step | null {
  if (m.step && m.step.kind !== "intro") return m.step;
  const right = m.right?.trim();
  if (!right) return null;
  if (m.category === "pronunciación") return { kind: "speak", de: right, es: m.prompt ?? "Decilo en voz alta" };
  if (m.category === "comprensión auditiva") return { kind: "dictation", de: right, es: m.prompt ?? right };
  const wrong = m.wrong?.trim();
  if (wrong && wrong.toLowerCase() !== right.toLowerCase()) {
    return {
      kind: "quiz",
      question: m.source === "chat" ? "En la charla: ¿cuál es la forma correcta?" : m.prompt ? `${m.prompt}: ¿cuál es la forma correcta?` : "¿Cuál es la forma correcta?",
      options: shuffle([right, wrong]),
      answer: right,
      explanation: m.explanation ?? `Lo correcto es «${right}».`,
      category: m.category,
    };
  }
  return { kind: "write", es: m.prompt ?? "Escribí la forma correcta", references: [right], hint: m.explanation };
}

/** Ejercicios para rehacer los errores, con el id del error para resolverlo al acertar. */
function replaySteps(open: Mistake[], limit = 10): Step[] {
  // Agrupa errores del mismo ejercicio: acertarlo una vez los resuelve a todos.
  const groups = new Map<string, { step: Step; ids: string[] }>();
  for (const m of open) {
    const step = stepForMistake(m);
    if (!step) continue;
    const k = m.step ? stepKey(step) : `m:${m.id}`;
    const g = groups.get(k);
    if (g) g.ids.push(m.id);
    else groups.set(k, { step, ids: [m.id] });
  }
  return shuffle(
    [...groups.values()].slice(0, limit).map(({ step, ids }) => ({ ...step, mistakeId: ids.join(","), fromReview: false })),
  );
}

export default function PracticePage() {
  const hydrated = useHydrated();
  const p = useProgress();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!hydrated) return null;

  if (session?.started) {
    return (
      <LessonPlayer
        steps={session.steps}
        title="Mis errores"
        source="practice"
        onFinish={({ accuracy }) => {
          if (accuracy >= 0.8) resolveMistakes(session.resolveOnPass);
          return { extraXp: 15 };
        }}
      />
    );
  }

  const open = openMistakes(p);
  const byCategory = Object.entries(
    open.reduce<Record<string, number>>((acc, m) => ({ ...acc, [m.category]: (acc[m.category] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1]);
  const max = byCategory[0]?.[1] ?? 1;
  const replay = replaySteps(open);

  const generate = async () => {
    setLoading(true);
    setError(null);
    const sent = open.slice(0, 20);
    try {
      const r = await callAi<PracticeResult>("/api/practice", {
        mistakes: sent.map(({ category, wrong, right, explanation, prompt }) => ({ category, wrong, right, explanation, prompt })),
        studied: Object.keys(p.lessons),
      }, "practice");
      const steps: Step[] = shuffle([
        ...r.build.map((b): Step => ({ kind: "build", ...b })),
        ...r.write.map((w): Step => ({ kind: "write", ...w })),
        ...r.quiz.map((q): Step => ({ kind: "quiz", ...q, options: shuffle(q.options) })),
      ]);
      // Sumamos hasta 3 ejercicios originales fallados.
      const all = [...steps, ...replay.slice(0, 3)];
      if (!all.length) throw new Error("No se generaron ejercicios. Probá de nuevo.");
      setSession({ steps: all, focus: r.focus, resolveOnPass: sent.map((m) => m.id), started: false });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <main className="container center stack" style={{ paddingTop: 30 }}>
        <div className="mascot">🎯</div>
        <div className="h1">Tu práctica</div>
        {session.focus && <div className="card" style={{ textAlign: "left" }}>{session.focus}</div>}
        <div className="muted">{session.steps.length} ejercicios</div>
        <button className="btn btn-primary btn-block" onClick={() => setSession({ ...session, started: true })}>Empezar</button>
        <button className="btn btn-block" onClick={() => setSession(null)}>Volver</button>
      </main>
    );
  }

  return (
    <main className="container stack" style={{ paddingTop: 16 }}>
      <div className="row">
        <span className="mascot" aria-hidden>🎯</span>
        <div>
          <div className="h1" style={{ margin: 0 }}>Mis errores</div>
          <div className="muted small">Errores pendientes de las últimas 2 semanas</div>
        </div>
      </div>

      {open.length === 0 ? (
        <div className="card center stack">
          <div className="h2">¡Nada pendiente!</div>
          <div className="muted">Cuando te equivoques en una lección, en el repaso o en una charla, el error aparece acá para practicarlo.</div>
          <Link href="/" className="btn btn-block">Volver</Link>
        </div>
      ) : (
        <>
          <div className="card stack" style={{ gap: 8 }}>
            {byCategory.map(([cat, n]) => (
              <div key={cat} className="row small">
                <span style={{ width: 170 }}>{CATEGORY_EMOJI[cat as MistakeCategory]} {cat}</span>
                <div className="progress" style={{ height: 12 }}>
                  <div style={{ width: `${(n / max) * 100}%` }} />
                </div>
                <b style={{ width: 24, textAlign: "right" }}>{n}</b>
              </div>
            ))}
          </div>

          {error && <div className="notice">{error}</div>}
          <button className="btn btn-primary btn-block" onClick={generate} disabled={loading}>
            {loading ? <><span className="spinner" /> Armando tu práctica…</> : "✨ Práctica personalizada"}
          </button>
          <button
            className="btn btn-block"
            disabled={!replay.length}
            onClick={() => setSession({ steps: replay, resolveOnPass: [], started: true })}
          >
            🔁 Repetir lo que fallé ({replay.length})
          </button>

          <div className="h2" style={{ marginTop: 10 }}>Últimos errores</div>
          <div className="stack" style={{ gap: 8 }}>
            {(showAll ? open : open.slice(0, 10)).map((m) => (
              <div key={m.id} className="card small" style={{ padding: 12 }}>
                <span className="tag">{CATEGORY_EMOJI[m.category]} {m.category}</span>
                {m.prompt && <span className="muted">{m.prompt}</span>}
                <div style={{ marginTop: 4 }}>
                  {m.wrong && <><del>{m.wrong}</del> → </>}<ins>{m.right}</ins>
                </div>
                {m.explanation && <div className="muted">{m.explanation}</div>}
                <div className="row" style={{ marginTop: 8, justifyContent: "flex-end" }}>
                  <button className="btn" style={{ minHeight: 40, padding: "6px 12px", fontSize: 14 }} onClick={() => resolveMistakes([m.id])}>
                    ✓ Ya lo sé
                  </button>
                </div>
              </div>
            ))}
            {!showAll && open.length > 10 && (
              <button className="btn btn-block" onClick={() => setShowAll(true)}>Ver los {open.length - 10} restantes</button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
