// Přehled (dashboard) — etapa 1 doplní prodeje, top produkty, provize,
// aktivní slevy a naskladnění z platformy. Etapa 0: potvrzení, že session
// a aktivní prodejce fungují.

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { MODULES } from "@/lib/modules";
import Link from "next/link";

export default async function PrehledPage() {
  const session = await requireSession();
  const supplier = activeSupplier(session);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Přehled</h1>
        <p className="text-sm text-muted-foreground">
          Přihlášen jako {session.email} · prodejce <span className="font-medium text-foreground">{supplier.name}</span>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nový portál prodejce</CardTitle>
          <CardDescription>
            Přihlášení běží proti platformě vinisto ze serveru. Jednotlivé moduly se přenáší po etapách —
            dokud modul nemá obsah, stránka to řekne.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.filter((m) => m.route !== "/").map((m) => (
              <li key={m.key}>
                <Link
                  href={m.route}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <span>{m.label}</span>
                  <span className="text-xs text-muted-foreground">etapa {m.etapa}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
