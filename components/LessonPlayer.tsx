"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isGraded, type Step } from "@/lib/session";
import {
  ACHIEVEMENTS, addXp, currentStreak, getProgress, levelFor, logMistakes, markVocabWeak,
  resolveMistakes, reviewItem, tickCorrect, type Mistake,
} from "@/lib/progress";
import { sfx } from "@/lib/sfx";
import { Build, Choice, Dictation, Intro, Listen, Quiz, Speak, Write, type Outcome } from "./Exercises";
import Mascot, { type Mood } from "./Mascot";

export const MAX_HEARTS = 5;

export function Confetti() {
  const colors = ["#e8a317", "#d6453d", "#2e9e5b", "#3b82f6", "#a855f7"];
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: 70 }, (_, i) => (
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
    sfx.coin();
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [ids, onDone]);
  if (!ids.length) return null;
  const a = ACHIEVEMENTS[ids[0]];
  return <div className="toast">{a.emoji} ¡Logro desbloqueado: {a.title}!</div>;
}

function CountUp({ to, ms = 900, suffix = "" }: { to: number; ms?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - (1 - k) ** 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return <>{v}{suffix}</>;
}

const PRAISE: [string, string][] = [
  ["Super!", "¡Excelente!"], ["Toll!", "¡Genial!"], ["Genau!", "¡Exacto!"], ["Perfekt!", "¡Perfecto!"],
  ["Sehr gut!", "¡Muy bien!"], ["Wunderbar!", "¡Maravilloso!"], ["Richtig!", "¡Correcto!"],
];
const OOPS: [string, string][] = [["Nicht ganz", "No del todo"], ["Schade", "Qué pena"], ["Noch einmal", "Otra vez"]];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

const STEP_KEY = (s: Step, i: number) => `${i}-${s.kind}-${"de" in s ? s.de : "vocab" in s && s.vocab ? s.vocab.de : "es" in s ? s.es : ""}`;

export type FinishInfo = { accuracy: number; xp: number; results: { step: Step; ok: boolean }[] };
type Feedback = Outcome & { praise: [string, string]; combo: number };

function Hearts({ n }: { n: number }) {
  return (
    <span key={n} className={`hearts ${n < MAX_HEARTS ? "hit" : ""}`} aria-label={`${n} corazones`}>
      ❤️ {n}
    </span>
  );
}

function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="modal-back">
      <div className="modal stack center">{children}</div>
    </div>
  );
}

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
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [combo, setCombo] = useState(0);
  const [comboBanner, setComboBanner] = useState<number | null>(null);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [dead, setDead] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [xp, setXp] = useState(0);
  const [results, setResults] = useState<{ step: Step; ok: boolean }[]>([]);
  const [retried, setRetried] = useState<Set<number>>(new Set());
  const [toasts, setToasts] = useState<string[]>([]);
  const [summary, setSummary] = useState<{
    accuracy: number; xp: number; stars?: number; gems: number; levelUp: number | null; streak: number; correct: number; total: number;
  } | null>(null);
  const levelBefore = useRef(levelFor(getProgress().xp));

  const step = queue[index];
  const gradedTotal = initial.filter(isGraded).length;
  const progress = summary ? 1 : index / queue.length;

  useEffect(() => {
    if (!comboBanner) return;
    const t = setTimeout(() => setComboBanner(null), 1300);
    return () => clearTimeout(t);
  }, [comboBanner]);

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
    if (feedback) return;
    const firstTry = !retried.has(index);
    let gained = 0;
    let newCombo = combo;
    if (o.status === "ok") {
      newCombo = combo + 1;
      gained = 10 + Math.min(combo, 5) * 2 + (o.bonusXp ?? 0);
      setCombo(newCombo);
      tickCorrect();
      if (newCombo >= 3) {
        sfx.combo(newCombo);
        if ([3, 5, 8, 10, 15, 20].includes(newCombo)) setComboBanner(newCombo);
      } else sfx.correct();
    } else if (o.status === "almost") {
      gained = 5;
      newCombo = 0;
      setCombo(0);
      sfx.almost();
    } else if (o.status === "bad") {
      newCombo = 0;
      setCombo(0);
      sfx.wrong();
      setHearts((h) => Math.max(0, h - 1));
      // El ejercicio vuelve al final de la lección (una sola vez).
      if (firstTry) {
        setQueue((q) => [...q, step]);
        setRetried((r) => new Set(r).add(queue.length));
      }
    }
    setFeedback({ ...o, combo: newCombo, praise: o.status === "bad" ? pick(OOPS) : pick(PRAISE) });
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
    const wasBad = feedback?.status === "bad";
    setFeedback(null);
    if (wasBad && hearts === 0) {
      sfx.heartLost();
      setDead(true);
      return;
    }
    if (index + 1 < queue.length) {
      setIndex(index + 1);
      return;
    }
    const graded = results.length;
    const correct = results.filter((r) => r.ok).length;
    const accuracy = graded ? correct / graded : 1;
    const gemsBefore = getProgress().gems;
    const res = onFinish({ accuracy, xp, results });
    if (res.extraXp) {
      const unlocked = addXp(res.extraXp);
      if (unlocked.length) setToasts((t) => [...t, ...unlocked]);
    }
    if (res.achievements?.length) setToasts((t) => [...t, ...res.achievements!]);
    const after = getProgress();
    const lvl = levelFor(after.xp);
    setSummary({
      accuracy, xp: xp + (res.extraXp ?? 0), stars: res.stars, gems: after.gems - gemsBefore,
      levelUp: lvl > levelBefore.current ? lvl : null, streak: currentStreak(after), correct, total: graded,
    });
    if (lvl > levelBefore.current) setTimeout(() => sfx.levelUp(), 1200);
    sfx.complete();
  };

  const retry = () => {
    setQueue(initial);
    setIndex(0);
    setFeedback(null);
    setCombo(0);
    setHearts(MAX_HEARTS);
    setResults([]);
    setRetried(new Set());
    setDead(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Enter sobre un botón o campo ya dispara su propia acción.
      if (e.target instanceof HTMLElement && ["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "Enter" && (feedback || step?.kind === "intro") && !summary && !dead) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (summary) {
    return (
      <div className="player">
        <Confetti />
        <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
        <main className="container center stack" style={{ paddingTop: 84 }}>
          <Mascot mood="cheer" size={140} />
          <div className="h1 pop">Super gemacht!</div>
          <div className="muted">Terminaste «{title}»</div>
          {summary.stars != null && (
            <div className="big-stars" aria-label={`${summary.stars} estrellas`}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={i < summary.stars! ? "on" : "off"} style={{ animationDelay: `${0.4 + i * 0.35}s` }}>★</span>
              ))}
            </div>
          )}
          <div className="grid3">
            <div className="stat stat-xp"><div className="stat-label">XP</div><div className="stat-val">⭐ <CountUp to={summary.xp} /></div></div>
            <div className="stat stat-acc"><div className="stat-label">Precisión</div><div className="stat-val">🎯 <CountUp to={Math.round(summary.accuracy * 100)} suffix="%" /></div></div>
            <div className="stat stat-gem"><div className="stat-label">Gemas</div><div className="stat-val">💎 <CountUp to={summary.gems} /></div></div>
          </div>
          <div className="muted small">{summary.correct} de {summary.total || gradedTotal} ejercicios bien a la primera</div>
          {summary.streak > 0 && <div className="banner streak-banner">🔥 ¡Racha de {summary.streak} día{summary.streak > 1 ? "s" : ""}!</div>}
          {summary.levelUp && <div className="banner level-banner">🚀 ¡Subiste al nivel {summary.levelUp}!</div>}
          <Link href="/" className="btn btn-primary btn-block btn-lg">Continuar</Link>
        </main>
      </div>
    );
  }

  if (!step) return null;

  const props = { locked: Boolean(feedback), onResult: handleResult };
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

  const fbClass = feedback ? ({ ok: "ok", almost: "almost", bad: "bad", skip: "almost" } as const)[feedback.status] : "";
  const mood: Mood = feedback?.status === "ok" ? "cheer" : feedback?.status === "bad" ? "sad" : "think";
  const fbTitle = feedback?.title ?? (feedback?.status === "almost" ? "¡Casi!" : feedback?.praise[0]);
  const fbSub = !feedback?.title && feedback?.status !== "almost" ? feedback?.praise[1] : null;

  return (
    <div className="player">
      <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
      {comboBanner && <div className="combo-banner" key={comboBanner}>🔥 ¡Racha de {comboBanner}!</div>}
      <main className="container" style={{ paddingBottom: 240 }}>
        <div className="lesson-top">
          <button className="btn btn-round" aria-label="Salir" style={{ width: 44, height: 44, fontSize: 18 }} onClick={() => setConfirmExit(true)}>✕</button>
          <div className="progress big"><div style={{ width: `${progress * 100}%` }} /></div>
          <Hearts n={hearts} />
        </div>
        <div className="step-in" key={key}>{body}</div>
        {step.kind === "intro" && (
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => { sfx.tap(); next(); }}>Entendido</button>
          </div>
        )}
      </main>

      {feedback && (
        <div className={`feedback ${fbClass}`}>
          <div className="feedback-inner">
            <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
              <Mascot mood={mood} size={64} />
              <div style={{ flex: 1 }}>
                <div className="title">{fbTitle}{feedback.combo >= 3 && feedback.status === "ok" ? ` 🔥×${feedback.combo}` : ""}</div>
                {fbSub && <div className="small muted">{fbSub}</div>}
                {feedback.detail && <div style={{ marginTop: 6 }}>{feedback.detail}</div>}
              </div>
            </div>
            <button className={`btn btn-block btn-lg ${feedback.status === "bad" ? "btn-bad" : "btn-ok"}`} onClick={next} autoFocus>
              Continuar
            </button>
          </div>
        </div>
      )}

      {dead && (
        <Modal>
          <Mascot mood="sad" size={110} />
          <div className="h1">¡Sin corazones!</div>
          <p className="muted">Tranqui: no perdés tus XP ni tu progreso. Probá la lección de nuevo.</p>
          <button className="btn btn-primary btn-block btn-lg" onClick={retry}>Practicar de nuevo</button>
          <Link href="/" className="btn btn-block">Salir</Link>
        </Modal>
      )}

      {confirmExit && (
        <Modal>
          <Mascot mood="think" size={90} />
          <div className="h2">¿Salir de la lección?</div>
          <p className="muted">Si salís ahora, perdés lo que avanzaste en esta lección.</p>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setConfirmExit(false)}>Seguir practicando</button>
          <Link href="/" className="btn btn-block">Salir</Link>
        </Modal>
      )}
    </div>
  );
}
