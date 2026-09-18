// Sety prodejce — product-api/bundles/*set*. Seznam a detail bez hashe,
// mutace s userLoginHash v těle (delete v query, malé u).

import "server-only";
import { platformRequest } from "./client";
import { computeBundlePrices, B2B_PLATFORM, B2C_PLATFORM } from "./prices";
import { bundleImageUrl, getWarehouseQuantities, localize, stripHtml, type Bundle, type LangValue } from "./products";
import type { SetSlotProduct, SetState, SetType } from "./sets-constants";

export const SETS_PAGE_SIZE = 25;

export type SupplierSet = {
  id: string;
  name?: LangValue[] | null;
  shortDescription?: LangValue[] | null;
  description?: LangValue[] | null;
  totalSetPrice?: number | null;
  paidBundles?: Bundle[] | null;
  freeBundles?: Bundle[] | null;
  setType?: SetType | string | null;
  states?: SetState[] | null;
  availableCount?: number | null;
};

export type SetsTab = "koncept" | "schvalene" | "zamitnute";
export const SETS_TAB_STATES: Record<SetsTab, SetState[]> = {
  koncept: ["Concept", "ToConfirm"],
  schvalene: ["Confirmed"],
  zamitnute: ["Rejected"],
};
export const SETS_TAB_LABEL: Record<SetsTab, { tab: string; heading: string }> = {
  koncept: { tab: "Koncept / Čeká na schválení", heading: "Sety ke schválení" },
  schvalene: { tab: "Schváleno", heading: "Schválené sety" },
  zamitnute: { tab: "Zamítnuto", heading: "Zamítnuté sety" },
};

export type SetsSort = "nazev" | "typ" | "cena" | "skladem" | "stav";
const SORT_COLUMN: Record<SetsSort, string> = { nazev: "NAME", typ: "SET_TYPE", cena: "PRICE", skladem: "WAREHOUSE_AMOUNT", stav: "STATES" };

/** GET product-api/bundles/get-supplier-sets?SupplierId&Limit&Offset&BundleStates&BundleName&SetType&SortingColumn&IsSortingDescending */
export async function listSupplierSets(input: {
  supplierId: string;
  page: number;
  tab: SetsTab;
  search?: string;
  setType?: SetType;
  sort?: SetsSort;
  desc: boolean;
}): Promise<{ items: SupplierSet[]; count: number }> {
  const data = await platformRequest<{ supplierSets?: SupplierSet[] | null; count?: number }>("product-api/bundles/get-supplier-sets", {
    query: {
      SupplierId: input.supplierId,
      Limit: SETS_PAGE_SIZE,
      Offset: (input.page - 1) * SETS_PAGE_SIZE,
      BundleStates: SETS_TAB_STATES[input.tab],
      BundleName: input.search || undefined,
      SetType: input.setType,
      SortingColumn: input.sort ? SORT_COLUMN[input.sort] : "ID",
      IsSortingDescending: input.desc,
    },
  });
  return { items: data.supplierSets ?? [], count: data.count ?? 0 };
}

/** GET product-api/bundles/{id}/get-set-bundle */
export async function getSupplierSet(id: string): Promise<SupplierSet | null> {
  const data = await platformRequest<{ bundle?: SupplierSet | null }>(`product-api/bundles/${encodeURIComponent(id)}/get-set-bundle`);
  return data.bundle ?? null;
}

export type SetPayload = {
  name: string;
  shortDescription: string;
  description: string;
  setType: SetType;
  paidBundles: string[];
  freeBundles: string[];
};

function toBody(payload: SetPayload, loginHash: string, supplierId: string) {
  return {
    ...payload,
    ...(payload.setType === "Six10Percentage" ? { percentageDiscountValue: 10 } : {}),
    userLoginHash: loginHash,
    supplierId,
  };
}

/** POST product-api/bundles/CreateSupplierSetBundle → id nového setu */
export async function createSupplierSet(input: { payload: SetPayload; loginHash: string; supplierId: string }): Promise<string> {
  const data = await platformRequest<{ bundle?: { id?: string | null } | null }>("product-api/bundles/CreateSupplierSetBundle", {
    method: "POST",
    body: toBody(input.payload, input.loginHash, input.supplierId),
  });
  return data.bundle?.id ?? "";
}

/** PUT product-api/bundles/{id}/edit-supplier-set-bundle */
export async function editSupplierSet(input: { id: string; payload: SetPayload; loginHash: string; supplierId: string }): Promise<string> {
  const data = await platformRequest<{ bundle?: { id?: string | null } | null }>(`product-api/bundles/${encodeURIComponent(input.id)}/edit-supplier-set-bundle`, {
    method: "PUT",
    body: toBody(input.payload, input.loginHash, input.supplierId),
  });
  return data.bundle?.id ?? input.id;
}

/** PUT product-api/bundles/{id}/bundle-supplier-set-change-state  {userLoginHash, bundleSupplierState: "ToConfirm"} */
export async function sendSetForApproval(id: string, loginHash: string): Promise<void> {
  await platformRequest(`product-api/bundles/${encodeURIComponent(id)}/bundle-supplier-set-change-state`, {
    method: "PUT",
    body: { userLoginHash: loginHash, bundleSupplierState: "ToConfirm" },
  });
}

/** DELETE product-api/bundles/{id}/delete-supplier-set?userLoginHash (jen koncept) */
export async function deleteSetConcept(id: string, loginHash: string): Promise<void> {
  await platformRequest(`product-api/bundles/${encodeURIComponent(id)}/delete-supplier-set`, {
    method: "DELETE",
    query: { userLoginHash: loginHash },
  });
}

/** Produkt platformy → řádek ve slotu setu (ceny Level1 CZK B2C/B2B, sklad). */
export function toSlotProduct(bundle: Bundle, stock: Map<string, number>): SetSlotProduct {
  const b2c = computeBundlePrices(bundle, { platformId: B2C_PLATFORM });
  const b2b = computeBundlePrices(bundle, { platformId: B2B_PLATFORM });
  return {
    id: bundle.id,
    name: stripHtml(localize(bundle.name)),
    warehouseIds: (bundle.warehouseId ?? []).join(", "),
    imageUrl: bundleImageUrl(bundle.images),
    priceB2C: b2c.basePrice?.valueWithVat ?? null,
    priceB2B: b2b.basePrice?.valueWithVat ?? null,
    stock: stock.get(bundle.id) ?? null,
  };
}

export async function toSlotProducts(bundles: Bundle[]): Promise<SetSlotProduct[]> {
  const stock = bundles.length ? await getWarehouseQuantities(bundles.map((b) => b.id)) : new Map<string, number>();
  return bundles.map((b) => toSlotProduct(b, stock));
}

/** POST product-api/bundles/get-bundles — kandidáti do setu (jen ne-sety prodejce, bez hashe). */
export async function searchSetCandidates(input: { supplierId: string; search?: string; limit?: number }): Promise<SetSlotProduct[]> {
  const data = await platformRequest<{ bundles?: Bundle[] | null }>("product-api/bundles/get-bundles", {
    method: "POST",
    body: {
      limit: input.limit ?? 20,
      offset: 0,
      isSet: false,
      isDeleted: false,
      supplierIds: [input.supplierId],
      searchName: input.search || undefined,
      filterPrices: false,
    },
  });
  return toSlotProducts((data.bundles ?? []).filter((b): b is Bundle => Boolean(b?.id)));
}
