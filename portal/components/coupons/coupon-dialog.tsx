"use client";

// Dialog „Vytvořit nový kupón / Upravit kupón“ — port CreateOrUpdateDiscountCouponForm.
// Data se posílají server action; datumy jsou v pražském čase.

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCouponAction, type CouponFormInput } from "@/lib/platform/actions/discount-coupons";

export type CouponFormValues = {
  id?: string;
  isReusable: "true" | "false";
  code: string;
  discountCouponType: "AMOUNT" | "PERCENTAGE";
  validFrom: string;
  validTo: string;
  percentageDiscount: string;
  amountDiscount: string;
  hasMinOrderValue: boolean;
  minOrderValue: string;
};

function plusDays(base: string, days: number): string {
  const d = base ? new Date(base) : new Date();
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function defaultCouponValues(): CouponFormValues {
  const now = plusDays("", 0);
  return {
    isReusable: "false",
    code: "",
    discountCouponType: "PERCENTAGE",
    validFrom: now,
    validTo: plusDays(now, 14),
    percentageDiscount: "",
    amountDiscount: "",
    hasMinOrderValue: false,
    minOrderValue: "",
  };
}

export function CouponDialog({
  open,
  onClose,
  initial,
  prefix,
  eurRate,
}: {
  open: boolean;
  onClose: () => void;
  initial: CouponFormValues;
  prefix: string;
  eurRate: number | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<CouponFormValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const edit = Boolean(initial.id);
  const set = <K extends keyof CouponFormValues>(key: K, value: CouponFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  function onValidFromChange(value: string) {
    setValues((v) => {
      const min = plusDays(value, 14);
      const to = !v.validTo || (min && v.validTo < min) ? min : v.validTo;
      return { ...v, validFrom: value, validTo: to };
    });
    setErrors((e) => ({ ...e, validFrom: "", validTo: "" }));
  }

  const eur =
    values.discountCouponType === "AMOUNT" && values.amountDiscount && eurRate
      ? (Number(values.amountDiscount) / eurRate).toLocaleString("cs-CZ", { style: "currency", currency: "EUR" })
      : null;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input: CouponFormInput = { ...values };
    startTransition(async () => {
      const result = await saveCouponAction(input);
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        onClose();
        router.refresh();
      } else if (result.field) {
        setErrors({ [result.field]: result.error });
      } else {
        toast.error(result.error);
      }
    });
  }

  const err = (k: string) => (errors[k] ? <p className="text-xs text-vinisto-wine">{errors[k]}</p> : null);

  return (
    <Dialog open={open} onClose={onClose} title={edit ? "Upravit kupón" : "Vytvořit nový kupón"}>
      <form onSubmit={submit} className="space-y-5 text-sm">
        <p className="text-xs text-muted-foreground">
          Všechny vytvořené kupóny jsou ve výchozím stavu neaktivní. Vytvořené kupóny lze upravit nebo smazat pouze do jejich aktivace.
        </p>

        <fieldset className="space-y-1.5">
          <legend className="font-medium">Použití *</legend>
          <label className="flex items-center gap-2">
            <input type="radio" name="isReusable" value="false" checked={values.isReusable === "false"} onChange={() => set("isReusable", "false")} />
            Jednorázový <em className="text-xs text-muted-foreground">(Kupón lze použít právě jednou)</em>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="isReusable" value="true" checked={values.isReusable === "true"} onChange={() => set("isReusable", "true")} />
            Znovupoužitelný <em className="text-xs text-muted-foreground">(Bez omezení použití do vypršení platnosti)</em>
          </label>
        </fieldset>

        <div className="space-y-1.5">
          <Label htmlFor="c-code">Kód kupónu *</Label>
          <div className="flex items-center gap-1">
            {prefix && <span className="text-muted-foreground">{prefix}</span>}
            <Input id="c-code" value={values.code} onChange={(e) => set("code", e.target.value.replace(/\s/g, "").toUpperCase())} required autoComplete="off" />
          </div>
          {err("code")}
          <p className="text-xs text-muted-foreground">
            Kupón nesmí obsahovat mezery. Každý Vámi vytvořený kupón může vlastnit definovanou předponu (zobrazenou v poli formuláře). Pokud si přejete tuto předponu změnit, neváhejte nás kontaktovat.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="c-from">Platnost kupónu od *</Label>
            <Input id="c-from" type="datetime-local" value={values.validFrom} onChange={(e) => onValidFromChange(e.target.value)} required />
            {err("validFrom")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-to">Platnost kupónu do *</Label>
            <Input id="c-to" type="datetime-local" value={values.validTo} min={plusDays(values.validFrom, 14) || undefined} onChange={(e) => set("validTo", e.target.value)} required />
            {err("validTo")}
            <p className="text-xs text-muted-foreground">Minimální platnost kupónu je 14 dní.</p>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="font-medium">Typ kupónu *</legend>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex w-32 items-center gap-2">
              <input type="radio" name="type" value="PERCENTAGE" checked={values.discountCouponType === "PERCENTAGE"} onChange={() => { set("discountCouponType", "PERCENTAGE"); set("amountDiscount", ""); }} />
              Na procenta
            </label>
            <Input type="number" min={5} max={50} step={1} className="w-28" value={values.percentageDiscount} disabled={values.discountCouponType !== "PERCENTAGE"} onChange={(e) => set("percentageDiscount", e.target.value)} aria-label="Sleva v procentech" />
            <span>%</span>
          </div>
          {err("percentageDiscount")}
          {values.discountCouponType === "PERCENTAGE" && (
            <p className="text-xs text-muted-foreground">Sleva musí být v rozmezí 5–50 %. Kupóny se slevou v procentech se neaplikují na zlevněné produkty.</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex w-32 items-center gap-2">
              <input type="radio" name="type" value="AMOUNT" checked={values.discountCouponType === "AMOUNT"} onChange={() => { set("discountCouponType", "AMOUNT"); set("percentageDiscount", ""); }} />
              Na částku
            </label>
            <Input type="number" min={1} step={1} className="w-28" value={values.amountDiscount} disabled={values.discountCouponType !== "AMOUNT"} onChange={(e) => set("amountDiscount", e.target.value)} aria-label="Sleva v Kč" />
            <span>Kč</span>
            {eur && <span className="text-xs text-muted-foreground">= {eur} (dle aktuálního kurzu)</span>}
          </div>
          {err("amountDiscount")}
        </fieldset>

        {values.discountCouponType === "AMOUNT" && (
          <div className="space-y-1.5">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={values.hasMinOrderValue} onChange={(e) => set("hasMinOrderValue", e.target.checked)} />
              Minimální hodnota mého zboží v košíku
            </label>
            {values.hasMinOrderValue && (
              <div className="flex items-center gap-2">
                <Input type="number" min={1} step={1} className="w-32" value={values.minOrderValue} onChange={(e) => set("minOrderValue", e.target.value)} aria-label="Minimální hodnota košíku" />
                <span>Kč</span>
              </div>
            )}
            {err("minOrderValue")}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Zpět
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Ukládám…" : edit ? "Upravit kupón" : "Vytvořit kupón"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export function NewCouponButton({ prefix, eurRate }: { prefix: string; eurRate: number | null }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" size="sm" onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Vytvořit nový kupón
      </Button>
      {open && <CouponDialog open={open} onClose={() => setOpen(false)} initial={defaultCouponValues()} prefix={prefix} eurRate={eurRate} />}
    </>
  );
}
