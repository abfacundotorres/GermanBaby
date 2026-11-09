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
