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
  `app/(app)/<route>/`, data v `lib/platform/<modul>.ts` (server-only),
  mutace v `lib/platform/actions/<modul>.ts` (server actions se zod).
- Soubory z platformy (PDF/XLS) jdou přes vlastní route handlery
  (`app/(app)/vyuctovani/[id]/pdf`, `naskladneni/[id]/pdf`), hash zůstává
  na serveru.
- Staré cesty SPA (`/billing`, `/bundle-list`, `/settings`…) trvale
  přesměrovává `next.config.ts`.

## Stav modulů (vše zportováno z `client_admin/`)

| Modul | Routy | Zdroj dat |
|---|---|---|
| Přehled | `/` | `order-api/dashboard-sale`, fee-values, stocking-requests |
| Produkty | `/produkty`, `/produkty/[id]`, `/produkty/sety`, `/produkty/sety/novy`, `/produkty/sety/[id]` | `product-api/bundles/*` |
| Naskladnění | `/naskladneni`, `/naskladneni/[id]` (+ PDF) | `supplier-api/stocking-requests` |
| Sklad | `/sklad`, `/sklad/pohyby` | `supplier-api/admin/statistics`, `products`, `change-log` |
| Objednávky | `/objednavky`, `/objednavky/[id]` | `order-api/orders` (jen podle hashe, BE neumí `SupplierId`) |
| Vyúčtování | `/vyuctovani`, `/vyuctovani/[id]` (+ PDF/XLS), `/vyuctovani/provize` | `order-api/billings`, `supplier-api/admin/fee-rules` |
| Marketing | `/marketing/kupony` | `order-api/discount-coupons` |
| Nastavení | `/nastaveni`, `/fakturace`, `/banka`, `/kontakt`, `/dodani`, `/prihlaseni` | `GetAuthUserSupplier`, `UpdateSupplier`, `address`, `user-api` |
| Veřejné | `/login`, `/registrace`, `/faq`, `/kontakt` | `CreateSupplierAndUser`, `services-api/ares` |

## Testy

```bash
pnpm --filter portal test   # node:test nad lib/**/*.test.ts (ceny, období, provize, validátory…)
```

## ENV

| Proměnná | Význam |
|---|---|
| `VINISTO_API_URL` | základ URL platformy (`https://prodejce.vinisto.dev` / `.cz`) |
| `VINISTO_API_KEY` | hlavička `X-Api-Key` pro integrace |
| `SESSION_SECRET` | podpis session cookie (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_MANUALS_URL` | volitelné externí odkazy v menu |
| `SUPPORTBOX_CHAT_ID`, `SUPPORTBOX_CHAT_SECRET` | volitelné; bez nich se chat nenačte a tlačítka „Chat s podporou“ vedou na Kontakt |

Hodnoty jen v `.env.local` / Vercel ENV, nikdy do gitu.

## Cutover z `client_admin/`

1. Ve Vercel projektu portálu nastavit ENV výše (včetně SupportBox) a ověřit
   build z větve `main`.
2. Přepnout doménu portálu prodejce na nový projekt; staré URL se
   přesměrují samy (`next.config.ts`).
3. Po ověření provozu smazat `client_admin/` a jeho Vercel projekt; z
   `packages/vinisto-api-client` zůstávají jen swagger typy (`src/api-types`),
   které portál používá přes alias `@api-types/*`.
