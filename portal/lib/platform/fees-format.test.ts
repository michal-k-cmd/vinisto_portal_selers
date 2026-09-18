import assert from "node:assert/strict";
import { test } from "node:test";
import { defaultFeeRow, destinationCountryOptions, feeText, feeTableRow, logisticPercent, monthYear, priceRange, ruleConditions, salePercent, splitFee, validityRange } from "./fees-format";

test("salePercent: B2C / B2B z mapy platforem, chybějící = 0", () => {
  assert.equal(salePercent({ "0": { percentage: 12 }, "1": { percentage: 8 } }), "12 % / 8 %");
  assert.equal(salePercent({ "0": { percentage: 12 } }), "12 % / 0 %");
  assert.equal(salePercent({}), "");
  assert.equal(salePercent(null), "");
});

test("logisticPercent: podle platformId", () => {
  assert.equal(logisticPercent([{ platformId: 1, percentage: 5 }, { platformId: 0, percentage: 3 }]), "3 % / 5 %");
  assert.equal(logisticPercent([]), "");
});

test("monthYear a validityRange: MM. YYYY v Praze, konec neomezeně", () => {
  // 2025-03-01T00:00+01:00
  const march = Date.UTC(2025, 1, 28, 23, 0, 0) / 1000;
  assert.equal(monthYear(march), "03. 2025");
  assert.equal(validityRange(march, null), "03. 2025 - Neomezeně");
});

test("priceRange: 0 = neomezeně, obě 0 = prázdné", () => {
  assert.equal(priceRange(0, 0), "");
  assert.equal(priceRange(100, 0), "100 Kč - neomezeně");
  assert.equal(priceRange(null, 500), "neomezeně - 500 Kč");
});

test("feeTableRow: dvojice sale/logistic i dynamické pravidlo", () => {
  const pair = feeTableRow(
    {
      kind: "pair",
      saleFeeRule: { id: "s1", validFrom: 1735689600, bundlePriceFrom: 200, bundlePriceTo: 0, originFees: { "0": { percentage: 10 }, "1": { percentage: 7 } }, specifications: [{ definitionId: "662aa758bf2647958787682d", allowedValues: ["Víno"] }] },
      logisticFeeRule: { id: "l1", originFees: { SupplierTransport: [{ platformId: 0, percentage: 2 }], vinistoTransport: [{ platformId: 1, percentage: 4 }] } },
    },
    0,
  );
  assert.equal(pair.key, "s1");
  assert.deepEqual(pair.conditions, ["Typ: Víno"]);
  assert.equal(pair.validity, "01. 2025 - Neomezeně");
  assert.equal(pair.price, "200 Kč - neomezeně");
  assert.equal(pair.domestic, "10 % / 7 %");
  assert.equal(pair.logisticsSupplier, "2 % / 0 %");
  assert.equal(pair.logisticsVinisto, "0 % / 4 %");

  const dyn = feeTableRow({ kind: "dynamic", rule: { id: "d1", categoryNames: ["Bílá"], destinationFees: { "0": { percentage: 15 } } } }, 1);
  assert.deepEqual(dyn.conditions, ["Kategorie: Bílá"]);
  assert.equal(dyn.foreign, "15 % / 0 %");
  assert.equal(dyn.logisticsSupplier, "");
});

test("defaultFeeRow: výchozí provize z fee-values", () => {
  const row = defaultFeeRow({ defaultSaleFeeValue: 20, defaultSaleFeeValueB2b: 10, defaultLogisticFeeSupplierTransport: 1, defaultLogisticFeeVinistoTransport: 3 });
  assert.equal(row.domestic, "20 % / 10 %");
  assert.equal(row.logisticsSupplier, "1 % / 1 %");
  assert.equal(row.logisticsVinisto, "3 % / 3 %");
  assert.equal(row.isDefault, true);
});

test("destinationCountryOptions: rotace podle země původu", () => {
  assert.deepEqual(destinationCountryOptions("CZ"), ["CZ", "SK", "DE"]);
  assert.deepEqual(destinationCountryOptions("SK"), ["SK", "DE", "CZ"]);
  assert.deepEqual(destinationCountryOptions("DE"), ["DE", "CZ", "SK"]);
  assert.deepEqual(destinationCountryOptions("AT"), ["AT", "CZ", "SK", "DE"]);
});

test("ruleConditions: slugy hodnot se překládají přes resolver", () => {
  const rule = { specifications: [{ definitionId: "662aa758bf2647958787682d", allowedValues: ["doplnkovy-sortiment", "vina"] }] };
  assert.deepEqual(ruleConditions(rule), ["Typ: doplnkovy-sortiment, vina"]);
  const resolve = (id: string | null | undefined, slug: string) => (id === "662aa758bf2647958787682d" && slug === "vina" ? "Vína" : slug);
  assert.deepEqual(ruleConditions(rule, resolve), ["Typ: doplnkovy-sortiment, Vína"]);
});

test("feeText a splitFee: pevná část jen když je nenulová", () => {
  assert.equal(feeText({ fixedPrice: 0, percentage: 20 }), "20 %");
  assert.equal(feeText({ fixedPrice: 15, percentage: 20 }), "15 Kč + 20 %");
  assert.equal(salePercent({ "0": { fixedPrice: 15, percentage: 20 }, "1": { percentage: 12 } }), "15 Kč + 20 % / 12 %");
  assert.deepEqual(splitFee("15 Kč + 20 % / 12 %"), ["15 Kč + 20 %", "12 %"]);
  assert.deepEqual(splitFee(""), ["", ""]);
});
