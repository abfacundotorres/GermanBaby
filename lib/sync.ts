"use client";

// Sincroniza el progreso con la nube: baja y fusiona al abrir, y sube (con demora) tras cada cambio.
// Nunca sube antes de haber bajado, ni un progreso vacío, para no pisar lo guardado.

import { useSyncExternalStore } from "react";
import { getProgress, replaceProgress, type Progress } from "./progress";
import { isPristine, mergeProgress } from "./merge";

export type SyncState = "starting" | "unconfigured" | "syncing" | "ok" | "offline";
type Status = { state: SyncState; at: number | null; message?: string };

let status: Status = { state: "starting", at: null };
const subs = new Set<() => void>();
const set = (s: Status) => {
  status = s;
  subs.forEach((f) => f());
};
export const useSyncStatus = () =>
  useSyncExternalStore((cb) => { subs.add(cb); return () => { subs.delete(cb); }; }, () => status, () => status);

let rev = 0;
let pulled = false;
let busy: Promise<void> | null = null;
let lastPushedKey = "";

type Rec = { rev: number; data: Progress } | null;

// Se compara sin updatedAt: cambia en cada guardado aunque el contenido sea el mismo.
const contentKey = (p: Progress) => JSON.stringify({ ...p, updatedAt: 0 });

function adopt(remote: Rec) {
  if (!remote) return;
  rev = remote.rev;
  const local = getProgress();
  const merged = mergeProgress(local, remote.data);
  if (contentKey(merged) !== contentKey(local)) replaceProgress(merged);
}

async function pullOnce(): Promise<boolean> {
  const res = await fetch("/api/sync");
  if (res.status === 503) { set({ state: "unconfigured", at: null }); return false; }
  if (!res.ok) throw new Error(`pull ${res.status}`);
  adopt(((await res.json()) as { record: Rec }).record);
  pulled = true;
  return true;
}

async function pushOnce(allowPristine: boolean, retry = true): Promise<void> {
  const local = getProgress();
  if (!allowPristine && isPristine(local)) return;
  if (contentKey(local) === lastPushedKey && !allowPristine) return;
  const res = await fetch("/api/sync", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: local, baseRev: rev }),
  });
  if (res.status === 409 && retry) {
    adopt(((await res.json()) as { record: Rec }).record); // otro dispositivo guardó antes: fusionar y reintentar
    return pushOnce(allowPristine, false);
  }
  if (!res.ok) throw new Error(`push ${res.status}`);
  rev = ((await res.json()) as { rev: number }).rev;
  lastPushedKey = contentKey(local);
}

/** Baja (si hace falta) y sube. Seguro de llamar muchas veces: las llamadas se encolan. */
export function syncNow(opts: { allowPristine?: boolean } = {}): Promise<void> {
  const run = async () => {
    if (status.state === "unconfigured") return;
    set({ state: "syncing", at: status.at });
    try {
      if (!pulled && !(await pullOnce())) return;
      await pushOnce(Boolean(opts.allowPristine));
      set({ state: "ok", at: Date.now() });
    } catch (e) {
      set({ state: "offline", at: status.at, message: (e as Error).message });
    }
  };
  busy = (busy ?? Promise.resolve()).then(run);
  return busy;
}

/** Vuelve a bajar los cambios de otros dispositivos (al volver a abrir la app). */
export function pullNow(): Promise<void> {
  const run = async () => {
    if (status.state === "unconfigured") return;
    set({ state: "syncing", at: status.at });
    try {
      if (await pullOnce()) set({ state: "ok", at: Date.now() });
    } catch (e) {
      set({ state: "offline", at: status.at, message: (e as Error).message });
    }
  };
  busy = (busy ?? Promise.resolve()).then(run);
  return busy;
}
