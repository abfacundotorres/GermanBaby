import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { z } from "zod";

// Haiku por defecto: ~40 veces más barato que Opus. Para más calidad en las
// explicaciones, poné CLAUDE_MODEL=claude-sonnet-5-5 o claude-opus-5-5.
export const MODEL = process.env.CLAUDE_MODEL || "claude-haiku-5-5";

export type Usage = { input: number; output: number; model: string };

// Los respaldos ante rechazo del lado del servidor existen para Opus/Sonnet/Fable,
// no para Haiku.
const SUPPORTS_FALLBACK = /opus|sonnet|fable/.test(MODEL);

let client: Anthropic | null = null;
export const claudeConfigured = () => Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

export class ClaudeRefusal extends Error {}

/** Una llamada a Claude cuya respuesta se valida contra un esquema Zod. */
export async function structured<S extends z.ZodType>(args: {
  schema: S;
  system: string;
  messages: Anthropic.Beta.BetaMessageParam[];
}): Promise<{ output: z.infer<S>; usage: Usage }> {
  client ??= new Anthropic();
  const res = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    system: args.system,
    messages: args.messages,
    // Tareas cortas de tutoría: esfuerzo bajo = respuestas rápidas y baratas.
    output_config: { effort: "low", format: betaZodOutputFormat(args.schema) },
    ...(SUPPORTS_FALLBACK ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const } : {}),
  });
  if (res.stop_reason === "refusal") throw new ClaudeRefusal("El modelo no pudo responder a este mensaje.");
  if (!res.parsed_output) throw new Error(`Respuesta sin formato válido (stop_reason: ${res.stop_reason}).`);
  // output_tokens incluye los tokens de razonamiento, que también se cobran.
  return {
    output: res.parsed_output,
    usage: { input: res.usage.input_tokens, output: res.usage.output_tokens, model: res.model ?? MODEL },
  };
}

export function errorResponse(err: unknown) {
  if (err instanceof ClaudeRefusal) return Response.json({ error: err.message }, { status: 422 });
  if (err instanceof Anthropic.AuthenticationError)
    return Response.json({ error: "La clave ANTHROPIC_API_KEY no es válida." }, { status: 500 });
  if (err instanceof Anthropic.RateLimitError)
    return Response.json({ error: "Demasiadas solicitudes. Esperá unos segundos." }, { status: 429 });
  if (err instanceof Anthropic.APIConnectionError)
    return Response.json({ error: "No pude conectarme con Claude. Revisá tu conexión." }, { status: 502 });
  if (err instanceof Anthropic.APIError)
    return Response.json({ error: `Error de la API de Claude (${err.status}).` }, { status: 502 });
  console.error(err);
  return Response.json({ error: "Error inesperado al corregir." }, { status: 500 });
}
