import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, safeEqual, tokenFor } from "@/lib/access";

// Todo pasa por acá salvo archivos estáticos y el propio login.
export async function proxy(req: NextRequest) {
  const code = process.env.ACCESS_CODE;
  const isApi = req.nextUrl.pathname.startsWith("/api/");

  if (!code) {
    // Sin código solo se permite en desarrollo local: publicada, la API gastaría tus créditos.
    if (process.env.NODE_ENV === "production" && isApi && !process.env.ALLOW_OPEN_API) {
      return Response.json({ error: "Falta ACCESS_CODE en las variables de entorno." }, { status: 503 });
    }
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE)?.value ?? "";
  if (safeEqual(cookie, await tokenFor(code))) return NextResponse.next();

  if (isApi) return Response.json({ error: "Acceso no autorizado." }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|sw.js|login|api/login|icons/).*)"],
};
