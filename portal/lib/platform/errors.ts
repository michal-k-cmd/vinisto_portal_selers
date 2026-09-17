// Chyby platformy vinisto. Platforma vrací HTTP 200 i při chybě — úspěch se
// pozná z těla: `{ isError: false, ... }` vs `{ isError: true, error: [...] }`.

export type PlatformErrorItem = {
  code?: string | null;
  message?: string | null;
  specificError?: string | null;
  generalError?: string | null;
};

export class PlatformApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly items: PlatformErrorItem[] = [],
  ) {
    super(message);
    this.name = "PlatformApiError";
  }

  /** Kód první chyby (např. USER_AUTH_ERROR), pokud ho platforma poslala. */
  get code(): string | undefined {
    return this.items[0]?.code ?? undefined;
  }
}

/** Sestaví lidsky čitelnou hlášku z pole `error[]` platformy. */
export function formatPlatformError(error: unknown): { message: string; items: PlatformErrorItem[] } {
  const items = Array.isArray(error) ? (error as PlatformErrorItem[]) : [];
  const first = items[0];
  const message =
    first?.message ?? first?.specificError ?? first?.generalError ?? first?.code ?? "Platforma vinisto vrátila chybu.";
  return { message, items };
}

/** Auth chyba platformy = hash je neplatný/zrotovaný → session končí. */
export function isPlatformAuthError(error: unknown): boolean {
  if (!(error instanceof PlatformApiError)) return false;
  if (error.status === 401 || error.status === 403) return true;
  const text = `${error.code ?? ""} ${error.message}`.toUpperCase();
  return text.includes("USER_AUTH") || text.includes("LOGIN HASH") || text.includes("LOGINHASH");
}
