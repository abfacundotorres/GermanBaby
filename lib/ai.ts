"use client";

// Todas las llamadas a Claude desde el navegador pasan por acá: se respetan los
// topes (diario y mensual) y se registra el gasto estimado.

import { aiAllowance, getProgress, recordAi } from "./progress";

export class AiBlocked extends Error {}

export async function callAi<T>(url: string, body: unknown): Promise<T> {
  const a = aiAllowance(getProgress());
  if (!a.allowed) throw new AiBlocked(a.reason!);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error ?? `Error ${res.status}`), { status: res.status });
  const { _usage, ...rest } = data as { _usage?: { input: number; output: number; model: string } } & Record<string, unknown>;
  recordAi(_usage ?? null);
  return rest as T;
}
