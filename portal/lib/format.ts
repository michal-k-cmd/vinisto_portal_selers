// Formátování čísel, cen a dat pro české UI (čisté funkce, bez server-only).

const CZ = "cs-CZ";

export function formatNumber(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat(CZ, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

/** Cena s měnou; CZK → „1 234 Kč“, EUR → „12,50 €“. */
export function formatPrice(value: number | null | undefined, currency = "CZK", digits?: number): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const fraction = digits ?? (currency === "CZK" ? 0 : 2);
  return new Intl.NumberFormat(CZ, {
    style: "currency",
    currency,
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(value);
}

export function formatPercent(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${new Intl.NumberFormat(CZ, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)} %`;
}

export function formatDate(value: string | number | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(CZ, { day: "numeric", month: "numeric", year: "numeric", timeZone: "Europe/Prague" }).format(date);
}

export function formatDateTime(value: string | number | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(CZ, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Prague",
  }).format(date);
}

/** ISO datum (YYYY-MM-DD) v pražském čase — pro query parametry platformy. */
export function toIsoDate(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Prague" }).format(date);
}
