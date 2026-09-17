// Objednávky — order-api/orders. Seznam přijde z platformy podle hashe
// uživatele; parametr SupplierId backend zatím nepodporuje (stejně jako ve
// starém portálu), takže se objednávky nefiltrují na straně portálu, aby
// sedělo stránkování. Položky aktivního prodejce se v detailu zvýrazní.

import "server-only";
import { platformRequest } from "./client";
import type { LangValue } from "./products";

export const ORDERS_PAGE_SIZE = 25;

export type OrderState =
  | "NONE" | "CREATED" | "PAID" | "IN_WMS" | "WMS_ACCEPTED" | "WMS_INCOMPLETE" | "WMS_READY" | "SENT" | "DELIVERED"
  | "CANCELLED" | "RETURNED" | "REFUNDED" | "REVERT_FINANCE_AND_FEES" | "RETURNING_GOODS" | "LOSS_EVENT" | "DONE";

export const ORDER_STATE_LABEL: Record<OrderState, string> = {
  NONE: "Bez stavu",
  CREATED: "Vytvořeno",
  PAID: "Zaplaceno",
  IN_WMS: "Ve WMS",
  WMS_ACCEPTED: "WMS akceptováno",
  WMS_INCOMPLETE: "WMS nekompletní",
  WMS_READY: "WMS připraveno",
  SENT: "Odesláno",
  DELIVERED: "Doručeno",
  CANCELLED: "Zrušeno",
  RETURNED: "Vráceno",
  REFUNDED: "Refundováno",
  REVERT_FINANCE_AND_FEES: "Storno financí a poplatků",
  RETURNING_GOODS: "Vrací se zboží",
  LOSS_EVENT: "Ztráta zásilky",
  DONE: "Dokončeno",
};

export function orderStateLabel(state: string | null | undefined): string {
  if (!state) return "–";
  return ORDER_STATE_LABEL[state as OrderState] ?? state;
}

/** Barevný tón stavu (třídy z globals.css). */
export function orderStateTone(state: string | null | undefined): string {
  switch (state) {
    case "PAID":
    case "DELIVERED":
    case "DONE":
      return "text-vinisto-green";
    case "CANCELLED":
    case "RETURNED":
    case "REFUNDED":
    case "LOSS_EVENT":
      return "text-vinisto-wine";
    case "CREATED":
    case "WMS_INCOMPLETE":
    case "RETURNING_GOODS":
    case "REVERT_FINANCE_AND_FEES":
      return "text-notion-orange";
    default:
      return "text-notion-blue";
  }
}

export type OrderPrice = { value?: number | null; valueWithVat?: number | null; vat?: number | null; currency?: string | null };

export type OrderBundle = {
  id: string;
  supplierId?: string | null;
  name: string;
  url?: string | null;
  price?: OrderPrice | null;
  isSet?: boolean;
};

export type OrderItem = { bundle: OrderBundle; quantity?: number | null };

export type OrderStateChange = { state?: OrderState | string | null; changeTime?: number | null };

export type OrderDelivery = {
  name?: LangValue[] | null;
  deliveryType?: string | null;
  trackingUrl?: string | null;
  packageId?: string | null;
  price?: OrderPrice | null;
};

export type OrderPayment = { name?: LangValue[] | null; paymentType?: string | null; price?: OrderPrice | null };

export type Order = {
  id: string;
  orderNumber?: string | null;
  state?: OrderState | string | null;
  states?: string[] | null;
  stateChangeRecords?: OrderStateChange[] | null;
  orderItems?: OrderItem[] | null;
  orderPrice?: number | null;
  orderPriceWithVat?: number | null;
  orderCurrency?: string | null;
  orderTotalDiscount?: number | null;
  delivery?: OrderDelivery | null;
  payment?: OrderPayment | null;
  trackingId?: string | null;
  countryOfSale?: string | null;
  platformId?: number | null;
};

/** Datum vzniku objednávky = první záznam historie stavů (unix sekundy). */
export function orderCreatedAt(order: Pick<Order, "stateChangeRecords">): number | null {
  return order.stateChangeRecords?.[0]?.changeTime ?? null;
}

/** GET order-api/orders?Limit&Offset&UserLoginHash&SortingColumn=TIME&IsSortingDescending */
export async function listOrders(input: { loginHash: string; page: number; desc: boolean }): Promise<{ items: Order[]; count: number }> {
  const data = await platformRequest<{ orders?: Order[] | null; count?: number }>("order-api/orders", {
    query: {
      Limit: ORDERS_PAGE_SIZE,
      Offset: (input.page - 1) * ORDERS_PAGE_SIZE,
      UserLoginHash: input.loginHash,
      SortingColumn: "TIME",
      IsSortingDescending: input.desc,
    },
    timeoutMs: 30_000,
  });
  return { items: data.orders ?? [], count: data.count ?? 0 };
}

/** GET order-api/orders/{id}?UserLoginHash — id je Mongo id objednávky, ne orderNumber. */
export async function getOrder(id: string, loginHash: string): Promise<Order | null> {
  const data = await platformRequest<{ order?: Order | null }>(`order-api/orders/${encodeURIComponent(id)}`, {
    query: { UserLoginHash: loginHash },
  });
  return data.order ?? null;
}
