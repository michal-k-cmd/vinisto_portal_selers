// Konstanty modulu Produkty sdílené serverem i klientem (bez "use server").

/** Rozsah B2C slevy v procentech z ceny s DPH (jako ve starém portálu). */
export const DISCOUNT_PERCENT_MIN = 2;
export const DISCOUNT_PERCENT_MAX = 55;

/** Volby zvýhodnění a platnosti vinisto PLUS+ (config/appConfigs/vinistoPlusDiscountOptions.json). */
export const VINISTO_PLUS_PERCENTS = [10, 15, 20, 25, 30, 35, 45, 50] as const;
export const VINISTO_PLUS_DURATIONS = [
  { unit: "month", count: 1, label: "1 měsíc" },
  { unit: "month", count: 2, label: "2 měsíce" },
  { unit: "month", count: 3, label: "3 měsíce" },
  { unit: "month", count: 4, label: "4 měsíce" },
  { unit: "month", count: 5, label: "5 měsíců" },
  { unit: "month", count: 6, label: "6 měsíců" },
  { unit: "month", count: 9, label: "9 měsíců" },
  { unit: "year", count: 1, label: "1 rok" },
] as const;
