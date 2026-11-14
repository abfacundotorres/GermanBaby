"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dueItems, openMistakes, useProgress } from "@/lib/progress";

const ITEMS = [
  { href: "/", label: "Aprender", ico: "🏠" },
  { href: "/review", label: "Repaso", ico: "🔁" },
  { href: "/glosario", label: "Glosario", ico: "📖" },
  { href: "/practice", label: "Errores", ico: "🎯" },
  { href: "/perfil", label: "Perfil", ico: "👤" },
];

export default function BottomNav() {
  const path = usePathname();
  const p = useProgress();
  if (path.startsWith("/login") || path.startsWith("/lesson") || path.startsWith("/chat") || path.startsWith("/resumen")) return null;
  const badge: Record<string, number> = { "/review": dueItems(p).length, "/practice": openMistakes(p).length };
  return (
    <nav className="bottomnav" aria-label="Navegación principal">
      <div className="bottomnav-inner">
        {ITEMS.map((it) => {
          const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={`navitem ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
              <span className="ico">{it.ico}</span>
              {it.label}
              {badge[it.href] > 0 && <span className="badge">{badge[it.href] > 99 ? "99+" : badge[it.href]}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
