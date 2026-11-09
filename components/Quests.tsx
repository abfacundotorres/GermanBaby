"use client";

import { useState } from "react";
import { claimQuest, questState, useProgress } from "@/lib/progress";
import { sfx } from "@/lib/sfx";

export default function Quests() {
  const p = useProgress();
  const { quests, chest } = questState(p);
  const [flash, setFlash] = useState<string | null>(null);

  const claim = (id: string) => {
    const n = claimQuest(id);
    if (n) {
      sfx.coin();
      setFlash(`+${n} 💎`);
      setTimeout(() => setFlash(null), 1600);
    }
  };

  const doneCount = quests.filter((q) => q.claimed).length;
  return (
    <section className="card" style={{ marginTop: 14 }}>
      <div className="row" style={{ marginBottom: 4 }}>
        <div className="h2" style={{ margin: 0, flex: 1 }}>Misiones del día</div>
        <span className="muted small">{doneCount}/{quests.length}</span>
        {flash && <span className="pop" style={{ fontWeight: 900, color: "var(--gem)" }}>{flash}</span>}
      </div>
      {quests.map((q) => (
        <div key={q.id} className={`quest ${q.done ? "complete" : ""}`}>
          <span className="qico">{q.claimed ? "✅" : q.emoji}</span>
          <div style={{ flex: 1 }}>
            <b>{q.title}</b>
            <div className="qbar"><div style={{ width: `${(q.progress / q.target) * 100}%` }} /></div>
          </div>
          {q.claimed ? (
            <span className="muted small">+{q.reward} 💎</span>
          ) : q.done ? (
            <button className="btn btn-claim" onClick={() => claim(q.id)}>Cobrar +{q.reward} 💎</button>
          ) : (
            <span className="muted small">{q.progress}/{q.target}</span>
          )}
        </div>
      ))}
      <div className="chest">
        {chest.claimed ? (
          <span className="muted small">🎁 Cofre del día abierto. ¡Volvé mañana!</span>
        ) : chest.ready ? (
          <button className="btn btn-claim" onClick={() => claim("chest")}>🎁 Abrir cofre +{chest.reward} 💎</button>
        ) : (
          <span className="muted small">🎁 Cobrá las 3 misiones para abrir el cofre (+{chest.reward} 💎)</span>
        )}
      </div>
    </section>
  );
}
