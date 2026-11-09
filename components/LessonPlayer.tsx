"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isGraded, type Step } from "@/lib/session";
import { ACHIEVEMENTS, addXp, logMistakes, markVocabWeak, resolveMistakes, reviewItem, type Mistake } from "@/lib/progress";
import { Build, Choice, Dictation, Intro, Listen, Quiz, Speak, Write, type Outcome } from "./Exercises";

export function Confetti() {
  const colors = ["#e8a317", "#d6453d", "#2e9e5b", "#3b82f6", "#a855f7"];
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: colors[i % colors.length],
            animationDuration: `${1.8 + ((i * 13) % 20) / 10}s`,
            animationDelay: `${((i * 7) % 10) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AchievementToast({ ids, onDone }: { ids: string[]; onDone: () => void }) {
  useEffect(() => {
    if (!ids.length) return;
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [ids, onDone]);
  if (!ids.length) return null;
  const a = ACHIEVEMENTS[ids[0]];
  return <div className="toast">{a.emoji} ¡Logro desbloqueado: {a.title}!</div>;
}

const STEP_KEY = (s: Step, i: number) => `${i}-${s.kind}-${"de" in s ? s.de : "vocab" in s && s.vocab ? s.vocab.de : "es" in s ? s.es : ""}`;

export type FinishInfo = { accuracy: number; xp: number; results: { step: Step; ok: boolean }[] };

export function LessonPlayer({
  steps: initial,
  title,
  source = "lesson",
  onFinish,
  onStepResult,
}: {
  steps: Step[];
  title: string;
  source?: Mistake["source"];
  onFinish: (info: FinishInfo) => { extraXp?: number; stars?: number; achievements?: string[] };
  onStepResult?: (step: Step, ok: boolean) => void;
}) {
  const [queue, setQueue] = useState<Step[]>(initial);
  const [index, setIndex] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [combo, setCombo] = useState(0);
  const [xp, setXp] = useState(0);
  const [results, setResults] = useState<{ step: Step; ok: boolean }[]>([]);
  const [retried, setRetried] = useState<Set<number>>(new Set());
  const [toasts, setToasts] = useState<string[]>([]);
  const [summary, setSummary] = useState<{ accuracy: number; xp: number; stars?: number } | null>(null);

  const step = queue[index];
  const gradedTotal = initial.filter(isGraded).length;
  const progress = summary ? 1 : index / queue.length;

  const recordMistake = (s: Step, o: Outcome) => {
    if ("vocab" in s && s.vocab && o.status === "bad") markVocabWeak(s.vocab.de);
    // Un ejercicio repetido que se vuelve a fallar no se duplica en el registro.
    if (s.mistakeId) return;
    const prompt = "es" in s ? s.es : "question" in s ? s.question : "vocab" in s && s.vocab ? s.vocab.es : undefined;
    const items = o.mistakes?.length
      ? o.mistakes
      : [{ category: o.category ?? "vocabulario", wrong: o.answer ?? "", right: o.expected ?? "" }];
    logMistakes(items.map((m, i) => ({ ...m, source, prompt, step: i === 0 ? s : undefined })));
  };

  const handleResult = (o: Outcome) => {
    if (outcome) return;
    setOutcome(o);
    const firstTry = !retried.has(index);
    let gained = 0;
    if (o.status === "ok") {
      gained = 10 + Math.min(combo, 5) * 2 + (o.bonusXp ?? 0);
      setCombo((c) => c + 1);
    } else if (o.status === "almost") {
      gained = 5;
      setCombo(0);
    } else if (o.status === "bad") {
      setCombo(0);
      // El ejercicio vuelve al final de la lección (una sola vez).
      if (firstTry) {
        setQueue((q) => [...q, step]);
        setRetried((r) => new Set(r).add(queue.length));
      }
    }
    if (gained) {
      setXp((x) => x + gained);
      const unlocked = addXp(gained);
      if (unlocked.length) setToasts((t) => [...t, ...unlocked]);
    }
    if (o.achievement) setToasts((t) => [...t, o.achievement!]);
    // Para la precisión cuenta solo el primer intento.
    if (firstTry && o.status !== "skip") {
      setResults((r) => [...r, { step, ok: o.status !== "bad" }]);
      onStepResult?.(step, o.status === "ok");
      if (step.fromReview && "vocab" in step && step.vocab) reviewItem(step.vocab.de, o.status === "ok");
      if (step.mistakeId && o.status === "ok") resolveMistakes(step.mistakeId.split(","));
      if (o.status === "bad" || o.status === "almost") recordMistake(step, o);
    }
  };

  const next = () => {
    setOutcome(null);
    if (index + 1 < queue.length) {
      setIndex(index + 1);
      return;
    }
    const graded = results.length;
    const accuracy = graded ? results.filter((r) => r.ok).length / graded : 1;
    const res = onFinish({ accuracy, xp, results });
    if (res.extraXp) {
      const unlocked = addXp(res.extraXp);
      if (unlocked.length) setToasts((t) => [...t, ...unlocked]);
    }
    if (res.achievements?.length) setToasts((t) => [...t, ...res.achievements!]);
    setSummary({ accuracy, xp: xp + (res.extraXp ?? 0), stars: res.stars });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Enter sobre un botón o campo ya dispara su propia acción.
      if (e.target instanceof HTMLElement && ["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "Enter" && (outcome || step?.kind === "intro") && !summary) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (summary) {
    return (
      <main className="container center stack" style={{ paddingTop: 40 }}>
        <Confetti />
        <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
        <div className="mascot">🥨</div>
        <div className="h1">Super gemacht!</div>
        <div className="muted">Terminaste «{title}»</div>
        {summary.stars != null && (
          <div className="stars" style={{ fontSize: 40 }}>{"★".repeat(summary.stars)}{"☆".repeat(3 - summary.stars)}</div>
        )}
        <div className="grid2">
          <div className="card"><div className="h2">⭐ {summary.xp}</div><div className="muted small">XP ganados</div></div>
          <div className="card"><div className="h2">🎯 {Math.round(summary.accuracy * 100)}%</div><div className="muted small">Precisión ({gradedTotal} ejercicios)</div></div>
        </div>
        <Link href="/" className="btn btn-primary btn-block">Continuar</Link>
      </main>
    );
  }

  if (!step) return null;

  const props = { locked: Boolean(outcome), onResult: handleResult };
  const key = STEP_KEY(step, index);
  let body: React.ReactNode;
  switch (step.kind) {
    case "intro": body = <Intro key={key} step={step} />; break;
    case "choice": body = <Choice key={key} step={step} {...props} />; break;
    case "listen": body = <Listen key={key} step={step} {...props} />; break;
    case "build": body = <Build key={key} step={step} {...props} />; break;
    case "dictation": body = <Dictation key={key} step={step} {...props} />; break;
    case "write": body = <Write key={key} step={step} {...props} />; break;
    case "speak": body = <Speak key={key} step={step} {...props} />; break;
    case "quiz": body = <Quiz key={key} step={step} {...props} />; break;
  }

  const fbClass = outcome ? ({ ok: "ok", almost: "almost", bad: "bad", skip: "almost" } as const)[outcome.status] : "";
  const fbTitle = outcome?.title ?? (outcome?.status === "ok" ? "¡Correcto!" : outcome?.status === "almost" ? "¡Casi!" : "No del todo");

  return (
    <main className="container" style={{ paddingBottom: 220 }}>
      <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
      <div className="lesson-top">
        <Link href="/" className="btn btn-round" aria-label="Salir" style={{ width: 44, height: 44, fontSize: 18 }}>✕</Link>
        <div className="progress"><div style={{ width: `${progress * 100}%` }} /></div>
        <div className="combo">{combo >= 2 ? `🔥×${combo}` : ""}</div>
      </div>
      {body}
      {step.kind === "intro" && (
        <div style={{ marginTop: 20 }}>
          <button className="btn btn-primary btn-block" onClick={next}>Entendido</button>
        </div>
      )}
      {outcome && (
        <div className={`feedback ${fbClass}`}>
          <div className="feedback-inner">
            <div className="title">{fbTitle}</div>
            {outcome.detail && <div>{outcome.detail}</div>}
            <button className={`btn btn-block ${outcome.status === "bad" ? "btn-bad" : "btn-ok"}`} onClick={next} autoFocus>
              Continuar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
