"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LEVELS, levelStats, type LevelStats } from "@/lib/levelprogress";
import { useHydrated, useProgress } from "@/lib/progress";
import { loadExamHistory } from "@/lib/examhistory";
import { loadWriting } from "@/lib/writinghistory";

const Bar = ({ label, pct, detail }: { label: string; pct: number; detail?: string }) => (
  <div className="stack" style={{ gap: 2 }}>
    <div className="row small" style={{ justifyContent: "space-between" }}><span>{label}</span><span className="muted">{detail ?? `${pct} %`}</span></div>
    <div className="progress" style={{ height: 8 }}><div style={{ width: `${pct}%` }} /></div>
  </div>
);

export default function ProgresoPage() {
  const hydrated = useHydrated();
  const p = useProgress();
  const [stats, setStats] = useState<LevelStats[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const s = levelStats({ lessons: p.lessons, srs: p.srs, exams: loadExamHistory(), writing: loadWriting() });
    setStats(s);
    setOpen((o) => o ?? (s.find((x) => !x.complete) ?? s[s.length - 1]).level);
  }, [hydrated, p.lessons, p.srs]);

  if (!hydrated || !stats.length) return <main className="container" />;
  const current = stats.find((x) => !x.complete)?.level;

  return (
    <main className="container stack" style={{ paddingTop: 20 }}>
      <div className="h1">📊 Mi nivel</div>
      <p className="muted">Cuánto completaste de cada nivel, medido sobre lo que la app ofrece en él. Un nivel se da por completo cuando se cumplen las siete condiciones.</p>
      {LEVELS.map((lv) => {
        const s = stats.find((x) => x.level === lv)!;
        const okCount = s.checks.filter((c) => c.ok).length;
        const isOpen = open === lv;
        return (
          <section key={lv} className="card stack" style={{ gap: 8, textAlign: "left", outline: lv === current ? "2px solid var(--primary, #d99a14)" : undefined }}>
            <button className="row" style={{ justifyContent: "space-between", background: "none", border: 0, font: "inherit", padding: 0, cursor: "pointer", textAlign: "left" }} onClick={() => setOpen(isOpen ? null : lv)} aria-expanded={isOpen}>
              <span><b style={{ fontSize: 18 }}>{lv}</b> {s.complete ? "✅ Completo" : lv === current ? "· tu nivel actual" : ""}</span>
              <span className="small muted">{okCount}/7 {isOpen ? "▾" : "▸"}</span>
            </button>
            <Bar label="Lecciones" pct={s.lessons.pct} detail={`${s.lessons.done} de ${s.lessons.total}`} />
            {isOpen && (
              <>
                <Bar label="Palabras aprendidas" pct={s.words.pct} detail={`${s.words.done} de ${s.words.total}`} />
                <Bar label="Lectura" pct={s.reading.pct} detail={`${s.reading.done.toLocaleString("es-AR")} de ${s.reading.total.toLocaleString("es-AR")} palabras`} />
                <Bar label="Escucha" pct={s.listening.pct} detail={`${s.listening.done} de ${s.listening.total} min`} />
                <div className="small">📝 Simulacros: {s.exam.taken > 0 ? <>mejor resultado <b>{s.exam.best} %</b></> : "ninguno hecho"} · {s.exam.available} disponibles</div>
                <div className="small">✍️ Escritura: {s.writing.tasks} de {s.writing.available} consignas{s.writing.avg !== null && <> · promedio <b>{s.writing.avg}/20</b></>}</div>
                <div className="small">🗣️ Oral: {s.speaking.tasks} de {s.speaking.available} consignas{s.speaking.avg !== null && <> · promedio <b>{s.speaking.avg}/20</b></>}</div>
                <div className="stack" style={{ gap: 2, marginTop: 4 }}>
                  {s.checks.map((c) => <div key={c.id} className="small">{c.ok ? "✅" : "⬜"} {c.label}</div>)}
                </div>
                <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                  <Link href="/" className="btn">Lecciones</Link>
                  <Link href="/words" className="btn">Palabras</Link>
                  <Link href="/library" className="btn">Leer</Link>
                  <Link href="/hoeren" className="btn">Escuchar</Link>
                  <Link href="/exam" className="btn">Simulacros</Link>
                  <Link href="/schreiben" className="btn">Escribir</Link>
                  <Link href="/sprechen" className="btn">Hablar</Link>
                </div>
              </>
            )}
          </section>
        );
      })}
      <p className="small muted">Los porcentajes de simulacros, escritura y oral salen de los historiales de este dispositivo. Las palabras cuentan las que ya están en tu repaso espaciado.</p>
      <Link href="/perfil" className="btn btn-block">Volver al perfil</Link>
    </main>
  );
}
