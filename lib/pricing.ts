// Precios de lista en USD por millón de tokens [entrada, salida].
// Fuente: referencia de la API de Claude (oct. 2026). Verificalos en la página
// de precios de Anthropic: la cifra real es la de la consola de Claude.
const PRICES: Record<string, [number, number]> = {
  "claude-haiku-5-5": [0.1, 0.5], // hasta 100 K tokens por pedido (acá siempre)
  "claude-sonnet-5-5": [2, 10],
  "claude-sonnet-5": [2, 10],
  "claude-opus-5-5": [4, 20],
  "claude-opus-5": [5, 25],
  "claude-opus-4-8": [5, 25],
  "claude-fable-5-1": [10, 50],
  "claude-fable-5": [10, 50],
};

/** USD estimados, o null si no conozco el precio del modelo. */
export function costUsd(model: string, inputTokens: number, outputTokens: number): number | null {
  const p = PRICES[model];
  return p ? (inputTokens * p[0] + outputTokens * p[1]) / 1_000_000 : null;
}

// ---- Azure Speech (cuota gratuita F0 y precios de lista APROXIMADOS) ----
// La cuota gratuita (5 h de reconocimiento y 0,5 M de caracteres de voz por mes) figura en la página
// de precios de Azure. La evaluación de pronunciación básica (precisión, fluidez, completitud y
// fonemas) se factura como reconocimiento de voz estándar, así que usa la misma cuota. Lo que Azure
// cobra aparte son los complementos «enhanced» (prosodia, gramática, vocabulario, tema), que la app
// NO pide. Los precios de pago son aproximados: verificalos en Azure.
export const AZURE_FREE = { sttSeconds: 5 * 3600, ttsChars: 500_000 };
export const AZURE_LIST_APPROX = { sttPerHour: 1.0, ttsPerMillionChars: 15 };

/** Costo estimado de Azure FUERA de la cuota gratuita. */
export function azureCost(m: { ttsChars: number; sttSeconds: number }) {
  const stt = (Math.max(0, m.sttSeconds - AZURE_FREE.sttSeconds) / 3600) * AZURE_LIST_APPROX.sttPerHour;
  const tts = (Math.max(0, m.ttsChars - AZURE_FREE.ttsChars) / 1_000_000) * AZURE_LIST_APPROX.ttsPerMillionChars;
  return { stt, tts };
}
