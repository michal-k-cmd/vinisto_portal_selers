// Vlastní session portálu v httpOnly cookie. Stejný vzor jako CML
// (lib/auth/vinisto-auth.ts). Heslo se nikam neukládá, loginHash žije jen
// v podepsané cookie, ke které se JS v prohlížeči nedostane.
// Samotné kódování/podpis je v session-codec.ts (čistý, testovaný modul).

import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_TTL_MS } from "./constants";
import {
  decodeSession as decode,
  encodeSession as encode,
  type PortalSession,
  type SessionSupplier,
} from "./session-codec";

export { resolveActiveSupplierId } from "./session-codec";
export type { PortalSession, SessionSupplier };

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("Nastavte SESSION_SECRET (min. 16 znaků) pro přihlašování.");
  }
  return secret;
}

export function encodeSession(session: PortalSession): string {
  return encode(session, sessionSecret());
}

export function decodeSession(token: string | undefined): PortalSession | null {
  return decode(token, sessionSecret());
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Zapíše session do cookie (jen v route handleru / server action). */
export async function writeSessionCookie(session: PortalSession): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(session), {
    ...cookieOptions,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

/** Přečte a ověří session z cookie aktuálního requestu. */
export async function readSession(): Promise<PortalSession | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}
