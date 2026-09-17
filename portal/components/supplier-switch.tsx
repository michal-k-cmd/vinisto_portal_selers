"use client";

// Přepínač aktivního prodejce (uživatel může mít víc prodejců). Změna jde
// přes server action, která přepíše session cookie — klient posílá jen id.
// Když se seznam do cookie nevešel (truncated), dotáhne se z /api/auth/suppliers.

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { switchSupplierAction } from "@/lib/auth/actions";
import type { SessionSupplier } from "@/lib/auth/session";

export function SupplierSwitch({
  suppliers: initial,
  activeSupplierId,
  truncated = false,
}: {
  suppliers: SessionSupplier[];
  activeSupplierId: string;
  truncated?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [suppliers, setSuppliers] = useState(initial);

  useEffect(() => {
    setSuppliers(initial);
  }, [initial]);

  useEffect(() => {
    if (!truncated) return;
    let cancelled = false;
    fetch("/api/auth/suppliers")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { suppliers?: SessionSupplier[] } | null) => {
        if (!cancelled && data?.suppliers?.length) setSuppliers(data.suppliers);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [truncated]);

  const active = suppliers.find((s) => s.id === activeSupplierId) ?? suppliers[0];

  if (suppliers.length <= 1 && !truncated) {
    return (
      <div className="truncate px-1 text-sm font-medium" title={active?.name}>
        {active?.name ?? "—"}
      </div>
    );
  }

  return (
    <label className="block px-1">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Prodejce</span>
      <select
        className="mt-0.5 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm disabled:opacity-60"
        value={activeSupplierId}
        disabled={pending}
        onChange={(event) => {
          const id = event.target.value;
          startTransition(async () => {
            const result = await switchSupplierAction(id);
            if (!result.ok) {
              toast.error(result.error ?? "Prodejce se nepodařilo přepnout");
              return;
            }
            router.refresh();
          });
        }}
      >
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name || s.id}
          </option>
        ))}
      </select>
    </label>
  );
}
