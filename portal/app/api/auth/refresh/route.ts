// Revalidace session u platformy (nahrazuje AuthorizationService ze SPA,
// který každých 5 minut volal GetAuthUserSupplier). Volá ji klientská
// komponenta SessionRefresh, když je session starší než SESSION_REVALIDATE_MS.
//   POST /api/auth/refresh -> 200 {ok:true} | 401 (session zaniká, cookie smazána)

import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/auth/origin";
import { clearSessionCookie, readSession, writeSessionCookie } from "@/lib/auth/session";
import { revalidateSession } from "@/lib/auth/vinisto-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin požadavek odmítnut" }, { status: 403 });
  }
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const refreshed = await revalidateSession(session);
  if (!refreshed) {
    await clearSessionCookie();
    return NextResponse.json({ error: "Session vypršela" }, { status: 401 });
  }
  await writeSessionCookie(refreshed);
  return NextResponse.json({ ok: true, validatedAt: refreshed.validatedAt });
}
