# Portál prodejce vinisto — přestavba na Next.js

Zadání a plán etap. Cíl: nahradit stávající Vite SPA `client_admin/`
aplikací postavenou stejně jako vinisto CML (`michal-k-cmd/vinisto_portal_statistics`):
Next.js App Router, přihlášení proti platformě vinisto **ze serveru**, session
v podepsané httpOnly cookie, platformní API volané výhradně ze serveru.

## Proč

- Přihlášení ze SPA jde přímo na `prodejce.vinisto.cz`. Z jiného originu
  (lokální vývoj, preview) prohlížeč posílá CORS preflight a produkční
  platforma na `OPTIONS` vrací 405. Portál tak jde vyvíjet jen s vypnutou
  bezpečností prohlížeče.
- `loginHash` dnes žije v localStorage a v query stringu každého requestu.
  JavaScript v prohlížeči k němu má plný přístup.
- Kód je z roku 2022 (CRA → Vite, CoreUI, react-final-form, lodash), dvě
  paralelní HTTP vrstvy (axios + fetch), 34 600 řádků bez testů.

Vzor CML tohle řeší: prohlížeč mluví jen s vlastním serverem, ten drží
`loginHash` v cookie, kterou JS nevidí, a platformu volá server-to-server.

## Architektura

```
prohlížeč ──(same-origin)──▶ Next.js (portal/) ──(X-Api-Key, UserLoginHash)──▶ prodejce.vinisto.{dev,cz}
                              ├─ /api/auth/login|logout|me
                              ├─ server components + server actions
                              └─ lib/platform/* (jediný klient k platformě)
```

| Vrstva | Volba |
|---|---|
| Framework | Next.js 15 (App Router, route groups `(app)` / `(auth)` / `api`), TypeScript strict |
| Styly | Tailwind v4, tokeny z brand kitu `grafika/` (vinisto zelená hlavička, merkatos patička) |
| UI | vlastní komponenty ve stylu shadcn (`components/ui/*`), lucide-react, sonner |
| Auth | `PUT /user-api/users/auth/Login` (`hashType: CLIENT`) → `GET /user-api/users/auth/GetAuthUserSupplier` → session `{userId, email, loginHash, suppliers[], activeSupplierId, expiresAt}` v HMAC-SHA256 podepsané httpOnly cookie, TTL 8 h |
| Platforma | `lib/platform/client.ts` — jeden serverový klient (base URL `VINISTO_API_URL`, hlavička `X-Api-Key`, doplnění `UserLoginHash`/`userLoginHash` podle endpointu, model chyb `isError`/`error[]`, timeout, 429 backoff) |
| Typy | generované swagger typy z `packages/vinisto-api-client/src/api-types/*` (type-only importy, žádný runtime kód z balíčku) |
| Data | žádná vlastní DB. Vše z platformy. Volitelně později `portal.*` schéma v Neonu jen pro portálové věci (audit) |
| Nasazení | Vercel (root `portal/`) nebo stávající Docker (`next start`). ENV podle `portal/.env.example` |

### Session a prodejci

- Uživatel bez `suppliers[]` se nepřihlásí (dnes `USER_NO_SUPPLIERS_ERROR`).
- Aktivní prodejce je v session (`activeSupplierId`), přepíná se server
  action, která přepíše cookie. Všechny dotazy na platformu ho berou ze
  session, nikdy z requestu klienta.
- Revalidace: layout `(app)` jednou za 5 minut zavolá `GetAuthUserSupplier`
  (v cookie `validatedAt`); při chybě nebo prázdných prodejcích session
  zaniká a jde se na `/login`. Nahrazuje `AuthorizationService` ze SPA.
- Middleware (Edge) hlídá jen přítomnost cookie; podpis ověřuje server.

### Moduly

Stejný registr jako CML (`lib/modules/<key>.ts`, `MODULES` = pořadí
v sidebaru, `children` = podmenu). Role se neřeší: kdo má prodejce, vidí vše.

| Modul | Routa | Náhrada za (client_admin) |
|---|---|---|
| Přehled | `/` | `DashBoard` |
| Produkty | `/produkty`, `/produkty/[id]`, `/produkty/sety`, `/produkty/sety/[id]` | `BundleList`, `BundleDetail`, `SetList`, `SetDetail` |
| Naskladnění | `/naskladneni`, `/naskladneni/[id]` | `StockRequestList`, `StockRequestDetail` |
| Sklad | `/sklad`, `/sklad/log` | `WarehouseList` (+ `WarehouseLog`) |
| Objednávky | `/objednavky`, `/objednavky/[id]` | `OrderList`, `OrderDetail` |
| Vyúčtování | `/vyuctovani`, `/vyuctovani/[id]`, `/vyuctovani/provize` | `BillingList`, `BillingDetail`, `CommissionsList` |
| Marketing | `/marketing/kupony` + externí odkazy (marketingové balíčky, manuály) | `DiscountCouponsList` |
| Nastavení | `/nastaveni/*` | `Settings` |
| Registrace | `/registrace/[krok]` (veřejné) | `Register` |
| Kontakt, FAQ | `/kontakt`, `/faq` (veřejné) | `Contact`, `Faq` |

Vypouští se: `Overview` (mock data), `/warehouse-list` je skrytý v menu,
ale funkčnost sklad přechází do modulu Sklad.

### Konvence (závazné, stejné jako CML)

1. Větev → PR → review. Nikdy přímo do `main`.
2. Před commitem `pnpm --filter portal build` a `pnpm --filter portal lint`.
3. Kód a komentáře česky tam, kde jde o doménu; texty UI česky.
4. Platformu volá jen `lib/platform/*`. Stránky a akce ho importují, nikdy
   nevolají `fetch` na platformu samy.
5. Poctivost dat: co platforma nevrátí, UI přizná (pomlčka + vysvětlení).
6. Hesla ani `loginHash` se nelogují.

## Etapy

| # | Etapa | Rozsah | Výstup |
|---|---|---|---|
| 0 | **Skeleton + auth** | app `portal/` v monorepu, layout (hlavička, sidebar, patička, mobil), login/logout, session, middleware, přepínač prodejce, serverový klient platformy, registr modulů s prázdnými stránkami, `.env.example`, README | přihlášení funguje proti `prodejce.vinisto.dev`, build + lint zelené |
| 1 | **Přehled + Produkty** | dashboard (prodeje, top produkty, provize, slevy, naskladnění), seznam produktů (filtry, sklad, ceny), detail (info, stav, prodej/ceny, slevy, VinistoPlus, kategorie, provize) | parita s `DashBoard`, `BundleList`, `BundleDetail` |
| 2 | **Naskladnění + Sklad** | seznam a detail naskladnění, celý workflow stavů (potvrzení, zrušení, odeslání, svoz), přílohy, PDF; skladový přehled + log pohybů | parita s `StockRequest*`, `WarehouseList` |
| 3 | **Objednávky + Vyúčtování + Provize** | seznamy, detaily, PDF/XLS proxy přes server (bez hashe v URL), provizní pravidla | parita s `Order*`, `Billing*`, `CommissionsList` |
| 4 | **Sety + Kupóny** | tvorba/editace setů, výběr produktů, schválení; kupóny CRUD, aktivace, kurzy | parita s `Set*`, `DiscountCouponsList` |
| 5 | **Nastavení + Registrace** | profil, fakturace, banka, kontakt, dodání, e-mail/heslo, zapomenuté heslo; registrační wizard s ARES a autosave | parita s `Settings`, `Register`, `LogIn` |
| 6 | **Cutover** | SupportBox chat, FAQ/kontakt, přesměrování starých URL, deploy (Vercel/Docker), odstranění `client_admin/` a nepoužitých balíčků, README | produkce běží na nové aplikaci |

Každá etapa = jeden PR (velké etapy i víc). Do cutoveru běží obě aplikace
vedle sebe, stará zůstává v repu jako reference.

## Co se zachová z client_admin

- `packages/vinisto-api-client/src/api-types/*` — swagger typy (53 k řádků),
  po cutoveru přesunout jen potřebné do `portal/lib/platform/api-types/`.
- Překlady `client_admin/src/Services/LocalizationService/translations/cs.json`
  jako zdroj českých textů (aplikace je fakticky jen česká, ostatní jazyky
  se nepoužívají a nepřenáší se).
- Byznys logika: mapování stavů naskladnění, výpočty slev, adaptéry bundlů
  (`packages/vinisto-api-client/src/domain`), konfigurace VinistoPlus slev.

## Co se nepřenáší

- OAuth (Google/Facebook/Seznam) — v `.env` vypnuté, zůstává jen e-mail + heslo.
  Kdyby bylo potřeba, jde přes `login-by-external-app` doplnit server-side.
- `Overview` na mock datech, Smartsupp relikty, CoreUI/Bootstrap, lodash,
  react-final-form, axios.
- Vícejazyčnost (en/de/sk).

## Rizika a otevřené body

- **Nekonzistence platformy**: `UserLoginHash` vs `userLoginHash`, hash
  v query vs v těle. Klient to řeší per endpoint podle inventáře v
  `docs/inventar-api.md`; při přenosu každého endpointu se drží přesně.
- **Velikost cookie**: session nese seznam prodejců. Ukládá se jen `id`
  a `nameBilling`; při překročení ~3 kB jen `id` a názvy se dotahují.
- **PDF/XLS**: dnes `window.open` s hashem v URL. Nově serverová proxy
  route, která soubor stáhne s hashem ze session a pošle dál.
- **429 na platformě**: klient má backoff jako dealer portál.
- **Hardcoded klíče v repu** (`client_admin/env/.env`, SupportBox secret
  v `chat-loader.ts`): do nové aplikace jdou jen přes ENV.
