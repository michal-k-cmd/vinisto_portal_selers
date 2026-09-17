// XLS export vyúčtování — proxy na platformu, hash zůstává na serveru.

import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { downloadBillingXls } from "@/lib/platform/billing";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  const { id } = await params;
  try {
    const upstream = await downloadBillingXls(id, session.loginHash);
    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": upstream.headers.get("content-disposition") ?? `attachment; filename="vyuctovani-${id}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[billing xls]", error);
    return NextResponse.json({ error: "XLS se nepodařilo stáhnout" }, { status: 502 });
  }
}
