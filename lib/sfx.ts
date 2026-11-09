"use client";

// Efectos de sonido sintetizados con Web Audio (sin archivos) y vibración.

import { getProgress } from "./progress";

let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!getProgress().sound) return null;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.18, slideTo?: number) {
  const a = audio();
  if (!a) return;
  const t0 = a.currentTime + start;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const vibrate = (pattern: number | number[]) => {
  try {
    if (getProgress().sound) navigator.vibrate?.(pattern);
  } catch {
    /* sin vibración */
  }
};

export const sfx = {
  tap() {
    tone(520, 0, 0.06, "triangle", 0.1);
  },
  correct() {
    tone(660, 0, 0.12, "triangle");
    tone(880, 0.09, 0.2, "triangle");
    vibrate(20);
  },
  wrong() {
    tone(220, 0, 0.18, "sawtooth", 0.12, 150);
    tone(160, 0.14, 0.24, "sawtooth", 0.12, 100);
    vibrate([60, 40, 60]);
  },
  almost() {
    tone(500, 0, 0.12, "triangle");
    tone(500, 0.14, 0.14, "triangle");
  },
  combo(n: number) {
    const base = 660 * Math.pow(1.0595, Math.min(n, 10));
    tone(base, 0, 0.09, "square", 0.08);
    tone(base * 1.5, 0.08, 0.16, "square", 0.08);
  },
  heartLost() {
    tone(300, 0, 0.25, "sine", 0.18, 120);
    vibrate(120);
  },
  complete() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, "triangle", 0.2));
    tone(1319, 0.5, 0.5, "triangle", 0.2);
    vibrate([40, 30, 40, 30, 120]);
  },
  levelUp() {
    [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.2, "square", 0.1));
    vibrate([80, 40, 80, 40, 200]);
  },
  coin() {
    tone(988, 0, 0.07, "square", 0.08);
    tone(1319, 0.07, 0.25, "square", 0.08);
  },
};
