import { z } from "zod";
import { claudeConfigured, errorResponse, structured } from "@/lib/claude";
import { getUnit } from "@/lib/curriculum";
import { TEXT_CATEGORIES } from "@/lib/mistakes";

const Body = z.object({
  unitId: z.string(),
  // Historial: turnos del personaje (de) y del alumno, en orden.
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(1000) }))
    .min(1)
    .max(60),
});

const Turn = z.object({
  correction: z.object({
    hasErrors: z.boolean(),
    corrected: z.string().describe("El último mensaje del alumno, corregido. Igual al original si no hay errores."),
    explanation: z.string().describe("En español, breve. Vacío si no hay errores."),
    errors: z.array(
      z.object({
        category: z.enum(TEXT_CATEGORIES),
        fragment: z.string().describe("Fragmento exacto con error, tal como lo escribió el alumno."),
        fix: z.string(),
      }),
    ).describe("Un elemento por error; vacío si no hay errores."),
  }),
  reply_de: z.string().describe("Respuesta del personaje en alemán A1: máximo 2 frases cortas, termina con una pregunta cuando tenga sentido."),
  reply_es: z.string().describe("Traducción al español de reply_de."),
  suggestions: z.array(z.string()).describe("2 respuestas posibles y simples que el alumno podría dar, en alemán."),
});
export type ChatTurn = z.infer<typeof Turn>;

// Vercel: margen para respuestas largas de Claude.
export const maxDuration = 60;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  const unit = getUnit(parsed.data.unitId);
  if (!unit) return Response.json({ error: "Unidad inexistente." }, { status: 404 });
  if (!claudeConfigured()) return Response.json({ error: "Falta ANTHROPIC_API_KEY en .env.local" }, { status: 503 });

  const vocab = unit.lessons.flatMap((l) => l.vocab.map((v) => v.de)).join(", ");
  const system = `Estás en un juego de rol para practicar alemán con un alumno hispanohablante (rioplatense) de nivel A1.

Personaje y escena: ${unit.chat.scenario}

Reglas:
- Hablá SOLO en alemán A1: frases cortas, presente, vocabulario muy frecuente. Priorizá este vocabulario que el alumno ya estudió: ${vocab}.
- Mantené el personaje y avanzá la escena; no des clases dentro de reply_de.
- Corregí el último mensaje del alumno en "correction" (gramática, artículos, orden de palabras y si lo que dijo tiene sentido en la escena). Si escribió en español, ayudalo con la frase en alemán en "corrected".
- El alumno puede hablar por micrófono: ignorá mayúsculas y puntuación faltantes, porque vienen del reconocimiento de voz.`;

  // La API exige que el primer mensaje sea del usuario: el saludo del personaje
  // se antepone como contexto.
  const all = parsed.data.history;
  const trimmed = all.length > 16 ? [all[0], ...all.slice(-15)] : all;
  const [first, ...rest] = trimmed;
  const messages = [
    { role: "user" as const, content: `(Empieza la escena. Tu primera frase fue: «${first.text}»)` },
    ...rest.map((m) => ({ role: m.role, content: m.text })),
  ];
  if (messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "El último mensaje tiene que ser del alumno." }, { status: 400 });
  }
  // Unir mensajes consecutivos del mismo rol (el contexto inicial + 1er mensaje del alumno).
  const merged: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of messages) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) last.content += "\n" + m.content;
    else merged.push({ ...m });
  }

  try {
    const { output, usage } = await structured({ schema: Turn, system, messages: merged });
    return Response.json({ ...output, _usage: usage });
  } catch (err) {
    return errorResponse(err);
  }
}
