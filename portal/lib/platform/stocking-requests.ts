// Požadavky na naskladnění — supplier-api/stocking-requests. Prodejce vidí
// jen odeslané požadavky (IsSent=true) a jediná jeho mutace je potvrzení
// termínu závozu/vyzvednutí.

import "server-only";
import { platformDownload, platformRequest } from "./client";
import type { Bundle, LangValue } from "./products";

export type StockingState =
  | "CREATED" | "SENT" | "CANCELLED" | "CONFIRMED" | "SENT_WMS" | "DELIVERY_ORDERED" | "WMS_DELIVERED" | "WMS_STOCKED";

/** Stav pro prodejce (4 slučované stavy jako ve starém portálu). */
export type SellerState = "SENT" | "CONFIRMED" | "WMS_STOCKED" | "CANCELLED";

export const SELLER_STATE_API: Record<SellerState, StockingState[]> = {
  SENT: ["CREATED", "SENT"],
  CANCELLED: ["CANCELLED"],
  CONFIRMED: ["CONFIRMED", "SENT_WMS", "DELIVERY_ORDERED", "WMS_DELIVERED"],
  WMS_STOCKED: ["WMS_STOCKED"],
};

export const SELLER_STATE_LABEL: Record<SellerState, string> = {
  SENT: "Čeká na schválení",
  CANCELLED: "Stornováno",
  CONFIRMED: "Čeká na závoz",
  WMS_STOCKED: "Zboží přijato",
};

export function sellerState(state: string | null | undefined): SellerState | null {
  for (const [seller, api] of Object.entries(SELLER_STATE_API) as [SellerState, StockingState[]][]) {
    if (api.includes(state as StockingState)) return seller;
  }
  return null;
}

export type DeliveryTime = "D_8_10" | "D_10_12" | "D_12_14" | "D_14_16";
export const DELIVERY_TIME_LABEL: Record<DeliveryTime, string> = {
  D_8_10: "8:00 - 10:00",
  D_10_12: "10:00 - 12:00",
  D_12_14: "12:00 - 14:00",
  D_14_16: "14:00 - 16:00",
};

export type DeliveryType = "SUPPLIER_DELIVERY" | "VINISTO_DELIVERY";
export const DELIVERY_TYPE_LABEL: Record<DeliveryType, string> = { SUPPLIER_DELIVERY: "prodejce", VINISTO_DELIVERY: "vinisto" };

export type StockingRequestBundle = {
  bundleId: string;
  requestedCount?: number | null;
  deliveredCount?: number | null;
  countDifference?: number | null;
  note?: string | null;
};

export type StockingRequest = {
  id: string;
  requestNumber?: string | null;
  /** unix sekundy */
  createdAt?: number | null;
  supplierId?: string | null;
  deliveryType?: DeliveryType | string | null;
  stockingState?: StockingState | string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  deliveryDate?: number | null;
  deliveryTime?: DeliveryTime | string | null;
  stockingDate?: number | null;
  bundles?: StockingRequestBundle[] | null;
  bundleDetails?: Bundle[] | null;
  delivery?: { name?: LangValue[] | null } | null;
};

export const STOCKING_PAGE_SIZE = 25;
export type StockingSort = "requestNumber" | "dateIssued" | "deliveryType" | "dateStocked" | "state";
const SORT_COLUMN: Record<StockingSort, string> = {
  requestNumber: "REQUEST_NUMBER",
  dateIssued: "CREATE_DATE",
  deliveryType: "DELIVERY_TYPE",
  dateStocked: "STOCKING_DATE",
  state: "STATE",
};

export type ListStockingInput = {
  supplierId: string;
  loginHash: string;
  page: number;
  sort?: StockingSort;
  desc?: boolean;
  requestNumber?: string;
  /** unix sekundy dne */
  createDate?: number;
  stockingDate?: number;
  deliveryType?: DeliveryType;
  state?: SellerState;
};

/** GET supplier-api/stocking-requests — vždy IsSent=true a SearchSupplierId (jako ve SPA). */
export async function listStockingRequests(input: ListStockingInput): Promise<{ items: StockingRequest[]; count: number }> {
  const data = await platformRequest<{ stockingRequests?: StockingRequest[] | null; count?: number }>("supplier-api/stocking-requests", {
    query: {
      Limit: STOCKING_PAGE_SIZE,
      Offset: (input.page - 1) * STOCKING_PAGE_SIZE,
      IsSent: true,
      SearchSupplierId: input.supplierId,
      UserLoginHash: input.loginHash,
      SortingColumn: SORT_COLUMN[input.sort ?? "requestNumber"],
      IsSortingDescending: input.desc ?? true,
      SearchRequestNumber: input.requestNumber,
      SearchCreateDate: input.createDate,
      SearchStockingDate: input.stockingDate,
      SearchDeliveryType: input.deliveryType,
      SearchStockingState: input.state ? SELLER_STATE_API[input.state] : undefined,
    },
  });
  return { items: (data.stockingRequests ?? []).filter((r): r is StockingRequest => Boolean(r?.id)), count: data.count ?? 0 };
}

/** GET supplier-api/stocking-requests/{id}?UserLoginHash */
export async function getStockingRequest(id: string, loginHash: string): Promise<StockingRequest | null> {
  const data = await platformRequest<{ stockingRequest?: StockingRequest | null }>(
    `supplier-api/stocking-requests/${encodeURIComponent(id)}`,
    { query: { UserLoginHash: loginHash } },
  );
  return data.stockingRequest?.id ? data.stockingRequest : null;
}

/** PUT …/{id}/states/ConfirmStockingRequest — hash v těle, datum jako unix sekundy. */
export async function confirmStockingRequest(input: { id: string; loginHash: string; deliveryDate: number; deliveryTime: DeliveryTime }): Promise<void> {
  await platformRequest(`supplier-api/stocking-requests/${encodeURIComponent(input.id)}/states/ConfirmStockingRequest`, {
    method: "PUT",
    body: { userLoginHash: input.loginHash, deliveryDate: input.deliveryDate, deliveryTime: input.deliveryTime },
  });
}

/** GET …/{id}/DownloadPdf?UserLoginHash — proxy pro prohlížeč. */
export async function downloadStockingRequestPdf(id: string, loginHash: string): Promise<Response> {
  return platformDownload(`supplier-api/stocking-requests/${encodeURIComponent(id)}/DownloadPdf`, { UserLoginHash: loginHash });
}
