import { test } from "node:test";
import assert from "node:assert/strict";
import { isFuture, nextMonth, parsePeriod, periodBounds, periodLabel, periodToParam, pragueInputToUnix, pragueToUnix, previousMonth, unixToPragueInput } from "./period";

test("pragueToUnix: půlnoc v Praze v létě (UTC+2) a v zimě (UTC+1)", () => {
  assert.equal(pragueToUnix(2026, 7, 1), Date.UTC(2026, 5, 30, 22) / 1000);
  assert.equal(pragueToUnix(2026, 1, 1), Date.UTC(2025, 11, 31, 23) / 1000);
});

test("parsePeriod: měsíc, rok, nevalidní → aktuální měsíc", () => {
  const now = new Date(Date.UTC(2026, 8, 17, 12));
  assert.deepEqual(parsePeriod("2026-03", now), { kind: "month", year: 2026, month: 3 });
  assert.deepEqual(parsePeriod("2025", now), { kind: "year", year: 2025 });
  assert.deepEqual(parsePeriod("2026-13", now), { kind: "month", year: 2026, month: 9 });
  assert.deepEqual(parsePeriod(undefined, now), { kind: "month", year: 2026, month: 9 });
});

test("periodBounds: celý měsíc a celý rok včetně posledního dne", () => {
  const feb = periodBounds({ kind: "month", year: 2028, month: 2 });
  assert.equal(feb.timeFrom, pragueToUnix(2028, 2, 1));
  assert.equal(feb.timeTo, pragueToUnix(2028, 2, 29, 23, 59, 59));
  const year = periodBounds({ kind: "year", year: 2026 });
  assert.equal(year.timeFrom, pragueToUnix(2026, 1, 1));
  assert.equal(year.timeTo, pragueToUnix(2026, 12, 31, 23, 59, 59));
});

test("navigace mezi měsíci a popisky", () => {
  assert.deepEqual(previousMonth({ kind: "month", year: 2026, month: 1 }), { kind: "month", year: 2025, month: 12 });
  assert.deepEqual(nextMonth({ kind: "month", year: 2026, month: 12 }), { kind: "month", year: 2027, month: 1 });
  assert.equal(periodToParam({ kind: "month", year: 2026, month: 9 }), "2026-09");
  assert.equal(periodLabel({ kind: "month", year: 2026, month: 9 }), "září 2026");
  assert.equal(periodLabel({ kind: "year", year: 2026 }), "2026");
  const now = new Date(Date.UTC(2026, 8, 17));
  assert.equal(isFuture({ kind: "month", year: 2026, month: 10 }, now), true);
  assert.equal(isFuture({ kind: "month", year: 2026, month: 9 }, now), false);
});

test("unixToPragueInput / pragueInputToUnix: obousměrně v pražském čase", () => {
  const sec = pragueToUnix(2025, 7, 15, 9, 30);
  assert.equal(unixToPragueInput(sec), "2025-07-15T09:30");
  assert.equal(pragueInputToUnix("2025-07-15T09:30"), sec);
  assert.equal(pragueInputToUnix("nesmysl"), null);
});
