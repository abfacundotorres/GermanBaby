"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { subscribeProgress } from "@/lib/progress";
import { pullNow, syncNow } from "@/lib/sync";

export default function SyncManager() {
  const path = usePathname();
  const onLogin = path.startsWith("/login");

  useEffect(() => {
    if (onLogin) return;
    // Pide al navegador que no borre los datos de la app si falta espacio (Chrome y Android suelen aceptar).
    void navigator.storage?.persist?.().catch(() => {});
    void syncNow();
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Tras cada cambio local, espera 3 s sin actividad y sube.
    const unsub = subscribeProgress(() => {
      clearTimeout(timer);
      timer = setTimeout(() => void syncNow(), 3000);
    });
    let lastPull = Date.now();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        void syncNow(); // mejor esfuerzo antes de que el sistema suspenda la pestaña
      } else if (Date.now() - lastPull > 60_000) {
        lastPull = Date.now();
        void pullNow().then(() => syncNow());
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      unsub();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [onLogin]);

  return null;
}
