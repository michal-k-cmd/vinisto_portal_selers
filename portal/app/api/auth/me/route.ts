// Informace o přihlášeném uživateli (bez hashe).
//   GET /api/auth/me -> 200 {email, suppliers, activeSupplierId, expiresAt} | 401

import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }
  return NextResponse.json({
    email: session.email,
    suppliers: session.suppliers,
    activeSupplierId: session.activeSupplierId,
    expiresAt: session.expiresAt,
  });
}
