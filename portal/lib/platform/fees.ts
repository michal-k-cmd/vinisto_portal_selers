// Provize prodejce — supplier-api/admin/fee-rules/*.

import "server-only";
import { platformRequest } from "./client";

export type LogisticFeeValue = {
  allowedValue?: string | null;
  minSupplierTransportPercentage?: number | null;
  minSupplierTransportPercentageB2b?: number | null;
  minVinistoTransportPercentage?: number | null;
  minVinistoTransportPercentageB2b?: number | null;
};

export type SaleFeeValue = {
  allowedValue?: string | null;
  minB2cPercentage?: number | null;
  minB2bPercentage?: number | null;
};

export type SupplierFeeValues = {
  feeValues?: {
    supplierLogisticFeeValues?: LogisticFeeValue[] | null;
    supplierSaleFeeValues?: SaleFeeValue[] | null;
  } | null;
  defaultLogisticFeeSupplierTransport?: number | null;
  defaultLogisticFeeVinistoTransport?: number | null;
  defaultSaleFeeValue?: number | null;
  defaultSaleFeeValueB2b?: number | null;
};

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

export type FeeRecord = { fixedPrice?: number | null; percentage?: number | null };
export type LogisticFeeRecord = FeeRecord & { platformId?: number | null };

export type FeeRule = {
  id?: string | null;
  validFrom?: number | null;
  validTo?: number | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  categoryNames?: string[] | null;
  supplierNames?: string[] | null;
  bundleNames?: string[] | null;
  tagNames?: string[] | null;
  specifications?: Array<{ definitionId?: string | null; allowedValues?: string[] | null }> | null;
  /** klíč = platformId (string) → poplatek; u logistických pravidel supplierTransport/vinistoTransport */
  originFees?: (Record<string, FeeRecord | FeeRecord[]> & { supplierTransport?: LogisticFeeRecord[]; vinistoTransport?: LogisticFeeRecord[] }) | null;
  destinationFees?: Record<string, FeeRecord | FeeRecord[]> | null;
};

/** GET supplier-api/admin/fee-rules/{bundleId}/get-applied — pravidla aplikovaná na produkt. */
export async function getAppliedFeeRules(input: {
  bundleId: string;
  loginHash: string;
  sourceCountry: string;
  destinationCountry: string;
  showHistory?: boolean;
}): Promise<FeeRule[]> {
  const data = await platformRequest<{ feeRules?: FeeRule[] | null }>(
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

/** ID specifikací „Typ“ a „Druh“ (stejné konstanty jako ve starém portálu). */
export const SPECIFICATION_ID_TYPE = "631576cc4114d721a1d6e536";
export const SPECIFICATION_ID_KIND = "631576cc4114d721a1d6e537";
export const SPECIFICATION_ID_BATCH = "631576cc4114d721a1d6e556";

/** Volby cílové země podle země původu (port CountrySelector z vinisto-ui). */
export function destinationCountryOptions(source: string): string[] {
  const all = ["CZ", "SK", "DE"];
  return [source, ...all.filter((c) => c !== source)];
}
