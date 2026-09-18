// Chráněný shell portálu: validace session NA SERVERU. Hlavička vinisto
// zelená, navigace v sidebaru (desktop) / draweru (mobil), patička merkatos.

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileMenuProvider } from "@/components/mobile-menu";
import { SessionRefresh } from "@/components/session-refresh";
import { SupportChat } from "@/components/support-chat";
import { SESSION_REVALIDATE_MS } from "@/lib/auth/constants";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { fetchAuthUserSupplier } from "@/lib/auth/vinisto-auth";
import { isPlatformAuthError } from "@/lib/platform/errors";
import { MODULES } from "@/lib/modules";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const stale = Date.now() - session.validatedAt > SESSION_REVALIDATE_MS;

  // Starou session ověříme u platformy hned na serveru (bez zápisu cookie —
  // to udělá klient přes /api/auth/refresh). Neplatný hash = konec session.
  if (stale) {
    try {
      const profile = await fetchAuthUserSupplier(session.loginHash);
      if (!profile) redirect("/api/auth/expire");
    } catch (error) {
      if (isPlatformAuthError(error)) redirect("/api/auth/expire");
      // výpadek platformy: necháme uživatele pracovat, stránky si chybu ukážou samy
    }
  }

  const supplier = activeSupplier(session);
  const chatId = process.env.SUPPORTBOX_CHAT_ID ?? "";
  const chatSecret = process.env.SUPPORTBOX_CHAT_SECRET ?? "";

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SessionRefresh stale={stale} />
      {chatId && chatSecret ? (
        <SupportChat chatId={chatId} chatSecret={chatSecret} email={session.email} supplierName={supplier.name} supplierId={supplier.id} />
      ) : null}
      <MobileMenuProvider>
        <AppHeader supplierName={supplier.name} />
        <div className="flex min-h-0 flex-1">
          <Suspense
            fallback={<div className="hidden w-64 shrink-0 border-r border-border bg-muted/40 lg:block" />}
          >
            <AppSidebar
              modules={MODULES}
              email={session.email}
              suppliers={session.suppliers}
              activeSupplierId={session.activeSupplierId}
              suppliersTruncated={session.suppliersTruncated}
            />
          </Suspense>
          <main className="min-w-0 flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </MobileMenuProvider>
      <AppFooter />
    </div>
  );
}
