// PDF vyúčtování (výchozí) nebo faktury (?typ=faktura) — proxy na platformu.

import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { downloadBillingPdf } from "@/lib/platform/billing";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  const { id } = await params;
  const invoice = new URL(request.url).searchParams.get("typ") === "faktura";
  try {
    const upstream = await downloadBillingPdf(id, session.loginHash, invoice ? "Invoice" : "Billing");
    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/pdf",
        "Content-Disposition": `inline; filename="${invoice ? "faktura" : "vyuctovani"}-${id}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[billing pdf]", error);
    return NextResponse.json({ error: "PDF se nepodařilo stáhnout" }, { status: 502 });
  }
}
