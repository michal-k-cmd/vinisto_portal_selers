"use client";

// Editor setu — port SetDetail: informace o setu, sloty produktů (placené +
// zdarma), cena setu, uložení konceptu / odeslání ke schválení / smazání.

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { InfoTip } from "@/components/info-tip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/format";
import { deleteSetAction, saveSetAction } from "@/lib/platform/actions/sets";
import { computeSetPrice, SET_STATE_LABEL, SET_TYPE_LABEL, SET_TYPE_SLOTS, type SetSlotProduct, type SetState, type SetType } from "@/lib/platform/sets-constants";
import { cn } from "@/lib/utils";
import { AddProductDialog } from "./add-product-dialog";

export type SetEditorInitial = {
  id?: string;
  setType: SetType;
  state: SetState;
  name: string;
  shortDescription: string;
  description: string;
  paid: Array<SetSlotProduct | null>;
  free: Array<SetSlotProduct | null>;
};

type Slot = { kind: "paid" | "free"; index: number };

export function SetEditor({ initial }: { initial: SetEditorInitial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(initial.name);
  const [shortDescription, setShort] = useState(initial.shortDescription);
  const [description, setDescription] = useState(initial.description);
  const [paid, setPaid] = useState(initial.paid);
  const [free, setFree] = useState(initial.free);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [picking, setPicking] = useState<Slot | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const editable = initial.state === "Concept";
  const [paidCount, freeCount] = SET_TYPE_SLOTS[initial.setType];

  const dirty =
    name !== initial.name ||
    shortDescription !== initial.shortDescription ||
    description !== initial.description ||
    paid.map((p) => p?.id).join() !== initial.paid.map((p) => p?.id).join() ||
    free.map((p) => p?.id).join() !== initial.free.map((p) => p?.id).join();

  useEffect(() => {
    if (!dirty || saved) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, saved]);

  const total = useMemo(() => computeSetPrice(initial.setType, paid, free), [initial.setType, paid, free]);
  const missingPaid = submitted && paid.some((p) => !p);
  const missingFree = submitted && free.some((p) => !p);

  function setSlot(slot: Slot, product: SetSlotProduct | null) {
    const update = (list: Array<SetSlotProduct | null>) => list.map((p, i) => (i === slot.index ? product : p));
    if (slot.kind === "paid") setPaid(update);
    else setFree(update);
    setPicking(null);
  }

  function submit(send: boolean) {
    setSubmitted(true);
    setErrors({});
    startTransition(async () => {
      const result = await saveSetAction({
        id: initial.id,
        setType: initial.setType,
        name,
        shortDescription,
        description,
        paidBundles: paid.map((p) => p?.id ?? null),
        freeBundles: free.map((p) => p?.id ?? null),
        send,
      });
      if (result.ok) {
        setSaved(true);
        toast.success(result.message ?? "Uloženo");
        router.push("/produkty/sety");
        router.refresh();
      } else {
        if (result.field && result.field !== "bundles") setErrors({ [result.field]: result.error });
        toast.error(result.error);
        if ("id" in result && result.id && !initial.id) {
          setSaved(true);
          router.replace(`/produkty/sety/${result.id}`);
        }
      }
    });
  }

  function remove() {
    if (!initial.id) return;
    startTransition(async () => {
      const result = await deleteSetAction(initial.id!);
      setConfirmDelete(false);
      if (result.ok) {
        setSaved(true);
        toast.success(result.message ?? "Odstraněno");
        router.push("/produkty/sety");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  const rows: Array<{ slot: Slot; number: number; product: SetSlotProduct | null }> = [
    ...paid.map((product, index) => ({ slot: { kind: "paid" as const, index }, number: index + 1, product })),
    ...free.map((product, index) => ({ slot: { kind: "free" as const, index }, number: paidCount + index + 1, product })),
  ];

  const field = (key: string) => (errors[key] ? <p className="text-xs text-vinisto-wine">{errors[key]}</p> : null);
  const inputCls = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-60";

  return (
    <div className="space-y-4">
      {/* Hlavička */}
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-card p-4">
        <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Stav setu:</dt>
            <dd className="font-semibold">{SET_STATE_LABEL[initial.state]}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Varianta setu:</dt>
            <dd className="font-semibold">{SET_TYPE_LABEL[initial.setType]}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Celková cena setu:</dt>
            <dd className="font-semibold">{formatPrice(total)}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {editable && (
            <>
              <Button type="button" size="sm" disabled={pending} onClick={() => submit(true)}>
                Uložit a odeslat ke schválení
              </Button>
              <Button type="button" size="sm" variant="outline" disabled={pending} onClick={() => submit(false)}>
                Uložit koncept
              </Button>
              {initial.id && (
                <Button type="button" size="sm" variant="outline" className="text-vinisto-wine" disabled={pending} onClick={() => setConfirmDelete(true)}>
                  Odstranit koncept
                </Button>
              )}
            </>
          )}
          <Link href="/produkty/sety" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Zpět na výpis
          </Link>
        </div>
      </div>

      {/* Informace o setu */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-heading text-lg font-semibold">Informace o setu</h2>
        <p className="max-w-[65ch] whitespace-pre-line text-sm text-muted-foreground">
          {"Tyto informace uvidí zákazníci na detailu produktu na webu. Každý nově založený set prochází kontrolou, abychom zajistili korektnost a kvalitu obsahu.\n\nProdukt zdarma je zákazníkovi účtován za 1 Kč, o tuto částku se navyšuje cena setu."}
        </p>
        <div className="max-w-xl space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="set-name">Název *</Label>
            <Input id="set-name" value={name} onChange={(e) => setName(e.target.value)} disabled={!editable} required />
            {field("name")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="set-short">
              Krátký popis * <InfoTip>Krátký popis se zobrazuje na detailu produktu pod názvem.</InfoTip>
            </Label>
            <textarea id="set-short" rows={2} value={shortDescription} onChange={(e) => setShort(e.target.value)} disabled={!editable} className={inputCls} />
            {field("shortDescription")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="set-desc">
              Detailní popis * <InfoTip>Dlouhý popis se zobrazuje na detailu produktu v hlavní sekci.</InfoTip>
            </Label>
            <textarea id="set-desc" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} disabled={!editable} className={inputCls} />
            {field("description")}
          </div>
        </div>
      </section>

      {/* Produkty v setu */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-heading text-lg font-semibold">Produkty v setu</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left" />
                <th className="px-3 py-2 text-left">Obrázek</th>
                <th className="px-3 py-2 text-left">ID ve skladu</th>
                <th className="px-3 py-2 text-left">Název</th>
                <th className="px-3 py-2 text-right">B2C cena vč. DPH</th>
                <th className="px-3 py-2 text-right">B2B cena vč. DPH</th>
                <th className="px-3 py-2 text-right">Skladem</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map(({ slot, number, product }, i) => (
                <>
                  {slot.kind === "free" && slot.index === 0 && (
                    <tr key="free-spacer" className="bg-muted/30">
                      <td colSpan={8} className="px-3 py-1.5 text-xs font-medium">
                        Produkt zdarma:
                      </td>
                    </tr>
                  )}
                  {product ? (
                    <tr key={`${slot.kind}-${slot.index}`} className={cn("border-t border-border", i % 2 === 1 && "bg-muted/10")}>
                      <td className="px-3 py-2">{number}.</td>
                      <td className="px-3 py-2">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt={product.name} className="size-16 object-contain" />
                        ) : (
                          <span className="block size-16 rounded bg-muted" />
                        )}
                      </td>
                      <td className="px-3 py-2 text-xs">{product.warehouseIds || "–"}</td>
                      <td className="px-3 py-2">{product.name}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-right">{formatPrice(product.priceB2C)}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-right">{formatPrice(product.priceB2B)}</td>
                      <td className="px-3 py-2 text-right">{product.stock ?? "–"}</td>
                      <td className="px-3 py-2 text-right">
                        {editable && (
                          <button type="button" onClick={() => setSlot(slot, null)} aria-label="Změnit produkt" className="rounded p-1 hover:bg-accent">
                            <Pencil className="size-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={`${slot.kind}-${slot.index}`}
                      className={cn("border-t border-border", editable && "cursor-pointer hover:bg-accent/50")}
                      onClick={editable ? () => setPicking(slot) : undefined}
                    >
                      <td className="px-3 py-4">{number}.</td>
                      <td colSpan={7} className="px-3 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-medium">
                          <Plus className="size-3.5" /> Přidat produkt
                        </span>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {(missingPaid || missingFree) && <p className="text-xs text-vinisto-wine">Některé produkty ve vašem setu chybí.</p>}
        <p className="text-xs text-muted-foreground">
          Varianta {SET_TYPE_LABEL[initial.setType]}: {paidCount} placených{freeCount ? ` + ${freeCount} zdarma` : ""}.
        </p>
      </section>

      {picking && <AddProductDialog open onClose={() => setPicking(null)} onPick={(p) => setSlot(picking, p)} />}

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Odstranění konceptu">
        <div className="space-y-4 text-sm">
          <p>Opravdu chcete odstranit koncept setu?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setConfirmDelete(false)}>
              Ne
            </Button>
            <Button type="button" variant="destructive" disabled={pending} onClick={remove}>
              Ano
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
