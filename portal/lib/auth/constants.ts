// Konstanty sdílené mezi middleware (Edge runtime, bez node:crypto)
// a serverovou auth vrstvou.

export const SESSION_COOKIE = "vinisto_prodejce_session";
/** Vlastní politika portálu: 8 h, pak nové přihlášení (hash platformy TTL nemá). */
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
/** Jak často znovu ověřit hash u platformy (GetAuthUserSupplier). */
export const SESSION_REVALIDATE_MS = 5 * 60 * 1000;
/** Typ hashe pro portál prodejce (SPA používalo CLIENT; ADMIN je pro interní nástroje). */
export const HASH_TYPE = "CLIENT" as const;
