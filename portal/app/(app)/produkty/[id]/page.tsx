// Detail produktu — port BundleDetail: horní lišta (ID, sklad, cena),
// stav produktu, prodejní ceny B2C/B2B + vinisto PLUS+, slevy, provize,
// údaje o produktu. Data ze serveru, mutace přes server actions.

import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { InfoTip } from "@/components/info-tip";
import { ClearanceSaleButton, DeleteDiscountButton } from "@/components/products/confirm-actions";
import { DiscountButton } from "@/components/products/discount-dialog";
import { FeeRulesSection } from "@/components/products/fee-rules-section";
import { PriceForm } from "@/components/products/price-form";
import { VinistoPlusButton } from "@/components/products/vinisto-plus-dialog";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import {
  B2B_PLATFORM,
  B2C_PLATFORM,
  computeBundlePrices,
  discountState,
  isDiscountActive,
  toDiscount,
  vatPercentOf,
  type Discount,
} from "@/lib/platform/prices";
import {
  bundleImageUrl,
  getBundle,
  getBundlePrices,
  getIdenticalBundles,
  getIntegrations,
  getWarehouseQuantities,
  IMAGE_SIZE,
  localize,
  priceLevelLabel,
  stripHtml,
  type Bundle,
  type SpecificationDetail,
} from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type BundleState = "AVAILABLE" | "CLEARANCE_SALE" | "TEMPORARY_UNAVAILABLE" | "SALE_OVER";

const STATES: Record<BundleState, { title: string; description: string; tone: string }> = {
  AVAILABLE: { title: "V prodeji", description: "Produkt se prodává na platformě.", tone: "text-vinisto-green" },
  CLEARANCE_SALE: {
    title: "Doprodej",
    description: "vinisto doprodá aktuální zásoby a již Vám nebude dále zasílat požadavky na naskladnění tohoto produktu.",
    tone: "text-[#dca056]",
  },
  TEMPORARY_UNAVAILABLE: {
    title: "Momentálně nedostupný",
    description: "Dočasně nedostupný produkt, který nelze v tuto chvíli naskladnit. Pokud máte produkt k dispozici, kontaktujte podporu.",
    tone: "text-vinisto-wine",
  },
  SALE_OVER: { title: "Prodej skončil", description: "Prodej produktu skončil.", tone: "text-vinisto-wine" },
};

function bundleState(b: Bundle): BundleState {
  if (b.temporaryUnavailable) return "TEMPORARY_UNAVAILABLE";
  if (b.isClearanceSale) return "CLEARANCE_SALE";
  if (b.isSaleOver) return "SALE_OVER";
  return "AVAILABLE";
}

const DISCOUNT_STATE_LABEL = { ONGOING: "Probíhá", PLANNED: "Naplánována", EXPIRED: "Ukončena" } as const;

function specValue(spec: SpecificationDetail): string {
  const v = spec.value;
  if (!v) return "–";
  if (v.selectedValuesName?.length) return v.selectedValuesName.map((x) => localize(x)).join(", ");
  if (v.selectedValueName?.length) return localize(v.selectedValueName);
  const raw = v.value;
  if (Array.isArray(raw)) return localize(raw);
  if (typeof raw === "boolean") return raw ? "Ano" : "Ne";
  if (raw == null) return "–";
  const unit = spec.definition?.unit ? ` ${spec.definition.unit}` : "";
  return `${raw}${unit}`;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const bundle = await getBundle(id);
    return { title: bundle ? stripHtml(localize(bundle.name)) : "Produkt" };
  } catch {
    return { title: "Produkt" };
  }
}

export default async function ProduktDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  let bundle: Bundle | null = null;
  let loadError: unknown;
  try {
    bundle = await getBundle(id);
  } catch (e) {
    loadError = e;
  }
  if (loadError) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-2xl font-bold">Detail produktu</h1>
        <DataError error={loadError} what="Produkt" />
      </div>
    );
  }
  if (!bundle) notFound();

  const [pricesResult, stock, integrations, identical] = await Promise.all([
    getBundlePrices(bundle.id, session.loginHash).catch((e) => ({ error: e as unknown })),
    getWarehouseQuantities([bundle.id]),
    getIntegrations(),
    getIdenticalBundles(bundle.id),
  ]);

  const name = stripHtml(localize(bundle.name));
  const state = bundleState(bundle);
  const b2c = computeBundlePrices(bundle, { platformId: B2C_PLATFORM });
  const prices = "error" in pricesResult ? null : pricesResult;
  const b2cPrice = prices?.prices.find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2C_PLATFORM) ?? b2c.basePrice;
  const b2bPrice = prices?.prices.find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2B_PLATFORM) ?? null;
  const vatPercent = b2cPrice?.vatValue ?? vatPercentOf(b2cPrice?.vat);
  const currency = b2cPrice?.currency ?? "CZK";

  // nejnižší aktuální prodejní cena na platformě (tento + identické produkty, včetně slev)
  const lowestOnPlatform = [bundle, ...identical]
    .map((b) => {
      const p = computeBundlePrices(b, { platformId: B2C_PLATFORM });
      return p.isDiscounted && p.discountedPrice ? p.discountedPrice.valueWithVat : p.basePrice?.valueWithVat;
    })
    .filter((v): v is number => typeof v === "number")
    .sort((a, b) => a - b)[0] ?? null;

  // slevy k zobrazení: vinisto PLUS+ jen dodavatelské, objemové nikdy
  const discounts: Discount[] = (prices?.discountPrices ?? [])
    .filter((d) => (d.level === "VinistoPlus" ? d.type === "SupplierDiscount" : d.type !== "VolumeDiscount"))
    .map((d) => toDiscount(d, vatPercent));
  const plusSupplierDiscount = discounts.find((d) => d.level === "VinistoPlus" && d.type === "SupplierDiscount" && isDiscountActive(d));
  const hasPlusPrice = (bundle.prices ?? []).some((p) => p.level === "VinistoPlus");
  const hasUnexpiredPlusDiscount = (bundle.priceDiscounts ?? []).some(
    (d) => d.level === "VinistoPlus" && d.type === "SupplierDiscount" && (d.validTo == null || d.validTo * 1000 > Date.now()),
  );

  const sourceCountry = bundle.supplier?.countryCode ?? supplier.countryCode ?? "CZ";
  const targetCountry = typeof sp.cil === "string" && ["CZ", "SK", "DE"].includes(sp.cil) ? sp.cil : sourceCountry;
  const showHistory = sp.historie === "1";
  const baseParams: Record<string, string> = {};
  if (targetCountry !== sourceCountry) baseParams.cil = targetCountry;
  if (showHistory) baseParams.historie = "1";

  const specs = [...(bundle.specificationDetails ?? [])].sort((a, b) => (a.definition?.orderDetail ?? 0) - (b.definition?.orderDetail ?? 0));
  const imageUrl = bundleImageUrl(bundle.images, IMAGE_SIZE.thumb208);

  return (
    <div className="space-y-4">
      {/* Horní lišta */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">{name}</h1>
          <dl className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <div>
              <dt className="inline text-muted-foreground">ID: </dt>
              <dd className="inline">{(bundle.warehouseId ?? []).join(", ") || bundle.id}</dd>
            </div>
            <div>
              <dt className="inline text-muted-foreground">Aktuálně skladem: </dt>
              <dd className="inline">{stock.has(bundle.id) ? `${stock.get(bundle.id)} ks` : "–"}</dd>
            </div>
            <div>
              <dt className="inline text-muted-foreground">Cena na platformě: </dt>
              <dd className="inline">
                {b2c.basePrice ? (
                  b2c.isDiscounted && b2c.discountedPrice ? (
                    <>
                      <span className="text-muted-foreground line-through">{formatPrice(b2c.basePrice.valueWithVat, currency)}</span>{" "}
                      <span className="font-medium text-vinisto-green">{formatPrice(b2c.discountedPrice.valueWithVat, currency)} vč. DPH</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        (sleva {Math.abs(b2c.discountDifferencePercent)} %, {formatDate(b2c.discountedPrice.validFrom ? b2c.discountedPrice.validFrom * 1000 : null)} –{" "}
                        {b2c.discountedPrice.validTo ? formatDate(b2c.discountedPrice.validTo * 1000) : "neomezeně"})
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-vinisto-green">{formatPrice(b2c.basePrice.valueWithVat, currency)} vč. DPH</span>
                  )
                ) : (
                  "–"
                )}
              </dd>
            </div>
          </dl>
        </div>
        <Link href="/produkty" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>

      {/* Stav produktu */}
      <section className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-border bg-card p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold">Stav produktu</h2>
            <InfoTip title="Stavy produktů">
              {Object.values(STATES).map((s) => (
                <span key={s.title} className="block">
                  <strong>{s.title}:</strong> {s.description}
                </span>
              ))}
            </InfoTip>
          </div>
          <div className={cn("text-xl font-semibold", STATES[state].tone)}>{STATES[state].title}</div>
          <p className="text-sm text-muted-foreground">{STATES[state].description}</p>
        </div>
        {state === "AVAILABLE" && (
          <div className="space-y-1 text-sm">
            <div className="text-muted-foreground">Změnit stav produktu na</div>
            <ClearanceSaleButton bundleId={bundle.id} />
            <p className="max-w-xs text-xs text-muted-foreground">{STATES.CLEARANCE_SALE.description}</p>
          </div>
        )}
      </section>

      {/* Prodej */}
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-3 font-heading text-lg font-semibold">Prodej</h2>
        {"error" in pricesResult && <DataError error={pricesResult.error} what="Ceny produktu" />}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-medium">B2C cena produktu</h3>
            <PriceForm
              bundleId={bundle.id}
              platformId={0}
              platformLabel={integrations.get(0) ?? "B2C"}
              currency={currency}
              vatPercent={vatPercent}
              priceWithVat={b2cPrice?.valueWithVat ?? null}
              priceWithoutVat={b2cPrice?.value ?? null}
              b2cPriceWithVat={b2cPrice?.valueWithVat ?? null}
            />
            <div className="text-sm">
              <div className="text-muted-foreground">Nejnižší aktuální prodejní cena na platformě vč. DPH</div>
              <div className="font-medium">{lowestOnPlatform != null ? formatPrice(lowestOnPlatform, currency) : "–"}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Nejnižší cena na internetu</div>
              <div className="font-medium">{bundle.lowestInternetPrice != null ? formatPrice(bundle.lowestInternetPrice, currency) : "–"}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">B2B cena produktu</h3>
            <PriceForm
              bundleId={bundle.id}
              platformId={1}
              platformLabel={integrations.get(1) ?? "B2B"}
              currency={currency}
              vatPercent={vatPercent}
              priceWithVat={b2bPrice?.valueWithVat ?? null}
              priceWithoutVat={b2bPrice?.value ?? null}
              b2cPriceWithVat={b2cPrice?.valueWithVat ?? null}
            />
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">vinisto PLUS+ cena produktu</h3>
            {plusSupplierDiscount ? (
              <div className="space-y-1 text-sm">
                <div>
                  Prodejní cena vinisto PLUS+ vč. DPH{" "}
                  <span className="font-semibold">{formatPrice(plusSupplierDiscount.valueWithVat, currency, 2)}</span>{" "}
                  <span className="text-muted-foreground">({formatPrice(plusSupplierDiscount.value, currency, 2)} bez DPH)</span>
                </div>
                <Badge variant="green">{DISCOUNT_STATE_LABEL[discountState(plusSupplierDiscount)]}</Badge>
                <div className="text-xs text-muted-foreground">
                  od {formatDate(plusSupplierDiscount.validFrom ? plusSupplierDiscount.validFrom * 1000 : null)} do{" "}
                  {plusSupplierDiscount.validTo ? formatDate(plusSupplierDiscount.validTo * 1000) : "neomezeně"}
                </div>
              </div>
            ) : bundle.isSet ? (
              <p className="text-sm text-muted-foreground">Sety do vinisto PLUS+ nejdou zařadit.</p>
            ) : (
              <VinistoPlusButton bundleId={bundle.id} bundleName={name} size="default" />
            )}
          </div>
        </div>
      </section>

      {/* Slevy */}
      {!bundle.isSet && (
        <section className="space-y-3 rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-lg font-semibold">Přehled plánovaných a probíhajících slev</h2>
            <div className="flex gap-2">
              {b2cPrice?.valueWithVat ? (
                <DiscountButton bundleId={bundle.id} priceWithVat={b2cPrice.valueWithVat} lowestPriceWithVat={lowestOnPlatform} currency={currency} />
              ) : null}
              {hasPlusPrice && !hasUnexpiredPlusDiscount && <VinistoPlusButton bundleId={bundle.id} bundleName={name} />}
            </div>
          </div>
          {discounts.length === 0 ? (
            <p className="rounded-md border border-border p-4 text-center text-sm text-muted-foreground">Nebyly nalezeny žádné záznamy.</p>
          ) : (
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ slevy</TableHead>
                    <TableHead align="right">Cena ve slevě (vč. DPH)</TableHead>
                    <TableHead>Počátek slevy</TableHead>
                    <TableHead>Konec slevy</TableHead>
                    <TableHead>Stav</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discounts.map((d, i) => {
                    const st = discountState(d);
                    return (
                      <TableRow key={d.priceId ?? i}>
                        <TableCell>{priceLevelLabel(d.platformId, d.level, integrations)}</TableCell>
                        <TableCell align="right" className="text-right">{formatPrice(d.valueWithVat, d.currency, 2)}</TableCell>
                        <TableCell title={d.validFrom ? formatDateTime(d.validFrom * 1000) : undefined}>{d.validFrom ? formatDate(d.validFrom * 1000) : "–"}</TableCell>
                        <TableCell title={d.validTo ? formatDateTime(d.validTo * 1000) : undefined}>{d.validTo ? formatDate(d.validTo * 1000) : "Nekončící sleva"}</TableCell>
                        <TableCell>
                          <Badge variant={st === "ONGOING" ? "green" : st === "PLANNED" ? "blue" : "outline"}>{DISCOUNT_STATE_LABEL[st]}</Badge>
                        </TableCell>
                        <TableCell>
                          {st !== "EXPIRED" && (
                            <div className="flex justify-end gap-2">
                              {st !== "ONGOING" && d.level !== "VinistoPlus" && b2cPrice?.valueWithVat ? (
                                <DiscountButton
                                  bundleId={bundle.id}
                                  priceWithVat={b2cPrice.valueWithVat}
                                  lowestPriceWithVat={lowestOnPlatform}
                                  currency={currency}
                                  label="Upravit"
                                  initial={{ discountedWithVat: d.valueWithVat, validFrom: d.validFrom, validTo: d.validTo }}
                                />
                              ) : null}
                              {d.priceId && (
                                <DeleteDiscountButton bundleId={bundle.id} discountId={d.priceId} priceLevel={d.level} platformId={d.platformId} currency={d.currency} />
                              )}
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
        </section>
      )}

      {/* Provize */}
      <FeeRulesSection
        bundleId={bundle.id}
        supplierId={supplier.id}
        loginHash={session.loginHash}
        sourceCountry={sourceCountry}
        targetCountry={targetCountry}
        showHistory={showHistory}
        integrations={integrations}
        baseParams={baseParams}
      />

      {/* Údaje o produktu */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-heading text-lg font-semibold">Údaje o produktu</h2>
        <p className="text-xs italic text-muted-foreground">
          Tyto údaje jsou zobrazeny na platformě a viditelné uživatelům. Pokud byste si přáli údaje změnit, kontaktujte prosím podporu.
        </p>
        <div className="grid gap-6 md:grid-cols-[208px_1fr]">
          <div>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="Obrázek produktu" className="w-52 rounded-md border border-border object-contain" />
            ) : (
              <div className="flex h-60 w-52 items-center justify-center rounded-md border border-border text-xs text-muted-foreground">bez obrázku</div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-xl font-semibold">{name}</h3>
              {bundle.description && (
                <div className="prose prose-sm mt-2 max-w-none text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: localize(bundle.description, "") }} />
              )}
            </div>
            {specs.length > 0 && (
              <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {specs.map((s, i) => (
                  <div key={s.definition?.id ?? i} className="flex justify-between gap-3 border-b border-border py-1">
                    <dt className="text-muted-foreground">{localize(s.definition?.name)}</dt>
                    <dd className="text-right">{specValue(s)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {bundle.isSet && (bundle.setBundles?.length ?? 0) > 0 && (
              <div>
                <h4 className="mb-1 font-medium">Produkty v setu</h4>
                <ul className="list-inside list-disc text-sm">
                  {bundle.setBundles!.map((sb, i) => (
                    <li key={sb.id ?? i}>
                      {sb.id ? (
                        <Link href={`/produkty/${sb.id}`} className="hover:underline">
                          {stripHtml(localize(sb.name))}
                        </Link>
                      ) : (
                        stripHtml(localize(sb.name))
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
