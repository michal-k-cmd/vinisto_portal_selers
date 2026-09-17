// Vyúčtování a faktury — port BillingList: řazení přes platformu, PDF/XLS
// přes vlastní route (hash zůstává na serveru), dotaz na vyúčtování, detail.

import Link from "next/link";
import { FileSpreadsheet, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BillingQuoteButton } from "@/components/billing/billing-quote-button";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SortableHead } from "@/components/sortable-head";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDate, formatPrice } from "@/lib/format";
import {
  BILLING_PAGE_SIZE,
  billingPeriod,
  billingStateLabel,
  billingStateTone,
  hasInvoice,
  listBillings,
  type Billing,
  type BillingSort,
} from "@/lib/platform/billing";
import { cn } from "@/lib/utils";

export const metadata = { title: "Vyúčtování a faktury" };
export const dynamic = "force-dynamic";

const SORT_KEYS: BillingSort[] = ["cislo", "obdobi", "vystaveno", "obrat", "stav"];

export default async function VyuctovaniPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  const page = pageFromParams(sp.page);
  const sort = (SORT_KEYS.includes(sp.sort as BillingSort) ? sp.sort : "") as BillingSort | "";
  const dir = sort ? (sp.dir === "asc" ? "asc" : "desc") : "desc";
  const params: Record<string, string> = {};
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }

  let error: unknown;
  let items: Billing[] = [];
  let count = 0;
  try {
    const result = await listBillings({ supplierId: supplier.id, loginHash: session.loginHash, page, sort: sort || "vystaveno", desc: dir === "desc" });
    items = result.items;
    count = result.count;
  } catch (e) {
    error = e;
  }

  const sortProps = { sort, dir, params, defaultKey: "vystaveno", defaultDir: "desc" as const };
  const iconLink = "inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-accent";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Vyúčtování prodejů</h2>
        <p className="text-xs text-muted-foreground">Obraty jsou uvedeny bez DPH.</p>
      </div>

      {error ? (
        <DataError error={error} what="Seznam vyúčtování" />
      ) : items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">Nebyly nalezeny žádné záznamy.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead label="Číslo vyúčtování" k="cislo" {...sortProps} />
                <SortableHead label="Zaúčtovací období" k="obdobi" {...sortProps} />
                <SortableHead label="Vystaveno" k="vystaveno" {...sortProps} />
                <SortableHead label="Celkový obrat" k="obrat" align="right" {...sortProps} />
                <SortableHead label="Stav" k="stav" {...sortProps} />
                <TableHead>Vyúčtování</TableHead>
                <TableHead>Faktura</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.billingNumber ?? "–"}</TableCell>
                  <TableCell className="whitespace-nowrap">{billingPeriod(b.timeFrom, b.timeTo)}</TableCell>
                  <TableCell>{b.createdAt ? formatDate(b.createdAt * 1000) : "–"}</TableCell>
                  <TableCell className="whitespace-nowrap text-right">{formatPrice(b.totalSum, "CZK", 2)}</TableCell>
                  <TableCell className={cn("font-semibold", billingStateTone(b.state))}>{billingStateLabel(b.state)}</TableCell>
                  <TableCell>
                    {b.billingPdf ? (
                      <div className="flex gap-1">
                        <a href={`/vyuctovani/${b.id}/pdf`} target="_blank" rel="noopener noreferrer" className={iconLink} title="PDF vyúčtování">
                          <FileText className="size-3.5" /> PDF
                        </a>
                        <a href={`/vyuctovani/${b.id}/xls`} className={iconLink} title="XLS export">
                          <FileSpreadsheet className="size-3.5" /> XLS
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">–</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {hasInvoice(b) ? (
                      <a href={`/vyuctovani/${b.id}/pdf?typ=faktura`} target="_blank" rel="noopener noreferrer" className={iconLink} title="PDF faktury">
                        <FileText className="size-3.5" /> PDF
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">–</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <BillingQuoteButton />
                      <Link href={`/vyuctovani/${b.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                        Detail vyúčtování
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination page={page} pageSize={BILLING_PAGE_SIZE} total={count} params={params} />
    </div>
  );
}
