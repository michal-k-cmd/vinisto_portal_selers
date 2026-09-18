// Sklad — pohyby: log skladových pohybů (warehouse-api/change-log/supplier).
// Oproti starému portálu má hlavičky sloupců, číslo dokladu, odkaz na produkt
// a filtry podle důvodu a čísla dokladu (platforma je umí, SPA je nevyužilo).

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SearchParamInput } from "@/components/search-param-input";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDateTime } from "@/lib/format";
import { localize, stripHtml } from "@/lib/platform/products";
import { getSupplierChangeLog, WAREHOUSE_PAGE_SIZE } from "@/lib/platform/warehouse";
import { CHANGE_REASON_LABELS, changeReasonLabel } from "@/lib/platform/warehouse-constants";

export const metadata = { title: "Pohyby skladu" };
export const dynamic = "force-dynamic";

export default async function PohybyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const page = pageFromParams(sp.page);
  const reason = typeof sp.duvod === "string" && CHANGE_REASON_LABELS[sp.duvod] ? sp.duvod : "";
  const doc = typeof sp.doklad === "string" ? sp.doklad.trim() : "";
  const params: Record<string, string> = {};
  if (reason) params.duvod = reason;
  if (doc) params.doklad = doc;

  let error: unknown;
  let items: Awaited<ReturnType<typeof getSupplierChangeLog>>["items"] = [];
  let count = 0;
  try {
    const result = await getSupplierChangeLog({ supplierId: supplier.id, page, changeReasons: reason ? [reason] : undefined, documentNumber: doc || undefined });
    items = result.items;
    count = result.count;
  } catch (e) {
    error = e;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Historie skladových pohybů</h2>
        <form method="get" className="flex flex-wrap items-center gap-2">
          <select name="duvod" defaultValue={reason} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm" aria-label="Důvod pohybu">
            <option value="">Všechny důvody</option>
            {Object.entries(CHANGE_REASON_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {doc && <input type="hidden" name="doklad" value={doc} />}
          <button type="submit" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
            Filtrovat
          </button>
          <SearchParamInput param="doklad" initial={doc} placeholder="Číslo dokladu…" label="Hledat podle čísla dokladu" className="w-44" />
        </form>
      </div>

      {error ? (
        <DataError error={error} what="Skladové pohyby" />
      ) : items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
          {reason || doc ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Nebyly nalezeny žádné záznamy."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Akce</TableHead>
                <TableHead>Produkt</TableHead>
                <TableHead>Číslo dokladu</TableHead>
                <TableHead align="right">
                  <span title="Počet kusů na skladě po změně">Stav po změně</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-nowrap">{row.createdAt ? formatDateTime(row.createdAt * 1000) : "–"}</TableCell>
                  <TableCell>{changeReasonLabel(row.changeReason)}</TableCell>
                  <TableCell className="max-w-xs">
                    {row.bundleId ? (
                      <Link href={`/produkty/${row.bundleId}`} className="font-medium hover:underline">
                        {stripHtml(localize(row.bundleName))}
                      </Link>
                    ) : (
                      stripHtml(localize(row.bundleName))
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.documentNumber || "–"}</TableCell>
                  <TableCell align="right" className="whitespace-nowrap text-right">{row.quantity ?? "–"} ks</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination page={page} pageSize={WAREHOUSE_PAGE_SIZE} total={count} params={params} />
    </div>
  );
}
