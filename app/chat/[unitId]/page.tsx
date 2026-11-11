"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getUnit } from "@/lib/curriculum";
import { assessPronunciation, MicError, prewarmSpeech, SpeechNotConfigured, speak, type PronunciationResult } from "@/lib/speech";
import { addXp, aiAllowance, grantAchievement, logMistakes, update, useProgress } from "@/lib/progress";
import { callAi } from "@/lib/ai";
import { PronunciationReport } from "@/components/PronunciationReport";
import { AchievementToast } from "@/components/LessonPlayer";
import type { ChatTurn } from "@/app/api/chat/route";

type Msg =
  | { role: "assistant"; text: string; es: string; suggestions?: string[] }
  | { role: "user"; text: string; pron?: PronunciationResult; correction?: ChatTurn["correction"] };

export default function ChatPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = use(params);
  const unit = getUnit(unitId);
  const prog = useProgress();
  const { voice } = prog;
  const ai = aiAllowance(prog);
  const [msgs, setMsgs] = useState<Msg[]>(() =>
    unit ? [{ role: "assistant", text: unit.chat.opener, es: unit.chat.openerEs }] : [],
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [level, setLevel] = useState(0);
  const finishRef = useRef<(() => void) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEs, setShowEs] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    prewarmSpeech();
    if (unit) void speak(unit.chat.opener, { voice }).catch(() => {});
    // solo al entrar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!unit) return <main className="container"><p>Unidad inexistente. <Link href="/">Volver</Link></p></main>;

  const send = async (text: string, pron?: PronunciationResult) => {
    const clean = text.trim();
    if (!clean || loading) return;
    setError(null);
    setInput("");
    const userMsg: Msg = { role: "user", text: clean, pron };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setLoading(true);
    try {
      const turn = await callAi<ChatTurn>("/api/chat", { unitId, history: history.map((m) => ({ role: m.role, text: m.text })) }, "chat");
      setMsgs((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last.role === "user") copy[copy.length - 1] = { ...last, correction: turn.correction };
        return [...copy, { role: "assistant", text: turn.reply_de, es: turn.reply_es, suggestions: turn.suggestions }];
      });
      void speak(turn.reply_de, { voice }).catch(() => {});
      if (turn.correction.hasErrors) {
        const errs = turn.correction.errors.length
          ? turn.correction.errors
          : [{ category: "gramática" as const, fragment: clean, fix: turn.correction.corrected }];
        logMistakes(
          errs.map((e) => ({
            source: "chat" as const,
            category: e.category,
            wrong: e.fragment,
            right: e.fix,
            explanation: turn.correction.explanation,
            prompt: `Charla: ${unit.chat.title}`,
          })),
        );
      }
      const unlocked = addXp(turn.correction.hasErrors ? 4 : 8);
      const userTurns = history.filter((m) => m.role === "user").length;
      if (userTurns === 3) {
        update((p) => ({ ...p, stats: { ...p.stats, chats: p.stats.chats + 1 } }));
        if (grantAchievement("first_chat")) unlocked.push("first_chat");
      }
      if (unlocked.length) setToasts((t) => [...t, ...unlocked]);
    } catch (e) {
      setError((e as Error).message);
      setMsgs((m) => m.slice(0, -1));
      setInput(clean);
    } finally {
      setLoading(false);
    }
  };

  const talk = async () => {
    if (recording && !processing) { finishRef.current?.(); return; } // segundo toque: terminé
    setRecording(true);
    setProcessing(false);
    setError(null);
    try {
      const r = await assessPronunciation("", {
        onLevel: setLevel,
        onProcessing: () => setProcessing(true),
        registerFinish: (f) => { finishRef.current = f; },
      }); // evaluación libre, sin guion
      setProcessing(false);
      await send(r.recognized, r);
    } catch (e) {
      setError(e instanceof SpeechNotConfigured ? "El micrófono necesita Azure Speech configurado. Mientras tanto podés escribir." : e instanceof MicError ? e.message : (e as Error).message);
    } finally {
      setRecording(false);
      setProcessing(false);
      setLevel(0);
      finishRef.current = null;
    }
  };

  const last = msgs[msgs.length - 1];

  return (
    <main className="container" style={{ paddingBottom: 20 }}>
      <AchievementToast ids={toasts} onDone={() => setToasts((t) => t.slice(1))} />
      <div className="row" style={{ marginBottom: 12 }}>
        <Link href="/" className="btn btn-round" aria-label="Salir" style={{ width: 44, height: 44, fontSize: 18 }}>✕</Link>
        <div style={{ flex: 1 }}>
          <div className="h2" style={{ margin: 0 }}>{unit.emoji} {unit.chat.title}</div>
          <label className="small muted">
            <input type="checkbox" checked={showEs} onChange={(e) => setShowEs(e.target.checked)} /> Mostrar traducción
          </label>
          <div className="small muted">
            IA hoy: {ai.callsToday}{ai.limit > 0 ? `/${ai.limit}` : ai.limit < 0 ? " (sin límite)" : " (desactivada)"}
            {!ai.allowed && <> · <Link href="/perfil" style={{ textDecoration: "underline" }}>subir límite</Link></>}
          </div>
        </div>
      </div>

      <div className="chat">
        {msgs.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="bubble bot">
              <div className="row" style={{ alignItems: "flex-start" }}>
                <span style={{ flex: 1 }}>{m.text}</span>
                <button className="btn" style={{ padding: "2px 8px" }} onClick={() => speak(m.text, { voice }).catch(() => {})} aria-label="Escuchar">🔊</button>
              </div>
              {showEs && <div className="es">{m.es}</div>}
            </div>
          ) : (
            <div key={i} style={{ display: "contents" }}>
              <div className="bubble me">{m.text}</div>
              {m.correction?.hasErrors && (
                <div className="fix">
                  ✏️ <b>{m.correction.corrected}</b>
                  <div>{m.correction.explanation}</div>
                </div>
              )}
              {m.pron && m.pron.words.some((w) => w.score < 80) && (
                <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
                  <PronunciationReport result={m.pron} compact />
                </div>
              )}
            </div>
          ),
        )}
        {loading && <div className="bubble bot"><span className="spinner" /></div>}
        <div ref={bottom} />
      </div>

      <div className="chat-input stack" style={{ marginTop: 14 }}>
        {error && <div className="notice">{error}</div>}
        {last.role === "assistant" && last.suggestions?.length ? (
          <div className="row" style={{ flexWrap: "wrap" }}>
            <span className="small muted">Ideas:</span>
            {last.suggestions.map((s) => (
              <button key={s} className="suggest" onClick={() => setInput(s)}>{s}</button>
            ))}
          </div>
        ) : null}
        <div className="row">
          <button
            className={`btn btn-round btn-mic ${recording && !processing ? "recording" : ""}`}
            style={{ width: 56, height: 56, fontSize: 24, flexShrink: 0, ...(recording && !processing ? { boxShadow: `0 0 0 ${4 + level * 18}px rgba(214,69,61,0.28)` } : {}) }}
            onClick={talk}
            disabled={processing || loading}
            aria-label={recording && !processing ? "Terminé" : "Hablar"}
          >
            {processing ? <span className="spinner" /> : recording ? "✓" : "🎤"}
          </button>
          <input
            className="input"
            value={input}
            placeholder={processing ? "Analizando…" : recording ? "Te escucho… tocá ✓ al terminar" : "Escribí en alemán…"}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            disabled={loading || recording}
          />
          <button className="btn btn-primary" onClick={() => send(input)} disabled={!input.trim() || loading}>➤</button>
        </div>
      </div>
    </main>
  );
}
