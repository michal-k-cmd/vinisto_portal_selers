// Provize prodejce — supplier-api/admin/fee-rules/* (server-only volání).

import "server-only";
import { platformRequest } from "./client";
import type { AppliedFeeRule, DynamicSaleFeeRule, FeeRuleRow, LogisticFeeRule, SaleFeeRule, SupplierFeeValues } from "./fees-types";

export type { AppliedFeeRule, DynamicSaleFeeRule, FeeRecord, FeeRule, FeeRuleRow, LogisticFeeRecord, LogisticFeeRule, SaleFeeRule, SupplierFeeValues } from "./fees-types";
export { SPECIFICATION_ID_BATCH, SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from "./fees-types";
export { destinationCountryOptions } from "./fees-format";

/** GET supplier-api/admin/fee-rules/supplier/{id}/fee-values?OriginCountry&DestinationCountry&UserLoginHash */
export async function getSupplierFeeValues(input: {
  supplierId: string;
  loginHash: string;
  originCountry: string;
  destinationCountry: string;
}): Promise<SupplierFeeValues> {
  return platformRequest<SupplierFeeValues & { isError?: boolean }>(
    `supplier-api/admin/fee-rules/supplier/${encodeURIComponent(input.supplierId)}/fee-values`,
    {
      query: {
        UserLoginHash: input.loginHash,
        OriginCountry: input.originCountry,
        DestinationCountry: input.destinationCountry,
      },
    },
  );
}

type SupplierFeeRulesReturn = {
  feeRules?: Array<{ saleFeeRule?: SaleFeeRule | null; logisticFeeRule?: LogisticFeeRule | null }> | null;
  dynamicSaleFeeRules?: DynamicSaleFeeRule[] | null;
  count?: number;
  isError?: boolean;
};

/**
 * GET supplier-api/admin/fee-rules/supplier/{id}?OriginCountry&DestinationCountry&UserLoginHash
 * Pravidla prodejce pro daný směr prodeje. Platforma někdy vrátí `isError: true`
 * a zároveň `feeRules` — pak se data použijí (stejně jako starý portál).
 * Pořadí řádků: dynamická pravidla, pak dvojice sale/logistic.
 */
export async function getSupplierFeeRules(input: {
  supplierId: string;
  loginHash: string;
  originCountry: string;
  destinationCountry: string;
}): Promise<FeeRuleRow[]> {
  const data = await platformRequest<SupplierFeeRulesReturn>(
    `supplier-api/admin/fee-rules/supplier/${encodeURIComponent(input.supplierId)}`,
    {
      query: {
        OriginCountry: input.originCountry,
        DestinationCountry: input.destinationCountry,
        UserLoginHash: input.loginHash,
      },
      tolerateErrorEnvelope: (body) => Array.isArray((body as SupplierFeeRulesReturn).feeRules),
    },
  );
  return [
    ...(data.dynamicSaleFeeRules ?? []).map((rule): FeeRuleRow => ({ kind: "dynamic", rule })),
    ...(data.feeRules ?? []).map((pair): FeeRuleRow => ({ kind: "pair", saleFeeRule: pair.saleFeeRule, logisticFeeRule: pair.logisticFeeRule })),
  ];
}

/** GET supplier-api/admin/fee-rules/{bundleId}/get-applied — pravidla aplikovaná na produkt. */
export async function getAppliedFeeRules(input: {
  bundleId: string;
  loginHash: string;
  sourceCountry: string;
  destinationCountry: string;
  showHistory?: boolean;
}): Promise<AppliedFeeRule[]> {
  const data = await platformRequest<{ feeRules?: AppliedFeeRule[] | null }>(
    `supplier-api/admin/fee-rules/${encodeURIComponent(input.bundleId)}/get-applied`,
    {
      query: {
        bundleId: input.bundleId,
        SourceCountry: input.sourceCountry,
        DestinationCountry: input.destinationCountry,
        UserLoginHash: input.loginHash,
        FeeRuleStates: input.showHistory ? "Inactive" : undefined,
      },
    },
  );
  return data.feeRules ?? [];
}
