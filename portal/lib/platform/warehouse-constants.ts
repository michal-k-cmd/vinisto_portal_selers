// Důvody skladových pohybů (VinistoHelperDllEnumsWarehouseChangeReasonType)
// s českými popisky. Port ChangeReasonLocaleMap + doplněné chybějící texty.

export const CHANGE_REASON_LABELS: Record<string, string> = {
  NONE: "Neuvedeno",
  R_STOCK_TAKING: "Inventura",
  R_STOCKING_FROM_SELLER: "Naskladnění od prodejce",
  R_ORDER_CANCELLATION: "Storno objednávky",
  R_RETURNING_GOODS: "Vrácení zboží",
  R_IMPORT_CORRECTION: "Korekce importu",
  R_COMPLAINT: "Reklamace",
  R_RETURNED_SELLER: "Vráceno prodejci",
  ON_CORRECTION_POSITION: "Na korekční pozici",
  FROM_CORRECTION_POSITION: "Z korekční pozice",
  A_WAREHOUSE_IMPORT: "Sklad import",
  A_PRODUCT_IMPORT: "Produkt import",
  A_ORDER_CREATION: "Objednávka vytvořena zákazníkem",
  A_ORDER_CANCELLATION_CUSTOMER: "Objednávka zrušena zákazníkem",
  A_ORDER_CANCELLATION_VINISTO: "Objednávka zrušena uživatelem",
  A_ADD_TO_STOCK_SELLER: "Automatické přidání produktu do skladu prodejcem",
  B2B_STORNO_PARTNER: "B2B storno objednávky partnera",
  B2B_PRODEJ_PARTNER: "B2B prodej partner",
  B2C_STORNO_PARTNER: "B2C storno objednávky partnera",
  B2C_PRODEJ_PARTNER: "B2C prodej partner",
};

export const CHANGE_REASONS = Object.keys(CHANGE_REASON_LABELS);

export function changeReasonLabel(reason: string | null | undefined): string {
  if (!reason) return "–";
  return CHANGE_REASON_LABELS[reason] ?? reason;
}
