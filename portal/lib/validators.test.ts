import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidIco, isValidWebsite, normalizePhone, parseBankAccount, serializeBankAccount, validateBankAccount } from "./validators";

test("isValidIco: kontrolní součet", () => {
  assert.equal(isValidIco("27074358"), true); // Alza
  assert.equal(isValidIco("12345678"), false);
  assert.equal(isValidIco("123"), false);
});

test("bankovní účet: parsování starého tvaru i bez mezer, serializace", () => {
  assert.deepEqual(parseBankAccount("000000 - 1234567890 / 0800"), { prefix: "000000", number: "1234567890", code: "0800" });
  assert.deepEqual(parseBankAccount("19-2000145399/0800"), { prefix: "19", number: "2000145399", code: "0800" });
  assert.deepEqual(parseBankAccount("2000145399/0800"), { prefix: "", number: "2000145399", code: "0800" });
  assert.deepEqual(parseBankAccount(""), { prefix: "", number: "", code: "" });
  assert.equal(serializeBankAccount({ prefix: "", number: "2000145399", code: "0800" }), "000000 - 2000145399 / 0800");
  assert.equal(serializeBankAccount({ prefix: "", number: "", code: "" }), "");
});

test("validateBankAccount: modulo 11 a konzistence", () => {
  assert.equal(validateBankAccount({ prefix: "", number: "", code: "" }), null);
  assert.equal(validateBankAccount({ prefix: "19", number: "2000145399", code: "0800" }), null);
  assert.equal(validateBankAccount({ prefix: "", number: "1234567891", code: "0800" }), "Neplatné číslo účtu.");
  assert.equal(validateBankAccount({ prefix: "", number: "2000145399", code: "" }), "Neplatné číslo účtu.");
  assert.equal(validateBankAccount({ prefix: "", number: "2000145399", code: "08" }), "Tento kód banky neznáme.");
});

test("isValidWebsite a normalizePhone", () => {
  assert.equal(isValidWebsite(""), true);
  assert.equal(isValidWebsite("https://vinisto.cz"), true);
  assert.equal(isValidWebsite("vinisto.cz"), false);
  assert.equal(normalizePhone("+420 606 758 080"), "+420 606758080");
  assert.equal(normalizePhone("606758080"), "+420 606758080");
  assert.equal(normalizePhone("abc"), null);
});
