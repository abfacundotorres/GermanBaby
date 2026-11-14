// Ayudas para mostrar vocabulario: separar el artículo (der/die/das) y su género.

export type Gender = "der" | "die" | "das";

const ARTICLE = /^(der|die|das)\s+(.+)$/i;

/** «der Kaffee» → { art: "der", rest: "Kaffee" }. Si no empieza con artículo, art es null. */
export function splitArticle(de: string): { art: Gender | null; rest: string } {
  const m = ARTICLE.exec(de.trim());
  if (!m) return { art: null, rest: de };
  return { art: m[1].toLowerCase() as Gender, rest: m[2] };
}

/** Un sustantivo suelto: «der Kaffee», «die Milch»; no frases largas. */
export function isNoun(de: string) {
  const { art, rest } = splitArticle(de);
  return art !== null && rest.split(/\s+/).length <= 2;
}

/** Plural indicado en la nota («Plural: «die Äpfel»»), si lo hay. */
export function pluralFromNote(note?: string): string | null {
  const m = note?.match(/Plural:\s*«([^»]+)»/);
  return m ? m[1] : null;
}
