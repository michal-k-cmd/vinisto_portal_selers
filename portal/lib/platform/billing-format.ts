// Čisté formátování pro vyúčtování (testovatelné bez server-only).

export type BillingState = "CREATED" | "IN_ISSUE" | "PAYMENT_IN_PROCCESS" | "PAID" | "CANCELLED";

/** Klíčováno podle hodnot API (včetně překlepu PAYMENT_IN_PROCCESS) + aliasy ze starého portálu. */
const BILLING_STATE_LABEL: Record<string, string> = {
  CREATED: "Vytvořena",
  IN_ISSUE: "Vystaveno",
  PAYMENT_IN_PROCCESS: "Probíhá platba",
  PAYMENT_IN_PROCESS: "Probíhá platba",
  PAID: "Zaplaceno",
  CANCELLED: "Zrušeno",
  CANCELED: "Zrušeno",
};

export function billingStateLabel(state: string | null | undefined): string {
  if (!state) return "Nespecifikováno";
  return BILLING_STATE_LABEL[state] ?? state;
}

export function billingStateTone(state: string | null | undefined): string {
  switch (state) {
    case "PAID":
    case "CREATED":
      return "text-vinisto-green";
    case "PAYMENT_IN_PROCCESS":
    case "PAYMENT_IN_PROCESS":
    case "IN_ISSUE":
      return "text-notion-orange";
    case "CANCELLED":
    case "CANCELED":
      return "text-vinisto-wine";
    default:
      return "";
  }
}

function pragueParts(sec: number): { day: string; month: string; year: string } {
  const parts = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Prague" }).formatToParts(new Date(sec * 1000));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("day"), month: get("month"), year: get("year") };
}

/**
 * Zaúčtovací období: stejný měsíc i rok → „01. - 31. 01. 2025“,
 * jinak „25. 12. - 24. 01. 2025“ (unix sekundy).
 */
export function billingPeriod(timeFrom: number | null | undefined, timeTo: number | null | undefined): string {
  if (!timeFrom || !timeTo) return "–";
  const from = pragueParts(timeFrom);
  const to = pragueParts(timeTo);
  const sameMonth = from.month === to.month && from.year === to.year;
  const fromText = sameMonth ? `${from.day}.` : `${from.day}. ${from.month}.`;
  return `${fromText} - ${to.day}. ${to.month}. ${to.year}`;
}
