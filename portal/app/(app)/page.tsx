// Přehled — port DashBoard: provize prodejce, prodeje za období (měsíc/rok
// přes ?obdobi=), nejprodávanější produkty, odeslané požadavky na naskladnění
// a produkty v akci. Vše ze serveru přes platformu; období a stránkování v URL.

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { InfoTip } from "@/components/info-tip";
import { Pagination, pageFromParams } from "@/components/pagination";
import { PercentageChange } from "@/components/percentage-change";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { isFuture, nextMonth, parsePeriod, periodBounds, periodLabel, periodToParam, previousMonth, currentPeriod } from "@/lib/period";
import { getDashboardSale, listSentStockingRequests, STOCKING_STATE_LABEL, type SaleData } from "@/lib/platform/dashboard";
import { getSupplierFeeValues, type SupplierFeeValues } from "@/lib/platform/fees";
import { B2B_PLATFORM, B2C_PLATFORM, computeBundlePrices, discountPercent } from "@/lib/platform/prices";
import { listDiscountedBundles, localize, stripHtml, type Bundle } from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const DISCOUNTS_PAGE_SIZE = 5;
const DISCOUNT_EXPIRING_DAYS = 5;

const pct = (value: number | null | undefined) =>
  `od ${Math.min(1, (value ?? 0) / 100).toLocaleString("cs-CZ", { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

function ProvisionRow({ label, b2c, b2b }: { label: string; b2c: number | null | undefined; b2b: number | null | undefined }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="truncate">{label}</span>
      <span className="flex w-36 shrink-0 justify-between tabular-nums">
        <span>{pct(b2c)}</span>
        <span>{pct(b2b)}</span>
      </span>
    </div>
  );
}

function ProvisionsCard({ fees, error, isShipping }: { fees: SupplierFeeValues | null; error: unknown; isShipping: boolean }) {
  const logistic = fees?.feeValues?.supplierLogisticFeeValues ?? [];
  const sale = fees?.feeValues?.supplierSaleFeeValues ?? [];
  const defaultLogistic = isShipping ? fees?.defaultLogisticFeeSupplierTransport : fees?.defaultLogisticFeeVinistoTransport;
  const header = (
    <span className="flex w-36 shrink-0 justify-between text-xs font-medium text-muted-foreground">
      <span>B2C</span>
      <span>B2B</span>
    </span>
  );
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          Moje nastavené provize
          <InfoTip>
            Provize na vinisto se skládá z poplatku za prodej a poplatku za logistiku. Provize se počítají dle aktuálních smluvních podmínek.
            Logistické provize je možné upravit v nastavení v sekci{" "}
            <Link href="/nastaveni/dodani" className="underline">
              Doprava zboží
            </Link>
            . Změna proběhne od dalšího zúčtovacího období.
          </InfoTip>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {error ? <DataError error={error} what="Provize" /> : null}
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-border pb-1">
            <span className="font-medium">
              Logistika{" "}
              <span className="font-normal text-muted-foreground">
                {isShipping ? "Dovážím na sklad" : "Zboží se vyzvedává u mě"} (
                <Link href="/nastaveni/dodani" className="underline">
                  upravit
                </Link>
                )
              </span>
            </span>
            {header}
          </div>
          {logistic.length === 0 && <p className="py-1.5 text-xs text-muted-foreground">V tuto chvíli nemáte žádné nastavené logistické provize.</p>}
          {logistic.map((f, i) => (
            <ProvisionRow
              key={f.allowedValue ?? i}
              label={f.allowedValue ?? "–"}
              b2c={isShipping ? f.minVinistoTransportPercentage : f.minSupplierTransportPercentage}
              b2b={isShipping ? f.minVinistoTransportPercentageB2b : f.minSupplierTransportPercentageB2b}
            />
          ))}
          <ProvisionRow label="Výchozí provize" b2c={defaultLogistic} b2b={defaultLogistic} />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-border pb-1">
            <span className="font-medium">Prodej</span>
            {header}
          </div>
          {sale.length === 0 && <p className="py-1.5 text-xs text-muted-foreground">V tuto chvíli nemáte žádné nastavené prodejní provize.</p>}
          {sale.map((f, i) => (
            <ProvisionRow key={f.allowedValue ?? i} label={f.allowedValue ?? "–"} b2c={f.minB2cPercentage} b2b={f.minB2bPercentage} />
          ))}
          <ProvisionRow label="Výchozí provize" b2c={fees?.defaultSaleFeeValue} b2b={fees?.defaultSaleFeeValueB2b} />
        </div>
      </CardContent>
    </Card>
  );
}

function Tile({ label, value, change, info }: { label: string; value: string; change: number; info?: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-md bg-muted p-3">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {label}
        {info && <InfoTip>{info}</InfoTip>}
      </div>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-right">
          <PercentageChange value={change} />
          <span className="block text-[11px] text-muted-foreground">Oproti předchozímu období</span>
        </span>
      </div>
    </div>
  );
}

export default async function PrehledPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const isShipping = supplier.isShipping ?? false;
  const originCountry = supplier.countryCode ?? "CZ";

  const period = parsePeriod(typeof sp.obdobi === "string" ? sp.obdobi : undefined);
  const { timeFrom, timeTo } = periodBounds(period);
  const discountsPage = pageFromParams(sp.akce);
  const businessType = sp.typ === "b2b" ? "b2b" : "b2c";
  const baseParams: Record<string, string> = {};
  if (typeof sp.obdobi === "string") baseParams.obdobi = sp.obdobi;
  if (businessType === "b2b") baseParams.typ = "b2b";
  const withParam = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(baseParams);
    if (discountsPage > 1) next.set("akce", String(discountsPage));
    if (value === undefined) next.delete(key);
    else next.set(key, value);
    if (key === "obdobi") next.delete("akce");
    const qs = next.toString();
    return qs ? `?${qs}` : "/";
  };

  const [fees, sale, stocking, discounted] = await Promise.all([
    getSupplierFeeValues({ supplierId: supplier.id, loginHash: session.loginHash, originCountry, destinationCountry: "CZ" })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    getDashboardSale({ supplierId: supplier.id, loginHash: session.loginHash, timeFrom, timeTo })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null as SaleData | null, error })),
    listSentStockingRequests({ supplierId: supplier.id, loginHash: session.loginHash, limit: 20 })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    listDiscountedBundles({ supplierId: supplier.id, page: discountsPage, pageSize: DISCOUNTS_PAGE_SIZE })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
  ]);

  const saleData = sale.data;
  const bestSelling = saleData?.bundles ?? [];
  const nowSec = Date.now() / 1000;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold">Přehled</h1>
        <p className="text-sm text-muted-foreground">
          {session.email} · prodejce <span className="font-medium text-foreground">{supplier.name}</span>
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4">
          <ProvisionsCard fees={fees.data} error={fees.error} isShipping={isShipping} />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Aktuální požadavky na naskladnění</CardTitle>
            </CardHeader>
            <CardContent>
              {stocking.error ? (
                <DataError error={stocking.error} what="Požadavky na naskladnění" />
              ) : !stocking.data || stocking.data.items.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">V tuto chvíli nemáte žádný aktivní požadavek</p>
              ) : (
                <div className="max-h-56 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Číslo požadavku</TableHead>
                        <TableHead>Datum vystavení</TableHead>
                        <TableHead>Stav</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stocking.data.items.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <Link href={`/naskladneni/${r.id}`} className="font-medium hover:underline">
                              {r.requestNumber ?? r.id}
                            </Link>
                          </TableCell>
                          <TableCell>{r.createdAt ? formatDate(r.createdAt * 1000) : ""}</TableCell>
                          <TableCell className={cn(r.stockingState === "SENT" && "font-semibold")}>
                            {STOCKING_STATE_LABEL[r.stockingState ?? ""] ?? r.stockingState ?? "–"}
                            {r.stockingState === "SENT" && <span className="ml-1 inline-block size-2 rounded-full bg-[#ffb265]" aria-hidden />}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Přehled mých prodejů</CardTitle>
              <nav className="flex flex-wrap items-center gap-1 text-xs">
                <Link href={withParam("obdobi", periodToParam(previousMonth(period)))} className="rounded-md border border-border px-2 py-1 hover:bg-accent" aria-label="Předchozí měsíc">
                  ‹
                </Link>
                <span className="min-w-32 text-center font-medium">{periodLabel(period)}</span>
                {isFuture(nextMonth(period)) ? (
                  <span className="rounded-md border border-border px-2 py-1 opacity-50">›</span>
                ) : (
                  <Link href={withParam("obdobi", periodToParam(nextMonth(period)))} className="rounded-md border border-border px-2 py-1 hover:bg-accent" aria-label="Další měsíc">
                    ›
                  </Link>
                )}
                <Link href={withParam("obdobi", String(currentPeriod().year))} className="rounded-md border border-border px-2 py-1 hover:bg-accent">
                  Tento rok
                </Link>
                <Link href={withParam("obdobi", undefined)} className="rounded-md border border-border px-2 py-1 hover:bg-accent">
                  Tento měsíc
                </Link>
              </nav>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sale.error ? (
              <DataError error={sale.error} what="Data o prodeji" />
            ) : !saleData ? (
              <p className="py-10 text-center text-sm text-muted-foreground">V tuto chvíli nemáme data o Vašem prodeji.</p>
            ) : (
              <>
                <div className="text-sm font-medium">Prodáno za období</div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <Tile label="Počet kusů" value={`${formatNumber(saleData.totalSoldPcs ?? 0)} ks`} change={saleData.totalSoldPcsPercentageDifference ?? 0} />
                  <Tile
                    label="Celkově prodáno za"
                    value={formatPrice(saleData.totalProfit ?? 0)}
                    change={saleData.totalProfitPercentageDifference ?? 0}
                    info={
                      <>
                        Celkový objem prodejů na vinisto.cz očištěných o provize za prodej a logistiku. Detailní rozpad naleznete v sekci{" "}
                        <Link href="/vyuctovani" className="underline">
                          Faktury/Vyúčtování
                        </Link>
                        .
                      </>
                    }
                  />
                  <Tile label="Počet objednávek s mým zbožím" value={formatNumber(saleData.totalOrderCount ?? 0)} change={saleData.totalOrderCountPercentageDifference ?? 0} />
                </div>
                <div className="text-sm font-medium">Nejprodávanější produkty</div>
                {bestSelling.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">V tuto chvíli nemáme data o Vašem prodeji.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Název</TableHead>
                        <TableHead align="right">Prodaných kusů</TableHead>
                        <TableHead />
                        <TableHead align="right">Celkem za</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bestSelling.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell>
                            <Link href={`/produkty/${b.id}`} className="font-medium hover:underline">
                              {stripHtml(localize(b.bundleDetail?.name))}
                            </Link>
                          </TableCell>
                          <TableCell align="right" className="text-right">{formatNumber(b.soldPcs ?? 0)} ks</TableCell>
                          <TableCell>{typeof b.soldPcsPercentageDifference === "number" && b.soldPcsPercentageDifference > 0 && <PercentageChange value={b.soldPcsPercentageDifference} />}</TableCell>
                          <TableCell align="right" className="text-right">{formatPrice(b.sumPrice ?? 0, "CZK", 2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">Produkty v akci</CardTitle>
            <div className="flex gap-1">
              {(["b2c", "b2b"] as const).map((t) => (
                <Link
                  key={t}
                  href={withParam("typ", t === "b2c" ? undefined : t)}
                  className={cn("rounded-md px-2.5 py-1 text-xs", businessType === t ? "bg-merkatos-blue text-white" : "border border-border hover:bg-accent")}
                >
                  {t.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {discounted.error ? (
            <DataError error={discounted.error} what="Produkty v akci" />
          ) : !discounted.data || discounted.data.bundles.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">V tuto chvíli nemáte žádný produkt v akci</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Název produktu</TableHead>
                    <TableHead align="right">Běžná cena {businessType.toUpperCase()}</TableHead>
                    <TableHead align="right">Cena ve slevě</TableHead>
                    <TableHead>Platnost slevy od</TableHead>
                    <TableHead>Platnost slevy do</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discounted.data.bundles.map((b: Bundle) => {
                    const p = computeBundlePrices(b, { platformId: businessType === "b2b" ? B2B_PLATFORM : B2C_PLATFORM });
                    const d = p.isDiscounted ? p.discountedPrice : null;
                    const daysLeft = d?.validTo != null ? Math.floor((d.validTo - nowSec) / 86_400) : null;
                    const expiring = daysLeft != null && daysLeft < DISCOUNT_EXPIRING_DAYS;
                    return (
                      <TableRow key={b.id} className={cn(expiring && "bg-accent/40")}>
                        <TableCell>
                          <Link href={`/produkty/${b.id}`} className="font-medium hover:underline">
                            {stripHtml(localize(b.name))}
                          </Link>
                        </TableCell>
                        <TableCell align="right" className="text-right">{p.basePrice ? formatPrice(p.basePrice.valueWithVat, p.currency) : ""}</TableCell>
                        <TableCell align="right" className="text-right">
                          {d && p.basePrice ? (
                            <span className="inline-flex items-center gap-2">
                              <Badge variant="red">-{discountPercent(p.basePrice.valueWithVat, d.valueWithVat)} %</Badge>
                              {formatPrice(d.valueWithVat, p.currency)}
                            </span>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell>{d?.validFrom ? formatDate(d.validFrom * 1000) : ""}</TableCell>
                        <TableCell>{d?.validTo ? formatDate(d.validTo * 1000) : ""}</TableCell>
                        <TableCell className="text-xs font-semibold">
                          {expiring && (
                            <span className="inline-flex items-center gap-1">
                              Tato akce brzy končí. <span className="inline-block size-2 rounded-full bg-[#ffb265]" aria-hidden />
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Pagination page={discountsPage} pageSize={DISCOUNTS_PAGE_SIZE} total={discounted.data.count} params={baseParams} paramName="akce" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
