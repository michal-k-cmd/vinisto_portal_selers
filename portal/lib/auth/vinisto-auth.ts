// Přihlášení proti platformě vinisto — ze serveru.
//
//   1. PUT /user-api/users/auth/Login {email, password, hashType: CLIENT} → loginHash
//   2. GET /user-api/users/auth/GetAuthUserSupplier?UserLoginHash&hashType=CLIENT
//      → uživatel včetně suppliers[]; bez prodejce se do portálu nesmí
//      (stejné pravidlo jako USER_NO_SUPPLIERS_ERROR ve starém SPA).
//
// Heslo se nikam neukládá ani neloguje.

import "server-only";
import { platformRequest } from "@/lib/platform/client";
import { isPlatformAuthError, PlatformApiError } from "@/lib/platform/errors";
import { HASH_TYPE, SESSION_TTL_MS } from "./constants";
import { resolveActiveSupplierId, type PortalSession, type SessionSupplier } from "./session";

type PlatformSupplier = {
  id?: string | null;
  nameBilling?: string | null;
  nameWeb?: string | null;
};

type PlatformUser = {
  id?: string | null;
  email?: string | null;
  loginHash?: string | null;
  suppliers?: PlatformSupplier[] | null;
};

type UserReturn = { isError?: boolean; error?: unknown; user?: PlatformUser | null };

const LOGIN_PATH = "user-api/users/auth/Login";
const LOGOUT_PATH = "user-api/users/auth/Logout";
const AUTH_SUPPLIER_PATH = "user-api/users/auth/GetAuthUserSupplier";

export type LoginResult =
  | { ok: true; session: PortalSession }
  | { ok: false; reason: "bad_credentials" | "no_suppliers" | "unavailable"; detail?: string };

function toSessionSuppliers(suppliers: PlatformSupplier[] | null | undefined): SessionSupplier[] {
  return (suppliers ?? [])
    .filter((s): s is PlatformSupplier & { id: string } => typeof s.id === "string" && s.id.length > 0)
    .map((s) => ({ id: s.id, name: (s.nameBilling || s.nameWeb || s.id).trim() }));
}

/** Uživatel + jeho prodejci podle hashe. Null = hash neplatný nebo bez prodejců. */
export async function fetchAuthUserSupplier(loginHash: string): Promise<{
  userId: string;
  email: string;
  suppliers: SessionSupplier[];
} | null> {
  const data = await platformRequest<UserReturn>(AUTH_SUPPLIER_PATH, {
    query: { UserLoginHash: loginHash, hashType: HASH_TYPE },
  });
  const user = data.user;
  if (!user) return null;
  const suppliers = toSessionSuppliers(user.suppliers);
  if (suppliers.length === 0) return null;
  return { userId: user.id ?? "", email: user.email ?? "", suppliers };
}

export async function loginAgainstVinisto(email: string, password: string): Promise<LoginResult> {
  let login: UserReturn;
  try {
    login = await platformRequest<UserReturn>(LOGIN_PATH, {
      method: "PUT",
      body: { email, password, hashType: HASH_TYPE },
    });
  } catch (error) {
    // Platforma vrací isError i pro špatné heslo — to není výpadek.
    if (error instanceof PlatformApiError && (error.items.length > 0 || error.status === 200)) {
      return { ok: false, reason: "bad_credentials" };
    }
    return { ok: false, reason: "unavailable", detail: error instanceof Error ? error.message : undefined };
  }

  const loginHash = login.user?.loginHash;
  if (!loginHash) return { ok: false, reason: "bad_credentials" };

  let profile: Awaited<ReturnType<typeof fetchAuthUserSupplier>>;
  try {
    profile = await fetchAuthUserSupplier(loginHash);
  } catch (error) {
    void logoutAgainstVinisto(loginHash);
    return { ok: false, reason: "unavailable", detail: error instanceof Error ? error.message : undefined };
  }

  if (!profile) {
    // Účet existuje, ale není napojený na žádného prodejce.
    void logoutAgainstVinisto(loginHash);
    return { ok: false, reason: "no_suppliers" };
  }

  const now = Date.now();
  return {
    ok: true,
    session: {
      userId: profile.userId || login.user?.id || "",
      email: profile.email || login.user?.email || email,
      loginHash,
      suppliers: profile.suppliers,
      activeSupplierId: resolveActiveSupplierId(undefined, profile.suppliers),
      validatedAt: now,
      expiresAt: now + SESSION_TTL_MS,
    },
  };
}

export async function logoutAgainstVinisto(loginHash: string): Promise<void> {
  try {
    await platformRequest(LOGOUT_PATH, {
      method: "PUT",
      body: { userLoginHash: loginHash, hashType: HASH_TYPE },
    });
  } catch {
    // best-effort — naše session zaniká smazáním cookie tak jako tak
  }
}

/**
 * Revalidace session u platformy (hash mohl být zrotován jiným přihlášením,
 * prodejci se mohli změnit). Vrací aktualizovanou session, nebo null, když
 * má session skončit. Při výpadku platformy vrací původní session beze změny.
 */
export async function revalidateSession(session: PortalSession): Promise<PortalSession | null> {
  try {
    const profile = await fetchAuthUserSupplier(session.loginHash);
    if (!profile) return null;
    return {
      ...session,
      userId: profile.userId || session.userId,
      email: profile.email || session.email,
      suppliers: profile.suppliers,
      activeSupplierId: resolveActiveSupplierId(session.activeSupplierId, profile.suppliers),
      validatedAt: Date.now(),
    };
  } catch (error) {
    if (isPlatformAuthError(error)) return null;
    return session;
  }
}
