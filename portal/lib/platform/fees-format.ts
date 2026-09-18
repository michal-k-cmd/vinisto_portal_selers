// Čisté formátovací funkce pro provizní pravidla (bez server-only, testovatelné).
// Port CommissionsList ze starého portálu: procenta „B2C % / B2B %“, platnost
// „MM. YYYY - MM. YYYY | Neomezeně“, rozsah ceny „X Kč - Y Kč“ (0 = neomezeně).

import type { AppliedFeeRule, DynamicSaleFeeRule, FeeRecord, FeeRule, FeeRuleRow, LogisticFeeRecord, SupplierFeeValues } from "./fees-types";
import { SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from "./fees-types";

export const B2C_PLATFORM_KEY = "0";
export const B2B_PLATFORM_KEY = "1";

function pct(value: number | null | undefined): string {
  return `${value ?? 0}%`;
}

/** „{b2c}% / {b2b}%“ z mapy platformId → poplatek (prodejní pravidla). */
export function salePercent(fees: Record<string, FeeRecord | FeeRecord[] | undefined> | null | undefined): string {
  if (!fees) return "";
  const pick = (key: string) => {
    const v = fees[key];
    if (v == null) return null;
    return Array.isArray(v) ? (v[0] ?? null) : v;
  };
  const b2c = pick(B2C_PLATFORM_KEY);
  const b2b = pick(B2B_PLATFORM_KEY);
  if (b2c == null && b2b == null) return "";
  return `${pct(b2c?.percentage)} / ${pct(b2b?.percentage)}`;
}

/** „{b2c}% / {b2b}%“ z pole logistických poplatků podle platformId. */
export function logisticPercent(fees: LogisticFeeRecord[] | null | undefined): string {
  if (!fees || fees.length === 0) return "";
  const b2c = fees.find((f) => f.platformId === 0)?.percentage;
  const b2b = fees.find((f) => f.platformId === 1)?.percentage;
  return `${pct(b2c)} / ${pct(b2b)}`;
}

/** „MM. YYYY“ v pražském čase; null/0 → fallback. */
export function monthYear(sec: number | null | undefined, fallback = "Neomezeně"): string {
  if (!sec) return fallback;
  const parts = new Intl.DateTimeFormat("en-US", { month: "2-digit", year: "numeric", timeZone: "Europe/Prague" }).formatToParts(new Date(sec * 1000));
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${month}. ${year}`;
}

/** „MM. YYYY - MM. YYYY“, chybějící konec = „Neomezeně“. */
export function validityRange(validFrom: number | null | undefined, validTo: number | null | undefined): string {
  return `${monthYear(validFrom, "–")} - ${monthYear(validTo)}`;
}

/** „{od} Kč - {do} Kč“, 0/null = „neomezeně“; obě prázdné → "". */
export function priceRange(from: number | null | undefined, to: number | null | undefined): string {
  const f = from ?? 0;
  const t = to ?? 0;
  if (f === 0 && t === 0) return "";
  const part = (v: number) => (v === 0 ? "neomezeně" : `${v} Kč`);
  return `${part(f)} - ${part(t)}`;
}

/** Podmínky pravidla jako řádky „Typ: …“, „Druh: …“, „Kategorie: …“. */
export type ConditionResolver = (definitionId: string | null | undefined, slug: string) => string;

export function ruleConditions(rule: FeeRule | DynamicSaleFeeRule | AppliedFeeRule | null | undefined, resolve: ConditionResolver = (_, slug) => slug): string[] {
  if (!rule) return [];
  const out: string[] = [];
  const spec = (id: string) => {
    const values = rule.specifications?.find((s) => s.definitionId === id)?.allowedValues ?? [];
    return values.length ? values.map((v) => resolve(id, v)).join(", ") : undefined;
  };
  const typ = spec(SPECIFICATION_ID_TYPE);
  const kind = spec(SPECIFICATION_ID_KIND);
  if (typ) out.push(`Typ: ${typ}`);
  if (kind) out.push(`Druh: ${kind}`);
  const dyn = rule as DynamicSaleFeeRule;
  if (dyn.categoryNames?.length) out.push(`Kategorie: ${dyn.categoryNames.join(", ")}`);
  if (dyn.supplierNames?.length) out.push(`Prodejce: ${dyn.supplierNames.join(", ")}`);
  if (dyn.bundleNames?.length) out.push(`Produkt: ${dyn.bundleNames.join(", ")}`);
  if (dyn.tagNames?.length) out.push(`Štítek: ${dyn.tagNames.join(", ")}`);
  return out;
}

export type FeeTableRow = {
  key: string;
  conditions: string[];
  validity: string;
  price: string;
  domestic: string;
  foreign: string;
  logisticsSupplier: string;
  logisticsVinisto: string;
  isDefault?: boolean;
};

/** Převede řádek z API (dynamické pravidlo nebo dvojice sale/logistic) na buňky tabulky. */
export function feeTableRow(row: FeeRuleRow, index: number, resolve?: ConditionResolver): FeeTableRow {
  if (row.kind === "dynamic") {
    const r = row.rule;
    return {
      key: r.id ?? `dyn-${index}`,
      conditions: ruleConditions(r, resolve),
      validity: validityRange(r.validFrom, r.validTo),
      price: priceRange(r.bundlePriceFrom, r.bundlePriceTo),
      domestic: salePercent(r.originFees),
      foreign: salePercent(r.destinationFees),
      logisticsSupplier: "",
      logisticsVinisto: "",
    };
  }
  const sale = row.saleFeeRule;
  const logistic = row.logisticFeeRule;
  const base = sale ?? logistic;
  return {
    key: sale?.id ?? logistic?.id ?? `rule-${index}`,
    conditions: ruleConditions(sale ?? logistic, resolve),
    validity: base ? validityRange(base.validFrom, base.validTo) : "",
    price: base ? priceRange(base.bundlePriceFrom, base.bundlePriceTo) : "",
    domestic: salePercent(sale?.originFees),
    foreign: salePercent(sale?.destinationFees),
    logisticsSupplier: logisticPercent(logistic?.originFees?.supplierTransport ?? logistic?.originFees?.SupplierTransport),
    logisticsVinisto: logisticPercent(logistic?.originFees?.vinistoTransport ?? logistic?.originFees?.VinistoTransport),
  };
}

/** Poslední řádek tabulky — výchozí provize prodejce. */
export function defaultFeeRow(values: SupplierFeeValues | null | undefined): FeeTableRow {
  const sale = `${values?.defaultSaleFeeValue ?? 0}% / ${values?.defaultSaleFeeValueB2b ?? 0}%`;
  const supplier = `${values?.defaultLogisticFeeSupplierTransport ?? 0}% / ${values?.defaultLogisticFeeSupplierTransport ?? 0}%`;
  const vinisto = `${values?.defaultLogisticFeeVinistoTransport ?? 0}% / ${values?.defaultLogisticFeeVinistoTransport ?? 0}%`;
  return {
    key: "default",
    conditions: ["Výchozí provize"],
    validity: "",
    price: "",
    domestic: sale,
    foreign: sale,
    logisticsSupplier: supplier,
    logisticsVinisto: vinisto,
    isDefault: true,
  };
}

/** Volby cílové země podle země původu: CZ→[CZ,SK,DE], SK→[SK,DE,CZ], DE→[DE,CZ,SK]. */
export function destinationCountryOptions(source: string): string[] {
  const order = ["CZ", "SK", "DE"];
  const start = Math.max(0, order.indexOf(source));
  const rotated = [...order.slice(start), ...order.slice(0, start)];
  return order.includes(source) ? rotated : [source, ...order];
}
