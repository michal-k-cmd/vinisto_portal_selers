# Portál prodejce vinisto (`portal/`)

Nová aplikace portálu prodejce — Next.js 15, přihlášení proti platformě
vinisto **ze serveru**, session v podepsané httpOnly cookie. Nahrazuje
Vite SPA `client_admin/`. Zadání a plán etap:
[`../ZADANI-portal-prodejce.md`](../ZADANI-portal-prodejce.md), inventář API:
[`../docs/inventar-api.md`](../docs/inventar-api.md).

## Lokální vývoj

```bash
pnpm install                      # z rootu monorepa
cp portal/.env.example portal/.env.local   # doplnit VINISTO_API_KEY a SESSION_SECRET
pnpm --filter portal dev          # http://localhost:3000
```

Před commitem:

```bash
pnpm --filter portal lint && pnpm --filter portal typecheck && pnpm --filter portal build
```

## Jak to funguje

- `app/(auth)/login` → `POST /api/auth/login` → `lib/auth/vinisto-auth.ts`
  zavolá `PUT /user-api/users/auth/Login` (hashType `CLIENT`) a
  `GET /user-api/users/auth/GetAuthUserSupplier`. Bez prodejce se nejde přihlásit.
- Session (`lib/auth/session.ts`): `{userId, email, loginHash, suppliers[],
  activeSupplierId, validatedAt, expiresAt}` v HMAC-SHA256 podepsané httpOnly
  cookie, TTL 8 h. Každých 5 minut se hash ověří u platformy
  (`/api/auth/refresh`), neplatný hash session ukončí.
- Platformu volá jen `lib/platform/client.ts` (`X-Api-Key`, timeouty, backoff
  na 429, model chyb `isError`). Prohlížeč platformu nikdy nevolá, proto tu
  není CORS.
- Aktivní prodejce se přepíná server action (`lib/auth/actions.ts`), která
  přepíše cookie. Stránky ho čtou ze session, nikdy z requestu.
- Moduly: registr `lib/modules/index.ts` (pořadí = sidebar), UI v
  `app/(app)/<route>/`, data budou v `lib/platform/<modul>.ts`.

## ENV

| Proměnná | Význam |
|---|---|
| `VINISTO_API_URL` | základ URL platformy (`https://prodejce.vinisto.dev` / `.cz`) |
| `VINISTO_API_KEY` | hlavička `X-Api-Key` pro integrace |
| `SESSION_SECRET` | podpis session cookie (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_MANUALS_URL` | volitelné externí odkazy v menu |

Hodnoty jen v `.env.local` / Vercel ENV, nikdy do gitu.
