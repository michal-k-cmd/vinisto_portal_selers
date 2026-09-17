// Produkty prodejce — datová vrstva nad product-api / warehouse-api.
// Přesný tvar endpointů: docs/inventar-api.md (hash v query vs. v těle).

import "server-only";
import { platformRequest } from "./client";
import type { ApiDiscount, ApiPrice } from "./prices";

export type LangValue = { language?: string | null; value?: string | null };

export type BundleImage = {
  isMain?: boolean | null;
  domainUrls?: Record<string, string | undefined> | null;
};

export type SpecificationDetail = {
  definition?: {
    id?: string | null;
    name?: LangValue[] | null;
    orderDetail?: number | null;
    unit?: string | null;
    specificationType?: string | null;
  } | null;
  value?: {
    value?: LangValue[] | string | number | boolean | null;
    selectedValueName?: LangValue[] | null;
    selectedValuesName?: LangValue[][] | null;
    specificationType?: string | null;
  } | null;
};

/** Produkt (bundle) z platformy — jen pole, která portál používá. */
export type Bundle = {
  id: string;
  name?: LangValue[] | null;
  description?: LangValue[] | null;
  images?: BundleImage[] | null;
  categories?: string[] | null;
  prices?: ApiPrice[] | null;
  priceDiscounts?: ApiDiscount[] | null;
  specificationDetails?: SpecificationDetail[] | null;
  warehouseId?: string[] | null;
  isGift?: boolean | null;
  temporaryUnavailable?: boolean | null;
  isClearanceSale?: boolean | null;
  isSaleOver?: boolean | null;
  isSet?: boolean | null;
  isEnabled?: boolean | null;
  lowestInternetPrice?: number | null;
  supplier?: { id?: string | null; countryCode?: string | null } | null;
  setBundles?: Array<{ id?: string | null; name?: LangValue[] | null }> | null;
};

type BundlesReturn = { isError?: boolean; error?: unknown; bundles?: Bundle[] | null; count?: number };
type BundleReturn = { isError?: boolean; error?: unknown; bundle?: Bundle | null };

/** Lokalizovaná hodnota: čeština, jinak první, jinak „–“. */
export function localize(values: LangValue[] | null | undefined, fallback = "–"): string {
  if (!values || values.length === 0) return fallback;
  const cz = values.find((v) => v.language === "CZECH")?.value;
  return (cz ?? values[0]?.value ?? fallback) || fallback;
}

/** Odstraní HTML značky z názvu/popisu (platforma je do názvů někdy vkládá). */
export function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export const IMAGE_SIZE = {
  original: "original_png",
  thumb64: "thumb_64x80",
  thumb208: "thumb_208x240",
} as const;

export function bundleImageUrl(images: BundleImage[] | null | undefined, size: string = IMAGE_SIZE.thumb64): string | null {
  const list = images ?? [];
  const main = list.find((i) => i.isMain) ?? list[0];
  return main?.domainUrls?.[size] ?? main?.domainUrls?.[IMAGE_SIZE.original] ?? null;
}

// ── Seznam ─────────────────────────────────────────────────────────────────

export const PRODUCTS_PAGE_SIZE = 25;
export type ProductsTab = "aktivni" | "neaktivni" | "vse";
export type ProductsSort = "name" | "id";

export type ListBundlesInput = {
  supplierId: string;
  page: number;
  pageSize?: number;
  tab: ProductsTab;
  search?: string;
  sort?: ProductsSort;
  desc?: boolean;
};

const SORT_COLUMN: Record<ProductsSort, string> = { name: "NAME", id: "ID" };

/**
 * POST product-api/bundles/get-bundles — stejné tělo jako starý seznam:
 * isDeleted=false, isEnabled=true, hiddenSpecification=true (kvůli šarži),
 * filterPrices=false (jinak nepřijdou B2B/VinistoPlus ceny).
 */
export async function listBundles(input: ListBundlesInput): Promise<{ bundles: Bundle[]; count: number }> {
  const pageSize = input.pageSize ?? PRODUCTS_PAGE_SIZE;
  const body: Record<string, unknown> = {
    limit: pageSize,
    offset: (input.page - 1) * pageSize,
    isDeleted: false,
    isEnabled: true,
    hiddenSpecification: true,
    supplierIds: [input.supplierId],
    filterPrices: false,
  };
  if (input.sort) {
    body.sortingColumn = SORT_COLUMN[input.sort];
    body.isSortingDescending = Boolean(input.desc);
  }
  if (input.search) body.searchName = input.search;
  if (input.tab === "aktivni") body.isSaleOver = false;
  if (input.tab === "neaktivni") body.isSaleOver = true;

  const data = await platformRequest<BundlesReturn>("product-api/bundles/get-bundles", { method: "POST", body });
  return { bundles: (data.bundles ?? []).filter((b): b is Bundle => Boolean(b?.id)), count: data.count ?? 0 };
}

/** Produkty v akci pro Přehled: štítek „akce“, řazené podle konce slevy. */
export const DISCOUNT_TAG_ID = "636120fd9f513ca7b69ae599";

export async function listDiscountedBundles(input: { supplierId: string; page: number; pageSize: number }) {
  const data = await platformRequest<BundlesReturn>("product-api/bundles/get-bundles", {
    method: "POST",
    body: {
      supplierIds: [input.supplierId],
      limit: input.pageSize,
      offset: (input.page - 1) * input.pageSize,
      tagId: DISCOUNT_TAG_ID,
      sortingColumn: "PRICE_DISCOUNT_EXPIRATION_DATE",
      isSortingDescending: false,
      isEnabled: true,
      isDeleted: false,
    },
  });
  return { bundles: (data.bundles ?? []).filter((b): b is Bundle => Boolean(b?.id)), count: data.count ?? 0 };
}

// ── Detail ─────────────────────────────────────────────────────────────────

const ALL_PRICE_LEVELS = ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10", "VinistoPlus"];

/** GET product-api/bundles/{id}?priceLevels=… (všech 11 úrovní jako ve starém loaderu). */
export async function getBundle(id: string): Promise<Bundle | null> {
  const data = await platformRequest<BundleReturn>(`product-api/bundles/${encodeURIComponent(id)}`, {
    query: { priceLevels: ALL_PRICE_LEVELS },
  });
  return data.bundle?.id ? data.bundle : null;
}

export type BundlePricesResult = { prices: ApiPrice[]; discountPrices: ApiDiscount[] };

/** GET product-api/bundles/{id}/GetPrices?userLoginHash&currency — pozor: malé „u“. */
export async function getBundlePrices(id: string, loginHash: string, currency = "CZK"): Promise<BundlePricesResult> {
  const data = await platformRequest<{ prices?: ApiPrice[] | null; discountPrices?: ApiDiscount[] | null }>(
    `product-api/bundles/${encodeURIComponent(id)}/GetPrices`,
    { query: { userLoginHash: loginHash, currency } },
  );
  return { prices: data.prices ?? [], discountPrices: data.discountPrices ?? [] };
}

/** GET product-api/bundles/{id}/get-identical-bundles — stejné produkty jiných prodejců. */
export async function getIdenticalBundles(id: string): Promise<Bundle[]> {
  try {
    const data = await platformRequest<BundlesReturn>(`product-api/bundles/${encodeURIComponent(id)}/get-identical-bundles`);
    return (data.bundles ?? []).filter((b): b is Bundle => Boolean(b?.id));
  } catch {
    return [];
  }
}

// ── Kategorie ──────────────────────────────────────────────────────────────

export type Category = { id: string; name?: LangValue[] | null };

/** GET product-api/categories/GetCategoriesByIds?CategoryIds=…&Limit=n → mapa id → název. */
export async function getCategoryNames(ids: string[]): Promise<Map<string, string>> {
  const unique = Array.from(new Set(ids.filter(Boolean)));
  const map = new Map<string, string>();
  if (unique.length === 0) return map;
  try {
    const data = await platformRequest<{ categories?: Category[] | null }>("product-api/categories/GetCategoriesByIds", {
      query: { CategoryIds: unique, Limit: unique.length },
    });
    for (const c of data.categories ?? []) {
      if (c.id) map.set(c.id, localize(c.name));
    }
  } catch (error) {
    console.error("[products] kategorie se nepodařilo načíst:", error);
  }
  return map;
}

// ── Sklad ──────────────────────────────────────────────────────────────────

/** GET warehouse-api/warehouse/bundles/GetWarehouseItemsQuantities?bundleIds=… → mapa id → kusy. */
export async function getWarehouseQuantities(bundleIds: string[]): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  const ids = bundleIds.filter(Boolean);
  if (ids.length === 0) return map;
  try {
    const data = await platformRequest<{ warehouseItemQuantities?: Array<{ itemId?: string | null; quantity?: number | null }> | null }>(
      "warehouse-api/warehouse/bundles/GetWarehouseItemsQuantities",
      { query: { bundleIds: ids } },
    );
    for (const q of data.warehouseItemQuantities ?? []) {
      if (q.itemId) map.set(q.itemId, q.quantity ?? 0);
    }
  } catch (error) {
    console.error("[products] skladové množství se nepodařilo načíst:", error);
  }
  return map;
}

// ── Integrace (platformy) ──────────────────────────────────────────────────

export type Integration = { integrationId: number; integrationName: string };

/** GET services-api/integrations — vyžaduje prázdný X-Api-Key. Mapa platformId → název. */
export async function getIntegrations(): Promise<Map<number, string>> {
  const map = new Map<number, string>([
    [0, "VinistoB2c"],
    [1, "VinistoB2b"],
    [2, "ExternalB2c"],
  ]);
  try {
    const data = await platformRequest<{ integrations?: Integration[] | null }>("services-api/integrations", {
      headers: { "X-Api-Key": "" },
    });
    for (const i of data.integrations ?? []) {
      if (typeof i.integrationId === "number" && i.integrationName) map.set(i.integrationId, i.integrationName);
    }
  } catch (error) {
    console.error("[products] integrace se nepodařilo načíst, používám výchozí:", error);
  }
  return map;
}

/** Český popisek platformy/úrovně ceny pro tabulku slev (port překladových klíčů `VinistoB2c.Level1`…). */
export function priceLevelLabel(platformId: number, level: string, integrations: Map<number, string>): string {
  if (level === "VinistoPlus") return "vinisto PLUS+";
  const name = integrations.get(platformId) ?? `Platforma ${platformId}`;
  const levelNo = level.replace("Level", "");
  if (name === "VinistoB2c") return `B2C cena level ${levelNo}`;
  if (name === "VinistoB2b") return levelNo === "1" ? "B2B VOC" : `B2B cena level ${levelNo}`;
  return `${name} cena ${level.toLowerCase()}`;
}

// ── Mutace ─────────────────────────────────────────────────────────────────

/** POST product-api/bundles/{id}/prices — cena BEZ DPH, hash v těle. */
export async function setBundlePrice(input: {
  bundleId: string;
  loginHash: string;
  priceWithoutVat: number;
  currency: string;
  vat: string | null;
  priceLevel: string;
  platformId: number;
}): Promise<Bundle | null> {
  const data = await platformRequest<BundleReturn>(`product-api/bundles/${encodeURIComponent(input.bundleId)}/prices`, {
    method: "POST",
    body: {
      userLoginHash: input.loginHash,
      currency: input.currency,
      vat: input.vat ?? "BaseVat",
      price: input.priceWithoutVat,
      priceLevel: input.priceLevel,
      platformId: input.platformId,
    },
  });
  return data.bundle ?? null;
}

/** DELETE product-api/bundles/{id}/prices?Currency&PriceLevel&UserLoginHash */
export async function deleteBundlePrice(input: { bundleId: string; loginHash: string; currency: string; priceLevel: string }) {
  await platformRequest(`product-api/bundles/${encodeURIComponent(input.bundleId)}/prices`, {
    method: "DELETE",
    query: { Currency: input.currency, PriceLevel: input.priceLevel, UserLoginHash: input.loginHash },
  });
}

/** POST product-api/bundles/{id}/CreateDiscountPrice — hodnota po slevě BEZ DPH, hash v těle. */
export async function createDiscountPrice(input: {
  bundleId: string;
  loginHash: string;
  valueWithoutVat: number;
  currency: string;
  vat?: string | null;
  validFrom: number;
  validTo: number | null;
  priceLevel: "Level1" | "VinistoPlus";
  platformId: number;
}): Promise<Bundle | null> {
  const data = await platformRequest<BundleReturn>(`product-api/bundles/${encodeURIComponent(input.bundleId)}/CreateDiscountPrice`, {
    method: "POST",
    body: {
      userLoginHash: input.loginHash,
      value: input.valueWithoutVat,
      vat: input.vat ?? "BaseVat",
      currency: input.currency,
      validFrom: input.validFrom,
      validTo: input.validTo,
      discountType: "SupplierDiscount",
      priceLevel: input.priceLevel,
      platformId: input.platformId,
    },
  });
  return data.bundle ?? null;
}

/** DELETE product-api/bundles/{id}/DeleteDiscountPrice?UserLoginHash&Currency&DiscountId&PriceLevel&platformId */
export async function deleteDiscountPrice(input: {
  bundleId: string;
  loginHash: string;
  currency: string;
  discountId: string;
  priceLevel: string;
  platformId: number;
  discountType?: string;
}): Promise<Bundle | null> {
  const data = await platformRequest<BundleReturn>(`product-api/bundles/${encodeURIComponent(input.bundleId)}/DeleteDiscountPrice`, {
    method: "DELETE",
    query: {
      UserLoginHash: input.loginHash,
      Currency: input.currency,
      DiscountId: input.discountId,
      PriceLevel: input.priceLevel,
      platformId: input.platformId,
      PriceDiscountType: input.discountType,
    },
  });
  return data.bundle ?? null;
}

/** PUT product-api/bundles/{id}/set-is-clearance-sale — hash v těle. */
export async function setClearanceSale(input: { bundleId: string; loginHash: string; isClearanceSale: boolean }): Promise<Bundle | null> {
  const data = await platformRequest<BundleReturn>(`product-api/bundles/${encodeURIComponent(input.bundleId)}/set-is-clearance-sale`, {
    method: "PUT",
    body: { isClearanceSale: input.isClearanceSale, userLoginHash: input.loginHash },
  });
  return data.bundle ?? null;
}
