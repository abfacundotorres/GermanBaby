// Categorías de error compartidas por el cliente y las rutas API.

export const TEXT_CATEGORIES = [
  "gramática",
  "artículo/género",
  "orden de palabras",
  "vocabulario",
  "ortografía",
  "significado",
] as const;

export const ALL_CATEGORIES = [...TEXT_CATEGORIES, "pronunciación", "comprensión auditiva"] as const;
export type MistakeCategory = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_EMOJI: Record<MistakeCategory, string> = {
  "gramática": "🧩",
  "artículo/género": "🏷️",
  "orden de palabras": "🔀",
  "vocabulario": "📖",
  "ortografía": "✍️",
  "significado": "💭",
  "pronunciación": "🗣️",
  "comprensión auditiva": "👂",
};

export type MistakeInput = {
  category: MistakeCategory;
  wrong: string;
  right: string;
  explanation?: string;
};
