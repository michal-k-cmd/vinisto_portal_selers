"use client";

// Inline formulář prodejní ceny (B2C / B2B). Zadává se cena s DPH; u B2B
// rychlá tlačítka slevy 5–50 % z B2C ceny s DPH (jako ve starém portálu).

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPriceAction } from "@/lib/platform/actions/products";
import { formatPrice } from "@/lib/format";

const B2B_QUICK = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export function PriceForm({
  bundleId,
  platformId,
  platformLabel,
  currency,
  vatPercent,
  priceWithVat,
  priceWithoutVat,
  b2cPriceWithVat,
}: {
  bundleId: string;
  platformId: 0 | 1;
  platformLabel: string;
  currency: string;
  vatPercent: number;
  priceWithVat: number | null;
  priceWithoutVat: number | null;
  /** B2C cena s DPH — základ pro rychlá B2B tlačítka */
  b2cPriceWithVat: number | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(priceWithVat != null ? String(priceWithVat) : "");
  const [pending, startTransition] = useTransition();
  const label = platformId === 0 ? "B2C" : "B2B";
  const numeric = Number(value);
  const withoutVat = Number.isFinite(numeric) && numeric > 0 ? numeric / (1 + vatPercent / 100) : null;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const result = await setPriceAction({ bundleId, platformId, priceWithVat: numeric });
      if (result.ok) {
        toast.success(result.message ?? "Uloženo");
        setEditing(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`price-${platformId}`}>
        Prodejní cena {platformLabel} vč. DPH{" "}
        <span className="font-normal text-muted-foreground">
          ({withoutVat != null ? formatPrice(withoutVat, currency, 2) : priceWithoutVat != null ? formatPrice(priceWithoutVat, currency, 2) : "–"} bez DPH)
        </span>
      </Label>
      {!editing ? (
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">{priceWithVat != null ? formatPrice(priceWithVat, currency) : "–"}</span>
          <Button type="button" variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" /> Nastavit {label} cenu
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <Input id={`price-${platformId}`} type="number" step="0.01" min="0.01" required value={value} onChange={(e) => setValue(e.target.value)} className="max-w-[12rem]" />
          {platformId === 1 && b2cPriceWithVat != null && (
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>Nastavit výhodnější cenu pro B2B (sleva z B2C ceny) o</div>
              <div className="flex flex-wrap gap-1">
                {B2B_QUICK.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setValue((b2cPriceWithVat * (1 - pct / 100)).toFixed(2))}
                    className="rounded border border-border px-2 py-0.5 hover:bg-accent"
                  >
                    {pct} %
                  </button>
                ))}
              </div>
              <div>Nastavením ceny se produkt automaticky zařadí do B2B prodeje.</div>
            </div>
          )}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Ukládám…" : "Uložit změny"}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => { setEditing(false); setValue(priceWithVat != null ? String(priceWithVat) : ""); }}>
              Zahodit změny
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
