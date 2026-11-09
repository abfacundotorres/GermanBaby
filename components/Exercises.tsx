"use client";

import { useState, type ReactNode } from "react";
import type { Step } from "@/lib/session";
import { compareLocal, shuffle, tiles } from "@/lib/text";
import { assessPronunciation, SpeechNotConfigured, type PronunciationResult } from "@/lib/speech";
import { recordPronunciation } from "@/lib/progress";
import { sfx } from "@/lib/sfx";
import { callAi } from "@/lib/ai";
import { AudioButtons } from "./Audio";
import { PronunciationReport } from "./PronunciationReport";
import type { CorrectionResult } from "@/app/api/correct/route";
import type { MistakeCategory, MistakeInput } from "@/lib/mistakes";

export type Status = "ok" | "almost" | "bad" | "skip";
export type Outcome = {
  status: Status;
  title?: string;
  detail?: ReactNode;
  bonusXp?: number;
  achievement?: string;
  // Para el registro de errores:
  answer?: string;
  expected?: string;
  category?: MistakeCategory;
  mistakes?: MistakeInput[];
};
type Props<S> = { step: S; locked: boolean; onResult: (o: Outcome) => void };

type StepOf<K extends Step["kind"]> = Extract<Step, { kind: K }>;

// ---------------- Tarjeta nueva ----------------
export function Intro({ step }: { step: StepOf<"intro"> }) {
  const v = step.vocab;
  return (
    <div className="stack center">
      <div className="prompt-label">Palabra nueva</div>
      <div className="big-emoji pop">{v.emoji ?? "🆕"}</div>
      <div className="big-word">{v.de}</div>
      <div className="h2 muted">{v.es}</div>
      <AudioButtons text={v.de} autoPlay size="big" />
      {v.note && <div className="card small" style={{ textAlign: "left" }}>💡 {v.note}</div>}
    </div>
  );
}

// ---------------- Opción múltiple ----------------
function Options({ options, answer, locked, onPick }: { options: string[]; answer: string; locked: boolean; onPick: (o: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="stack">
      {options.map((o) => {
        const cls = !locked ? (picked === o ? "selected" : "") : o === answer ? "right" : picked === o ? "wrong" : "";
        return (
          <button key={o} className={`option ${cls}`} disabled={locked} onClick={() => { setPicked(o); onPick(o); }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function Choice({ step, locked, onResult }: Props<StepOf<"choice">>) {
  const v = step.vocab;
  const deToEs = step.direction === "de-es";
  const answer = deToEs ? v.es : v.de;
  return (
    <div className="stack">
      <div className="prompt-label">{deToEs ? "¿Qué significa?" : "¿Cómo se dice en alemán?"}</div>
      <div className="row">
        <div className="big-word" style={{ flex: 1 }}>{deToEs ? v.de : v.es}</div>
        {deToEs && <AudioButtons text={v.de} />}
      </div>
      <Options
        options={step.options}
        answer={answer}
        locked={locked}
        onPick={(o) =>
          onResult(o === answer
            ? { status: "ok" }
            : { status: "bad", detail: <>Correcto: <b>{answer}</b></>, answer: o, expected: answer, category: "vocabulario" })
        }
      />
    </div>
  );
}

export function Listen({ step, locked, onResult }: Props<StepOf<"listen">>) {
  return (
    <div className="stack">
      <div className="prompt-label">¿Qué escuchaste?</div>
      <div style={{ margin: "10px 0" }}><AudioButtons text={step.vocab.de} autoPlay size="big" /></div>
      <Options
        options={step.options}
        answer={step.vocab.de}
        locked={locked}
        onPick={(o) =>
          onResult(o === step.vocab.de
            ? { status: "ok", detail: <>«{step.vocab.de}» = {step.vocab.es}</> }
            : { status: "bad", detail: <>Era <b>{step.vocab.de}</b> ({step.vocab.es})</>, answer: o, expected: step.vocab.de, category: "comprensión auditiva" })
        }
      />
    </div>
  );
}

// ---------------- Armar la frase ----------------
export function Build({ step, locked, onResult }: Props<StepOf<"build">>) {
  const [bank] = useState(() => shuffle([...tiles(step.answer), ...step.extra]).map((t, i) => ({ t, i })));
  const [chosen, setChosen] = useState<number[]>([]);
  const sentence = chosen.map((i) => bank[i].t).join(" ");
  const check = () => {
    const v = compareLocal(sentence, step.answer);
    onResult(v === "correct"
      ? { status: "ok" }
      : { status: "bad", detail: <>Correcto: <b>{step.answer}</b></>, answer: sentence, expected: step.answer, category: "orden de palabras" });
  };
  return (
    <div className="stack">
      <div className="prompt-label">Armá la frase en alemán</div>
      <div className="h2">{step.es}</div>
      <div className="tiles answer-line">
        {chosen.map((i) => (
          <button key={i} className="tile" disabled={locked} onClick={() => { sfx.tap(); setChosen(chosen.filter((x) => x !== i)); }}>
            {bank[i].t}
          </button>
        ))}
      </div>
      <div className="tiles">
        {bank.map(({ t, i }) => (
          <button key={i} className={`tile ${chosen.includes(i) ? "used" : ""}`} disabled={locked} onClick={() => { sfx.tap(); setChosen([...chosen, i]); }}>
            {t}
          </button>
        ))}
      </div>
      {!locked && <button className="btn btn-primary btn-block" disabled={!chosen.length} onClick={check}>Comprobar</button>}
    </div>
  );
}

// ---------------- Teclado con umlauts ----------------
function GermanInput({ value, onChange, onSubmit, disabled, placeholder }: { value: string; onChange: (v: string) => void; onSubmit: () => void; disabled: boolean; placeholder: string }) {
  return (
    <div className="stack">
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && value.trim() && onSubmit()}
      />
      <div className="umlauts">
        {["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((c) => (
          <button key={c} type="button" disabled={disabled} onClick={() => onChange(value + c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Dictado ----------------
export function Dictation({ step, locked, onResult }: Props<StepOf<"dictation">>) {
  const [value, setValue] = useState("");
  const check = () => {
    const v = compareLocal(value, step.de);
    if (v === "correct") onResult({ status: "ok", detail: <>«{step.de}» = {step.es}</> });
    else if (v === "almost") onResult({ status: "almost", title: "¡Casi!", detail: <>Se escribe: <b>{step.de}</b></>, answer: value, expected: step.de, category: "ortografía" });
    else onResult({ status: "bad", detail: <>Era: <b>{step.de}</b> ({step.es})</>, answer: value, expected: step.de, category: "comprensión auditiva" });
  };
  return (
    <div className="stack">
      <div className="prompt-label">Escribí lo que escuchás</div>
      <div style={{ margin: "10px 0" }}><AudioButtons text={step.de} autoPlay size="big" /></div>
      <GermanInput value={value} onChange={setValue} onSubmit={check} disabled={locked} placeholder="Escribí en alemán…" />
      {!locked && <button className="btn btn-primary btn-block" disabled={!value.trim()} onClick={check}>Comprobar</button>}
    </div>
  );
}

// ---------------- Traducción libre (corrige Claude) ----------------
function CorrectionDetail({ r, answer }: { r: CorrectionResult; answer: string }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      <div>{r.feedback}</div>
      {r.corrected && r.corrected.trim() !== answer.trim() && (
        <div>Versión corregida: <b>{r.corrected}</b></div>
      )}
      {r.errors.length > 0 && (
        <ul className="error-list">
          {r.errors.map((e, i) => (
            <li key={i}>
              <span className="tag">{e.category}</span>
              <del>{e.fragment}</del> → <ins>{e.fix}</ins>
              <div className="small muted">{e.explanation}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Write({ step, locked, onResult }: Props<StepOf<"write">>) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const check = async () => {
    const answer = value.trim();
    // Camino rápido: coincide con una respuesta modelo → sin llamar a la IA.
    if (step.references.some((r) => compareLocal(answer, r) === "correct")) {
      onResult({ status: "ok", detail: <>«{answer}» ✓</> });
      return;
    }
    setLoading(true);
    try {
      const r = await callAi<CorrectionResult>("/api/correct", { es: step.es, references: step.references, answer, hint: step.hint });
      const status: Status = r.verdict === "correct" ? "ok" : r.verdict === "almost" ? "almost" : "bad";
      onResult({
        status,
        title: r.verdict === "correct" ? "¡Correcto!" : r.verdict === "almost" ? "¡Casi!" : "Revisemos",
        detail: <CorrectionDetail r={r} answer={answer} />,
        answer,
        expected: r.corrected || step.references[0],
        category: "significado",
        mistakes: r.errors.map((e) => ({ category: e.category, wrong: e.fragment, right: e.fix, explanation: e.explanation })),
      });
    } catch (e) {
      // Sin IA: comparación local contra las respuestas modelo.
      const local = step.references.map((r) => compareLocal(answer, r));
      const status: Status = local.includes("correct") ? "ok" : local.includes("almost") ? "almost" : "bad";
      onResult({
        status,
        detail: (
          <>
            {status !== "ok" && <>Respuesta esperada: <b>{step.references[0]}</b><br /></>}
            <span className="small muted">(Corrección sin IA: {(e as Error).message})</span>
          </>
        ),
        answer,
        expected: step.references[0],
        category: status === "almost" ? "ortografía" : "gramática",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack">
      <div className="prompt-label">Traducí al alemán</div>
      <div className="h2">{step.es}</div>
      {step.hint && <div className="muted small">💡 {step.hint}</div>}
      <GermanInput value={value} onChange={setValue} onSubmit={check} disabled={locked || loading} placeholder="Escribí en alemán…" />
      {!locked && (
        <button className="btn btn-primary btn-block" disabled={!value.trim() || loading} onClick={check}>
          {loading ? <><span className="spinner" /> Corrigiendo…</> : "Comprobar"}
        </button>
      )}
    </div>
  );
}

// ---------------- Hablar (evalúa Azure) ----------------
export const PASS_SCORE = 70;

export function Speak({ step, locked, onResult }: Props<StepOf<"speak">>) {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const record = async () => {
    setRecording(true);
    setError(null);
    try {
      const r = await assessPronunciation(step.de);
      setResult(r);
      setAttempts((a) => a + 1);
      const newBadge = recordPronunciation(r.pronScore);
      if (r.pronScore >= PASS_SCORE) {
        onResult({
          status: "ok",
          title: r.pronScore >= 90 ? "Ausgezeichnet! 🎉" : "¡Bien dicho!",
          bonusXp: r.pronScore >= 90 ? 5 : 0,
          achievement: newBadge ? "pron90" : undefined,
          detail: <>Pronunciación: <b>{r.pronScore}/100</b></>,
        });
      }
    } catch (e) {
      if (e instanceof SpeechNotConfigured) setNotConfigured(true);
      else setError((e as Error).message);
    } finally {
      setRecording(false);
    }
  };

  return (
    <div className="stack center">
      <div className="prompt-label">Decilo en voz alta</div>
      <div className="big-word">{step.de}</div>
      <div className="muted">{step.es}</div>
      <AudioButtons text={step.de} />
      {notConfigured ? (
        <div className="notice" style={{ textAlign: "left" }}>
          La evaluación de pronunciación necesita Azure Speech. Configurá <code>AZURE_SPEECH_KEY</code> y{" "}
          <code>AZURE_SPEECH_REGION</code> en <code>.env.local</code> (ver README).
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={() => onResult({ status: "skip", title: "Ejercicio salteado" })}>Saltear</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <button
              className={`btn btn-round btn-mic ${recording ? "recording" : ""}`}
              onClick={record}
              disabled={recording || locked}
              aria-label="Grabar"
            >
              🎤
            </button>
          </div>
          <div className="muted small">{recording ? "Te escucho… hablá ahora" : "Tocá el micrófono y decí la frase"}</div>
        </>
      )}
      {error && <div className="notice">{error}</div>}
      {result && <PronunciationReport result={result} />}
      {!locked && result && result.pronScore < PASS_SCORE && (
        <div className="row" style={{ justifyContent: "center" }}>
          <span className="muted small">Necesitás {PASS_SCORE} para aprobar. Escuchá de nuevo y probá otra vez.</span>
          {attempts >= 2 && (
            <button className="btn" onClick={() => onResult({
              status: "almost",
              title: "Seguí practicando",
              detail: <>Último puntaje: {result.pronScore}/100. La anoto en «Mis errores» para practicarla.</>,
              category: "pronunciación",
              answer: result.words.filter((w) => w.score < PASS_SCORE).map((w) => `${w.word} (${w.score})`).join(", ") || result.recognized,
              expected: step.de,
            })}>
              Seguir
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------- Pregunta con explicación (generada por IA) ----------------
export function Quiz({ step, locked, onResult }: Props<StepOf<"quiz">>) {
  return (
    <div className="stack">
      <div className="prompt-label">Elegí la opción correcta</div>
      <div className="h2">{step.question}</div>
      <Options
        options={step.options}
        answer={step.answer}
        locked={locked}
        onPick={(o) =>
          onResult(o === step.answer
            ? { status: "ok", detail: step.explanation }
            : { status: "bad", detail: <>Correcto: <b>{step.answer}</b>. {step.explanation}</>, answer: o, expected: step.answer, category: step.category, mistakes: [{ category: step.category, wrong: o, right: step.answer, explanation: step.explanation }] })
        }
      />
    </div>
  );
}
