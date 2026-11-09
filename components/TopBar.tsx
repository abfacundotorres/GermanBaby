"use client";

import Link from "next/link";
import { currentStreak, levelFor, useProgress } from "@/lib/progress";

export function GoalRing({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(1, value / goal);
  const r = 12;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 30 30" aria-label={`Meta diaria: ${value}/${goal} XP`}>
      <circle cx="15" cy="15" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="4" />
      <circle
        cx="15" cy="15" r={r} fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 15 15)"
      />
      {pct >= 1 && <text x="15" y="19.5" textAnchor="middle" fontSize="12">✓</text>}
    </svg>
  );
}

export default function TopBar() {
  const p = useProgress();
  const todayXp = p.daily.date === new Date().toLocaleDateString("sv-SE") ? p.daily.xp : 0;
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">🥨 GermanBaby</Link>
        <span className="pill" title="Racha de días">🔥 {currentStreak(p)}</span>
        <span className="pill" title="Experiencia total">⭐ {p.xp}</span>
        <span className="pill" title="Nivel">Lv {levelFor(p.xp)}</span>
        <GoalRing value={todayXp} goal={p.dailyGoal} />
      </div>
    </header>
  );
}
