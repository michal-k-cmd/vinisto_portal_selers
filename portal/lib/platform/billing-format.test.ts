import assert from "node:assert/strict";
import { test } from "node:test";
import { billingPeriod, billingStateLabel } from "./billing-format";

const prague = (y: number, m: number, d: number, h = 0) => Date.UTC(y, m - 1, d, h - 1, 0, 0) / 1000; // CET zima

test("billingPeriod: stejný měsíc → den. - den. měsíc. rok", () => {
  assert.equal(billingPeriod(prague(2025, 1, 1), prague(2025, 1, 31, 23)), "01. - 31. 01. 2025");
});

test("billingPeriod: přes měsíc → den. měsíc. - den. měsíc. rok", () => {
  assert.equal(billingPeriod(prague(2024, 12, 25), prague(2025, 1, 24)), "25. 12. - 24. 01. 2025");
});

test("billingPeriod: stejný měsíc, jiný rok se nesloučí", () => {
  assert.equal(billingPeriod(prague(2024, 1, 1), prague(2025, 1, 31)), "01. 01. - 31. 01. 2025");
});

test("billingStateLabel: hodnoty API i aliasy starého portálu", () => {
  assert.equal(billingStateLabel("PAYMENT_IN_PROCCESS"), "Probíhá platba");
  assert.equal(billingStateLabel("PAYMENT_IN_PROCESS"), "Probíhá platba");
  assert.equal(billingStateLabel("CANCELLED"), "Zrušeno");
  assert.equal(billingStateLabel(undefined), "Nespecifikováno");
  assert.equal(billingStateLabel("XYZ"), "XYZ");
});
