// Přihlášení do portálu proti platformě vinisto.
//   POST /api/auth/login { email, password }
// Heslo se nikam neukládá ani neloguje — jen se přepošle na vinisto Login.

import { NextRequest, NextResponse } from "next/server";
import { loginAgainstVinisto } from "@/lib/auth/vinisto-auth";
import { sessionConfigError, writeSessionCookie } from "@/lib/auth/session";
import { isSameOrigin } from "@/lib/auth/origin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin požadavek odmítnut" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Vyplňte e-mail a heslo" }, { status: 400 });
  }

  const configError = sessionConfigError() ?? (!process.env.VINISTO_API_URL ? "Chybí VINISTO_API_URL." : null);
  if (configError) {
    console.error("[login] konfigurace:", configError);
    return NextResponse.json({ error: `Server není nakonfigurovaný: ${configError} Nastavte ENV ve Vercelu.` }, { status: 500 });
  }

  const result = await loginAgainstVinisto(email, password);

  if (!result.ok) {
    if (result.reason === "bad_credentials") {
      // malé zpomalení proti hádání hesel
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ error: `Nesprávný e-mail nebo heslo${result.detail ? ` (${result.detail})` : ""}` }, { status: 401 });
    }
    if (result.reason === "no_suppliers") {
      return NextResponse.json(
        { error: "K účtu není přiřazený žádný prodejce. Ozvěte se na prodejce@vinisto.cz." },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { error: `Přihlášení momentálně není dostupné${result.detail ? ` (${result.detail})` : ""}` },
      { status: 502 },
    );
  }

  await writeSessionCookie(result.session);
  const { session } = result;
  return NextResponse.json({
    email: session.email,
    suppliers: session.suppliers,
    activeSupplierId: session.activeSupplierId,
    expiresAt: session.expiresAt,
  });
}
