import { z } from "zod";
import { claudeConfigured, errorResponse, structured } from "@/lib/claude";
import { LevelSchema, levelRules } from "@/lib/level";

const Body = z.object({
  es: z.string().max(500), // consigna en español
  references: z.array(z.string().max(500)).min(1).max(10), // respuestas modelo
  answer: z.string().min(1).max(500), // lo que escribió el alumno
  hint: z.string().max(300).optional(),
  level: LevelSchema.default("A1"),
});

const Correction = z.object({
  verdict: z.enum(["correct", "almost", "incorrect"]),
  corrected: z.string().describe("La respuesta del alumno corregida, lo más cerca posible de lo que quiso decir."),
  errors: z.array(
    z.object({
      category: z.enum(["gramática", "artículo/género", "orden de palabras", "vocabulario", "ortografía", "significado"]),
      fragment: z.string().describe("Fragmento exacto con error, tal como lo escribió el alumno."),
      fix: z.string(),
      explanation: z.string().describe("Explicación breve en español, al nivel del alumno."),
    }),
  ),
  feedback: z.string().describe("Una o dos frases en español rioplatense: honestas, cálidas, sin condescendencia."),
});
export type CorrectionResult = z.infer<typeof Correction>;

const system = (level: "A1" | "A2") => `Sos un profesor de alemán para hispanohablantes rioplatenses de nivel ${level}. Corregís traducciones del español al alemán.

Criterios:
- "correct": la frase es gramatical y significa lo mismo que la consigna. Aceptá variantes válidas aunque no estén en las respuestas modelo (sinónimos, otro orden posible, formal/informal si la consigna no lo fija).
- "almost": el significado está bien, pero hay un error menor: un umlaut escrito como ae/oe/ue, mayúscula faltante en un sustantivo o un error de tipeo.
- "incorrect": error gramatical real (conjugación, artículo, caso, orden del verbo) o el significado no coincide.
- Ignorá la puntuación y la mayúscula inicial de la frase.
- Revisá también la semántica: si la frase es gramatical pero dice otra cosa, la categoría es "significado".
- Explicá cada error en una línea, con la regla mínima necesaria para ${level}. Sin listas de excepciones ni terminología innecesaria.
- Si no hay errores, devolvé "errors" vacío y "corrected" igual a la respuesta.
- El alumno ya maneja: ${levelRules(level)}. Aceptá construcciones de su nivel aunque no estén en las respuestas modelo.`;

// Vercel: margen para respuestas largas de Claude.
export const maxDuration = 60;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  if (!claudeConfigured()) {
    return Response.json({ error: "Falta ANTHROPIC_API_KEY en .env.local" }, { status: 503 });
  }
  const { es, references, answer, hint, level } = parsed.data;
  try {
    const { output, usage } = await structured({
      schema: Correction,
      system: system(level),
      messages: [
        {
          role: "user",
          content:
            `Consigna (traducir al alemán): ${es}\n` +
            `Respuestas modelo: ${references.map((r) => `«${r}»`).join(", ")}\n` +
            (hint ? `Pista que vio el alumno: ${hint}\n` : "") +
            `Respuesta del alumno: «${answer}»`,
        },
      ],
    });
    return Response.json({ ...output, _usage: usage });
  } catch (err) {
    return errorResponse(err);
  }
}
