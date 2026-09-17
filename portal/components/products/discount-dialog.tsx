"use client";

// Modal „Nastavit B2C slevu“: částka nebo procento (2–55 %), platnost od/do,
// náhled ceny po slevě. Nová sleva přepisuje překrývající se předchozí.

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDiscountAction } from "@/lib/platform/actions/products";
import { DISCOUNT_PERCENT_MAX, DISCOUNT_PERCENT_MIN } from "@/lib/platform/products-constants";
import { formatPrice } from "@/lib/format";

function toLocalInput(sec: number): string {
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function DiscountButton({
  bundleId,
  priceWithVat,
  lowestPriceWithVat,
  currency,
  initial,
  label = "+ Přidat B2C slevu",
}: {
  bundleId: string;
  priceWithVat: number;
  lowestPriceWithVat: number | null;
  currency: string;
  /** předvyplnění při „Upravit“ */
  initial?: { discountedWithVat: number; validFrom: number | null; validTo: number | null };
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" size="sm" variant={initial ? "outline" : "default"} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <DiscountDialog open={open} onClose={() => setOpen(false)} bundleId={bundleId} priceWithVat={priceWithVat} lowestPriceWithVat={lowestPriceWithVat} currency={currency} initial={initial} />
    </>
  );
}

export function DiscountDialog({
  open,
  onClose,
  bundleId,
  priceWithVat,
  lowestPriceWithVat,
  currency,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  bundleId: string;
  priceWithVat: number;
  lowestPriceWithVat: number | null;
  currency: string;
  initial?: { discountedWithVat: number; validFrom: number | null; validTo: number | null };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [mode, setMode] = useState<"amount" | "percent">("amount");
  const [amount, setAmount] = useState(initial ? String(Math.round(priceWithVat - initial.discountedWithVat)) : "");
  const [percent, setPercent] = useState(initial ? String(Math.round(((priceWithVat - initial.discountedWithVat) / priceWithVat) * 100)) : "");
  const nowSec = Math.floor(Date.now() / 1000);
  const [validFrom, setValidFrom] = useState(initial?.validFrom ? toLocalInput(initial.validFrom) : "");
  const [validTo, setValidTo] = useState(initial?.validTo ? toLocalInput(initial.validTo) : "");

  const afterDiscount = useMemo(() => {
    const a = Number(amount);
    const p = Number(percent);
    if (mode === "amount" && a > 0) return priceWithVat - a;
    if (mode === "percent" && p > 0) return priceWithVat - (priceWithVat / 100) * p;
    return priceWithVat;
  }, [mode, amount, percent, priceWithVat]);

  const amountMin = Math.round((priceWithVat / 100) * DISCOUNT_PERCENT_MIN);
  const amountMax = Math.round((priceWithVat / 100) * DISCOUNT_PERCENT_MAX);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const result = await createDiscountAction({
        bundleId,
        mode,
        value: mode === "amount" ? Number(amount) : Number(percent),
        validFrom: validFrom ? Math.floor(new Date(validFrom).getTime() / 1000) : undefined,
        validTo: validTo ? Math.floor(new Date(validTo).getTime() / 1000) : null,
      });
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        onClose();
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onClose={onClose} title="Nastavit B2C slevu">
      <form onSubmit={submit} className="space-y-4 text-sm">
        <p className="rounded-md bg-accent p-3 text-xs text-accent-foreground">
          Maximální výše slevy je {DISCOUNT_PERCENT_MAX} %. Na jeden produkt jde v jeden moment nastavit pouze jedna sleva. Pokud se časová období
          překrývají, nově nastavená sleva přepíše slevu předchozí. Doba trvání slevy může být neomezená (např. v případě výprodeje).
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs text-muted-foreground">Prodejní cena B2C vč. DPH</div>
            <div className="font-medium">{formatPrice(priceWithVat, currency)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Nejnižší aktuální cena produktu na platformě (vč. DPH)</div>
            <div className="font-medium">{lowestPriceWithVat != null ? formatPrice(lowestPriceWithVat, currency) : "–"}</div>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="font-medium">Snížit cenu o</legend>
          <label className="flex items-center gap-2">
            <input type="radio" checked={mode === "amount"} onChange={() => setMode("amount")} />
            <Input type="number" min={amountMin} max={amountMax} step="1" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={mode !== "amount"} className="max-w-[9rem]" />
            <span>{currency === "CZK" ? "Kč" : currency}</span>
            <span className="text-xs text-muted-foreground">({amountMin}–{amountMax})</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={mode === "percent"} onChange={() => setMode("percent")} />
            <Input type="number" min={DISCOUNT_PERCENT_MIN} max={DISCOUNT_PERCENT_MAX} step="1" value={percent} onChange={(e) => setPercent(e.target.value)} disabled={mode !== "percent"} className="max-w-[9rem]" />
            <span>%</span>
            <span className="text-xs text-muted-foreground">({DISCOUNT_PERCENT_MIN}–{DISCOUNT_PERCENT_MAX})</span>
          </label>
        </fieldset>

        <div>
          <div className="text-xs text-muted-foreground">Cena po slevě vč. DPH</div>
          <div className="text-lg font-semibold">{formatPrice(afterDiscount, currency)}</div>
        </div>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-1 font-medium">Platnost slevy</legend>
          <div className="space-y-1">
            <Label htmlFor="d-from">od</Label>
            <Input id="d-from" type="datetime-local" value={validFrom} min={toLocalInput(nowSec)} onChange={(e) => setValidFrom(e.target.value)} placeholder="ihned (za hodinu)" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="d-to">do</Label>
            <Input id="d-to" type="datetime-local" value={validTo} min={validFrom || toLocalInput(nowSec)} onChange={(e) => setValidTo(e.target.value)} />
            <p className="text-xs text-muted-foreground">Prázdné = nekončící sleva.</p>
          </div>
        </fieldset>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Ukládám…" : "Nastavit B2C slevu"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
