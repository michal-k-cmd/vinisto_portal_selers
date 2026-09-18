// Konstanty setů — sdílené server/klient (bez server-only).

export type SetType = "OnePlusOneFree" | "TwoPlusOneFree" | "ThreePlusThreeFree" | "FourPlusTwoFree" | "FivePlusOneFree" | "Six10Percentage";
export type SetState = "Concept" | "ToConfirm" | "Confirmed" | "Rejected";

export const SET_TYPES: SetType[] = ["OnePlusOneFree", "TwoPlusOneFree", "ThreePlusThreeFree", "FourPlusTwoFree", "FivePlusOneFree", "Six10Percentage"];

export const SET_TYPE_LABEL: Record<SetType, string> = {
  OnePlusOneFree: "1 + 1 zdarma",
  TwoPlusOneFree: "2 + 1 zdarma",
  ThreePlusThreeFree: "3 + 3 zdarma",
  FourPlusTwoFree: "4 + 2 zdarma",
  FivePlusOneFree: "5 + 1 zdarma",
  Six10Percentage: "6 s 10% slevou",
};

/** [počet placených, počet zdarma] */
export const SET_TYPE_SLOTS: Record<SetType, [number, number]> = {
  OnePlusOneFree: [1, 1],
  TwoPlusOneFree: [2, 1],
  ThreePlusThreeFree: [3, 3],
  FourPlusTwoFree: [4, 2],
  FivePlusOneFree: [5, 1],
  Six10Percentage: [6, 0],
};

export const SET_STATE_LABEL: Record<SetState, string> = {
  Concept: "Koncept",
  ToConfirm: "Čeká na schválení",
  Confirmed: "Schváleno",
  Rejected: "Zamítnuto",
};

export function isSetType(value: unknown): value is SetType {
  return typeof value === "string" && (SET_TYPES as string[]).includes(value);
}

/** Produkt ve slotu setu — jen to, co editor potřebuje (posílá se do klienta). */
export type SetSlotProduct = {
  id: string;
  name: string;
  warehouseIds: string;
  imageUrl: string | null;
  /** B2C cena vč. DPH (Level1, CZK) */
  priceB2C: number | null;
  /** B2B cena vč. DPH (Level1, CZK) */
  priceB2B: number | null;
  stock: number | null;
};

/** Cena setu: placené produkty vč. DPH + 1 Kč za každý produkt zdarma; u „6 s 10% slevou“ minus 10 %. */
export function computeSetPrice(setType: SetType, paid: Array<SetSlotProduct | null>, free: Array<SetSlotProduct | null>): number {
  const paidSum = paid.reduce((sum, p) => sum + (p?.priceB2C ?? 0), 0);
  const freeCount = free.filter(Boolean).length;
  const total = paidSum + freeCount;
  return setType === "Six10Percentage" ? total - total * 0.1 : total;
}
