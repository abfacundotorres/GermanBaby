import { z } from "zod";
import { claudeConfigured, errorResponse, structured } from "@/lib/claude";
import { aiQuotaResponse } from "@/lib/quota";
import { LevelSchema, levelRules, type Level } from "@/lib/level";

const Body = z.object({
  prompt: z.string().max(600),
  genre: z.string().max(80),
  register: z.enum(["du", "Sie", "neutral"]),
  points: z.array(z.string().max(160)).max(8),
  minWords: z.number().int().min(1).max(400),
  maxWords: z.number().int().min(1).max(600),
  answer: z.string().min(1).max(6000),
  level: LevelSchema.default("A1"),
  spoken: z.boolean().default(false), // el texto es la transcripción de una grabación
  seconds: z.number().int().min(0).max(900).default(0),
});

const Criterion = z.object({
  score: z.number().int().min(0).max(5),
  comment: z.string().describe("Una frase en español que justifica el puntaje, con un ejemplo del texto si hace falta."),
});
const Rubric = z.object({
  task: Criterion, structure: Criterion, vocab: Criterion, grammar: Criterion,
  coveredPoints: z.array(z.string()).describe("Puntos de contenido cubiertos, copiados tal cual de la lista."),
  missingPoints: z.array(z.string()).describe("Puntos de contenido que faltan, copiados tal cual. Vacío si no falta ninguno."),
  errors: z.array(z.object({ fragment: z.string(), fix: z.string(), explanation: z.string() })).max(8),
  corrected: z.string().describe("El texto completo corregido con los menores cambios posibles."),
  feedback: z.string().describe("Dos o tres frases en español rioplatense: honestas, concretas, sin condescendencia, con el próximo paso más útil."),
});
export type RubricResult = z.infer<typeof Rubric>;

const system = (level: Level, spoken: boolean) => `Sos un corrector de escritura de alemán para hispanohablantes rioplatenses, nivel objetivo ${level}. Puntuás un texto con una rúbrica de cuatro criterios, de 0 a 5:
- task (cumplimiento de la consigna): 5 = cubre todos los puntos pedidos con el tipo de texto y el registro (du/Sie) correctos; baja un punto por cada punto de contenido que falta o por usar el registro equivocado.
- structure (coherencia y estructura): 5 = ideas ordenadas, conectores adecuados al nivel, saludo y cierre si el tipo de texto los pide.
- vocab (vocabulario): 5 = variado y preciso para ${level}; 3 = suficiente pero repetitivo; 1 = muy limitado.
- grammar (gramática y ortografía): 5 = prácticamente sin errores para ${level}; 3 = errores que no traban; 1 = errores que traban el sentido.
Reglas:
- El nivel de referencia es ${level}: ${levelRules(level)}. No exijas más ni premies de más.
- Si el texto tiene menos de la mitad del largo mínimo, task y structure no pueden superar 2.
- Si el texto no responde a la consigna, todos los criterios quedan en 1 o menos.
- Aceptá contenido inventado: evaluá cómo lo dice, no qué cuenta.
- Marcá solo errores reales (fragmento exacto, corrección, explicación breve); no inventes errores ni marques variantes válidas.
- Sé exigente pero justo: 5 solo si realmente es sobresaliente para ${level}.${spoken ? `
- El texto es la TRANSCRIPCIÓN AUTOMÁTICA de un monólogo hablado: no tiene puntuación fiable, y las mayúsculas y la ortografía no cuentan. Los errores gramaticales sí (la transcripción suele conservarlos). Evaluá el largo con la duración en segundos, no con las palabras escritas. En "structure" valorá la organización oral (introducción, conectores, cierre) y en "corrected" devolvé el texto con puntuación.` : ""}`;

export const maxDuration = 60;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  if (!claudeConfigured()) return Response.json({ error: "Falta ANTHROPIC_API_KEY en .env.local" }, { status: 503 });
  const blocked = await aiQuotaResponse();
  if (blocked) return blocked;
  const { prompt, genre, register, points, minWords, maxWords, answer, level, spoken, seconds } = parsed.data;
  try {
    const { output, usage } = await structured({
      schema: Rubric,
      maxTokens: 3500,
      system: system(level, spoken),
      messages: [{
        role: "user",
        content: `Consigna: ${prompt}\nTipo de texto: ${genre}\nRegistro: ${register}\nPuntos de contenido: ${points.join("; ")}\nLargo pedido: ${spoken ? `${minWords}–${maxWords} segundos (habló ${seconds} s)` : `${minWords}–${maxWords} palabras`}\nTexto del alumno:\n«${answer}»`,
      }],
    });
    return Response.json({ ...output, _usage: usage });
  } catch (err) {
    return errorResponse(err);
  }
}
