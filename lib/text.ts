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

const words = (s: string) => s.replace(/[.,!?¿¡;:"'«»„“”’]/g, " ").split(/\s+/).filter(Boolean);

/**
 * "correct": igual salvo la puntuación y la mayúscula de la primera palabra.
 * "almost": mayúsculas mal puestas (los sustantivos alemanes van con mayúscula), ae/oe/ue/ss en vez
 *   de ä/ö/ü/ß, o un typo de 1-2 letras en una PALABRA SUELTA.
 * "incorrect": cualquier otra diferencia. En frases no se tolera ni una letra: ahí viven los
 *   errores de gramática (ein/einen, wohnt/wohnst), que no son typos.
 * ignoreCase: para fichas (el alumno no controla las mayúsculas).
 */
export function compareLocal(answer: string, expected: string, opts: { ignoreCase?: boolean } = {}): LocalVerdict {
  const a = normalize(answer);
  const e = normalize(expected);
  if (a === e) {
    if (opts.ignoreCase) return "correct";
    const aw = words(answer);
    const ew = words(expected);
    // La primera palabra puede ir en minúscula; las demás deben respetar la mayúscula.
    return aw.slice(1).every((w, i) => w === ew[i + 1]) ? "correct" : "almost";
  }
  const af = normalize(answer, { foldUmlauts: true });
  const ef = normalize(expected, { foldUmlauts: true });
  if (af === ef) return "almost";
  if (ef.includes(" ")) return "incorrect";
  return levenshtein(af, ef) <= (ef.length <= 6 ? 1 : 2) ? "almost" : "incorrect";
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

/** Respuesta a un dato oído (número, hora, precio): ignora €, «euro», «Uhr», espacios y coma/punto decimal. */
export function matchFill(input: string, answers: string[]) {
  const norm = (x: string) =>
    x.toLowerCase().normalize("NFC").replace(/€|euros?|uhr/g, "").replace(/\s+/g, "").replace(",", ".");
  const n = norm(input);
  return n !== "" && answers.some((a) => norm(a) === n);
}

export type WordAlign = { kind: "same" | "diff" | "missing" | "extra"; ref?: string; heard?: string };

const bare = (w: string) => w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");

/**
 * Alinea las palabras de la frase que había que decir con las que reconoció Azure.
 * «same» coincide, «diff» es otra palabra en el mismo lugar, «missing» no se dijo y «extra» sobra.
 */
export function alignWords(reference: string, heard: string): WordAlign[] {
  const r = reference.split(/\s+/).filter(Boolean);
  const h = heard.split(/\s+/).filter(Boolean);
  const sub = (a: string, b: string) => {
    const x = bare(a), y = bare(b);
    if (x === y) return 0;
    return 0.6 + (0.4 * levenshtein(x, y)) / Math.max(x.length, y.length, 1);
  };
  const D = Array.from({ length: r.length + 1 }, () => new Array<number>(h.length + 1).fill(0));
  for (let i = 1; i <= r.length; i++) D[i][0] = i;
  for (let j = 1; j <= h.length; j++) D[0][j] = j;
  for (let i = 1; i <= r.length; i++)
    for (let j = 1; j <= h.length; j++)
      D[i][j] = Math.min(D[i - 1][j - 1] + sub(r[i - 1], h[j - 1]), D[i - 1][j] + 1, D[i][j - 1] + 1);
  const out: WordAlign[] = [];
  let i = r.length, j = h.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && Math.abs(D[i][j] - (D[i - 1][j - 1] + sub(r[i - 1], h[j - 1]))) < 1e-9) {
      out.push({ kind: sub(r[i - 1], h[j - 1]) === 0 ? "same" : "diff", ref: r[i - 1], heard: h[j - 1] });
      i--; j--;
    } else if (i > 0 && Math.abs(D[i][j] - (D[i - 1][j] + 1)) < 1e-9) {
      out.push({ kind: "missing", ref: r[i - 1] });
      i--;
    } else {
      out.push({ kind: "extra", heard: h[j - 1] });
      j--;
    }
  }
  return out.reverse();
}
