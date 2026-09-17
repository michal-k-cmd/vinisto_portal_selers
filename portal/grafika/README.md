# Grafika — přenosný brand kit vinisto & merkatos

Oficiální vizuální identita + hotové styly a loga k okamžitému použití.
Platí pro tohle repo i **všechna ostatní repa** — do nového projektu stačí
**zkopírovat celou složku `grafika/`** (nebo si ji session stáhne z tohohle
repa: `michal-k-cmd/vinisto_portal_statistics`, složka `grafika/`).

## Obsah kitu

| Soubor | K čemu |
|---|---|
| [`tokens.css`](tokens.css) | **CSS proměnné obou brandů** — framework-agnostic, vlož do jakéhokoli projektu |
| [`tailwind-globals.css`](tailwind-globals.css) | kompletní globals pro **Tailwind v4** (tokeny + light/dark mapování + fonty) — referenční implementace z tohohle repa |
| [`loga/vinisto-logo.svg`](loga/vinisto-logo.svg) | vinisto wordmark **zelený** `#68A910` (pro `<img>`, e-maily, dokumenty; [PNG](loga/vinisto-logo.png) 1600×418, průhledné pozadí) |
| [`loga/vinisto-logo-bila.svg`](loga/vinisto-logo-bila.svg) | vinisto wordmark **bílý** (na zelený/tmavý podklad; [PNG](loga/vinisto-logo-bila.png) 1600×418, průhledné pozadí) |
| [`loga/vinisto-logo.tsx`](loga/vinisto-logo.tsx) | React komponenta s `currentColor` (barví se podle kontextu) |
| [`loga/merkatos-logo.png`](loga/merkatos-logo.png) | oficiální merkatos logo (512×186, transparentní; na tmavém podkladu vykreslit bíle: `filter: brightness(0) invert(1)`) |
| [`loga/logo-vinisto-merkatos.svg`](loga/logo-vinisto-merkatos.svg) | společné logo **vinisto / merkatos na půl** — lom 45° přes střed, zelená `#68A910` / Nova blue `#1605B9`, obě loga bíle (1600×600; PNG: [plné](loga/logo-vinisto-merkatos.png), [800×300](loga/logo-vinisto-merkatos-800.png)) |
| [`loga/logo-vinisto-merkatos-ctverec.svg`](loga/logo-vinisto-merkatos-ctverec.svg) | totéž **čtvercové** — lom 45° z rohu do rohu jako ikona CML (1200×1200; [PNG](loga/logo-vinisto-merkatos-ctverec.png)) |
| [`loga/logo-merkatos-fulfillment.svg`](loga/logo-merkatos-fulfillment.svg) | **merkatos fulfillment services** — Nova blue, bílé logo, podtitul bíle v DM Sans (křivky); 1600×600 ([PNG](loga/logo-merkatos-fulfillment.png)) + čtverec 1200×1200 ([SVG](loga/logo-merkatos-fulfillment-ctverec.svg), [PNG](loga/logo-merkatos-fulfillment-ctverec.png)) |
| [`loga/logo-merkatos-marketplace-pro-firmy.svg`](loga/logo-merkatos-marketplace-pro-firmy.svg) | **merkatos marketplace pro firmy** — stejný styl, slova propojená linkami; 1600×600 ([PNG](loga/logo-merkatos-marketplace-pro-firmy.png)) + čtverec ([SVG](loga/logo-merkatos-marketplace-pro-firmy-ctverec.svg), [PNG](loga/logo-merkatos-marketplace-pro-firmy-ctverec.png)) |
| [`loga/logo-vinisto-merkatos-marketplace-pro-firmy.svg`](loga/logo-vinisto-merkatos-marketplace-pro-firmy.svg) | společné logo **na půl s podtitulem** — jako logo-vinisto-merkatos, pod merkatos bíle „marketplace pro firmy"; 1600×600 ([PNG](loga/logo-vinisto-merkatos-marketplace-pro-firmy.png)) + čtverec ([SVG](loga/logo-vinisto-merkatos-marketplace-pro-firmy-ctverec.svg), [PNG](loga/logo-vinisto-merkatos-marketplace-pro-firmy-ctverec.png)) |
| [`vinisto-brandbook-2024.pdf`](vinisto-brandbook-2024.pdf) | vinisto Grafický manuál 2024 (272 str.) — úplný zdroj pravdy |
| [`merkatos-vizualni-identita-2024.pdf`](merkatos-vizualni-identita-2024.pdf) | Merkatos Grafický manuál 2024 (178 str.) |

## Rychlá reference barev

### vinisto

| Barva | HEX | RGB | Použití |
|---|---|---|---|
| Zelená (hlavní) | `#68A910` | 104 169 16 | akcenty, CTA, hlavička — 20 % plochy |
| Bílá | `#FFFFFF` | 255 255 255 | základ — 60 % plochy |
| Béžová | `#F2E8D3` | 242 232 211 | podkladové plochy — 15 % |
| Vínová | `#921443` | 146 20 67 | zvýraznění, negativní stavy — 5 % |

### merkatos

| Barva | HEX | RGB | Použití |
|---|---|---|---|
| Nova blue | `#1605B9` | 22 5 185 | hlavní sytá modrá |
| Fialová | `#7F78E3` | 127 120 227 | doplňková / gradienty |
| Electric Mint | `#75FBD6` | 117 251 214 | akcent |
| Černá / Bílá | `#000000` / `#FFFFFF` | | text / podklad |

## Písma (vše Google Fonts)

- **vinisto**: Ubuntu Bold (logo, nadpisy, výzvy) · Ubuntu Medium
  (podnadpisy) · Roboto Regular/Medium (texty)
- **merkatos**: DM Sans

Next.js snippet (`next/font/google`):

```tsx
import { DM_Sans, Roboto, Ubuntu } from "next/font/google";

const roboto = Roboto({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const ubuntu = Ubuntu({ subsets: ["latin", "latin-ext"], weight: ["500", "700"], variable: "--font-ubuntu" });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], weight: ["500", "700"], variable: "--font-dm-sans" });
// <body className={`${roboto.variable} ${ubuntu.variable} ${dmSans.variable}`}>
```

Plain HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Roboto:wght@400;500&family=DM+Sans:wght@500;700&display=swap" rel="stylesheet">
```

## Pravidla použití (z manuálů)

- Logo vinisto vždy malým písmem („vinisto"); na zelené/tmavé bílou variantou.
- Hlavička aplikací: vinisto zelená `#68A910` s bílým logem a textem.
- Vínová `#921443` šetřit — zvýraznění a negativní stavy (5 % plochy).
- Patička aplikací provozovaných merkatosem: Nova blue + merkatos logo +
  text „vyvíjí a provozuje merkatos.cz".
- Merkatos gradienty: jen z brand barev, organické prolínání — **nikdy
  lineární ani kruhový** gradient.
- Vizuální styl vinisto: oblé tvary (hrozny, lahve, krabice), zelené
  propojovací linie.

## Jak použít v novém repu (checklist pro session)

1. Zkopíruj složku `grafika/` do repa (klidně bez PDF, když je velikost
   problém — ale nech tenhle README a tokeny).
2. CSS: vlož `tokens.css`, nebo pro Tailwind v4 převezmi
   `tailwind-globals.css` jako základ `globals.css`.
3. Fonty: snippet výše.
4. Loga ze složky `loga/` (SVG pro vinisto, PNG pro merkatos).
5. Drž poměr barev 60/20/15/5 a pravidla výše.
