// Sklad prodejce u vinisto — supplier-api/admin/statistics|products a
// warehouse-api/change-log.

import "server-only";
import { platformRequest } from "./client";
import type { LangValue, SpecificationDetail } from "./products";

export type SupplierStatistics = {
  totalBundlesInWarehouse?: number | null;
  uniqueBundlesInWarehouse?: number | null;
  bundlesSoldThisMonth?: number | null;
  bundlesSoldLastMonth?: number | null;
  bundlesInUnpaidOrders?: number | null;
};

/** GET supplier-api/admin/statistics/{supplierId} */
export async function getSupplierStatistics(input: { supplierId: string; loginHash: string }): Promise<SupplierStatistics> {
  return platformRequest<SupplierStatistics>(`supplier-api/admin/statistics/${encodeURIComponent(input.supplierId)}`, {
    query: { UserLoginHash: input.loginHash },
  });
}

export type SupplierProductItem = {
  bundleId?: string | null;
  warehouseIds?: string[] | null;
  bundleName?: LangValue[] | null;
  specifications?: SpecificationDetail[] | null;
  warehouseCount?: number | null;
  soldThisMonth?: number | null;
  soldLastMonth?: number | null;
  countInUnpaidOrders?: number | null;
};

export const WAREHOUSE_PAGE_SIZE = 10;

/** GET supplier-api/admin/products/{supplierId}?Limit&Offset&SearchBundleName&SearchProductWarehouseId (bez řazení). */
export async function getSupplierProducts(input: {
  supplierId: string;
  loginHash: string;
  page: number;
  searchBundleName?: string;
  searchProductWarehouseId?: string;
}): Promise<{ items: SupplierProductItem[]; count: number }> {
  const data = await platformRequest<{ products?: SupplierProductItem[] | null; count?: number }>(
    `supplier-api/admin/products/${encodeURIComponent(input.supplierId)}`,
    {
      query: {
        UserLoginHash: input.loginHash,
        Limit: WAREHOUSE_PAGE_SIZE,
        Offset: (input.page - 1) * WAREHOUSE_PAGE_SIZE,
        SearchBundleName: input.searchBundleName,
        SearchProductWarehouseId: input.searchProductWarehouseId,
      },
    },
  );
  return { items: data.products ?? [], count: data.count ?? 0 };
}

export type WarehouseChangeLog = {
  id: string;
  createdAt?: number | null;
  quantity?: number | null;
  documentNumber?: string | null;
  changeReason?: string | null;
  bundleId?: string | null;
  bundleName?: LangValue[] | null;
};

/** GET warehouse-api/change-log/supplier/{supplierId} — vždy podle data sestupně. */
export async function getSupplierChangeLog(input: {
  supplierId: string;
  page: number;
  changeReasons?: string[];
  documentNumber?: string;
}): Promise<{ items: WarehouseChangeLog[]; count: number }> {
  const data = await platformRequest<{ changeLogItems?: WarehouseChangeLog[] | null; count?: number }>(
    `warehouse-api/change-log/supplier/${encodeURIComponent(input.supplierId)}`,
    {
      query: {
        Limit: WAREHOUSE_PAGE_SIZE,
        Offset: (input.page - 1) * WAREHOUSE_PAGE_SIZE,
        SortingColumn: "CREATED_AT",
        IsSortingDescending: true,
        SearchChangeReason: input.changeReasons?.length ? input.changeReasons : undefined,
        SearchDocumentNumber: input.documentNumber,
      },
    },
  );
  return { items: (data.changeLogItems ?? []).filter((i): i is WarehouseChangeLog => Boolean(i?.id)), count: data.count ?? 0 };
}
