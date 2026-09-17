// Čtení session v Server Components / Server Actions. Ochrana rout se
// vynucuje NA SERVERU — layout (app) přesměruje nepřihlášené na /login.

import "server-only";
import { redirect } from "next/navigation";
import { readSession, type PortalSession, type SessionSupplier } from "./session";

export type { PortalSession, SessionSupplier };

export async function getServerSession(): Promise<PortalSession | null> {
  return readSession();
}

/** Vynutí přihlášení; jinak redirect na /login. */
export async function requireSession(): Promise<PortalSession> {
  const session = await readSession();
  if (!session) redirect("/login");
  return session;
}

/** Aktivní prodejce ze session (id + název). */
export function activeSupplier(session: PortalSession): SessionSupplier {
  return (
    session.suppliers.find((s) => s.id === session.activeSupplierId) ?? session.suppliers[0]
  );
}
