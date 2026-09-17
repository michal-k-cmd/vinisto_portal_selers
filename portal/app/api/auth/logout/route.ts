// Odhlášení: zneplatní vinisto loginHash (best-effort) a smaže session cookie.

import { NextRequest, NextResponse } from "next/server";
import { logoutAgainstVinisto } from "@/lib/auth/vinisto-auth";
import { clearSessionCookie, readSession } from "@/lib/auth/session";
import { isSameOrigin } from "@/lib/auth/origin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin požadavek odmítnut" }, { status: 403 });
  }
  const session = await readSession();
  if (session) await logoutAgainstVinisto(session.loginHash);
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
