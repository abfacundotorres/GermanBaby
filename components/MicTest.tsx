"use client";

import { useState } from "react";
import { diagnoseMic, type DiagStep } from "@/lib/speech";

/** Prueba el micrófono paso por paso y muestra qué falla, en el propio celular. */
export default function MicTest() {
  const [steps, setSteps] = useState<DiagStep[]>([]);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setSteps([]);
    try {
      await diagnoseMic(setSteps);
    } catch (e) {
      setSteps((s) => [...s, { label: "Error inesperado", ok: false, detail: (e as Error).message }]);
    } finally {
      setRunning(false);
    }
  };

  const failed = steps.find((s) => s.ok === false);
  return (
    <div className="stack" style={{ gap: 8 }}>
      <button className="btn btn-block" onClick={run} disabled={running}>
        {running ? <><span className="spinner" /> Probando…</> : "🎤 Probar el micrófono"}
      </button>
      {steps.map((s, i) => (
        <div key={i} className="small" style={{ textAlign: "left" }}>
          <b>{s.ok === null ? "⏳" : s.ok ? "✅" : "❌"} {s.label}</b>
          {s.detail && <div className="muted">{s.detail}</div>}
        </div>
      ))}
      {!running && steps.length > 0 && (
        <div className={failed ? "notice small" : "small"}>
          {failed ? "Algo falló: arreglá lo que marca el ❌ de arriba y volvé a probar. Si no sabés cómo, mandame una captura de esta pantalla." : "🎉 El micrófono funciona bien."}
        </div>
      )}
    </div>
  );
}
