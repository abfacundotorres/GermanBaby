// Detector de fin de frase: decide cuándo dejaste de hablar para cortar la grabación sin esperar
// el silencio largo que usa Azure por defecto. Sin dependencias, se prueba con `npm test`.

export type VadEnd = "silence" | "nospeech" | "max";

export type VadOptions = {
  silenceMs?: number; // silencio, después de hablar, que cierra la grabación
  initialSilenceMs?: number; // sin voz en todo este tiempo: se corta (Azure responderá «no te escuché»)
  maxMs?: number; // tope de la grabación
  minSpeechMs?: number; // voz acumulada para considerar que empezaste a hablar
  calibrateMs?: number; // al principio se mide el ruido de fondo
};

export class Vad {
  private o: Required<VadOptions>;
  private t = 0;
  private noiseSum = 0;
  private noiseMs = 0;
  private speechMs = 0;
  private lastSpeechAt = 0;
  started = false;
  threshold = 0.02;

  constructor(o: VadOptions = {}) {
    this.o = { silenceMs: 700, initialSilenceMs: 6000, maxMs: 12000, minSpeechMs: 120, calibrateMs: 300, ...o };
  }

  /** `rms`: volumen del tramo (0 a 1). `dtMs`: duración del tramo. Devuelve por qué terminó, o null si sigue. */
  push(rms: number, dtMs: number): VadEnd | null {
    this.t += dtMs;
    if (this.noiseMs < this.o.calibrateMs) {
      // Ruido de fondo al comienzo (con tope, por si ya empezaste a hablar).
      this.noiseSum += Math.min(rms, 0.03) * dtMs;
      this.noiseMs += dtMs;
      this.threshold = Math.max(0.02, (this.noiseSum / this.noiseMs) * 2.5 + 0.01);
    }
    if (rms > this.threshold) {
      this.speechMs += dtMs;
      if (!this.started && this.speechMs >= this.o.minSpeechMs) this.started = true;
      if (this.started) this.lastSpeechAt = this.t;
    }
    if (this.started && this.t - this.lastSpeechAt >= this.o.silenceMs) return "silence";
    if (!this.started && this.t >= this.o.initialSilenceMs) return "nospeech";
    if (this.t >= this.o.maxMs) return "max";
    return null;
  }
}
