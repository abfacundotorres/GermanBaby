// Código de acceso personal. Protege la app publicada para que nadie más
// gaste tus créditos de Claude y Azure. Funciona en Edge y Node (Web Crypto).

export const COOKIE = "gb_access";

export async function tokenFor(code: string) {
  const data = new TextEncoder().encode(`germanbaby:${code}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
