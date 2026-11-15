import { z } from "zod";
import { claudeConfigured, errorResponse, structured } from "@/lib/claude";
import { aiQuotaResponse } from "@/lib/quota";
import { LevelSchema, levelRules, type Level } from "@/lib/level";

const Body = z.object({
  prompt: z.string().max(400), // consigna en español
  focus: z.array(z.string().max(120)).max(6), // estructuras que debería usar
  answer: z.string().min(1).max(1200), // el texto del alumno
  level: LevelSchema.default("A1"),
});

const Free = z.object({
  verdict: z.enum(["correct", "almost", "incorrect"]),
  corrected: z.string().describe("El texto completo del alumno, corregido con los menores cambios posibles."),
  errors: z.array(
    z.object({
      category: z.enum(["gramática", "artículo/género", "orden de palabras", "vocabulario", "ortografía", "significado"]),
      fragment: z.string().describe("Fragmento exacto con error, tal como lo escribió el alumno."),
      fix: z.string(),
      explanation: z.string().describe("Explicación breve en español, al nivel del alumno."),
    }),
  ),
  usedFocus: z.boolean().describe("true si el texto usa de verdad las estructuras pedidas (aunque tengan algún error)."),
  natural: z.string().describe("Una versión del texto algo más natural o más rica, al nivel del alumno. Vacío si no hace falta."),
  feedback: z.string().describe("Una o dos frases en español rioplatense: honestas, cálidas, sin condescendencia."),
});
export type FreeResult = z.infer<typeof Free>;

const system = (level: Level) => `Sos un profesor de alemán para hispanohablantes rioplatenses de nivel ${level}. El alumno escribió varias frases propias a partir de una consigna; las corregís.

Criterios:
- "correct": el texto es gramatical, responde a la consigna y se entiende bien.
- "almost": se entiende y responde a la consigna, pero hay errores menores (ortografía, umlauts como ae/oe/ue, mayúsculas de sustantivos, un artículo o una terminación) o una frase floja.
- "incorrect": hay errores gramaticales que cambian o traban el sentido (conjugación, caso, orden del verbo, falta o sobra una palabra clave), o no responde a la consigna.
- Aceptá cualquier contenido personal e inventado: no corrijas lo que el alumno cuenta, solo cómo lo dice.
- Marcá solo los errores reales; un error por elemento, con la regla mínima necesaria para ${level}. No inventes errores ni marques como error una variante válida.
- "usedFocus": ¿usó las estructuras pedidas? Si no las usó, el veredicto no puede ser "correct".
- El alumno ya maneja: ${levelRules(level)}. No le exijas construcciones más avanzadas.
- "natural": una versión algo mejor del mismo contenido, sin cambiar lo que dice. Si ya es natural, dejalo vacío.`;

// Vercel: margen para respuestas largas de Claude.
export const maxDuration = 60;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  if (!claudeConfigured()) return Response.json({ error: "Falta ANTHROPIC_API_KEY en .env.local" }, { status: 503 });
  const blocked = await aiQuotaResponse();
  if (blocked) return blocked;
  const { prompt, focus, answer, level } = parsed.data;
  try {
    const { output, usage } = await structured({
      schema: Free,
      maxTokens: 3000,
      system: system(level),
      messages: [
        {
          role: "user",
          content: `Consigna: ${prompt}\nEstructuras que debía usar: ${focus.join("; ") || "(ninguna en particular)"}\nTexto del alumno:\n«${answer}»`,
        },
      ],
    });
    return Response.json({ ...output, _usage: usage });
  } catch (err) {
    return errorResponse(err);
  }
}
