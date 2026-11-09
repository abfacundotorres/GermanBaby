// Comparación tolerante de texto en alemán (sin IA): sirve para el camino
// rápido (respuesta exacta = no se llama a Claude) y para dictados.

export function normalize(s: string, opts: { foldUmlauts?: boolean } = {}) {
  let t = s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?¿¡;:"'«»„“”’]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (opts.foldUmlauts) {
    t = t.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  }
  return t;
}

export function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

export type LocalVerdict = "correct" | "almost" | "incorrect";

/**
 * "correct": igual salvo mayúsculas/puntuación.
 * "almost": igual escribiendo ae/oe/ue/ss, o con 1-2 letras de diferencia.
 */
export function compareLocal(answer: string, expected: string): LocalVerdict {
  const a = normalize(answer);
  const e = normalize(expected);
  if (a === e) return "correct";
  const af = normalize(answer, { foldUmlauts: true });
  const ef = normalize(expected, { foldUmlauts: true });
  if (af === ef) return "almost";
  const tolerance = ef.length <= 6 ? 1 : 2;
  return levenshtein(af, ef) <= tolerance ? "almost" : "incorrect";
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tokeniza una frase alemana en fichas para el ejercicio de armar frases. */
export function tiles(sentence: string) {
  return sentence.replace(/[.,!?]/g, "").split(/\s+/).filter(Boolean);
}
