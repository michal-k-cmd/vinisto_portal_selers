// Společný obal stránky nastavení: nadpis, popis a načtení profilu s chybou.

import { DataError } from "@/components/data-error";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { getSupplierProfile, type SupplierProfile } from "@/lib/platform/supplier";
import type { PortalSession } from "@/lib/auth/server";

export async function loadSettings(): Promise<{ session: PortalSession; profile: SupplierProfile | null; error: unknown }> {
  const session = await requireSession();
  const supplier = activeSupplier(session);
  try {
    const profile = await getSupplierProfile(session.loginHash, supplier.id);
    return { session, profile, error: profile ? null : new Error("Prodejce nebyl v odpovědi platformy nalezen.") };
  } catch (error) {
    return { session, profile: null, error };
  }
}

export function SettingsSection({ title, description, error, children }: { title: string; description?: string; error?: unknown; children?: React.ReactNode }) {
  return (
    <section className="max-w-3xl space-y-3 rounded-lg border border-border bg-card p-4">
      <div>
        <h2 className="font-heading text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {error ? <DataError error={error} what="Profil prodejce" /> : children}
    </section>
  );
}
