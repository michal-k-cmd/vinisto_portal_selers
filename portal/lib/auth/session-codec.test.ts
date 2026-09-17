import { test } from "node:test";
import assert from "node:assert/strict";
import { decodeSession, encodeSession, resolveActiveSupplierId, type PortalSession } from "./session-codec";

const SECRET = "test-secret-0123456789";

function session(overrides: Partial<PortalSession> = {}): PortalSession {
  return {
    userId: "u1",
    email: "prodejce@example.cz",
    loginHash: "hash-123",
    suppliers: [
      { id: "s1", name: "Vinařství Jedna" },
      { id: "s2", name: "Vinařství Dvě" },
    ],
    activeSupplierId: "s2",
    validatedAt: 1_000,
    expiresAt: 10_000,
    ...overrides,
  };
}

test("encode/decode: roundtrip se správným tajemstvím", () => {
  const token = encodeSession(session(), SECRET);
  assert.deepEqual(decodeSession(token, SECRET, 5_000), session());
});

test("decode: odmítne cizí podpis, poškozený token a vypršelou session", () => {
  const token = encodeSession(session(), SECRET);
  assert.equal(decodeSession(token, "jine-tajemstvi", 5_000), null);
  assert.equal(decodeSession(token.slice(0, -3) + "abc", SECRET, 5_000), null);
  assert.equal(decodeSession(token, SECRET, 10_001), null);
  assert.equal(decodeSession(undefined, SECRET), null);
  assert.equal(decodeSession("nesmysl", SECRET), null);
});

test("decode: session bez prodejců nebo bez hashe je neplatná", () => {
  assert.equal(decodeSession(encodeSession(session({ suppliers: [] }), SECRET), SECRET, 5_000), null);
  assert.equal(decodeSession(encodeSession(session({ loginHash: "" }), SECRET), SECRET, 5_000), null);
});

test("encode: dlouhé názvy prodejců se zkrátí, aby se cookie vešla", () => {
  const many = Array.from({ length: 35 }, (_, i) => ({
    id: `supplier-${i}`,
    name: `Velmi dlouhý název vinařství číslo ${i} s.r.o., družstvo a spol.`,
  }));
  const token = encodeSession(session({ suppliers: many }), SECRET);
  assert.ok(token.length < 4_000, `token má ${token.length} znaků`);
  const decoded = decodeSession(token, SECRET, 5_000);
  assert.equal(decoded?.suppliers.length, 35);
  assert.equal(decoded?.suppliers[0].name.length, 24);
  assert.equal(decoded?.suppliersTruncated, undefined);
});

test("encode: při desítkách prodejců zůstane jen aktivní a seznam je označený jako zkrácený", () => {
  const many = Array.from({ length: 80 }, (_, i) => ({
    id: `64f1c2d3e4a5b6c7d8e9f${String(i).padStart(3, "0")}`,
    name: `Vinařství číslo ${i} s.r.o.`,
  }));
  const token = encodeSession(session({ suppliers: many, activeSupplierId: many[70].id }), SECRET);
  assert.ok(token.length < 4_000, `token má ${token.length} znaků`);
  const decoded = decodeSession(token, SECRET, 5_000);
  assert.equal(decoded?.suppliers.length, 1);
  assert.equal(decoded?.suppliers[0].id, many[70].id);
  assert.equal(decoded?.suppliersTruncated, true);
  assert.equal(decoded?.activeSupplierId, many[70].id);
});

test("resolveActiveSupplierId: drží platnou volbu, jinak první", () => {
  const suppliers = session().suppliers;
  assert.equal(resolveActiveSupplierId("s2", suppliers), "s2");
  assert.equal(resolveActiveSupplierId("neexistuje", suppliers), "s1");
  assert.equal(resolveActiveSupplierId(undefined, suppliers), "s1");
  assert.equal(resolveActiveSupplierId("s1", []), "");
});
