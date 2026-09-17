"use server";

// Server actions nad session: přepnutí aktivního prodejce a odhlášení.
// Cookie se přepisuje jen tady (server), klient posílá jen id.

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { fetchAuthUserSupplier, logoutAgainstVinisto } from "./vinisto-auth";
import { clearSessionCookie, readSession, writeSessionCookie } from "./session";

export async function switchSupplierAction(supplierId: string): Promise<{ ok: boolean; error?: string }> {
  const session = await readSession();
  if (!session) redirect("/login");

  let suppliers = session.suppliers;
  if (!suppliers.some((s) => s.id === supplierId) && session.suppliersTruncated) {
    // Zkrácený seznam v cookie: ověřit u platformy, že prodejce k účtu patří.
    try {
      const profile = await fetchAuthUserSupplier(session.loginHash);
      if (profile) suppliers = profile.suppliers;
    } catch {
      return { ok: false, error: "Platforma vinisto je dočasně nedostupná." };
    }
  }
  if (!suppliers.some((s) => s.id === supplierId)) {
    return { ok: false, error: "Tento prodejce k účtu nepatří." };
  }

  await writeSessionCookie({ ...session, suppliers, activeSupplierId: supplierId, suppliersTruncated: undefined });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const session = await readSession();
  if (session) await logoutAgainstVinisto(session.loginHash);
  await clearSessionCookie();
  redirect("/login");
}
