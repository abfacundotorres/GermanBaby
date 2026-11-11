"use client";

// Captura del micrófono con un AudioWorklet: entrega PCM de 16 kHz, mide el volumen y avisa cuándo
// dejaste de hablar. Si el navegador no soporta AudioWorklet lanza un error y se usa el modo compatible.

import { Resampler, rms } from "./pcm";
import { Vad, type VadEnd, type VadOptions } from "./vad";

export type CaptureEnd = VadEnd | "manual";

export type Capture = {
  /** Termina ya (botón «listo»). */
  finish: () => void;
  /** Libera todo. */
  stop: () => void;
  readonly bytes: number;
};

const WORKLET = `class PcmTap extends AudioWorkletProcessor {
  process(inputs) { const ch = inputs[0] && inputs[0][0]; if (ch) this.port.postMessage(ch.slice(0)); return true; }
}
registerProcessor("pcm-tap", PcmTap);`;

export async function startCapture(
  stream: MediaStream,
  h: { onPcm: (buf: ArrayBuffer) => void; onLevel?: (level: number) => void; onEnd: (reason: CaptureEnd) => void },
  vad?: VadOptions,
): Promise<Capture> {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  if (!ctx.audioWorklet) {
    void ctx.close();
    throw new Error("Este navegador no soporta AudioWorklet");
  }
  const url = URL.createObjectURL(new Blob([WORKLET], { type: "text/javascript" }));
  try {
    await ctx.resume();
    await ctx.audioWorklet.addModule(url);
  } catch (e) {
    URL.revokeObjectURL(url);
    void ctx.close();
    throw e;
  }

  const detector = new Vad(vad);
  const resampler = new Resampler(ctx.sampleRate, 16000);
  const node = new AudioWorkletNode(ctx, "pcm-tap");
  const mute = ctx.createGain(); // el nodo necesita salida para que el navegador lo procese; sin sonido
  mute.gain.value = 0;
  const src = ctx.createMediaStreamSource(stream);
  src.connect(node);
  node.connect(mute).connect(ctx.destination);

  let pending: Float32Array[] = [];
  let pendingLen = 0;
  let ended = false;
  let bytes = 0;

  const cleanup = () => {
    try { node.port.onmessage = null; src.disconnect(); node.disconnect(); mute.disconnect(); } catch { /* ya liberado */ }
    URL.revokeObjectURL(url);
    void ctx.close().catch(() => {});
  };
  const end = (reason: CaptureEnd) => {
    if (ended) return;
    ended = true;
    h.onEnd(reason);
  };

  node.port.onmessage = (ev: MessageEvent<Float32Array>) => {
    if (ended) return;
    pending.push(ev.data);
    pendingLen += ev.data.length;
    // Se procesa de a ~40 ms: menos mensajes y un volumen más estable.
    if (pendingLen < ctx.sampleRate * 0.04) return;
    const chunk = new Float32Array(pendingLen);
    let o = 0;
    for (const p of pending) { chunk.set(p, o); o += p.length; }
    pending = [];
    pendingLen = 0;

    const level = rms(chunk);
    h.onLevel?.(Math.min(1, level * 6));
    const pcm = resampler.process(chunk);
    if (pcm.length) {
      bytes += pcm.byteLength;
      h.onPcm(pcm.buffer.slice(pcm.byteOffset, pcm.byteOffset + pcm.byteLength) as ArrayBuffer);
    }
    const why = detector.push(level, (chunk.length / ctx.sampleRate) * 1000);
    if (why) end(why);
  };

  return {
    finish: () => end("manual"),
    stop: cleanup,
    get bytes() { return bytes; },
  };
}
