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
