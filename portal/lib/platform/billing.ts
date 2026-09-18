// Vyúčtování (self-billing) — order-api/billings. PDF/XLS se stahují přes
// vlastní route handler, hash zůstává na serveru.

import "server-only";
import { platformDownload, platformRequest } from "./client";
import type { LangValue } from "./products";

export { billingPeriod, billingStateLabel, billingStateTone, type BillingState } from "./billing-format";

export const BILLING_PAGE_SIZE = 25;

export type BillingSort = "cislo" | "obdobi" | "vystaveno" | "obrat" | "stav";
const SORT_COLUMN: Record<BillingSort, string> = {
  cislo: "BILLING_NUMBER",
  obdobi: "BILLING_PERIOD",
  vystaveno: "CREATION_DATE",
  obrat: "TOTAL_PRICE",
  stav: "STATE",
};

export type BillingBundle = {
  id: string;
  name?: LangValue[] | null;
  soldPcs?: number | null;
  bundleLot?: string | null;
  /** obrat bez DPH */
  sumPrice?: number | null;
  sumFee?: number | null;
  percentFee?: number | null;
  totalProfit?: number | null;
  sellerDiscount?: number | null;
  vinistoDiscount?: number | null;
};

export type Billing = {
  id: string;
  billingNumber?: string | null;
  invoiceNumber?: string | null;
  /** unix sekundy */
  timeFrom?: number | null;
  timeTo?: number | null;
  createdAt?: number | null;
  supplierId?: string | null;
  state?: string | null;
  /** celkový obrat bez DPH */
  totalSum?: number | null;
  billingPdf?: string | null;
  invoicePdf?: string | null;
  bundles?: BillingBundle[] | null;
  totalSellerDiscount?: number | null;
  totalVinistoDiscount?: number | null;
  bundlesOnTheWay?: BillingBundle[] | null;
};

/** GET order-api/billings?Limit&Offset&UserLoginHash&SupplierId&SortingColumn&IsSortingDescending */
export async function listBillings(input: {
  supplierId: string;
  loginHash: string;
  page: number;
  sort: BillingSort;
  desc: boolean;
}): Promise<{ items: Billing[]; count: number }> {
  const data = await platformRequest<{ billings?: Billing[] | null; count?: number }>("order-api/billings", {
    query: {
      Limit: BILLING_PAGE_SIZE,
      Offset: (input.page - 1) * BILLING_PAGE_SIZE,
      UserLoginHash: input.loginHash,
      SupplierId: input.supplierId,
      SortingColumn: SORT_COLUMN[input.sort],
      IsSortingDescending: input.desc,
    },
    timeoutMs: 30_000,
  });
  return { items: data.billings ?? [], count: data.count ?? 0 };
}

/** GET order-api/billings/{id}?UserLoginHash */
export async function getBilling(id: string, loginHash: string): Promise<Billing | null> {
  const data = await platformRequest<{ billing?: Billing | null }>(`order-api/billings/${encodeURIComponent(id)}`, {
    query: { UserLoginHash: loginHash },
    timeoutMs: 30_000,
  });
  return data.billing ?? null;
}

export type BillingPdfType = "Billing" | "Invoice";

/** GET order-api/billings/{id}/DownloadPdf?UserLoginHash&PdfType=Billing|Invoice */
export function downloadBillingPdf(id: string, loginHash: string, type: BillingPdfType): Promise<Response> {
  return platformDownload(`order-api/billings/${encodeURIComponent(id)}/DownloadPdf`, { UserLoginHash: loginHash, PdfType: type });
}

/** GET order-api/billings/{id}/GenerateXls?UserLoginHash */
export function downloadBillingXls(id: string, loginHash: string): Promise<Response> {
  return platformDownload(`order-api/billings/${encodeURIComponent(id)}/GenerateXls`, { UserLoginHash: loginHash });
}

/** Faktura je ke stažení jen mimo stav „Vystaveno“ a jen když existuje soubor. */
export function hasInvoice(billing: Pick<Billing, "state" | "invoicePdf">): boolean {
  return billing.state !== "IN_ISSUE" && Boolean(billing.invoicePdf);
}
