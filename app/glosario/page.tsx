"use client";

import { useMemo, useState } from "react";
import { UNITS, lessonKey } from "@/lib/curriculum";
import { useHydrated, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { splitArticle, pluralFromNote } from "@/lib/vocab";
import { GENDER_ES, WordText } from "@/components/WordText";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function GlossaryPage() {
  const hydrated = useHydrated();
  const p = useProgress();
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);

  const groups = useMemo(() => {
    const nq = norm(q.trim());
    return UNITS.map((u) => {
      const words = u.lessons
        .filter((l) => all || p.lessons[lessonKey(u.id, l.id)])
        .flatMap((l) => l.vocab.map((v) => ({ ...v, lesson: l.title })))
        .filter((v) => !nq || norm(v.de).includes(nq) || norm(v.es).includes(nq));
      return { unit: u, words };
    }).filter((g) => g.words.length > 0);
  }, [q, all, p.lessons]);

  if (!hydrated) return null;
  const total = groups.reduce((n, g) => n + g.words.length, 0);

  return (
    <main className="container stack" style={{ paddingBottom: 110 }}>
      <div className="h1" style={{ margin: 0 }}>📖 Glosario</div>
      <div className="muted small">Todo lo que ya viste, por unidad. Tocá 🔊 para escuchar.</div>
      <input
        className="input" type="search" placeholder="Buscar en alemán o en español…" value={q}
        onChange={(e) => setQ(e.target.value)} aria-label="Buscar en el glosario"
      />
      <label className="row small" style={{ gap: 8 }}>
        <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} />
        Mostrar también las lecciones que todavía no hice
      </label>
      <div className="muted small">{total} palabras y frases</div>
      {groups.length === 0 && <div className="card muted">Todavía no hay nada para mostrar. Completá una lección y aparece acá.</div>}
      {groups.map(({ unit, words }) => (
        <section key={unit.id} className="stack" style={{ gap: 6 }}>
          <div className="h2" style={{ margin: 0 }}>{unit.emoji} {unit.title} <span className="muted small">· {unit.level ?? "A1"}</span></div>
          {words.map((v) => {
            const { art } = splitArticle(v.de);
            const plural = pluralFromNote(v.note);
            return (
              <div key={v.de} className="card recap-word">
                <div className="row" style={{ gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div className="recap-de"><b><WordText de={v.de} /></b> <span className="muted">— {v.es}</span></div>
                    {art && <div className="small muted">{art} = {GENDER_ES[art]}{plural ? ` · plural: ${plural}` : ""}</div>}
                    {v.example && <div className="small recap-ex"><span lang="de">{v.example.de}</span> <span className="muted">— {v.example.es}</span></div>}
                    {v.note && <div className="small muted">💡 {v.note}</div>}
                  </div>
                  <button className="btn btn-round" aria-label={`Escuchar ${v.de}`} onClick={() => void speak(v.de, { voice: p.voice }).catch(() => {})}>🔊</button>
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </main>
  );
}
