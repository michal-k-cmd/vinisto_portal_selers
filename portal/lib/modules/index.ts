// Registr modulů portálu prodejce — pořadí = pořadí v sidebaru.
// Nový modul: přidej definici sem (nebo do vlastního souboru) a stránku
// do app/(app)/<route>/. Mapování na staré SPA je v ZADANI-portal-prodejce.md.

import type { ModuleDef, NavChild } from "./types";

export * from "./types";

const MARKETING_URL = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://ads.vinisto.cz/vinisto-mkt/";
const MANUALS_URL = process.env.NEXT_PUBLIC_MANUALS_URL ?? "https://www.vinisto.cz/vinisto-prodejce";

export const prehledModule: ModuleDef = {
  key: "prehled",
  label: "Přehled",
  route: "/",
  icon: "LayoutDashboard",
  etapa: 1,
};

export const produktyModule: ModuleDef = {
  key: "produkty",
  label: "Produkty",
  route: "/produkty",
  icon: "Wine",
  etapa: 1,
  children: [
    { label: "Seznam produktů", href: "/produkty", hint: "Produkty prodejce: sklad, ceny, slevy, detail." },
    { label: "Sety", href: "/produkty/sety", hint: "Zvýhodněné sety (např. 1+1) ke schválení vinistem." },
  ],
};

export const naskladneniModule: ModuleDef = {
  key: "naskladneni",
  label: "Naskladnění",
  route: "/naskladneni",
  icon: "PackagePlus",
  etapa: 2,
};

export const skladModule: ModuleDef = {
  key: "sklad",
  label: "Sklad",
  route: "/sklad",
  icon: "Warehouse",
  etapa: 2,
  children: [
    { label: "Přehled", href: "/sklad", hint: "Skladové zásoby produktů prodejce ve skladu vinisto." },
    { label: "Pohyby", href: "/sklad/pohyby", hint: "Log skladových pohybů." },
  ],
};

export const objednavkyModule: ModuleDef = {
  key: "objednavky",
  label: "Objednávky",
  route: "/objednavky",
  icon: "ShoppingCart",
  etapa: 3,
};

export const vyuctovaniModule: ModuleDef = {
  key: "vyuctovani",
  label: "Vyúčtování",
  route: "/vyuctovani",
  icon: "FileText",
  etapa: 3,
  children: [
    { label: "Vyúčtování a faktury", href: "/vyuctovani", hint: "Self-billing vyúčtování, PDF a XLS export." },
    { label: "Provize", href: "/vyuctovani/provize", hint: "Prodejní a logistické provize podle směru země." },
  ],
};

export const marketingModule: ModuleDef = {
  key: "marketing",
  label: "Marketing",
  route: "/marketing",
  icon: "Megaphone",
  etapa: 4,
  children: [
    { label: "Slevové kupóny", href: "/marketing/kupony", hint: "Vlastní slevové kupóny prodejce." },
    { label: "Marketingové balíčky", href: MARKETING_URL, external: true },
    { label: "Manuály", href: MANUALS_URL, external: true },
  ],
};

export const nastaveniModule: ModuleDef = {
  key: "nastaveni",
  label: "Nastavení",
  route: "/nastaveni",
  icon: "Settings",
  etapa: 5,
  children: [
    { label: "Profil prodejce", href: "/nastaveni" },
    { label: "Fakturační údaje", href: "/nastaveni/fakturace" },
    { label: "Bankovní údaje", href: "/nastaveni/banka" },
    { label: "Kontakt a adresa", href: "/nastaveni/kontakt" },
    { label: "Dodací údaje", href: "/nastaveni/dodani" },
    { label: "Přihlašovací údaje", href: "/nastaveni/prihlaseni" },
  ],
};

export const MODULES: ModuleDef[] = [
  prehledModule,
  produktyModule,
  naskladneniModule,
  skladModule,
  objednavkyModule,
  vyuctovaniModule,
  marketingModule,
  nastaveniModule,
];

export function moduleByKey(key: string): ModuleDef | undefined {
  return MODULES.find((m) => m.key === key);
}

/** Záložky horizontálního menu sekce — stejný zdroj pravdy jako sidebar. */
export function sectionTabsOf(mod: ModuleDef): NavChild[] {
  return (mod.children ?? []).filter((c) => !c.external);
}

/** Marketingový portál pro konkrétního prodejce (externí odkaz v menu). */
export function marketingUrlFor(supplierId: string): string {
  const url = new URL(MARKETING_URL);
  url.searchParams.set("prodejceId", supplierId);
  return url.toString();
}
