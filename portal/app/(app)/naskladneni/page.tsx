// Seznam požadavků na naskladnění — port StockRequestList: řazení přes
// platformu, filtry (číslo, datum vystavení/naskladnění, doprava, stav),
// potvrzení termínu přímo ze seznamu, odkaz na detail.

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SearchParamInput } from "@/components/search-param-input";
import { SortableHead } from "@/components/sortable-head";
import { ConfirmStockingButton } from "@/components/stocking/confirm-dialog";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDate } from "@/lib/format";
import { pragueToUnix } from "@/lib/period";
import { localize } from "@/lib/platform/products";
import {
  DELIVERY_TYPE_LABEL,
  listStockingRequests,
  SELLER_STATE_LABEL,
  sellerState,
  STOCKING_PAGE_SIZE,
  type DeliveryType,
  type SellerState,
  type StockingRequest,
  type StockingSort,
} from "@/lib/platform/stocking-requests";
import { cn } from "@/lib/utils";

export const metadata = { title: "Naskladnění" };
export const dynamic = "force-dynamic";

const STATE_TONE: Record<SellerState, string> = {
  SENT: "text-notion-blue",
  CONFIRMED: "text-notion-blue",
  WMS_STOCKED: "text-vinisto-green",
  CANCELLED: "text-vinisto-wine",
};

function dateParam(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string") return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return undefined;
  return pragueToUnix(Number(m[1]), Number(m[2]), Number(m[3]));
}

export default async function NaskladneniPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  const page = pageFromParams(sp.page);
  const sortKeys: StockingSort[] = ["requestNumber", "dateIssued", "deliveryType", "dateStocked", "state"];
  const sort = (sortKeys.includes(sp.sort as StockingSort) ? sp.sort : "") as StockingSort | "";
  const dir = sort ? (sp.dir === "asc" ? "asc" : "desc") : "desc";
  const cislo = typeof sp.cislo === "string" ? sp.cislo.trim() : "";
  const vystaveno = typeof sp.vystaveno === "string" ? sp.vystaveno : "";
  const naskladneno = typeof sp.naskladneno === "string" ? sp.naskladneno : "";
  const doprava = (["SUPPLIER_DELIVERY", "VINISTO_DELIVERY"].includes(String(sp.doprava)) ? sp.doprava : "") as DeliveryType | "";
  const stav = (Object.keys(SELLER_STATE_LABEL).includes(String(sp.stav)) ? sp.stav : "") as SellerState | "";

  const params: Record<string, string> = {};
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }
  for (const [k, v] of Object.entries({ cislo, vystaveno, naskladneno, doprava, stav })) if (v) params[k] = v;
  const hasFilter = Boolean(cislo || vystaveno || naskladneno || doprava || stav);

  let error: unknown;
  let items: StockingRequest[] = [];
  let count = 0;
  try {
    const result = await listStockingRequests({
      supplierId: supplier.id,
      loginHash: session.loginHash,
      page,
      sort: sort || "requestNumber",
      desc: dir === "desc",
      requestNumber: cislo || undefined,
      createDate: dateParam(vystaveno),
      stockingDate: dateParam(naskladneno),
      deliveryType: doprava || undefined,
      state: stav || undefined,
    });
    items = result.items;
    count = result.count;
  } catch (e) {
    error = e;
  }

  const sortProps = { sort, dir, params, defaultKey: "requestNumber", defaultDir: "desc" as const };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold">Naskladnění</h1>
        <form method="get" className="flex flex-wrap items-center gap-2 text-sm">
          {sort && <input type="hidden" name="sort" value={sort} />}
          {sort && <input type="hidden" name="dir" value={dir} />}
          <SearchParamInput param="cislo" initial={cislo} placeholder="Číslo požadavku…" label="Číslo požadavku" className="w-40" />
          <label className="flex items-center gap-1 text-xs text-muted-foreground">
            vystaveno <input type="date" name="vystaveno" defaultValue={vystaveno} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground" />
          </label>
          <label className="flex items-center gap-1 text-xs text-muted-foreground">
            naskladněno <input type="date" name="naskladneno" defaultValue={naskladneno} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground" />
          </label>
          <select name="doprava" defaultValue={doprava} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm" aria-label="Způsob dopravy">
            <option value="">Doprava: vše</option>
            <option value="SUPPLIER_DELIVERY">prodejce</option>
            <option value="VINISTO_DELIVERY">vinisto</option>
          </select>
          <select name="stav" defaultValue={stav} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm" aria-label="Stav">
            <option value="">Stav: vše</option>
            {(Object.keys(SELLER_STATE_LABEL) as SellerState[]).map((s) => (
              <option key={s} value={s}>
                {SELLER_STATE_LABEL[s]}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-md border border-border px-3 py-1.5 hover:bg-accent">
            Filtrovat
          </button>
          {hasFilter && (
            <Link href="/naskladneni" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
              Zrušit filtry
            </Link>
          )}
        </form>
      </div>

      {error ? (
        <DataError error={error} what="Seznam požadavků na naskladnění" />
      ) : items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
          {hasFilter ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Nebyly nalezeny žádné záznamy."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead label="Číslo požadavku" k="requestNumber" {...sortProps} />
                <SortableHead label="Datum vystavení" k="dateIssued" {...sortProps} />
                <SortableHead label="Způsob dopravy" k="deliveryType" {...sortProps} />
                <TableHead>Dopravce / sledovací kód</TableHead>
                <SortableHead label="Naskladněno" k="dateStocked" {...sortProps} />
                <SortableHead label="Stav" k="state" {...sortProps} />
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r) => {
                const state = sellerState(r.stockingState);
                const pickup = r.deliveryType === "VINISTO_DELIVERY";
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.requestNumber ?? "–"}</TableCell>
                    <TableCell>{r.createdAt ? formatDate(r.createdAt * 1000) : "–"}</TableCell>
                    <TableCell>{DELIVERY_TYPE_LABEL[r.deliveryType as DeliveryType] ?? "–"}</TableCell>
                    <TableCell className="text-sm">
                      {r.delivery?.name ? localize(r.delivery.name) : ""}
                      {r.trackingNumber && (
                        <div>
                          {r.trackingUrl ? (
                            <a href={`//${r.trackingUrl}${r.trackingNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs underline-offset-2 hover:underline">
                              {r.trackingNumber}
                            </a>
                          ) : (
                            <span className="text-xs">{r.trackingNumber}</span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{r.stockingDate ? formatDate(r.stockingDate * 1000) : ""}</TableCell>
                    <TableCell className={cn("font-semibold", state ? STATE_TONE[state] : "")}>{state ? SELLER_STATE_LABEL[state] : "–"}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {state === "SENT" && <ConfirmStockingButton id={r.id} pickup={pickup} />}
                        <Link href={`/naskladneni/${r.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                          Detail požadavku
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination page={page} pageSize={STOCKING_PAGE_SIZE} total={count} params={params} />
    </div>
  );
}
