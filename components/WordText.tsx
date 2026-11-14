import { splitArticle, type Gender } from "@/lib/vocab";

export const GENDER_ES: Record<Gender, string> = { der: "masculino", die: "femenino", das: "neutro" };

/** Texto alemán con el artículo de color según el género: der (azul), die (rojo), das (verde). */
export function WordText({ de }: { de: string }) {
  const { art, rest } = splitArticle(de);
  if (!art) return <span lang="de">{de}</span>;
  return (
    <span lang="de">
      <span className={`art art-${art}`}>{art}</span> {rest}
    </span>
  );
}
