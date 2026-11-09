"use client";

import { useEffect, useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { useProgress } from "@/lib/progress";

export function AudioButtons({ text, autoPlay = false, size = "normal" }: { text: string; autoPlay?: boolean; size?: "normal" | "big" }) {
  const { voice } = useProgress();
  const [busy, setBusy] = useState(false);
  const autoplayed = useRef<string | null>(null);

  const play = async (slow: boolean) => {
    setBusy(true);
    try {
      await speak(text, { slow, voice });
    } catch (e) {
      console.warn(e);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (autoPlay && autoplayed.current !== text) {
      autoplayed.current = text;
      void speak(text, { voice }).catch((e) => console.warn(e));
    }
  }, [autoPlay, text, voice]);

  const style = size === "big" ? { width: 80, height: 80, fontSize: 34 } : undefined;
  return (
    <span className="row" style={{ justifyContent: "center" }}>
      <button className="btn btn-round btn-primary" style={style} onClick={() => play(false)} disabled={busy} aria-label="Escuchar">
        🔊
      </button>
      <button className="btn btn-round" onClick={() => play(true)} disabled={busy} aria-label="Escuchar lento" title="Lento">
        🐢
      </button>
    </span>
  );
}
