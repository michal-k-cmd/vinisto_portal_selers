// PDF požadavku na naskladnění — proxy na platformu, hash zůstává na serveru.

import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { downloadStockingRequestPdf } from "@/lib/platform/stocking-requests";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  const { id } = await params;
  try {
    const upstream = await downloadStockingRequestPdf(id, session.loginHash);
    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/pdf",
        "Content-Disposition": `inline; filename="naskladneni-${id}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[stocking pdf]", error);
    return NextResponse.json({ error: "PDF se nepodařilo stáhnout" }, { status: 502 });
  }
}
