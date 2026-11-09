"use client";

import { useState } from "react";
import {
  aiAllowance, ACHIEVEMENTS, FREEZE_COST, MAX_FREEZES, buyFreeze, currentStreak, exportProgress, importProgress, lastDays, levelFor,
  resetProgress, setSetting, useHydrated, useProgress, xpForLevel,
} from "@/lib/progress";
import { speak } from "@/lib/speech";
import { sfx } from "@/lib/sfx";
import Mascot from "@/components/Mascot";

const VOICES = [
  ["de-DE-KatjaNeural", "Katja (mujer)"],
  ["de-DE-AmalaNeural", "Amala (mujer)"],
  ["de-DE-ConradNeural", "Conrad (hombre)"],
  ["de-DE-KillianNeural", "Killian (hombre)"],
];
const DAY = ["D", "L", "M", "M", "J", "V", "S"];
const usd = (n: number) => `USD ${(n < 0.1 ? n.toFixed(3) : n.toFixed(2)).replace(".", ",")}`;
const LIMITS: [number, string][] = [[0, "Sin IA"], [20, "20 por día"], [40, "40 por día"], [60, "60 por día"], [100, "100 por día"], [200, "200 por día"], [-1, "Sin límite"]];
const BUDGETS: [number, string][] = [[0, "Sin tope"], [1, "USD 1"], [3, "USD 3"], [5, "USD 5"], [10, "USD 10"], [20, "USD 20"]];

export default function Perfil() {
  const hydrated = useHydrated();
  const p = useProgress();
  const [msg, setMsg] = useState<string | null>(null);
  const [backup, setBackup] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  if (!hydrated) return <main className="container" />;

  const level = levelFor(p.xp);
  const from = xpForLevel(level);
  const to = xpForLevel(level + 1);
  const week = lastDays(p, 7);
  const maxXp = Math.max(...week.map((d) => d.xp), p.dailyGoal);
  const lessonsDone = Object.keys(p.lessons).length;
  const ai = aiAllowance(p);
  const monthNow = new Date().toLocaleDateString("sv-SE").slice(0, 7);
  const m = p.ai.month === monthNow ? p.ai : { monthCalls: 0, monthIn: 0, monthOut: 0, monthCost: 0, unpriced: false, model: p.ai.model };
  const note = (t: string) => { setMsg(t); setTimeout(() => setMsg(null), 2500); };

  const buy = () => {
    const r = buyFreeze();
    if (r === "ok") { sfx.coin(); note("🧊 ¡Congelador comprado!"); }
    else if (r === "max") note(`Ya tenés el máximo (${MAX_FREEZES}).`);
    else note(`Te faltan ${FREEZE_COST - p.gems} 💎.`);
  };

  const copy = async () => {
    const text = exportProgress();
    setBackup(text);
    try {
      await navigator.clipboard.writeText(text);
      note("Copiado. Guardalo en tus notas.");
    } catch {
      note("Seleccioná el texto y copialo a mano.");
    }
  };

  const restore = () => {
    if (importProgress(backup.trim())) { note("✅ Progreso restaurado."); setBackup(""); }
    else note("Ese texto no es una copia válida.");
  };

  const logout = async () => {
    await fetch("/api/login", { method: "DELETE" });
    window.location.href = "/login";
  };

  return (
    <main className="container stack">
      {msg && <div className="toast">{msg}</div>}
      <section className="card center stack" style={{ gap: 6 }}>
        <Mascot mood="happy" size={110} />
        <div className="h1" style={{ margin: 0 }}>Nivel {level}</div>
        <div className="muted small">{p.xp - from}/{to - from} XP para el nivel {level + 1}</div>
        <div className="progress big" style={{ width: "100%" }}><div style={{ width: `${((p.xp - from) / (to - from)) * 100}%` }} /></div>
      </section>

      <div className="grid2 keep">
        <div className="card center"><div className="h2">🔥 {currentStreak(p)}</div><div className="muted small">Racha actual (mejor: {p.stats.bestStreak})</div></div>
        <div className="card center"><div className="h2">⭐ {p.xp}</div><div className="muted small">XP total</div></div>
        <div className="card center"><div className="h2">📘 {lessonsDone}</div><div className="muted small">Lecciones completas</div></div>
        <div className="card center"><div className="h2">🎤 {p.stats.spoken}</div><div className="muted small">Frases pronunciadas</div></div>
      </div>

      <section className="card">
        <div className="h2">Esta semana</div>
        <div className="week">
          {week.map((d, i) => (
            <div key={d.date} className="col">
              <span className="muted">{d.xp || ""}</span>
              <div className={`bar ${d.xp ? "" : "empty"}`} style={{ height: `${Math.max(4, (d.xp / maxXp) * 72)}px`, background: d.xp >= p.dailyGoal ? "var(--ok)" : undefined }} />
              <span className={i === 6 ? "today" : "muted"}>{DAY[new Date(d.date + "T12:00:00").getDay()]}</span>
            </div>
          ))}
        </div>
        <div className="muted small" style={{ marginTop: 8 }}>Verde = meta diaria cumplida ({p.dailyGoal} XP).</div>
      </section>

      <section className="card">
        <div className="row">
          <div style={{ fontSize: 36 }}>🧊</div>
          <div style={{ flex: 1 }}>
            <b>Congelador de racha</b>
            <div className="muted small">Si faltás un día, salva tu racha. Tenés {p.freezes}/{MAX_FREEZES}.</div>
          </div>
          <button className="btn btn-claim" style={{ animation: "none" }} onClick={buy} disabled={p.gems < FREEZE_COST || p.freezes >= MAX_FREEZES}>
            {FREEZE_COST} 💎
          </button>
        </div>
        <div className="muted small" style={{ marginTop: 6 }}>Tenés 💎 {p.gems}. Ganás gemas al terminar lecciones y cobrar misiones.</div>
      </section>

      <section>
        <div className="h2">Logros</div>
        <div className="grid2">
          {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
            const has = p.achievements.includes(id);
            return (
              <div key={id} className="card row" style={{ opacity: has ? 1 : 0.45, padding: 12 }}>
                <span style={{ fontSize: 28 }}>{has ? a.emoji : "🔒"}</span>
                <div><b>{a.title}</b><div className="muted small">{a.desc}</div></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card">
        <div className="h2">Ajustes</div>
        <label className="switch">
          <span>🔊 Sonidos y vibración</span>
          <input type="checkbox" checked={p.sound} onChange={(e) => setSetting("sound", e.target.checked)} style={{ width: 24, height: 24 }} />
        </label>
        <label className="switch">
          <span>🎯 Meta diaria</span>
          <select className="select" value={p.dailyGoal} onChange={(e) => setSetting("dailyGoal", Number(e.target.value))}>
            {[20, 50, 100].map((n) => <option key={n} value={n}>{n} XP{n === 20 ? " (relajada)" : n === 50 ? " (normal)" : " (intensa)"}</option>)}
          </select>
        </label>
        <label className="switch">
          <span>🗣️ Voz</span>
          <select className="select" value={p.voice} onChange={(e) => { setSetting("voice", e.target.value); void speak("Hallo! Ich bin Brezi.", { voice: e.target.value }).catch(() => {}); }}>
            {VOICES.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
      </section>

      <section className="card stack" style={{ gap: 8 }}>
        <div className="h2" style={{ margin: 0 }}>🤖 Uso de IA y gasto</div>
        <div className="small">
          <b>Hoy:</b> {ai.callsToday}{ai.limit > 0 ? ` de ${ai.limit}` : ""} usos{ai.limit === 0 ? " (IA desactivada)" : ai.limit < 0 ? " (sin límite)" : ""}
        </div>
        {ai.limit > 0 && (
          <div className="progress" style={{ height: 10 }}><div style={{ width: `${Math.min(100, (ai.callsToday / ai.limit) * 100)}%`, background: ai.callsToday >= ai.limit ? "var(--bad)" : undefined }} /></div>
        )}
        <div className="small">
          <b>Este mes:</b> {m.monthCalls} usos · {m.monthIn.toLocaleString("es-AR")} tokens de entrada · {m.monthOut.toLocaleString("es-AR")} de salida
        </div>
        <div className="h2" style={{ margin: 0 }}>≈ {usd(m.monthCost)}{ai.budget > 0 ? ` de ${usd(ai.budget)}` : ""}</div>
        {ai.budget > 0 && (
          <div className="progress" style={{ height: 10 }}><div style={{ width: `${Math.min(100, (m.monthCost / ai.budget) * 100)}%`, background: m.monthCost >= ai.budget ? "var(--bad)" : undefined }} /></div>
        )}
        {m.unpriced && <div className="notice small">Usaste un modelo sin precio conocido: el gasto real es mayor que el mostrado.</div>}
        <label className="switch">
          <span>Límite diario</span>
          <select className="select" value={p.aiDailyLimit} onChange={(e) => setSetting("aiDailyLimit", Number(e.target.value))}>
            {LIMITS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="switch">
          <span>Tope mensual</span>
          <select className="select" value={p.aiMonthlyBudget} onChange={(e) => setSetting("aiMonthlyBudget", Number(e.target.value))}>
            {BUDGETS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <div className="muted small">
          Al llegar a un tope, la app sigue funcionando sin IA: las traducciones se corrigen comparando con respuestas modelo, y la charla y la práctica personalizada se pausan.
          Son estimaciones con precios de lista{m.model ? ` (modelo: ${m.model})` : ""}: la cifra real está en la consola de Claude. El tope que no se puede pasar es el saldo prepago sin recarga automática.
        </div>
      </section>

      <section className="card stack">
        <div className="h2" style={{ margin: 0 }}>Copia de seguridad</div>
        <div className="muted small">
          Tu progreso vive en este navegador. Si borrás los datos del sitio, lo perdés. Copialo de vez en cuando y guardalo en tus notas.
        </div>
        <textarea className="input" value={backup} onChange={(e) => setBackup(e.target.value)} placeholder="Acá aparece la copia, o pegá una para restaurar" />
        <div className="grid2">
          <button className="btn" onClick={copy}>📋 Copiar progreso</button>
          <button className="btn" onClick={restore} disabled={!backup.trim()}>♻️ Restaurar</button>
        </div>
      </section>

      <section className="stack">
        <button className="btn btn-block" onClick={logout}>Cerrar sesión</button>
        {confirmReset ? (
          <div className="card stack">
            <b>¿Borrar todo el progreso?</b>
            <div className="muted small">No se puede deshacer.</div>
            <div className="grid2">
              <button className="btn btn-bad" onClick={() => { resetProgress(); setConfirmReset(false); note("Progreso borrado."); }}>Sí, borrar</button>
              <button className="btn" onClick={() => setConfirmReset(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <button className="btn btn-block" style={{ color: "var(--bad)" }} onClick={() => setConfirmReset(true)}>Borrar progreso</button>
        )}
      </section>
    </main>
  );
}
