"use client";

import { useState } from "react";
import Mascot from "@/components/Mascot";

export default function Login() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (res.ok) window.location.href = "/";
    else {
      setError((await res.json().catch(() => ({}))).error ?? "No pude entrar.");
      setBusy(false);
    }
  };

  return (
    <main className="container center stack" style={{ paddingTop: 48 }}>
      <Mascot mood="happy" size={120} />
      <div className="h1">GermanBaby</div>
      <p className="muted">Escribí tu código de acceso para entrar.</p>
      <input
        className="input"
        type="password"
        inputMode="text"
        autoComplete="current-password"
        placeholder="Código de acceso"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && code && submit()}
      />
      {error && <div className="notice">{error}</div>}
      <button className="btn btn-primary btn-block" disabled={!code || busy} onClick={submit}>
        {busy ? "Entrando…" : "Entrar"}
      </button>
    </main>
  );
}
