// Cenový model produktu — port `mapApiPricesToBundlePrices` z
// packages/vinisto-api-client/src/domain/bundle/adapter.ts, zúžený na to,
// co portál prodejce potřebuje: základní cena (Level1 na platformě), aktivní
// sleva, vinisto PLUS+ cena a odvozené rozdíly. Čistý modul (testovatelný).
//
// Platforma vrací `prices` (běžné ceny) a `priceDiscounts` (slevy) — swagger
// typy u slev neznají `validFrom`/`validTo`/`type`, proto vlastní typy.

export type PriceLevel =
  | "Level1" | "Level2" | "Level3" | "Level4" | "Level5"
  | "Level6" | "Level7" | "Level8" | "Level9" | "Level10"
  | "VinistoPlus";

export type DiscountType = "VinistoDiscount" | "SupplierDiscount" | "VolumeDiscount" | "GroupDiscount" | "SetDiscount";

export type ApiPrice = {
  priceId?: string | null;
  currency?: string | null;
  level?: PriceLevel | string | null;
  platformId?: number | null;
  vat?: string | null;
  vatValue?: number | null;
  value?: number | null;
  valueWithVat?: number | null;
};

export type ApiDiscount = ApiPrice & {
  type?: DiscountType | string | null;
  /** unix sekundy; null = bez omezení */
  validFrom?: number | null;
  validTo?: number | null;
};

export type Price = {
  priceId: string | null;
  currency: string;
  level: string;
  platformId: number;
  vat: string | null;
  vatValue: number;
  value: number;
  valueWithVat: number;
};

export type Discount = Price & {
  type: string | null;
  validFrom: number | null;
  validTo: number | null;
};

export const B2C_PLATFORM = 0;
export const B2B_PLATFORM = 1;
export const DEFAULT_CURRENCY = "CZK";
export const BASE_VAT_PERCENT = 21;

/** Sazby DPH podle enumu platformy (VatRate) v procentech. */
export const VAT_PERCENT: Record<string, number> = {
  BaseVat: 21,
  FirstReducedVat: 12,
  SecondReducedVat: 12,
  NoVat: 0,
};

export function vatPercentOf(vat: string | null | undefined, fallback = BASE_VAT_PERCENT): number {
  if (!vat) return fallback;
  return VAT_PERCENT[vat] ?? fallback;
}

const round2 = (n: number) => Number(n.toFixed(2));

export function toPrice(p: ApiPrice, vatFallback = BASE_VAT_PERCENT): Price {
  return {
    priceId: p.priceId ?? null,
    currency: p.currency ?? DEFAULT_CURRENCY,
    level: p.level ?? "Level1",
    platformId: p.platformId ?? B2C_PLATFORM,
    vat: p.vat ?? null,
    vatValue: p.vatValue ?? vatFallback,
    value: round2(p.value ?? 0),
    valueWithVat: round2(p.valueWithVat ?? 0),
  };
}

export function toDiscount(d: ApiDiscount, vatFallback = BASE_VAT_PERCENT): Discount {
  return {
    ...toPrice(d, vatFallback),
    type: d.type ?? null,
    validFrom: d.validFrom ?? null,
    validTo: d.validTo ?? null,
  };
}

/** Sleva bez omezení je aktivní vždy, jinak musí `now` ležet v <validFrom, validTo>. */
export function isDiscountActive(d: { validFrom?: number | null; validTo?: number | null }, nowSec = Date.now() / 1000): boolean {
  if (d.validFrom == null && d.validTo == null) return true;
  if (d.validFrom != null && nowSec < d.validFrom) return false;
  if (d.validTo != null && nowSec > d.validTo) return false;
  return true;
}

export type DiscountState = "ONGOING" | "PLANNED" | "EXPIRED";

/** Stav slevy pro tabulku (port `Discounts/helpers.ts`). */
export function discountState(d: { validFrom?: number | null; validTo?: number | null }, nowSec = Date.now() / 1000): DiscountState {
  if (d.validTo == null) return "ONGOING";
  if (d.validTo < nowSec) return "EXPIRED";
  if (d.validFrom != null && d.validFrom > nowSec) return "PLANNED";
  return "ONGOING";
}

export type BundlePrices = {
  currency: string;
  platformId: number;
  basePrice: Price | null;
  discountedPrice: Discount | null;
  isDiscounted: boolean;
  /** rozdíl s DPH (záporný = sleva) */
  discountDifferenceWithVat: number;
  discountDifferencePercent: number;
  /** vinisto PLUS+ cena/sleva, jen když je nižší než nejnižší běžná cena */
  vinistoPlus: Discount | Price | null;
};

/**
 * Odvodí ceny produktu pro danou měnu a platformu.
 * - basePrice = běžná cena `Level1` na platformě
 * - discountedPrice = nejnižší aktivní sleva typu Supplier/Vinisto (u setu SetDiscount) na `Level1`
 * - isDiscounted jen když je sleva opravdu nižší než základ
 */
export function computeBundlePrices(
  input: { prices?: ApiPrice[] | null; priceDiscounts?: ApiDiscount[] | null; isSet?: boolean | null },
  options: { currency?: string; platformId?: number; nowSec?: number } = {},
): BundlePrices {
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const platformId = options.platformId ?? B2C_PLATFORM;
  const nowSec = options.nowSec ?? Date.now() / 1000;

  const prices = (input.prices ?? []).filter((p) => (p.currency ?? DEFAULT_CURRENCY) === currency);
  const discounts = (input.priceDiscounts ?? []).filter((d) => (d.currency ?? DEFAULT_CURRENCY) === currency);

  const baseApi = prices.find((p) => p.level === "Level1" && (p.platformId ?? B2C_PLATFORM) === platformId);
  const basePrice = baseApi ? toPrice(baseApi) : null;
  const vatFallback = basePrice?.vatValue ?? BASE_VAT_PERCENT;

  const activeForPlatform = discounts
    .filter((d) => isDiscountActive(d, nowSec) && (d.platformId ?? B2C_PLATFORM) === platformId)
    .map((d) => toDiscount(d, vatFallback))
    .sort((a, b) => a.value - b.value);

  const wantedType = input.isSet ? ["SetDiscount"] : ["SupplierDiscount", "VinistoDiscount"];
  const discountedPrice =
    activeForPlatform.find((d) => d.level === "Level1" && wantedType.includes(d.type ?? "")) ?? null;

  const decimals = currency === DEFAULT_CURRENCY ? 0 : 2;
  const diff =
    basePrice && discountedPrice
      ? Number((discountedPrice.valueWithVat - basePrice.valueWithVat).toFixed(decimals))
      : Number.NaN;
  const isDiscounted = !Number.isNaN(diff) && diff < 0;
  const diffPercent = isDiscounted && basePrice ? (diff / basePrice.valueWithVat) * 100 : 0;

  // vinisto PLUS+: aktivní sleva na úrovni VinistoPlus, jinak běžná VinistoPlus cena — jen když je levnější
  const plusDiscount = discounts.filter((d) => d.level === "VinistoPlus" && isDiscountActive(d, nowSec)).map((d) => toDiscount(d, vatFallback))[0];
  const plusPrice = prices.filter((p) => p.level === "VinistoPlus").map((p) => toPrice(p, vatFallback))[0];
  const plus = plusDiscount ?? plusPrice ?? null;
  const nonPlus = isDiscounted ? discountedPrice!.valueWithVat : (basePrice?.valueWithVat ?? Number.POSITIVE_INFINITY);
  const vinistoPlus = plus && plus.valueWithVat < Number(nonPlus.toFixed(2)) ? plus : null;

  return {
    currency,
    platformId,
    basePrice,
    discountedPrice: isDiscounted ? discountedPrice : null,
    isDiscounted,
    discountDifferenceWithVat: isDiscounted ? diff : 0,
    discountDifferencePercent: Math.round(diffPercent),
    vinistoPlus,
  };
}

/** Procento slevy pro badge („-15 %“); 0 když sleva není. */
export function discountPercent(standardWithVat: number, discountedWithVat: number): number {
  if (!standardWithVat) return 0;
  const pct = Math.round(((standardWithVat - discountedWithVat) / standardWithVat) * 100);
  return pct > 0 && Number.isFinite(pct) ? pct : 0;
}

/** Cena bez DPH z ceny s DPH (zadává se s DPH, platforma chce bez). */
export function withoutVat(priceWithVat: number, vatPercent: number): number {
  return round2(priceWithVat / (1 + vatPercent / 100));
}
