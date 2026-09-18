// Slevové kupóny prodejce — order-api/discount-coupons. Hash: seznam/detail
// v query (UserLoginHash), create/edit/activate v těle (userLoginHash),
// delete v query. Ceny kupónu se posílají „jako s DPH“ s nulovou DPH (viz swagger).

import "server-only";
import { platformRequest } from "./client";

export const COUPONS_PAGE_SIZE = 25;

export type CouponType = "AMOUNT" | "PERCENTAGE" | "GIFT";
export const COUPON_TYPE_LABEL: Record<string, string> = { AMOUNT: "Na částku", PERCENTAGE: "Na procenta", GIFT: "Dárkový" };

export type CouponPrice = { value?: number | null; currency?: string | null };

export type DiscountCoupon = {
  id: string;
  code?: string | null;
  isReusable?: boolean | null;
  discountCouponType?: CouponType | string | null;
  amountDiscount?: CouponPrice | null;
  percentageDiscount?: number | null;
  allowedFrom?: CouponPrice | null;
  /** unix sekundy */
  validFrom?: number | null;
  validTo?: number | null;
  createdAt?: number | null;
  isActive?: boolean | null;
  isUsed?: boolean | null;
};

export type CouponSort = "kod" | "pouziti" | "typ" | "vyse" | "platnost" | "vytvoreno" | "od" | "aktivni";
const SORT_COLUMN: Record<CouponSort, string> = {
  kod: "CODE",
  pouziti: "IS_REUSABLE",
  typ: "DISCOUNT_COUPON_TYPE",
  vyse: "DISCOUNT_VALUE",
  platnost: "VALID_TO",
  vytvoreno: "CREATION_DATE",
  od: "APPLICABLE_VALUE_FROM",
  aktivni: "IS_ACTIVE",
};

export type CouponFilters = {
  code?: string;
  reusable?: boolean;
  type?: "AMOUNT" | "PERCENTAGE";
  active?: boolean;
};

/** GET order-api/discount-coupons?Limit&Offset&UserLoginHash&SearchSuppliers&SortingColumn&IsSortingDescending&… */
export async function listDiscountCoupons(input: {
  supplierId: string;
  loginHash: string;
  page: number;
  sort?: CouponSort;
  desc: boolean;
  filters?: CouponFilters;
}): Promise<{ items: DiscountCoupon[]; count: number }> {
  const f = input.filters ?? {};
  const data = await platformRequest<{ discountCoupons?: DiscountCoupon[] | null; count?: number }>("order-api/discount-coupons", {
    query: {
      Limit: COUPONS_PAGE_SIZE,
      Offset: (input.page - 1) * COUPONS_PAGE_SIZE,
      UserLoginHash: input.loginHash,
      SearchSuppliers: input.supplierId,
      SortingColumn: input.sort ? SORT_COLUMN[input.sort] : "ID",
      IsSortingDescending: input.desc,
      SearchCode: f.code || undefined,
      IsReusable: f.reusable,
      SearchDiscountCouponType: f.type,
      IsActive: f.active,
    },
  });
  return { items: data.discountCoupons ?? [], count: data.count ?? 0 };
}

/** GET order-api/discount-coupons/{id}/GetDiscountCoupon?UserLoginHash */
export async function getDiscountCoupon(id: string, loginHash: string): Promise<DiscountCoupon | null> {
  const data = await platformRequest<{ discountCoupon?: DiscountCoupon | null }>(
    `order-api/discount-coupons/${encodeURIComponent(id)}/GetDiscountCoupon`,
    { query: { UserLoginHash: loginHash } },
  );
  return data.discountCoupon ?? null;
}

export type CouponPayload = {
  code: string;
  isReusable: boolean;
  discountCouponType: "AMOUNT" | "PERCENTAGE";
  validFrom: number;
  validTo: number;
  percentageDiscount?: number;
  amountDiscount?: number;
  allowedFrom?: number;
};

function toBody(payload: CouponPayload, loginHash: string) {
  return {
    isSupplierDiscount: true,
    userLoginHash: loginHash,
    validFrom: payload.validFrom,
    validTo: payload.validTo,
    discountCouponType: payload.discountCouponType,
    code: payload.code,
    isReusable: payload.isReusable,
    unit: { language: "CZECH", value: "" },
    // VWA-3356: kupóny na částku platí i na zlevněné zboží, procentní ne
    isForDiscountedItems: payload.discountCouponType === "AMOUNT",
    ...(payload.discountCouponType === "AMOUNT" && payload.amountDiscount != null
      ? { amountDiscount: { value: payload.amountDiscount, currency: "CZK" } }
      : {}),
    ...(payload.discountCouponType === "PERCENTAGE" && payload.percentageDiscount != null
      ? { percentageDiscount: payload.percentageDiscount }
      : {}),
    ...(payload.allowedFrom != null ? { allowedFrom: { value: payload.allowedFrom, currency: "CZK" } } : {}),
  };
}

/** POST order-api/discount-coupons/suppliers/{supplierId} */
export async function createSupplierCoupon(input: { supplierId: string; loginHash: string; payload: CouponPayload }): Promise<void> {
  await platformRequest(`order-api/discount-coupons/suppliers/${encodeURIComponent(input.supplierId)}`, {
    method: "POST",
    body: toBody(input.payload, input.loginHash),
  });
}

/** PUT order-api/discount-coupons/{id}/EditDiscountCoupon */
export async function updateCoupon(input: { id: string; loginHash: string; payload: CouponPayload }): Promise<void> {
  await platformRequest(`order-api/discount-coupons/${encodeURIComponent(input.id)}/EditDiscountCoupon`, {
    method: "PUT",
    body: toBody(input.payload, input.loginHash),
  });
}

/** PUT order-api/discount-coupons/{id}/activate  body {userLoginHash} */
export async function activateCoupon(id: string, loginHash: string): Promise<void> {
  await platformRequest(`order-api/discount-coupons/${encodeURIComponent(id)}/activate`, {
    method: "PUT",
    body: { userLoginHash: loginHash },
  });
}

/** DELETE order-api/discount-coupons/{id}?UserLoginHash */
export async function deleteCoupon(id: string, loginHash: string): Promise<void> {
  await platformRequest(`order-api/discount-coupons/${encodeURIComponent(id)}`, {
    method: "DELETE",
    query: { UserLoginHash: loginHash },
  });
}

/** GET services-api/exchange-rates → kurz EUR pro kupóny (jen nápověda ve formuláři). */
export async function getEurCouponRate(): Promise<number | null> {
  try {
    const data = await platformRequest<{ exchangeRates?: Array<{ currency?: string | null; valueDiscountCoupons?: number | null }> | null }>(
      "services-api/exchange-rates",
    );
    const eur = (data.exchangeRates ?? []).find((r) => r.currency === "EUR");
    return eur?.valueDiscountCoupons ?? null;
  } catch (error) {
    console.error("[coupons] kurz EUR se nepodařilo načíst:", error);
    return null;
  }
}
