// Slevové kupóny — port DiscountCouponsList: seznam s filtry a řazením přes
// platformu, vytvoření/úprava v dialogu, aktivace a smazání (jen neaktivní).

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponRowActions } from "@/components/coupons/coupon-row-actions";
import { NewCouponButton, type CouponFormValues } from "@/components/coupons/coupon-dialog";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SearchParamInput } from "@/components/search-param-input";
import { SortableHead } from "@/components/sortable-head";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { fetchSupplierCouponPrefix } from "@/lib/auth/vinisto-auth";
import { formatDate, formatPrice } from "@/lib/format";
import { unixToPragueInput } from "@/lib/period";
import {
  COUPON_TYPE_LABEL,
  COUPONS_PAGE_SIZE,
  getEurCouponRate,
  listDiscountCoupons,
  type CouponSort,
  type DiscountCoupon,
} from "@/lib/platform/discount-coupons";

export const metadata = { title: "Slevové kupóny" };
export const dynamic = "force-dynamic";

const SORT_KEYS: CouponSort[] = ["kod", "pouziti", "typ", "vyse", "platnost", "vytvoreno", "od", "aktivni"];

function toFormValues(c: DiscountCoupon): CouponFormValues {
  const type = c.discountCouponType === "AMOUNT" ? "AMOUNT" : "PERCENTAGE";
  return {
    id: c.id,
    isReusable: c.isReusable ? "true" : "false",
    code: c.code ?? "",
    discountCouponType: type,
    validFrom: unixToPragueInput(c.validFrom),
    validTo: unixToPragueInput(c.validTo),
    percentageDiscount: type === "PERCENTAGE" && c.percentageDiscount != null ? String(c.percentageDiscount) : "",
    amountDiscount: type === "AMOUNT" && c.amountDiscount?.value != null ? String(c.amountDiscount.value) : "",
    hasMinOrderValue: Boolean(c.allowedFrom?.value),
    minOrderValue: c.allowedFrom?.value != null ? String(c.allowedFrom.value) : "",
  };
}

function discountLabel(c: DiscountCoupon): string {
  if (c.discountCouponType === "AMOUNT") return formatPrice(c.amountDiscount?.value, "CZK");
  if (c.discountCouponType === "PERCENTAGE") return c.percentageDiscount == null ? "–" : `${c.percentageDiscount} %`;
  return "–";
}

function bool(value: string | string[] | undefined): boolean | undefined {
  return value === "1" ? true : value === "0" ? false : undefined;
}

export default async function KuponyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  const page = pageFromParams(sp.page);
  const sort = (SORT_KEYS.includes(sp.sort as CouponSort) ? sp.sort : "") as CouponSort | "";
  const dir = sort ? (sp.dir === "asc" ? "asc" : "desc") : "desc";
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const pouziti = bool(sp.pouziti);
  const typ = sp.typ === "AMOUNT" || sp.typ === "PERCENTAGE" ? sp.typ : undefined;
  const aktivni = bool(sp.aktivni);
  const params: Record<string, string> = {};
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }
  if (q) params.q = q;
  if (pouziti !== undefined) params.pouziti = pouziti ? "1" : "0";
  if (typ) params.typ = typ;
  if (aktivni !== undefined) params.aktivni = aktivni ? "1" : "0";
  const hasFilter = Boolean(q || pouziti !== undefined || typ || aktivni !== undefined);

  const [list, prefix, eurRate] = await Promise.all([
    listDiscountCoupons({
      supplierId: supplier.id,
      loginHash: session.loginHash,
      page,
      sort: sort || undefined,
      desc: dir === "desc",
      filters: { code: q || undefined, reusable: pouziti, type: typ, active: aktivni },
    })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: { items: [] as DiscountCoupon[], count: 0 }, error })),
    fetchSupplierCouponPrefix(session.loginHash, supplier.id).catch(() => ""),
    getEurCouponRate(),
  ]);

  const sortProps = { sort, dir, params, defaultKey: "", defaultDir: "desc" as const };
  const select = "rounded-md border border-border bg-background px-2 py-1.5 text-sm";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Slevové kupóny</h2>
        <NewCouponButton prefix={prefix} eurRate={eurRate} />
      </div>
      <form method="get" className="flex flex-wrap items-center gap-2 text-sm">
        {sort && <input type="hidden" name="sort" value={sort} />}
        {sort && <input type="hidden" name="dir" value={dir} />}
        <SearchParamInput param="q" initial={q} placeholder="Kód kupónu…" label="Kód kupónu" className="w-44" />
        <select name="pouziti" defaultValue={params.pouziti ?? ""} className={select} aria-label="Použití">
          <option value="">Použití: vše</option>
          <option value="1">Znovupoužitelný</option>
          <option value="0">Jednorázový</option>
        </select>
        <select name="typ" defaultValue={typ ?? ""} className={select} aria-label="Typ">
          <option value="">Typ: vše</option>
          <option value="AMOUNT">Na částku</option>
          <option value="PERCENTAGE">Na procenta</option>
        </select>
        <select name="aktivni" defaultValue={params.aktivni ?? ""} className={select} aria-label="Aktivní">
          <option value="">Aktivní: vše</option>
          <option value="1">Ano</option>
          <option value="0">Ne</option>
        </select>
        <button type="submit" className="rounded-md border border-border px-3 py-1.5 hover:bg-accent">
          Filtrovat
        </button>
        {hasFilter && (
          <Link href="/marketing/kupony" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
            Zrušit filtry
          </Link>
        )}
      </form>

      {list.error ? (
        <DataError error={list.error} what="Slevové kupóny" />
      ) : list.data.items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
          {hasFilter ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Zatím nemáte žádné slevové kupóny."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead label="Kód kupónu" k="kod" {...sortProps} />
                <SortableHead label="Použití" k="pouziti" {...sortProps} />
                <SortableHead label="Typ" k="typ" {...sortProps} />
                <SortableHead label="Výše slevy" k="vyse" align="right" {...sortProps} />
                <SortableHead label="Platnost do" k="platnost" {...sortProps} />
                <SortableHead label="Datum vytvoření" k="vytvoreno" {...sortProps} />
                <SortableHead label="Od částky" k="od" align="right" {...sortProps} />
                <SortableHead label="Aktivní" k="aktivni" {...sortProps} />
                <TableHead>Uplatněn</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.data.items.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono font-medium">{c.code ?? "–"}</TableCell>
                  <TableCell>{c.isReusable ? "Znovupoužitelný" : "Jednorázový"}</TableCell>
                  <TableCell>{COUPON_TYPE_LABEL[c.discountCouponType ?? ""] ?? "–"}</TableCell>
                  <TableCell className="whitespace-nowrap text-right">{discountLabel(c)}</TableCell>
                  <TableCell>{c.validTo ? formatDate(c.validTo * 1000) : "–"}</TableCell>
                  <TableCell>{c.createdAt ? formatDate(c.createdAt * 1000) : "–"}</TableCell>
                  <TableCell className="whitespace-nowrap text-right">{c.allowedFrom?.value ? formatPrice(c.allowedFrom.value, "CZK") : ""}</TableCell>
                  <TableCell className={c.isActive ? "font-semibold text-vinisto-green" : "text-muted-foreground"}>{c.isActive ? "ANO" : "NE"}</TableCell>
                  <TableCell>{c.isUsed ? "ANO" : "NE"}</TableCell>
                  <TableCell>
                    {c.isActive ? (
                      <span className="block text-right text-xs text-muted-foreground" title="Aktivní kupón nelze upravit ani smazat">
                        aktivní
                      </span>
                    ) : (
                      <CouponRowActions initial={toFormValues(c)} prefix={prefix} eurRate={eurRate} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination page={page} pageSize={COUPONS_PAGE_SIZE} total={list.data.count} params={params} />
    </div>
  );
}
