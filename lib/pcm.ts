// Conversión de audio del micrófono (decimal, 44,1 o 48 kHz) al formato que pide Azure:
// PCM de 16 bits, 16 kHz, mono. Sin dependencias, se prueba con `npm test`.

export function floatToInt16(x: number): number {
  const c = Math.max(-1, Math.min(1, x));
  return c < 0 ? Math.round(c * 0x8000) : Math.round(c * 0x7fff);
}

/** Volumen eficaz (RMS) de un tramo, de 0 a 1. */
export function rms(samples: Float32Array): number {
  if (!samples.length) return 0;
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
}

/** Remuestrea en tiempo real promediando ventanas; se puede llamar tramo a tramo. */
export class Resampler {
  private ratio: number;
  private pos = 0; // posición fraccionaria dentro de `buf`
  private buf = new Float32Array(0);

  constructor(inRate: number, outRate = 16000) {
    this.ratio = inRate / outRate;
  }

  process(input: Float32Array): Int16Array {
    const buf = new Float32Array(this.buf.length + input.length);
    buf.set(this.buf);
    buf.set(input, this.buf.length);
    const out: number[] = [];
    while (this.pos + this.ratio <= buf.length) {
      const start = Math.floor(this.pos);
      const end = Math.min(buf.length, Math.max(start + 1, Math.ceil(this.pos + this.ratio)));
      let sum = 0;
      for (let i = start; i < end; i++) sum += buf[i];
      out.push(floatToInt16(sum / (end - start)));
      this.pos += this.ratio;
    }
    const consumed = Math.floor(this.pos);
    this.buf = buf.slice(consumed);
    this.pos -= consumed;
    return Int16Array.from(out);
  }
}

/** Une trozos de audio PCM de 16 bits, mono y 16 kHz en un WAV que el navegador sabe reproducir. */
export function pcmToWav(chunks: ArrayBuffer[], sampleRate = 16000): Blob {
  const dataLen = chunks.reduce((n, c) => n + c.byteLength, 0);
  const head = new ArrayBuffer(44);
  const v = new DataView(head);
  const str = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  str(0, "RIFF"); v.setUint32(4, 36 + dataLen, true); str(8, "WAVE");
  str(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true); v.setUint32(28, sampleRate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, "data"); v.setUint32(40, dataLen, true);
  return new Blob([head, ...chunks], { type: "audio/wav" });
}
