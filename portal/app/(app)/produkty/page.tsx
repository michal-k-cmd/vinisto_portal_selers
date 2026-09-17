// Seznam produktů prodejce — port BundleList: záložky Aktivní/Neaktivní/Vše,
// fulltext, řazení podle názvu/ID, sklad, ceny B2C/B2B se slevou, stav,
// zařazení do vinisto PLUS+ a odkaz na detail. Data ze serveru.

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SortableHead } from "@/components/sortable-head";
import { ProductSearchForm } from "@/components/products/search-form";
import { VinistoPlusButton } from "@/components/products/vinisto-plus-dialog";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatPrice } from "@/lib/format";
import { SPECIFICATION_ID_BATCH } from "@/lib/platform/fees";
import { B2B_PLATFORM, B2C_PLATFORM, computeBundlePrices, isDiscountActive } from "@/lib/platform/prices";
import {
  getCategoryNames,
  getWarehouseQuantities,
  listBundles,
  localize,
  PRODUCTS_PAGE_SIZE,
  stripHtml,
  type Bundle,
  type ProductsSort,
  type ProductsTab,
} from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const metadata = { title: "Seznam produktů" };
export const dynamic = "force-dynamic";

const TABS: Array<{ key: ProductsTab; label: string; heading: string }> = [
  { key: "aktivni", label: "Aktivní produkty", heading: "Aktivní zalistované produkty" },
  { key: "neaktivni", label: "Neaktivní produkty", heading: "Neaktivní zalistované produkty" },
  { key: "vse", label: "Vše", heading: "Všechny zalistované produkty" },
];

function batchOf(bundle: Bundle): string {
  const spec = (bundle.specificationDetails ?? []).find((s) => s.definition?.id === SPECIFICATION_ID_BATCH);
  const value = spec?.value?.value;
  if (Array.isArray(value)) return localize(value, "");
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function stateFlags(b: Bundle): Array<{ label: string; tone: "ok" | "bad" }> {
  const out: Array<{ label: string; tone: "ok" | "bad" }> = [];
  if (b.isGift) out.push({ label: "Dárek", tone: "ok" });
  if (b.temporaryUnavailable) out.push({ label: "Momentálně nedostupný", tone: "bad" });
  if (b.isClearanceSale) out.push({ label: "Doprodej", tone: "bad" });
  if (b.isSaleOver) out.push({ label: "Prodej skončil", tone: "bad" });
  return out;
}

function hasSupplierVinistoPlus(b: Bundle): boolean {
  return (b.priceDiscounts ?? []).some((d) => d.level === "VinistoPlus" && d.type === "SupplierDiscount" && isDiscountActive(d));
}

export default async function ProduktyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  const tab = (TABS.find((t) => t.key === sp.tab)?.key ?? "aktivni") as ProductsTab;
  const page = pageFromParams(sp.page);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const sort = (["name", "id"].includes(String(sp.sort)) ? String(sp.sort) : "") as ProductsSort | "";
  const dir = sp.dir === "desc" ? "desc" : "asc";
  const params: Record<string, string> = {};
  if (tab !== "aktivni") params.tab = tab;
  if (q) params.q = q;
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }

  let error: unknown;
  let bundles: Bundle[] = [];
  let count = 0;
  let categories = new Map<string, string>();
  let stock = new Map<string, number>();
  try {
    const result = await listBundles({ supplierId: supplier.id, page, tab, search: q || undefined, sort: sort || undefined, desc: dir === "desc" });
    bundles = result.bundles;
    count = result.count;
    [categories, stock] = await Promise.all([
      getCategoryNames(bundles.flatMap((b) => b.categories ?? [])),
      getWarehouseQuantities(bundles.map((b) => b.id)),
    ]);
  } catch (e) {
    error = e;
  }

  const heading = TABS.find((t) => t.key === tab)!.heading;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap gap-1">
          {TABS.map((t) => {
            const next = new URLSearchParams(params);
            if (t.key === "aktivni") next.delete("tab");
            else next.set("tab", t.key);
            next.delete("page");
            return (
              <Link
                key={t.key}
                href={`?${next.toString()}`}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  t.key === tab ? "bg-merkatos-blue font-medium text-white" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <ProductSearchForm initial={q} />
      </div>

      <h2 className="font-heading text-lg font-semibold">{heading}</h2>

      {error ? (
        <DataError error={error} what="Seznam produktů" />
      ) : bundles.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
          {q ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Nebyly nalezeny žádné záznamy."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID ve skladu</TableHead>
                <SortableHead label="Název produktu" k="name" sort={sort} dir={dir} params={params} />
                <TableHead>Šarže</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead align="right">Cena B2C s DPH (bez DPH)</TableHead>
                <TableHead align="right">Cena B2B s DPH (bez DPH)</TableHead>
                <TableHead align="right">Skladem</TableHead>
                <TableHead>Stav</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundles.map((b) => {
                const name = stripHtml(localize(b.name));
                const b2c = computeBundlePrices(b, { platformId: B2C_PLATFORM });
                const b2b = (b.prices ?? []).find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2B_PLATFORM);
                const cats = (b.categories ?? []).map((id) => categories.get(id)).filter(Boolean).slice(0, 2);
                const flags = stateFlags(b);
                return (
                  <TableRow key={b.id}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{(b.warehouseId ?? []).join(", ") || "–"}</TableCell>
                    <TableCell className="max-w-xs">
                      <Link href={`/produkty/${b.id}`} className="font-medium hover:underline">
                        {name}
                      </Link>
                    </TableCell>
                    <TableCell>{batchOf(b) || "–"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cats.join(", ") || "–"}</TableCell>
                    <TableCell align="right" className="whitespace-nowrap text-right">
                      {b2c.basePrice ? (
                        <div>
                          <span className={cn(b2c.isDiscounted && "line-through text-muted-foreground")}>
                            {formatPrice(b2c.basePrice.valueWithVat, b2c.currency)} ({formatPrice(b2c.basePrice.value, b2c.currency, 2)})
                          </span>
                          {b2c.isDiscounted && b2c.discountedPrice && (
                            <div>
                              <Badge className={cn(b2c.discountedPrice.type === "SupplierDiscount" ? "bg-vinisto-wine" : "bg-vinisto-green", "text-white")}>
                                {formatPrice(b2c.discountedPrice.valueWithVat, b2c.currency)} ({b2c.discountDifferencePercent} %)
                              </Badge>
                            </div>
                          )}
                        </div>
                      ) : (
                        "–"
                      )}
                    </TableCell>
                    <TableCell align="right" className="whitespace-nowrap text-right">
                      {b2b ? `${formatPrice(b2b.valueWithVat ?? 0, b2b.currency ?? "CZK")} (${formatPrice(b2b.value ?? 0, b2b.currency ?? "CZK", 2)})` : "–"}
                    </TableCell>
                    <TableCell align="right" className="text-right">{stock.has(b.id) ? stock.get(b.id) : "–"}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        {flags.map((f) => (
                          <span key={f.label} className={f.tone === "ok" ? "text-vinisto-green" : "text-vinisto-wine"}>
                            {f.label}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {!b.isSaleOver && (
                        <div className="flex items-center justify-end gap-2">
                          {!b.isSet && (hasSupplierVinistoPlus(b) ? (
                            <Badge className="bg-vinisto-green text-white">vinisto PLUS+</Badge>
                          ) : (
                            <VinistoPlusButton bundleId={b.id} bundleName={name} />
                          ))}
                          <Link href={`/produkty/${b.id}`} className={buttonVariants({ size: "sm" })}>
                            Detail
                          </Link>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination page={page} pageSize={PRODUCTS_PAGE_SIZE} total={count} params={params} />
    </div>
  );
}
