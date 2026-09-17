// Seznam prodejců přihlášeného uživatele pro přepínač. Běžně ze session;
// když se seznam do cookie nevešel (suppliersTruncated), dotáhne se živě.
//   GET /api/auth/suppliers -> 200 {suppliers, activeSupplierId} | 401

import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { fetchAuthUserSupplier } from "@/lib/auth/vinisto-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  let suppliers = session.suppliers;
  if (session.suppliersTruncated) {
    try {
      const profile = await fetchAuthUserSupplier(session.loginHash);
      if (profile) suppliers = profile.suppliers;
    } catch {
      // výpadek platformy: vrátíme aspoň to, co je v session
    }
  }
  return NextResponse.json({ suppliers, activeSupplierId: session.activeSupplierId });
}
