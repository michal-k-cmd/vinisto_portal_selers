// Ukončení session ze serverového layoutu: Server Components nemohou psát
// cookie, tak layout při neplatném hashi přesměruje sem a tady se cookie smaže.

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await clearSessionCookie();
  const login = new URL("/login", request.url);
  login.searchParams.set("reason", "expired");
  return NextResponse.redirect(login);
}
