// Nivel de estudio (A1 o A2). Lo usan la pantalla de inicio y las llamadas a Claude,
// para que corrija y converse con el nivel del alumno. Sin "use client": sirve en el servidor.

import { z } from "zod";

export const LevelSchema = z.enum(["A1", "A2"]);
export type Level = z.infer<typeof LevelSchema>;

/** Qué se le permite usar a Claude en alemán, según el nivel. */
export function levelRules(level: Level) {
  return level === "A2"
    ? "frases cortas o medianas; presente, Perfekt, Präteritum de sein/haben/modales, imperativo, oraciones con weil/dass/wenn y adjetivos con terminación; vocabulario frecuente"
    : "frases cortas, presente, vocabulario muy frecuente";
}

let studyLevel: Level = "A1";
/** Nivel de la lección o charla que se está estudiando ahora (lo fija el reproductor). */
export const setStudyLevel = (l: Level) => { studyLevel = l; };
export const getStudyLevel = () => studyLevel;
