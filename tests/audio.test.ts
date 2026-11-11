import { test } from "node:test";
import assert from "node:assert/strict";
import { Vad } from "../lib/vad.ts";
import { Resampler, floatToInt16, rms } from "../lib/pcm.ts";

/** Simula tramos de 50 ms con el volumen que da `level(tMs)`; devuelve cuándo y por qué terminó. */
function run(level: (t: number) => number, opts = {}) {
  const v = new Vad(opts);
  for (let t = 0; t < 20000; t += 50) {
    const end = v.push(level(t), 50);
    if (end) return { end, at: t + 50 };
  }
  return { end: null as null, at: 20000 };
}

test("VAD: corta ~700 ms después de que dejás de hablar", () => {
  // silencio 400 ms, voz de 400 a 1900 ms, silencio después
  const r = run((t) => (t >= 400 && t < 1900 ? 0.15 : 0.004));
  assert.equal(r.end, "silence");
  assert.ok(r.at >= 1900 + 650 && r.at <= 1900 + 800, `terminó en ${r.at} ms`);
});

test("VAD: una pausa corta entre palabras no corta la frase", () => {
  const r = run((t) => ((t >= 300 && t < 1000) || (t >= 1400 && t < 2300) ? 0.12 : 0.004));
  assert.equal(r.end, "silence");
  assert.ok(r.at > 2300 + 650, `se cortó antes de tiempo: ${r.at} ms`);
});

test("VAD: sin voz en 6 s termina como «nospeech»", () => {
  const r = run(() => 0.004);
  assert.equal(r.end, "nospeech");
  assert.equal(r.at, 6000);
});

test("VAD: un ruido de fondo parejo no cuenta como voz", () => {
  const r = run(() => 0.012); // ruido constante algo alto
  assert.equal(r.end, "nospeech");
});

test("VAD: tope de duración", () => {
  const r = run(() => 0.2, { maxMs: 3000 });
  assert.equal(r.end, "max");
  assert.equal(r.at, 3000);
});

test("PCM: remuestreo de 48 kHz a 16 kHz conserva la duración y la forma", () => {
  const rs = new Resampler(48000, 16000);
  const n = 48000; // 1 s de un seno de 440 Hz, entregado en tramos de 128 como el navegador
  const out: number[] = [];
  for (let i = 0; i < n; i += 128) {
    const chunk = new Float32Array(Math.min(128, n - i));
    for (let j = 0; j < chunk.length; j++) chunk[j] = 0.5 * Math.sin((2 * Math.PI * 440 * (i + j)) / 48000);
    out.push(...rs.process(chunk));
  }
  assert.ok(Math.abs(out.length - 16000) <= 3, `${out.length} muestras`);
  const peak = Math.max(...out.map(Math.abs));
  assert.ok(peak > 0.4 * 0x7fff && peak < 0.55 * 0x7fff, `pico ${peak}`);
});

test("PCM: 44,1 kHz (razón no entera) también da ~16 kHz", () => {
  const rs = new Resampler(44100, 16000);
  const out: number[] = [];
  for (let i = 0; i < 44100; i += 128) out.push(...rs.process(new Float32Array(Math.min(128, 44100 - i)).fill(0.25)));
  assert.ok(Math.abs(out.length - 16000) <= 3, `${out.length} muestras`);
  assert.ok(out.slice(10).every((x) => Math.abs(x - floatToInt16(0.25)) <= 1));
});

test("PCM: límites del entero de 16 bits y volumen", () => {
  assert.equal(floatToInt16(1), 32767);
  assert.equal(floatToInt16(-1), -32768);
  assert.equal(floatToInt16(2), 32767);
  assert.equal(floatToInt16(0), 0);
  assert.ok(Math.abs(rms(new Float32Array([0.5, -0.5, 0.5, -0.5])) - 0.5) < 1e-9);
});
