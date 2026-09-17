// Ochrana proti CSRF u cookie-autentizovaných mutací: SameSite=Lax cookie
// cross-site POST nepošle, a navíc odmítáme requesty s cizím Origin.

import type { NextRequest } from "next/server";

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // ne-browser klienti (curl, server-to-server)
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
