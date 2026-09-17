// Jediný klient k platformě vinisto. Běží VÝHRADNĚ na serveru (server
// components, server actions, route handlery). Prohlížeč platformu nikdy
// nevolá přímo — proto v portálu neexistuje CORS.
//
// Vzor: dealer portál (src/modules/platform/internal/client.ts) a CML
// (lib/auth/vinisto-auth.ts). Hash uživatele se doplňuje podle toho, co který
// endpoint čeká (query `UserLoginHash` / `userLoginHash`, nebo pole v těle) —
// přesný tvar per endpoint je v docs/inventar-api.md.

import "server-only";
import { formatPlatformError, PlatformApiError } from "./errors";
import { pathForLog, serializeQuery, type Query } from "./query";

export { serializeQuery };
export type { Query, QueryValue } from "./query";

export type PlatformRequest = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: Query;
  /** JSON tělo (objekt) nebo FormData pro multipart. */
  body?: unknown;
  timeoutMs?: number;
  /** Přebít hlavičky (např. `X-Api-Key: ""` pro services-api/integrations). */
  headers?: Record<string, string>;
};

const DEFAULT_TIMEOUT_MS = 12_000;
const RATE_LIMIT_MAX_RETRIES = 3;

export function platformBaseUrl(): string {
  const base = process.env.VINISTO_API_URL?.trim().replace(/\/+$/, "");
  if (!base) throw new PlatformApiError("Chybí VINISTO_API_URL (základ URL platformy vinisto).");
  return base;
}

function apiKeyHeader(): Record<string, string> {
  const key = process.env.VINISTO_API_KEY?.trim();
  return key ? { "X-Api-Key": key } : {};
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type PlatformEnvelope = { isError?: boolean; error?: unknown };

/**
 * Zavolá platformu a vrátí rozparsované JSON tělo. Hází PlatformApiError
 * při síťové chybě, timeoutu, ne-2xx odpovědi nebo `isError: true`.
 * Při HTTP 429 zkouší znovu s exponenciálním backoffem.
 */
export async function platformRequest<T extends object = PlatformEnvelope>(
  path: string,
  init: PlatformRequest = {},
): Promise<T> {
  const url = `${platformBaseUrl()}/${path.replace(/^\/+/, "")}${serializeQuery(init.query)}`;
  const method = init.method ?? "GET";
  const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...apiKeyHeader(),
    ...(init.body !== undefined && !isForm ? { "Content-Type": "application/json" } : {}),
    ...init.headers,
  };

  let lastError: unknown;
  for (let attempt = 0; attempt <= RATE_LIMIT_MAX_RETRIES; attempt++) {
    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: init.body === undefined ? undefined : isForm ? (init.body as FormData) : JSON.stringify(init.body),
        signal: AbortSignal.timeout(init.timeoutMs ?? DEFAULT_TIMEOUT_MS),
        cache: "no-store",
      });
    } catch (error) {
      const timeout = error instanceof Error && error.name === "TimeoutError";
      console.error(`[platform] ${method} ${pathForLog(url)} → ${timeout ? "timeout" : "síť"}`);
      throw new PlatformApiError(
        timeout ? "Platforma vinisto neodpověděla včas." : "Platforma vinisto je dočasně nedostupná.",
      );
    }

    if (response.status === 429) {
      lastError = new PlatformApiError("Platforma vinisto je dočasně přetížená. Zkuste to za chvíli.", 429);
      if (attempt === RATE_LIMIT_MAX_RETRIES) break;
      await sleep(800 * 2 ** attempt + Math.floor(Math.random() * 400));
      continue;
    }

    let data: T;
    const text = await response.text();
    try {
      data = (text ? JSON.parse(text) : {}) as T;
    } catch {
      throw new PlatformApiError(`Platforma vinisto vrátila neplatnou odpověď (HTTP ${response.status}).`, response.status);
    }

    const envelope = data as PlatformEnvelope;
    if (!response.ok || envelope.isError) {
      const { message, items } = formatPlatformError(envelope.error);
      console.error(`[platform] ${method} ${pathForLog(url)} → HTTP ${response.status}: ${message}`);
      throw new PlatformApiError(
        response.ok || items.length > 0 ? message : `Platforma vinisto vrátila HTTP ${response.status}.`,
        response.status,
        items,
      );
    }

    return data;
  }

  throw lastError instanceof Error ? lastError : new PlatformApiError("Platforma vinisto je dočasně nedostupná.");
}

/**
 * Stažení binárního souboru (PDF/XLS) z platformy — proxy pro prohlížeč,
 * aby hash nikdy nebyl v URL na straně klienta.
 */
export async function platformDownload(path: string, query?: Query): Promise<Response> {
  const url = `${platformBaseUrl()}/${path.replace(/^\/+/, "")}${serializeQuery(query)}`;
  const response = await fetch(url, {
    headers: apiKeyHeader(),
    signal: AbortSignal.timeout(30_000),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new PlatformApiError(`Soubor se nepodařilo stáhnout (HTTP ${response.status}).`, response.status);
  }
  return response;
}
