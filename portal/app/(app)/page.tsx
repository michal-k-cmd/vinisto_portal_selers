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
import { getSupplierFeeRules, getSupplierFeeValues, type FeeRuleRow, type SupplierFeeValues } from "@/lib/platform/fees";
import { defaultFeeRow, feeTableRow, splitFee, type FeeTableRow } from "@/lib/platform/fees-format";
import { B2B_PLATFORM, B2C_PLATFORM, computeBundlePrices, discountPercent } from "@/lib/platform/prices";
import { getSpecificationValueNames, listDiscountedBundles, localize, specValueResolver, stripHtml, type Bundle, type SpecValueResolver } from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const DISCOUNTS_PAGE_SIZE = 5;
const DISCOUNT_EXPIRING_DAYS = 5;

function FeeCells({ value }: { value: string }) {
  const [b2c, b2b] = splitFee(value);
  return (
    <>
      <TableCell className="whitespace-nowrap text-right tabular-nums">{b2c || "–"}</TableCell>
      <TableCell className="whitespace-nowrap text-right tabular-nums">{b2b || "–"}</TableCell>
    </>
  );
}

function RuleCell({ row }: { row: FeeTableRow }) {
  return (
    <TableCell className="min-w-48">
      <div className={cn("font-medium", row.isDefault && "text-muted-foreground")}>{row.name || (row.conditions[0] ?? "Obecné pravidlo")}</div>
      {row.conditions.length > 0 && <div className="text-xs text-muted-foreground">{row.conditions.join(" · ")}</div>}
      {row.validity && <div className="text-xs text-muted-foreground">{row.validity}</div>}
    </TableCell>
  );
}

const MAX_RULE_ROWS = 8;

/**
 * Skutečně aplikovaná provizní pravidla prodejce (dynamická + prodejní +
 * logistická z adminu, směr země prodejce → CZ) a výchozí sazby jako poslední
 * řádek. Stejný zdroj jako stránka Vyúčtování → Provize.
 */
function ProvisionsCard({ rules, fees, error, isShipping, originCountry, resolve }: { rules: FeeRuleRow[]; fees: SupplierFeeValues | null; error: unknown; isShipping: boolean; originCountry: string; resolve: SpecValueResolver }) {
  const rows = rules.map((r, i) => feeTableRow(r, i, resolve));
  const saleRows = rows.filter((r) => r.domestic);
  const logisticRows = rows.filter((r) => (isShipping ? r.logisticsSupplier : r.logisticsVinisto));
  const defaults = defaultFeeRow(fees);
  const moreLink = (n: number) =>
    n > MAX_RULE_ROWS ? (
      <Link href="/vyuctovani/provize" className="block px-3 py-2 text-xs text-muted-foreground underline-offset-2 hover:underline">
        + {n - MAX_RULE_ROWS} dalších pravidel
      </Link>
    ) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base">
            Moje provize
            <InfoTip>
              Provize na vinisto se skládá z poplatku za prodej a poplatku za logistiku. Zobrazují se pravidla platná pro směr prodeje {originCountry} → CZ;
              ostatní směry najdete v sekci Vyúčtování → Provize. Logistické provize je možné upravit v nastavení v sekci{" "}
              <Link href="/nastaveni/dodani" className="underline">
                Doprava zboží
              </Link>
              . Změna proběhne od dalšího zúčtovacího období.
            </InfoTip>
          </CardTitle>
          <Link href="/vyuctovani/provize" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
            Všechna provizní pravidla a směry prodeje ›
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <DataError error={error} what="Provize" />
        ) : (
          <div className="grid gap-4 xl:grid-cols-[3fr_2fr]">
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prodej</TableHead>
                    <TableHead colSpan={2} className="text-center">
                      Domácí produkce
                    </TableHead>
                    <TableHead colSpan={2} className="text-center">
                      Zahraniční produkce
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-xs font-normal">pravidlo</TableHead>
                    <TableHead className="text-right text-xs font-normal">B2C</TableHead>
                    <TableHead className="text-right text-xs font-normal">B2B</TableHead>
                    <TableHead className="text-right text-xs font-normal">B2C</TableHead>
                    <TableHead className="text-right text-xs font-normal">B2B</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleRows.slice(0, MAX_RULE_ROWS).map((r) => (
                    <TableRow key={r.key}>
                      <RuleCell row={r} />
                      <FeeCells value={r.domestic} />
                      <FeeCells value={r.foreign || r.domestic} />
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/40">
                    <RuleCell row={defaults} />
                    <FeeCells value={defaults.domestic} />
                    <FeeCells value={defaults.foreign} />
                  </TableRow>
                </TableBody>
              </Table>
              {moreLink(saleRows.length)}
            </div>

            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Logistika{" "}
                      <span className="font-normal text-muted-foreground">
                        · {isShipping ? "dovážím na sklad" : "zboží se vyzvedává u mě"} (
                        <Link href="/nastaveni/dodani" className="underline">
                          upravit
                        </Link>
                        )
                      </span>
                    </TableHead>
                    <TableHead className="text-right text-xs font-normal">B2C</TableHead>
                    <TableHead className="text-right text-xs font-normal">B2B</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logisticRows.slice(0, MAX_RULE_ROWS).map((r) => (
                    <TableRow key={r.key}>
                      <RuleCell row={r} />
                      <FeeCells value={isShipping ? r.logisticsSupplier : r.logisticsVinisto} />
                    </TableRow>
                  ))}
                  {logisticRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-xs text-muted-foreground">
                        Žádné zvláštní logistické pravidlo, platí výchozí provize.
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className="bg-muted/40">
                    <RuleCell row={defaults} />
                    <FeeCells value={isShipping ? defaults.logisticsSupplier : defaults.logisticsVinisto} />
                  </TableRow>
                </TableBody>
              </Table>
              {moreLink(logisticRows.length)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Tile({ label, value, change, info }: { label: string; value: string; change: number; info?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {label}
        {info && <InfoTip>{info}</InfoTip>}
      </div>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
        <span className="font-heading text-3xl font-bold">{value}</span>
        <span className="text-right">
          <PercentageChange value={change} />
          <span className="block text-[11px] text-muted-foreground">oproti předchozímu období</span>
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

  const [fees, rules, sale, stocking, discounted, specNames] = await Promise.all([
    getSupplierFeeValues({ supplierId: supplier.id, loginHash: session.loginHash, originCountry, destinationCountry: "CZ" })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    getSupplierFeeRules({ supplierId: supplier.id, loginHash: session.loginHash, originCountry, destinationCountry: "CZ" })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: [] as FeeRuleRow[], error })),
    getDashboardSale({ supplierId: supplier.id, loginHash: session.loginHash, timeFrom, timeTo })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null as SaleData | null, error })),
    listSentStockingRequests({ supplierId: supplier.id, loginHash: session.loginHash, limit: 20 })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    listDiscountedBundles({ supplierId: supplier.id, page: discountsPage, pageSize: DISCOUNTS_PAGE_SIZE })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null, error })),
    getSpecificationValueNames(),
  ]);
  const resolveSpec = specValueResolver(specNames);

  const saleData = sale.data;
  const bestSelling = saleData?.bundles ?? [];
  const nowSec = Date.now() / 1000;

  const periodNav = (
    <nav className="flex flex-wrap items-center gap-1 text-xs">
      <Link href={withParam("obdobi", periodToParam(previousMonth(period)))} className="rounded-md border border-border px-2 py-1 hover:bg-accent" aria-label="Předchozí měsíc">
        ‹
      </Link>
      <span className="min-w-32 text-center text-sm font-medium">{periodLabel(period)}</span>
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
  );

  return (
    <div className="space-y-5">
      {/* Titulek + období */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Přehled</h1>
          <p className="text-sm text-muted-foreground">
            {session.email} · prodejce <span className="font-medium text-foreground">{supplier.name}</span>
          </p>
        </div>
        {periodNav}
      </div>

      {/* Prodeje za období — KPI na celou šířku */}
      <section className="space-y-2">
        <h2 className="font-heading text-base font-semibold">
          Prodáno za období <span className="font-normal text-muted-foreground">· {periodLabel(period)}</span>
        </h2>
        {sale.error ? (
          <DataError error={sale.error} what="Data o prodeji" />
        ) : !saleData ? (
          <p className="rounded-lg border border-border bg-card py-8 text-center text-sm text-muted-foreground">V tuto chvíli nemáme data o Vašem prodeji.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <Tile label="Počet prodaných kusů" value={`${formatNumber(saleData.totalSoldPcs ?? 0)} ks`} change={saleData.totalSoldPcsPercentageDifference ?? 0} />
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
        )}
      </section>

      {/* Provize — tabulky na celou šířku */}
      <ProvisionsCard rules={rules.data} fees={fees.data} error={rules.error ?? fees.error} isShipping={isShipping} originCountry={originCountry} resolve={resolveSpec} />

      {/* Nejprodávanější produkty + naskladnění vedle sebe */}
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Nejprodávanější produkty <span className="font-normal text-muted-foreground">· {periodLabel(period)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sale.error || !saleData || bestSelling.length === 0 ? (
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Aktuální požadavky na naskladnění</CardTitle>
              <Link href="/naskladneni" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
                Všechny požadavky ›
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stocking.error ? (
              <DataError error={stocking.error} what="Požadavky na naskladnění" />
            ) : !stocking.data || stocking.data.items.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">V tuto chvíli nemáte žádný aktivní požadavek</p>
            ) : (
              <div className="max-h-72 overflow-y-auto">
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
