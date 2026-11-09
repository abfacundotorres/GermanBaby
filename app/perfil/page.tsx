"use client";

import { useState } from "react";
import {
  ACHIEVEMENTS, FREEZE_COST, MAX_FREEZES, buyFreeze, currentStreak, exportProgress, importProgress, lastDays, levelFor,
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
