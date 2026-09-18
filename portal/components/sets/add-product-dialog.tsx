"use client";

// Dialog „Zalistované produkty“ — výběr produktu do slotu setu (hledání přes server action).

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { searchSetProductsAction } from "@/lib/platform/actions/sets";
import type { SetSlotProduct } from "@/lib/platform/sets-constants";

export function AddProductDialog({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (p: SetSlotProduct) => void }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SetSlotProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const handle = setTimeout(() => {
      startTransition(async () => {
        const result = await searchSetProductsAction(query);
        if (result.ok) {
          setItems(result.items);
          setError(null);
        } else setError(result.error);
      });
    }, 250);
    return () => clearTimeout(handle);
  }, [open, query]);

  return (
    <Dialog open={open} onClose={onClose} title="Zalistované produkty" className="max-w-3xl">
      <div className="space-y-3 text-sm">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Vyhledat produkt" autoFocus aria-label="Vyhledat produkt" />
        {error && <p className="text-xs text-vinisto-wine">{error}</p>}
        <div className="max-h-[50vh] overflow-y-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card text-xs text-muted-foreground">
              <tr>
                <th className="px-2 py-1.5 text-left" />
                <th className="px-2 py-1.5 text-left">ID ve skladu</th>
                <th className="px-2 py-1.5 text-left">Název produktu</th>
                <th className="px-2 py-1.5 text-right">Cena vč. DPH</th>
                <th className="px-2 py-1.5 text-right">Skladem</th>
                <th className="px-2 py-1.5" />
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-2 py-4 text-center text-muted-foreground">
                    {pending ? "Načítám…" : "Nebyly nalezeny žádné produkty."}
                  </td>
                </tr>
              )}
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-2 py-1.5">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt="" className="size-10 object-contain" />
                    ) : (
                      <span className="block size-10 rounded bg-muted" />
                    )}
                  </td>
                  <td className="px-2 py-1.5 text-xs">{p.warehouseIds || "–"}</td>
                  <td className="px-2 py-1.5">{p.name}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-right">{formatPrice(p.priceB2C)}</td>
                  <td className="px-2 py-1.5 text-right">{p.stock ?? "–"}</td>
                  <td className="px-2 py-1.5 text-right">
                    <Button type="button" size="sm" onClick={() => onPick(p)}>
                      Přidat produkt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>
  );
}
