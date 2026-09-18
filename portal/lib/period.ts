// Období pro Přehled: měsíc (YYYY-MM) nebo rok (YYYY), hranice v Europe/Prague
// jako unixové sekundy. Čistý modul (testovatelný).

const TZ = "Europe/Prague";

/** Posun zóny Europe/Prague pro daný okamžik v minutách (60 nebo 120). */
function offsetMinutes(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - utcMs) / 60_000);
}

/** Unixové sekundy pro lokální (pražský) čas. */
export function pragueToUnix(year: number, month: number, day: number, h = 0, m = 0, s = 0): number {
  const guess = Date.UTC(year, month - 1, day, h, m, s);
  const off = offsetMinutes(guess);
  const utc = guess - off * 60_000;
  // druhá iterace kvůli přechodu času
  const off2 = offsetMinutes(utc);
  return Math.floor((guess - off2 * 60_000) / 1000);
}

export type MonthPeriod = { kind: "month"; year: number; month: number };
export type Period = MonthPeriod | { kind: "year"; year: number };

export function currentPeriod(now = new Date()): MonthPeriod {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit" }).formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  return { kind: "month", year, month };
}

/** Z query `obdobi=YYYY-MM` nebo `obdobi=YYYY`; nevalidní → aktuální měsíc. */
export function parsePeriod(value: string | undefined, now = new Date()): Period {
  if (value) {
    const m = /^(\d{4})-(\d{2})$/.exec(value);
    if (m) {
      const month = Number(m[2]);
      if (month >= 1 && month <= 12) return { kind: "month", year: Number(m[1]), month };
    }
    const y = /^(\d{4})$/.exec(value);
    if (y) return { kind: "year", year: Number(y[1]) };
  }
  return currentPeriod(now);
}

export function periodToParam(p: Period): string {
  return p.kind === "month" ? `${p.year}-${String(p.month).padStart(2, "0")}` : String(p.year);
}

/** Hranice období jako unixové sekundy (od půlnoci do 23:59:59 posledního dne). */
export function periodBounds(p: Period): { timeFrom: number; timeTo: number } {
  if (p.kind === "month") {
    const lastDay = new Date(Date.UTC(p.year, p.month, 0)).getUTCDate();
    return { timeFrom: pragueToUnix(p.year, p.month, 1), timeTo: pragueToUnix(p.year, p.month, lastDay, 23, 59, 59) };
  }
  return { timeFrom: pragueToUnix(p.year, 1, 1), timeTo: pragueToUnix(p.year, 12, 31, 23, 59, 59) };
}

export function previousMonth(p: Period): Period {
  const base = p.kind === "month" ? p : { kind: "month" as const, year: p.year, month: 12 };
  return base.month === 1 ? { kind: "month", year: base.year - 1, month: 12 } : { kind: "month", year: base.year, month: base.month - 1 };
}

export function nextMonth(p: Period): Period {
  const base = p.kind === "month" ? p : { kind: "month" as const, year: p.year, month: 1 };
  return base.month === 12 ? { kind: "month", year: base.year + 1, month: 1 } : { kind: "month", year: base.year, month: base.month + 1 };
}

const MONTHS = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

export function periodLabel(p: Period): string {
  return p.kind === "month" ? `${MONTHS[p.month - 1]} ${p.year}` : String(p.year);
}

/** Období je v budoucnu (nelze do něj přejít). */
export function isFuture(p: Period, now = new Date()): boolean {
  const cur = currentPeriod(now);
  if (p.kind === "year") return p.year > cur.year;
  return p.year > cur.year || (p.year === cur.year && p.month > cur.month);
}

/** Unix sekundy → hodnota pro <input type="datetime-local"> v pražském čase (YYYY-MM-DDTHH:mm). */
export function unixToPragueInput(sec: number | null | undefined): string {
  if (!sec) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(sec * 1000));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

/** Hodnota z <input type="datetime-local"> (pražský čas) → unix sekundy; null při neplatném tvaru. */
export function pragueInputToUnix(value: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);
  if (!m) return null;
  return pragueToUnix(Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6] ?? 0));
}
