"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isGraded, isReadOnly, type Step } from "@/lib/session";
import {
  ACHIEVEMENTS, addXp, currentStreak, getProgress, levelFor, logMistakes, markVocabWeak,
  resolveMistakes, reviewItem, tickCorrect, type Mistake,
} from "@/lib/progress";
import { sfx } from "@/lib/sfx";
import { levelFromProgress, setStudyLevel, type Level } from "@/lib/level";
import { Build, Choice, Cloze, Dictation, Explain, Intro, Listen, ListenQ, Quiz, ReadQ, Rule, Section, Speak, Write, type Outcome } from "./Exercises";
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

const STEP_KEY = (s: Step, i: number) => `${i}-${s.kind}-${"de" in s ? s.de : "title" in s ? s.title : "vocab" in s && s.vocab ? s.vocab.de : "es" in s ? s.es : ""}`;

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

// ---------- Retomar una lección a medias (se guarda en el dispositivo) ----------

type Saved = {
  v: 1; at: number; queue: Step[]; index: number; hearts: number; combo: number; xp: number;
  results: { step: Step; ok: boolean }[]; retried: number[];
};
const SAVE_PREFIX = "germanbaby.session.v1.";
const SAVE_TTL = 7 * 24 * 3600 * 1000;

function readSaved(key?: string): Saved | null {
  if (!key) return null;
  try {
    const raw = localStorage.getItem(SAVE_PREFIX + key);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    const valid = s.v === 1 && Array.isArray(s.queue) && s.queue.length > 0 && s.index > 0 && s.index < s.queue.length && Date.now() - s.at < SAVE_TTL;
    if (!valid) localStorage.removeItem(SAVE_PREFIX + key);
    return valid ? s : null;
  } catch {
    return null;
  }
}
const writeSaved = (key: string, s: Saved) => { try { localStorage.setItem(SAVE_PREFIX + key, JSON.stringify(s)); } catch { /* sin espacio */ } };
const clearSaved = (key?: string) => { try { if (key) localStorage.removeItem(SAVE_PREFIX + key); } catch { /* nada */ } };

type PlayerProps = {
  steps: Step[];
  title: string;
  level?: Level; // nivel de la lección, para las correcciones con IA
  source?: Mistake["source"];
  /** Si se pasa, el avance se guarda y se puede retomar. */
  resumeKey?: string;
  /** Resumen de lo aprendido, que se muestra en la pantalla final. */
  recap?: ReactNode;
  onFinish: (info: FinishInfo) => { extraXp?: number; stars?: number; achievements?: string[] };
  onStepResult?: (step: Step, ok: boolean) => void;
};

export function LessonPlayer(props: PlayerProps) {
  const [saved] = useState(() => readSaved(props.resumeKey));
  const [choice, setChoice] = useState<"ask" | "resume" | "fresh">(saved ? "ask" : "fresh");

  if (choice === "ask" && saved) {
    return (
      <div className="player">
        <main className="container center stack" style={{ paddingTop: 70 }}>
          <Mascot mood="think" size={120} />
          <div className="h1">Tenés una lección empezada</div>
          <div className="muted">«{props.title}»: ejercicio {saved.index + 1} de {saved.queue.length} · ❤️ {saved.hearts}</div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setChoice("resume")}>Retomar donde quedé</button>
          <button className="btn btn-block" onClick={() => { clearSaved(props.resumeKey); setChoice("fresh"); }}>Empezar de nuevo</button>
          <Link href="/" className="btn btn-block">Volver</Link>
        </main>
      </div>
    );
  }
  return <Session {...props} init={choice === "resume" ? saved ?? undefined : undefined} />;
}

function Session({
  steps: initial,
  title,
  level: levelProp,
  source = "lesson",
  resumeKey,
  init,
  recap,
  onFinish,
  onStepResult,
}: PlayerProps & { init?: Saved }) {
  const level = levelProp ?? levelFromProgress(getProgress().lessons);
  useEffect(() => { setStudyLevel(level); }, [level]);
  const [queue, setQueue] = useState<Step[]>(init?.queue ?? initial);
  const [index, setIndex] = useState(init?.index ?? 0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [combo, setCombo] = useState(init?.combo ?? 0);
  const [comboBanner, setComboBanner] = useState<number | null>(null);
  const [hearts, setHearts] = useState(init?.hearts ?? MAX_HEARTS);
  const [xpPop, setXpPop] = useState<{ n: number; k: number } | null>(null);
  const [dead, setDead] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [xp, setXp] = useState(init?.xp ?? 0);
  const [results, setResults] = useState<{ step: Step; ok: boolean }[]>(init?.results ?? []);
  const [retried, setRetried] = useState<Set<number>>(new Set(init?.retried ?? []));
  const [toasts, setToasts] = useState<string[]>([]);
  const [summary, setSummary] = useState<{
    accuracy: number; xp: number; stars?: number; gems: number; levelUp: number | null; streak: number; correct: number; total: number;
  } | null>(null);
  const levelBefore = useRef(levelFor(getProgress().xp));

  // Se guarda al pasar de ejercicio (sin feedback abierto), no durante la corrección.
  const done = summary !== null;
  useEffect(() => {
    if (!resumeKey || done || dead || feedback) return;
    if (index === 0) return;
    writeSaved(resumeKey, { v: 1, at: Date.now(), queue, index, hearts, combo, xp, results, retried: [...retried] });
  }, [resumeKey, done, dead, feedback, queue, index, hearts, combo, xp, results, retried]);

  const step = queue[index];
  const examResults = results.filter((r) => r.step.exam);
  const examTotal = examResults.length;
  const examOk = examResults.filter((r) => r.ok).length;
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
    const prompt = s.kind === "listenq" || s.kind === "readq" ? s.question.q : s.kind === "cloze" ? s.es : "es" in s ? s.es : "question" in s ? s.question : "vocab" in s && s.vocab ? s.vocab.es : undefined;
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
      // Un corazón de regalo cada 10 aciertos seguidos: las lecciones ahora son más largas.
      if (newCombo > 0 && newCombo % 10 === 0) setHearts((h) => Math.min(MAX_HEARTS, h + 1));
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
      setXpPop({ n: gained, k: Date.now() });
      setTimeout(() => setXpPop(null), 1100);
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
    clearSaved(resumeKey);
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
    clearSaved(resumeKey);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Enter sobre un botón o campo ya dispara su propia acción.
      if (e.target instanceof HTMLElement && ["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "Enter" && (feedback || step && isReadOnly(step)) && !summary && !dead) {
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
          {examTotal > 0 && <div className="banner exam-banner">📝 Mini examen: {examOk} de {examTotal} bien a la primera</div>}
          {summary.streak > 0 && <div className="banner streak-banner">🔥 ¡Racha de {summary.streak} día{summary.streak > 1 ? "s" : ""}!</div>}
          {summary.levelUp && <div className="banner level-banner">🚀 ¡Subiste al nivel {summary.levelUp}!</div>}
          {recap && <div style={{ width: "100%" }}>{recap}</div>}
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
    case "rule": body = <Rule key={key} step={step} />; break;
    case "listenq": body = <ListenQ key={key} step={step} {...props} />; break;
    case "readq": body = <ReadQ key={key} step={step} {...props} />; break;
    case "cloze": body = <Cloze key={key} step={step} {...props} />; break;
    case "explain": body = <Explain key={key} step={step} />; break;
    case "section": body = <Section key={key} step={step} />; break;
  }

  const fbClass = feedback ? ({ ok: "ok", almost: "almost", bad: "bad", skip: "almost" } as const)[feedback.status] : "";
  const mood: Mood = feedback?.status === "ok" ? "cheer" : feedback?.status === "bad" ? "sad" : "think";
  const fbTitle = feedback?.title ?? (feedback?.status === "almost" ? "¡Casi!" : feedback?.praise[0]);
  const fbSub = !feedback?.title && feedback?.status !== "almost" ? feedback?.praise[1] : null;

  return (
    <div className="player">
      <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
      {comboBanner && <div className="combo-banner" key={comboBanner}>🔥 ¡Racha de {comboBanner}!</div>}
      {xpPop && <div className="xp-pop" key={xpPop.k}>+{xpPop.n} XP</div>}
      <main className="container" style={{ paddingBottom: 240 }}>
        <div className="lesson-top">
          <button className="btn btn-round" aria-label="Salir" style={{ width: 44, height: 44, fontSize: 18 }} onClick={() => setConfirmExit(true)}>✕</button>
          <div className="progress big"><div style={{ width: `${progress * 100}%` }} /></div>
          <Hearts n={hearts} />
        </div>
        <div className="step-in" key={key}>{body}</div>
        {isReadOnly(step) && (
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => { sfx.tap(); next(); }}>Entendido</button>
          </div>
        )}
      </main>

      {feedback && (
        <div className={`feedback ${fbClass}`} role="status" aria-live="polite">
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
          <p className="muted">{resumeKey ? "Tu avance se guarda: podés retomar esta lección cuando quieras." : "Si salís ahora, perdés lo que avanzaste."}</p>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setConfirmExit(false)}>Seguir practicando</button>
          <Link href="/" className="btn btn-block">Salir</Link>
        </Modal>
      )}
    </div>
  );
}
