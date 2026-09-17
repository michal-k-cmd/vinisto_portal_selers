import { test } from "node:test";
import assert from "node:assert/strict";
import { computeBundlePrices, discountPercent, discountState, isDiscountActive, withoutVat } from "./prices";

const NOW = 1_700_000_000;

test("isDiscountActive: bez omezení vždy, jinak v intervalu včetně krajů", () => {
  assert.equal(isDiscountActive({ validFrom: null, validTo: null }, NOW), true);
  assert.equal(isDiscountActive({ validFrom: NOW - 10, validTo: NOW + 10 }, NOW), true);
  assert.equal(isDiscountActive({ validFrom: NOW, validTo: NOW }, NOW), true);
  assert.equal(isDiscountActive({ validFrom: NOW + 1, validTo: null }, NOW), false);
  assert.equal(isDiscountActive({ validFrom: null, validTo: NOW - 1 }, NOW), false);
});

test("discountState: nekončící = probíhá, budoucí = naplánována, minulá = ukončena", () => {
  assert.equal(discountState({ validFrom: NOW - 5, validTo: null }, NOW), "ONGOING");
  assert.equal(discountState({ validFrom: NOW + 5, validTo: NOW + 50 }, NOW), "PLANNED");
  assert.equal(discountState({ validFrom: NOW - 50, validTo: NOW - 5 }, NOW), "EXPIRED");
  assert.equal(discountState({ validFrom: NOW - 5, validTo: NOW + 5 }, NOW), "ONGOING");
});

test("computeBundlePrices: základní cena Level1 pro B2C, sleva jen když je nižší", () => {
  const result = computeBundlePrices(
    {
      prices: [
        { level: "Level1", platformId: 0, currency: "CZK", value: 100, valueWithVat: 121, vatValue: 21 },
        { level: "Level1", platformId: 1, currency: "CZK", value: 90, valueWithVat: 108.9, vatValue: 21 },
      ],
      priceDiscounts: [
        { level: "Level1", platformId: 0, currency: "CZK", type: "SupplierDiscount", value: 80, valueWithVat: 96.8, validFrom: NOW - 1, validTo: NOW + 100, priceId: "d1" },
        { level: "Level1", platformId: 0, currency: "CZK", type: "SupplierDiscount", value: 200, valueWithVat: 242, validFrom: null, validTo: null, priceId: "d2" },
      ],
    },
    { currency: "CZK", platformId: 0, nowSec: NOW },
  );
  assert.equal(result.basePrice?.valueWithVat, 121);
  assert.equal(result.isDiscounted, true);
  assert.equal(result.discountedPrice?.priceId, "d1");
  assert.equal(result.discountDifferenceWithVat, -24);
  assert.equal(result.discountDifferencePercent, -20);

  const b2b = computeBundlePrices({ prices: [{ level: "Level1", platformId: 1, currency: "CZK", value: 90, valueWithVat: 108.9 }] }, { platformId: 1, nowSec: NOW });
  assert.equal(b2b.basePrice?.valueWithVat, 108.9);
  assert.equal(b2b.isDiscounted, false);
});

test("computeBundlePrices: sleva vyšší než základ se nepočítá jako sleva", () => {
  const result = computeBundlePrices(
    {
      prices: [{ level: "Level1", platformId: 0, currency: "CZK", value: 100, valueWithVat: 121 }],
      priceDiscounts: [{ level: "Level1", platformId: 0, currency: "CZK", type: "VinistoDiscount", value: 150, valueWithVat: 181.5, validFrom: null, validTo: null }],
    },
    { nowSec: NOW },
  );
  assert.equal(result.isDiscounted, false);
  assert.equal(result.discountedPrice, null);
});

test("computeBundlePrices: vinisto PLUS+ jen když je levnější než běžná/slevová cena", () => {
  const base = { level: "Level1", platformId: 0, currency: "CZK", value: 100, valueWithVat: 121 };
  const cheaperPlus = computeBundlePrices(
    { prices: [base, { level: "VinistoPlus", platformId: 0, currency: "CZK", value: 70, valueWithVat: 84.7 }] },
    { nowSec: NOW },
  );
  assert.equal(cheaperPlus.vinistoPlus?.valueWithVat, 84.7);

  const pricierPlus = computeBundlePrices(
    { prices: [base, { level: "VinistoPlus", platformId: 0, currency: "CZK", value: 110, valueWithVat: 133.1 }] },
    { nowSec: NOW },
  );
  assert.equal(pricierPlus.vinistoPlus, null);
});

test("discountPercent a withoutVat", () => {
  assert.equal(discountPercent(1000, 850), 15);
  assert.equal(discountPercent(1000, 1000), 0);
  assert.equal(discountPercent(0, 10), 0);
  assert.equal(withoutVat(121, 21), 100);
  assert.equal(withoutVat(100, 0), 100);
});
