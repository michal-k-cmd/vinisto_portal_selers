// Přehled (dashboard) — order-api/dashboard-sale a seznam naskladnění.

import "server-only";
import { platformRequest } from "./client";
import type { Bundle } from "./products";

export type SaleBundle = {
  id: string;
  soldPcs?: number | null;
  soldPcsPercentageDifference?: number | null;
  sumPrice?: number | null;
  bundleDetail?: Bundle | null;
};

export type SaleData = {
  totalSoldPcs?: number | null;
  totalSoldPcsPercentageDifference?: number | null;
  totalProfit?: number | null;
  totalProfitPercentageDifference?: number | null;
  totalOrderCount?: number | null;
  totalOrderCountPercentageDifference?: number | null;
  bundles?: SaleBundle[] | null;
};

/** GET order-api/dashboard-sale?SupplierId&TimeFrom&TimeTo&UserLoginHash (unix sekundy). */
export async function getDashboardSale(input: {
  supplierId: string;
  loginHash: string;
  timeFrom: number;
  timeTo: number;
}): Promise<SaleData | null> {
  const data = await platformRequest<{ saleData?: SaleData | null }>("order-api/dashboard-sale", {
    query: {
      SupplierId: input.supplierId,
      TimeFrom: input.timeFrom,
      TimeTo: input.timeTo,
      UserLoginHash: input.loginHash,
    },
    timeoutMs: 30_000,
  });
  return data.saleData ?? null;
}

export type StockingState =
  | "CREATED" | "SENT" | "CANCELLED" | "CONFIRMED" | "SENT_WMS" | "DELIVERY_ORDERED" | "WMS_DELIVERED" | "WMS_STOCKED";

export const STOCKING_STATE_LABEL: Record<string, string> = {
  CREATED: "Vytvořeno",
  SENT: "Čeká na schválení",
  CANCELLED: "Zrušeno",
  CONFIRMED: "Potvrzeno",
  SENT_WMS: "Odesláno do WMS",
  DELIVERY_ORDERED: "Doprava objednána",
  WMS_DELIVERED: "Doručeno WMS",
  WMS_STOCKED: "Naskladněno WMS",
};

export type StockingRequestSummary = {
  id: string;
  requestNumber?: string | number | null;
  createdAt?: number | null;
  stockingState?: StockingState | string | null;
};

/** GET supplier-api/stocking-requests?UserLoginHash&SearchSupplierId&IsSent=true — odeslané požadavky pro Přehled. */
export async function listSentStockingRequests(input: { supplierId: string; loginHash: string; limit?: number }): Promise<{
  items: StockingRequestSummary[];
  count: number;
}> {
  const data = await platformRequest<{ stockingRequests?: StockingRequestSummary[] | null; count?: number }>(
    "supplier-api/stocking-requests",
    {
      query: {
        UserLoginHash: input.loginHash,
        SearchSupplierId: input.supplierId,
        IsSent: true,
        Limit: input.limit,
      },
    },
  );
  return { items: (data.stockingRequests ?? []).filter((r): r is StockingRequestSummary => Boolean(r?.id)), count: data.count ?? 0 };
}
