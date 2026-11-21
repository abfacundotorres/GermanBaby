"use client";

import Link from "next/link";
import { useMemo } from "react";
import { LISTENING } from "@/lib/content/listening";
import { LIBRARY } from "@/lib/content/library";
import { SPEAKING } from "@/lib/content/speaking";
import { WRITING } from "@/lib/content/writing";
import { levelFromProgress } from "@/lib/level";
import { dueItems, useProgress } from "@/lib/progress";

const ORDER = ["A1", "A2", "B1", "B2"] as const;
type Lv = (typeof ORDER)[number];

/** Primer elemento del nivel pedido; si no hay, el del nivel más cercano hacia arriba. Rota por día. */
function pick<T extends { level: string }>(items: T[], level: Lv, day: number): T | undefined {
  for (let i = ORDER.indexOf(level); i < ORDER.length; i++) {
    const pool = items.filter((x) => x.level === ORDER[i]);
    if (pool.length) return pool[day % pool.length];
  }
  return items.length ? items[day % items.length] : undefined;
}

const TOOLS = [
  { href: "/schreiben", ico: "✍️", name: "Escribir" },
  { href: "/sprechen", ico: "🗣️", name: "Hablar" },
  { href: "/hoeren", ico: "🎧", name: "Escuchar" },
  { href: "/library", ico: "📖", name: "Leer" },
  { href: "/words", ico: "📚", name: "Palabras" },
  { href: "/exam", ico: "📝", name: "Simulacros" },
];

/** «Practicar»: una sugerencia distinta cada día según tu nivel y atajos a todo lo que no es el camino de lecciones. */
export default function Practice() {
  const p = useProgress();
  const day = Math.floor(Date.now() / 86400000);
  const started = Object.keys(p.lessons).length > 0;
  const due = dueItems(p).length;

  const today = useMemo(() => {
    const raw = levelFromProgress(p.lessons);
    const lv: Lv = raw === "C1" ? "B2" : raw;
    const w = pick(WRITING, lv, day), s = pick(SPEAKING, lv, day), l = pick(LISTENING, lv === "A1" ? "A2" : lv, day), r = pick(LIBRARY, lv === "A1" ? "A2" : lv, day);
    const opts = [
      w && { href: "/schreiben", ico: w.emoji, kind: "Escritura", title: w.title, lv: w.level },
      s && { href: "/sprechen", ico: s.emoji, kind: "Expresión oral", title: s.title, lv: s.level },
      l && { href: "/hoeren", ico: l.emoji, kind: "Escucha libre", title: l.topic, lv: l.level },
      r && { href: "/library", ico: r.emoji, kind: "Lectura", title: r.topic, lv: r.level },
    ].filter(Boolean) as { href: string; ico: string; kind: string; title: string; lv: string }[];
    return opts[day % opts.length];
  }, [p.lessons, day]);

  return (
    <section className="stack" style={{ marginBottom: 12 }}>
      {!started && (
        <Link href="/nivel" className="card row" style={{ textDecoration: "none", color: "inherit", textAlign: "left" }}>
          <span style={{ fontSize: 28 }}>🎯</span>
          <span style={{ flex: 1 }}>
            <b>¿Ya sabés algo de alemán?</b>
            <span className="small muted" style={{ display: "block" }}>Hacé el test de nivel y empezá donde corresponde.</span>
          </span>
          <span>›</span>
        </Link>
      )}
      {due > 0 && (
        <Link href="/review" className="card row" style={{ textDecoration: "none", color: "inherit", textAlign: "left" }}>
          <span style={{ fontSize: 28 }}>🔁</span>
          <span style={{ flex: 1 }}><b>{due} para repasar hoy</b><span className="small muted" style={{ display: "block" }}>El repaso espaciado dura pocos minutos.</span></span>
          <span>›</span>
        </Link>
      )}
      {today && (
        <Link href={today.href} className="card row" style={{ textDecoration: "none", color: "inherit", textAlign: "left" }}>
          <span style={{ fontSize: 28 }}>{today.ico}</span>
          <span style={{ flex: 1 }}>
            <span className="small muted" style={{ display: "block", fontWeight: 700, letterSpacing: 0.5 }}>PRÁCTICA DE HOY · {today.kind.toUpperCase()} · {today.lv}</span>
            <b style={{ display: "block" }}>{today.title}</b>
          </span>
          <span>›</span>
        </Link>
      )}
      <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="btn" style={{ flex: "1 1 30%", textDecoration: "none" }}>
            {t.ico} {t.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
