// Sklad — přehled: KPI karty (supplier-api/admin/statistics) a tabulka
// produktů na skladu u vinisto (supplier-api/admin/products). Port skryté
// stránky WarehouseList ze starého portálu, rozdělené na Přehled a Pohyby.

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { InfoTip } from "@/components/info-tip";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SearchParamInput } from "@/components/search-param-input";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatNumber } from "@/lib/format";
import { SPECIFICATION_ID_BATCH } from "@/lib/platform/fees";
import { localize, stripHtml, type SpecificationDetail } from "@/lib/platform/products";
import { getSupplierProducts, getSupplierStatistics, WAREHOUSE_PAGE_SIZE, type SupplierProductItem } from "@/lib/platform/warehouse";

export const metadata = { title: "Sklad" };
export const dynamic = "force-dynamic";

const UNPAID_TIP = "Jde o kusy z již dodaných a vyfakturovaných objednávek, u kterých zatím čekáme na úhradu od zákazníka.";

function batchOf(specs: SpecificationDetail[] | null | undefined): string {
  const spec = (specs ?? []).find((s) => s.definition?.id === SPECIFICATION_ID_BATCH || (s.value as { definitionId?: string } | null)?.definitionId === SPECIFICATION_ID_BATCH);
  const value = spec?.value?.value;
  if (Array.isArray(value)) return localize(value, "");
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function Kpi({ label, value, highlight, tip }: { label: string; value: string; highlight?: boolean; tip?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {label}
          {tip && <InfoTip>{tip}</InfoTip>}
        </div>
        <div className={highlight ? "mt-1 text-2xl font-bold text-merkatos-violet" : "mt-1 text-2xl font-bold"}>{value}</div>
      </CardContent>
    </Card>
  );
}

export default async function SkladPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const page = pageFromParams(sp.page);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const warehouseId = typeof sp.sklad === "string" ? sp.sklad.trim() : "";
  const params: Record<string, string> = {};
  if (q) params.q = q;
  if (warehouseId) params.sklad = warehouseId;

  const [stats, products] = await Promise.all([
    getSupplierStatistics({ supplierId: supplier.id, loginHash: session.loginHash })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    getSupplierProducts({ supplierId: supplier.id, loginHash: session.loginHash, page, searchBundleName: q || undefined, searchProductWarehouseId: warehouseId || undefined })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
  ]);

  const s = stats.data;
  const items: SupplierProductItem[] = products.data?.items ?? [];

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold">Můj sklad u vinisto</h2>
      {stats.error ? (
        <DataError error={stats.error} what="Statistiky skladu" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi label="Celkem kusů na skladě" value={`${formatNumber(s?.totalBundlesInWarehouse)} ks`} />
          <Kpi label="Produktů skladem" value={`${formatNumber(s?.uniqueBundlesInWarehouse)} druhů`} />
          <Kpi label="Prodáno min. / tento měsíc" value={`${formatNumber(s?.bundlesSoldLastMonth)} ks / ${formatNumber(s?.bundlesSoldThisMonth)} ks`} highlight />
          <Kpi label="V nezaplacených objednávkách" value={`${formatNumber(s?.bundlesInUnpaidOrders)} ks`} tip={UNPAID_TIP} />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Produkty na skladu u vinisto</h2>
        <div className="flex flex-wrap gap-2">
          <SearchParamInput param="sklad" initial={warehouseId} placeholder="ID ve skladu…" label="Hledat podle ID ve skladu" className="w-40" />
          <SearchParamInput param="q" initial={q} placeholder="Hledat podle názvu…" label="Hledat podle názvu" className="w-56" />
        </div>
      </div>

      {products.error ? (
        <DataError error={products.error} what="Produkty na skladu" />
      ) : items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
          {q || warehouseId ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Nebyly nalezeny žádné záznamy."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID ve skladu</TableHead>
                <TableHead>Název produktu</TableHead>
                <TableHead>Šarže</TableHead>
                <TableHead align="right">Skladem</TableHead>
                <TableHead align="right">Prodáno minulý / tento měsíc</TableHead>
                <TableHead align="right">
                  <span className="inline-flex items-center gap-1">
                    V nezaplacených obj. <InfoTip>{UNPAID_TIP}</InfoTip>
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p, i) => (
                <TableRow key={p.bundleId ?? i}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{(p.warehouseIds ?? []).join(", ") || "–"}</TableCell>
                  <TableCell className="max-w-xs">
                    {p.bundleId ? (
                      <Link href={`/produkty/${p.bundleId}`} className="font-medium hover:underline">
                        {stripHtml(localize(p.bundleName))}
                      </Link>
                    ) : (
                      stripHtml(localize(p.bundleName))
                    )}
                  </TableCell>
                  <TableCell>{batchOf(p.specifications) || "–"}</TableCell>
                  <TableCell align="right" className="text-right font-semibold">{formatNumber(p.warehouseCount ?? 0)} ks</TableCell>
                  <TableCell align="right" className="whitespace-nowrap text-right">
                    {p.soldLastMonth ?? "–"} ks / {p.soldThisMonth ?? "–"} ks
                  </TableCell>
                  <TableCell align="right" className="text-right">{p.countInUnpaidOrders ?? "–"} ks</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination page={page} pageSize={WAREHOUSE_PAGE_SIZE} total={products.data?.count ?? 0} params={params} />
    </div>
  );
}
