import { z } from "zod";
import { claudeConfigured, errorResponse, structured } from "@/lib/claude";
import { UNITS, lessonKey } from "@/lib/curriculum";
import { ALL_CATEGORIES, TEXT_CATEGORIES } from "@/lib/mistakes";
import { tiles } from "@/lib/text";

const Body = z.object({
  mistakes: z
    .array(
      z.object({
        category: z.enum(ALL_CATEGORIES),
        wrong: z.string().max(300),
        right: z.string().max(300),
        explanation: z.string().max(500).optional(),
        prompt: z.string().max(300).optional(),
      }),
    )
    .min(1)
    .max(30),
  studied: z.array(z.string().max(80)).max(100), // claves de lecciones completadas
});

const Practice = z.object({
  focus: z.string().describe("En español rioplatense, 1-2 frases: qué patrón de error detectaste y qué vamos a practicar."),
  build: z.array(
    z.object({
      es: z.string().describe("Frase en español a armar."),
      answer: z.string().describe("La frase en alemán, sin puntuación final, máximo 8 palabras."),
      extra: z.array(z.string()).describe("2-3 palabras distractoras que NO estén en answer (típicamente la forma errónea que usa el alumno)."),
    }),
  ),
  write: z.array(
    z.object({
      es: z.string().describe("Consigna en español para traducir al alemán."),
      references: z.array(z.string()).describe("1-3 traducciones correctas."),
      hint: z.string().describe("Pista breve en español que apunta a la regla, sin dar la respuesta."),
    }),
  ),
  quiz: z.array(
    z.object({
      question: z.string().describe("Pregunta en español, p. ej. «Completá: ___ Mutter» o «¿Cuál está bien?»."),
      options: z.array(z.string()).describe("3 o 4 opciones distintas."),
      answer: z.string().describe("La opción correcta, idéntica a una de options."),
      explanation: z.string().describe("Por qué, en una línea, nivel A1."),
      category: z.enum(TEXT_CATEGORIES),
    }),
  ),
});
export type PracticeResult = z.infer<typeof Practice>;

const SYSTEM = `Sos un profesor de alemán para hispanohablantes rioplatenses de nivel A1. A partir de los errores recientes del alumno, diseñás una práctica corta y dirigida.

- Detectá 1 o 2 patrones (p. ej. «einen» con masculinos en acusativo, el verbo en segundo lugar, «-st» con du, los verbos separables). Priorizá lo que se repite.
- Generá exactamente 3 ejercicios de cada tipo (build, write, quiz) que ataquen esos patrones con frases NUEVAS: no repitas las frases donde se equivocó.
- Usá solo alemán A1 y, en lo posible, el vocabulario que el alumno ya estudió.
- Los errores de pronunciación o de comprensión auditiva no se practican por escrito: si solo hay de esos, armá ejercicios con esas mismas palabras para fijar su forma escrita y su significado.
- Español rioplatense (vos) en consignas, pistas y explicaciones.`;

// Vercel: margen para respuestas largas de Claude.
export const maxDuration = 90;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  if (!claudeConfigured()) return Response.json({ error: "Falta ANTHROPIC_API_KEY en .env.local" }, { status: 503 });

  const studied = new Set(parsed.data.studied);
  const vocab = UNITS.flatMap((u) =>
    u.lessons.filter((l) => studied.has(lessonKey(u.id, l.id))).flatMap((l) => l.vocab.map((v) => v.de)),
  );
  const list = parsed.data.mistakes
    .map(
      (m, i) =>
        `${i + 1}. [${m.category}] ${m.prompt ? `consigna «${m.prompt}» · ` : ""}escribió «${m.wrong}» · correcto «${m.right}»` +
        (m.explanation ? ` · ${m.explanation}` : ""),
    )
    .join("\n");

  try {
    const r = await structured({
      schema: Practice,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Vocabulario estudiado: ${vocab.join(", ") || "(solo lo básico)"}\n\nErrores recientes:\n${list}`,
        },
      ],
    });
    // El modelo puede equivocarse con las restricciones: filtramos lo que no se puede jugar.
    const build = r.build
      .map((b) => {
        const words = new Set(tiles(b.answer).map((w) => w.toLowerCase()));
        return { ...b, extra: b.extra.filter((e) => !words.has(e.toLowerCase())) };
      })
      .filter((b) => b.answer && tiles(b.answer).length <= 10);
    const write = r.write.filter((w) => w.es && w.references.length > 0);
    const quiz = r.quiz
      .map((q) => ({ ...q, options: [...new Set(q.options)] }))
      .filter((q) => q.options.length >= 2 && q.options.includes(q.answer));
    return Response.json({ focus: r.focus, build, write, quiz } satisfies PracticeResult);
  } catch (err) {
    return errorResponse(err);
  }
}
