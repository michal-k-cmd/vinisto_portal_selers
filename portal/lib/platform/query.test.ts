import { test } from "node:test";
import assert from "node:assert/strict";
import { pathForLog, serializeQuery } from "./query";

test("serializeQuery: prázdné hodnoty vynechá, pole opakuje klíč", () => {
  assert.equal(serializeQuery(), "");
  assert.equal(serializeQuery({ a: undefined, b: null, c: "" }), "");
  assert.equal(
    serializeQuery({ Limit: 10, Offset: 0, IsSent: false, bundleIds: ["a", "b"], Search: "ví no" }),
    "?Limit=10&Offset=0&IsSent=false&bundleIds=a&bundleIds=b&Search=v%C3%AD+no",
  );
});

test("pathForLog: skryje hash v obou variantách názvu", () => {
  assert.equal(
    pathForLog("https://x/y?UserLoginHash=abc&Limit=1&userLoginHash=def"),
    "https://x/y?UserLoginHash=***&Limit=1&userLoginHash=***",
  );
  assert.equal(pathForLog("https://x/y"), "https://x/y");
});
