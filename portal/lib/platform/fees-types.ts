// Typy provizních pravidel (supplier-api/admin/fee-rules) — sdílené mezi
// server-only voláními a čistými formátovacími funkcemi.

export type FeeRecord = { fixedPrice?: number | null; percentage?: number | null };
export type LogisticFeeRecord = FeeRecord & { platformId?: number | null };

export type FeeSpecification = { definitionId?: string | null; allowedValues?: string[] | null };

/** Základ každého pravidla (BaseFeeRule). */
export type FeeRule = {
  id?: string | null;
  state?: string | null;
  validFrom?: number | null;
  validTo?: number | null;
  bundlePriceFrom?: number | null;
  bundlePriceTo?: number | null;
  note?: string | null;
  specifications?: FeeSpecification[] | null;
};

/** Prodejní pravidlo: klíč = platformId (0 = B2C, 1 = B2B). */
export type SaleFeeRule = FeeRule & {
  originFees?: Record<string, FeeRecord> | null;
  destinationFees?: Record<string, FeeRecord> | null;
};

/** Logistické pravidlo — platforma vrací klíče v obou velikostech písma. */
export type LogisticFeeRule = FeeRule & {
  originFees?: {
    supplierTransport?: LogisticFeeRecord[] | null;
    vinistoTransport?: LogisticFeeRecord[] | null;
    SupplierTransport?: LogisticFeeRecord[] | null;
    VinistoTransport?: LogisticFeeRecord[] | null;
  } | null;
};

/** Dynamické prodejní pravidlo (kategorie, prodejci, produkty, štítky). */
export type DynamicSaleFeeRule = SaleFeeRule & {
  name?: string | null;
  categoryNames?: string[] | null;
  supplierNames?: string[] | null;
  bundleNames?: string[] | null;
  tagNames?: string[] | null;
};

/** Pravidlo aplikované na produkt (get-applied) — plochý tvar se všemi poli. */
export type AppliedFeeRule = FeeRule & {
  categoryNames?: string[] | null;
  supplierNames?: string[] | null;
  bundleNames?: string[] | null;
  tagNames?: string[] | null;
  /** klíč = platformId → poplatek; u logistických pravidel supplierTransport/vinistoTransport */
  originFees?: (Record<string, FeeRecord | FeeRecord[] | undefined> & { supplierTransport?: LogisticFeeRecord[]; vinistoTransport?: LogisticFeeRecord[] }) | null;
  destinationFees?: Record<string, FeeRecord | FeeRecord[] | undefined> | null;
};

/** Řádek pro tabulku provizí: dynamické pravidlo nebo dvojice sale/logistic. */
export type FeeRuleRow =
  | { kind: "dynamic"; rule: DynamicSaleFeeRule }
  | { kind: "pair"; saleFeeRule?: SaleFeeRule | null; logisticFeeRule?: LogisticFeeRule | null };

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

/** ID specifikací (stejné konstanty jako vinisto_shared ve starém portálu). */
export const SPECIFICATION_ID_TYPE = "662aa758bf2647958787682d";
export const SPECIFICATION_ID_KIND = "631576cc4114d721a1d6e537";
export const SPECIFICATION_ID_BATCH = "631576cc4114d721a1d6e556";
