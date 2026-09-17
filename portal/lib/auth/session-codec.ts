// Kódování session: HMAC-SHA256 podepsaný JSON (base64url). Čistý modul
// (jen node:crypto), aby šel testovat bez Next runtime.

import { createHmac, timingSafeEqual } from "crypto";

export type SessionSupplier = {
  id: string;
  /** Fakturační název prodejce (ve SPA `nameBilling`), fallback `nameWeb`. */
  name: string;
  /** Země prodejce (CZ/SK/DE…) — původ zboží pro provize. */
  countryCode?: string;
  /** Prodejce vozí zboží na sklad sám (true), nebo ho vinisto vyzvedává (false). */
  isShipping?: boolean;
};

export type PortalSession = {
  userId: string;
  email: string;
  loginHash: string;
  suppliers: SessionSupplier[];
  activeSupplierId: string;
  /**
   * Seznam prodejců se do cookie nevešel: `suppliers` obsahuje jen aktivního,
   * plný seznam se dotahuje živě z platformy (GetAuthUserSupplier).
   */
  suppliersTruncated?: boolean;
  /** Kdy se hash naposledy ověřil u platformy (ms). */
  validatedAt: number;
  expiresAt: number;
};

/** Cookie má limit ~4 kB; nad tímto počtem znaků názvy prodejců zkracujeme. */
const MAX_COOKIE_CHARS = 3_500;

function sign(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

const toBody = (session: PortalSession) => Buffer.from(JSON.stringify(session)).toString("base64url");

/**
 * Zakóduje session. Když se nevejde do cookie (účet s desítkami prodejců),
 * postupně ubírá: 1) názvy prodejců zkrátí na 24 znaků, 2) nechá jen
 * aktivního prodejce a označí seznam jako zkrácený (`suppliersTruncated`) —
 * plný seznam si pak portál dotahuje živě z platformy.
 */
export function encodeSession(session: PortalSession, secret: string): string {
  const variants: Array<(s: PortalSession) => PortalSession> = [
    (s) => s,
    (s) => ({ ...s, suppliers: s.suppliers.map((x) => ({ ...x, name: x.name.slice(0, 24) })) }),
    (s) => ({
      ...s,
      suppliers: s.suppliers.filter((x) => x.id === s.activeSupplierId).slice(0, 1),
      suppliersTruncated: true,
    }),
  ];
  let body = toBody(session);
  for (const variant of variants) {
    body = toBody(variant(session));
    if (body.length <= MAX_COOKIE_CHARS) break;
  }
  return `${body}.${sign(secret, body)}`;
}

export function decodeSession(token: string | undefined, secret: string, now = Date.now()): PortalSession | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const a = Buffer.from(signature);
  const b = Buffer.from(sign(secret, body));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString()) as PortalSession;
    if (!session.loginHash || !session.expiresAt || now > session.expiresAt) return null;
    if (!Array.isArray(session.suppliers) || session.suppliers.length === 0) return null;
    return session;
  } catch {
    return null;
  }
}

/** Aktivní prodejce musí být v seznamu; jinak první (stejně jako SPA `getValidActiveSupplierId`). */
export function resolveActiveSupplierId(wanted: string | undefined, suppliers: SessionSupplier[]): string {
  if (wanted && suppliers.some((s) => s.id === wanted)) return wanted;
  return suppliers[0]?.id ?? "";
}
