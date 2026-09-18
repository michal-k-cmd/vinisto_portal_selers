"use client";

// Registrační průvodce (port Register): 1 přihlašovací údaje, 2 fakturační
// a kontaktní údaje (ARES), 3 doprava, 4 profil, 5 souhrn. Jeden stav pro
// všechny kroky; rozepsané hodnoty (bez hesla) se drží v localStorage.

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { aresLookupAction, registerAction, type RegisterInput } from "@/lib/platform/actions/register";
import { isValidEmail, isValidIco } from "@/lib/validators";
import { cn } from "@/lib/utils";

type Addr = { addressee: string; phone: string; email: string; street: string; landRegistryNumber: string; houseNumber: string; city: string; zip: string };
type Values = {
  email: string;
  password: string;
  isAgreementCC: boolean;
  supplierType: "PRODUCER" | "IMPORTER";
  ico: string;
  dic: string;
  company: string;
  aresOk: boolean;
  address: Addr;
  bank: { prefix: string; number: string; code: string };
  isShipping: boolean | null;
  pickupAddress: Addr;
  profile: { name: string; web: string; companyDescription: string; mainProfile: string; wineRegion: string };
  isAgreementFillOut: boolean;
};

const EMPTY_ADDR: Addr = { addressee: "", phone: "+420 ", email: "", street: "", landRegistryNumber: "", houseNumber: "", city: "", zip: "" };
const INITIAL: Values = {
  email: "",
  password: "",
  isAgreementCC: false,
  supplierType: "PRODUCER",
  ico: "",
  dic: "",
  company: "",
  aresOk: false,
  address: { ...EMPTY_ADDR },
  bank: { prefix: "", number: "", code: "" },
  isShipping: null,
  pickupAddress: { ...EMPTY_ADDR },
  profile: { name: "", web: "", companyDescription: "", mainProfile: "", wineRegion: "" },
  isAgreementFillOut: false,
};
const STORAGE_KEY = "vinisto_prodejce_registrace";
const STEPS = ["Přihlašovací údaje", "Fakturační a kontaktní údaje", "Výběr služeb", "Profil prodejce", "Souhrn / start prodeje"];

function stepErrors(step: number, v: Values): string[] {
  const e: string[] = [];
  if (step === 1) {
    if (!isValidEmail(v.email)) e.push("Váš e-mail");
    if (v.password.length < 6) e.push("Vaše heslo (alespoň 6 znaků)");
    if (!v.isAgreementCC) e.push("Souhlas s obchodními podmínkami");
  }
  if (step === 2) {
    if (!isValidIco(v.ico) || !v.aresOk) e.push("IČO ověřené v ARES");
    if (!v.company.trim()) e.push("Obchodní název");
    for (const [k, label] of [["street", "Ulice"], ["landRegistryNumber", "Číslo popisné"], ["city", "Město"], ["zip", "PSČ"], ["addressee", "Kontaktní osoba"]] as const) if (!v.address[k].trim()) e.push(label);
    if (v.address.phone.replace(/\D/g, "").length < 9) e.push("Telefonní číslo");
  }
  if (step === 3) {
    if (v.isShipping === null) e.push("Způsob dopravy");
    if (v.isShipping === false) {
      for (const [k, label] of [["street", "Ulice (svoz)"], ["landRegistryNumber", "Číslo popisné (svoz)"], ["city", "Město (svoz)"], ["zip", "PSČ (svoz)"], ["addressee", "Adresát (svoz)"]] as const) if (!v.pickupAddress[k].trim()) e.push(label);
      if (v.pickupAddress.phone.replace(/\D/g, "").length < 9) e.push("Telefonní číslo (svoz)");
    }
  }
  if (step === 4) {
    if (!v.profile.name.trim()) e.push("Název společnosti");
    if (!v.isAgreementFillOut) e.push("Potvrzení oprávnění");
  }
  return e;
}

function stepWarnings(step: number, v: Values): string[] {
  const w: string[] = [];
  if (step === 4) {
    if (!v.profile.web.trim()) w.push("Webové stránky");
    if (!v.profile.companyDescription.trim()) w.push("Popis společnosti");
    if (v.supplierType === "PRODUCER") {
      if (!v.profile.mainProfile.trim()) w.push("Profil hlavního vinaře");
      if (!v.profile.wineRegion.trim()) w.push("Vinařská oblast");
    }
  }
  return w;
}

function AddressForm({ value, onChange, withEmail, idPrefix }: { value: Addr; onChange: (a: Addr) => void; withEmail?: boolean; idPrefix: string }) {
  const set = (k: keyof Addr, val: string) => onChange({ ...value, [k]: val });
  const F = ({ k, label, placeholder, required, type }: { k: keyof Addr; label: string; placeholder?: string; required?: boolean; type?: string }) => (
    <div className="space-y-1.5">
      <Label htmlFor={`${idPrefix}-${k}`}>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input id={`${idPrefix}-${k}`} type={type ?? "text"} value={value[k]} placeholder={placeholder} onChange={(e) => set(k, e.target.value)} />
    </div>
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <F k="street" label="Ulice" placeholder="Ulice" required />
      <div className="grid grid-cols-2 gap-3">
        <F k="landRegistryNumber" label="Číslo popisné" required />
        <F k="houseNumber" label="Číslo orientační" />
      </div>
      <F k="city" label="Město" required />
      <F k="zip" label="PSČ" placeholder="555 00" required />
      <F k="addressee" label={withEmail ? "Kontaktní osoba" : "Adresát"} placeholder="Jméno a příjmení" required />
      <F k="phone" label="Telefonní číslo" placeholder="+420 123 456 789" required type="tel" />
      {withEmail && <F k="email" label="Kontaktní e-mail" placeholder="vas@email.cz" type="email" />}
    </div>
  );
}

export function RegisterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [visited, setVisited] = useState(1);
  const [values, setValues] = useState<Values>(INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const [aresPending, startAres] = useTransition();
  const [aresError, setAresError] = useState<string | null>(null);
  const [pending, startSubmit] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues((v) => ({ ...v, ...(JSON.parse(raw) as Partial<Values>), password: "" }));
    } catch {
      /* bez uložených hodnot */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    const handle = setTimeout(() => {
      try {
        const { password: _p, ...rest } = values;
        void _p;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {
        /* localStorage nedostupné */
      }
    }, 800);
    return () => clearTimeout(handle);
  }, [values, hydrated]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setValues((v) => ({ ...v, [k]: val }));
  const errors = useMemo(() => [1, 2, 3, 4].map((s) => stepErrors(s, values)), [values]);
  const warnings = useMemo(() => [1, 2, 3, 4].map((s) => stepWarnings(s, values)), [values]);
  const allErrors = errors.flat();

  function goTo(n: number) {
    if (n > visited + 1) return;
    setStep(n);
    setVisited((v) => Math.max(v, n));
    window.scrollTo({ top: 0 });
  }

  function verifyIco() {
    setAresError(null);
    startAres(async () => {
      const result = await aresLookupAction(values.ico);
      if (!result.ok) {
        setAresError(result.error);
        setValues((v) => ({ ...v, aresOk: false, company: "", address: { ...v.address, street: "", landRegistryNumber: "", houseNumber: "", city: "", zip: "" } }));
        return;
      }
      const c = result.company;
      setValues((v) => ({
        ...v,
        aresOk: true,
        company: c.name,
        dic: c.dic ?? (v.dic || `CZ${c.ico}`),
        address: { ...v.address, street: c.street, landRegistryNumber: c.landRegistryNumber, houseNumber: c.houseNumber, city: c.city, zip: c.zip },
        pickupAddress: v.pickupAddress.street ? v.pickupAddress : { ...v.pickupAddress, street: c.street, landRegistryNumber: c.landRegistryNumber, houseNumber: c.houseNumber, city: c.city, zip: c.zip },
      }));
    });
  }

  function submit() {
    setSubmitError(null);
    const input: RegisterInput = {
      email: values.email,
      password: values.password,
      isAgreementCC: values.isAgreementCC as true,
      supplierType: values.supplierType,
      ico: values.ico,
      dic: values.dic,
      company: values.company,
      address: values.address,
      bank: values.bank,
      isShipping: values.isShipping ?? true,
      pickupAddress: values.isShipping === false ? values.pickupAddress : undefined,
      profile: values.profile,
      isAgreementFillOut: values.isAgreementFillOut as true,
    };
    startSubmit(async () => {
      const result = await registerAction(input);
      if (result.ok) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        toast.success("Registrace proběhla, vítejte v portálu prodejce.");
        router.push("/");
        router.refresh();
      } else {
        setSubmitError(result.error);
        toast.error(result.error);
      }
    });
  }

  const card = "space-y-4 rounded-lg border border-border bg-card p-4";
  const box = (active: boolean) => cn("flex-1 rounded-lg border p-4 text-sm", active ? "border-vinisto-green bg-vinisto-green/5" : "border-border");
  const or = (v: string | undefined) => (v && v.trim() ? v : <span className="text-muted-foreground">Nevyplněno</span>);
  const addr = (a: Addr) => `${a.street || "-"} ${a.landRegistryNumber || "-"}${a.houseNumber ? `/${a.houseNumber}` : ""}, ${a.city || "-"}, ${a.zip || "-"}`;

  return (
    <div className="space-y-4">
      {/* Kroky */}
      <ol className="flex flex-wrap gap-2 text-xs">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n === step ? "active" : n <= visited ? (errors[i]?.length ? "error" : warnings[i]?.length ? "warn" : "ok") : "off";
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => goTo(n)}
                disabled={n > visited + 1}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 disabled:opacity-50",
                  state === "active" && "border-merkatos-blue bg-merkatos-blue text-white",
                  state === "ok" && "border-vinisto-green text-vinisto-green",
                  state === "error" && "border-vinisto-wine text-vinisto-wine",
                  state === "warn" && "border-notion-orange text-notion-orange",
                  state === "off" && "border-border text-muted-foreground",
                )}
              >
                <span className="font-semibold">{n}</span> {label}
              </button>
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <section className={card}>
          <h2 className="font-heading text-lg font-semibold">Přihlašovací údaje</h2>
          <div className="space-y-1.5">
            <Label htmlFor="r-email">Váš e-mail *</Label>
            <Input id="r-email" type="email" value={values.email} placeholder="vas@email.cz" autoComplete="email" onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-password">Vaše heslo *</Label>
            <Input id="r-password" type="password" value={values.password} autoComplete="new-password" onChange={(e) => set("password", e.target.value)} />
            <p className="text-xs text-muted-foreground">Alespoň 6 znaků.</p>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={values.isAgreementCC} onChange={(e) => set("isAgreementCC", e.target.checked)} className="mt-1" />
            <span>
              Souhlasím s{" "}
              <a href="https://www.vinisto.cz/obchodni-podminky" target="_blank" rel="noopener noreferrer" className="underline">
                Obchodními podmínkami
              </a>{" "}
              a{" "}
              <a href="https://www.vinisto.cz/zasady-zpracovani-osobnich-udaju" target="_blank" rel="noopener noreferrer" className="underline">
                Zásadami zpracovávání osobních údajů
              </a>
              . *
            </span>
          </label>
          <div className="flex items-center justify-between">
            <Link href="/login" className="text-sm text-muted-foreground hover:underline">
              ‹ Zpět na přihlášení
            </Link>
            <Button type="button" disabled={errors[0].length > 0} onClick={() => goTo(2)}>
              Pokračovat
            </Button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4">
          <div className={card}>
            <h2 className="font-heading text-lg font-semibold">Registrace nového prodejce</h2>
            <p className="text-sm text-muted-foreground">Vítejte na portálu prodejce vinisto. Vyplňte fakturační a kontaktní údaje, zbytek doplníme z registru ARES. S čímkoli vám pomůže podpora pro prodejce.</p>
          </div>
          <div className={card}>
            <h3 className="font-heading font-semibold">Fakturační údaje</h3>
            <p className="text-sm text-muted-foreground">Zadejte prosím své IČO, zbytek údajů bude načten z registru firem ARES. Tyto údaje slouží pro fakturaci a vyplácení Vašich tržeb.</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="supplierType" checked={values.supplierType === "PRODUCER"} onChange={() => set("supplierType", "PRODUCER")} /> Jsem vinař
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="supplierType" checked={values.supplierType === "IMPORTER"} onChange={() => set("supplierType", "IMPORTER")} /> Jsem distributor
              </label>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="r-ico">IČO *</Label>
                <Input id="r-ico" value={values.ico} placeholder="Zadejte Vaše IČO" inputMode="numeric" className="w-44" onChange={(e) => setValues((v) => ({ ...v, ico: e.target.value.replace(/\D/g, ""), aresOk: false }))} />
              </div>
              {!values.aresOk && (
                <Button type="button" variant="outline" disabled={!isValidIco(values.ico) || aresPending} onClick={verifyIco}>
                  {aresPending ? "Ověřuji…" : "Ověřit v ARES"}
                </Button>
              )}
              {values.aresOk && <span className="pb-2 text-xs text-vinisto-green">Ověřeno v ARES</span>}
            </div>
            {aresError && <p className="text-xs text-vinisto-wine">{aresError}</p>}
            {values.aresOk && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="r-company">Obchodní název *</Label>
                  <Input id="r-company" value={values.company} onChange={(e) => set("company", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-dic">DIČ</Label>
                  <Input id="r-dic" value={values.dic} placeholder="CZ12345678" onChange={(e) => set("dic", e.target.value.toUpperCase())} />
                </div>
                <div className="sm:col-span-2">
                  <AddressForm idPrefix="r-a" value={values.address} onChange={(a) => set("address", a)} withEmail />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Bankovní účet</Label>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input value={values.bank.prefix} placeholder="Předčíslí" maxLength={6} className="w-28" aria-label="Předčíslí" onChange={(e) => set("bank", { ...values.bank, prefix: e.target.value })} />
                    <span>-</span>
                    <Input value={values.bank.number} placeholder="Číslo účtu" maxLength={10} className="w-40" aria-label="Číslo účtu" onChange={(e) => set("bank", { ...values.bank, number: e.target.value })} />
                    <span>/</span>
                    <Input value={values.bank.code} placeholder="Kód banky" maxLength={4} className="w-28" aria-label="Kód banky" onChange={(e) => set("bank", { ...values.bank, code: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground">Kontaktní osoba bude používána jako primární kontakt pro komunikaci mezi Vámi a vinisto. Změnit ji lze kdykoliv v nastavení.</p>
          </div>
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={() => goTo(1)}>
              ‹ Zpět
            </Button>
            <Button type="button" disabled={errors[1].length > 0} onClick={() => goTo(3)}>
              Pokračovat
            </Button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-4">
          <div className={card}>
            <h2 className="font-heading text-lg font-semibold">Prodej na platformě vinisto</h2>
            <p className="text-sm text-muted-foreground">Provizi platíte až z prodaného zboží; za dopravu na sklad a skladování nic neplatíte. Výše prodejní provize se řídí ceníkem a je vidět v portálu v sekci Provize.</p>
          </div>
          <div className={card}>
            <h3 className="font-heading font-semibold">Nastavení způsobu dopravy *</h3>
            <p className="text-sm text-muted-foreground">Zboží skladuje vinisto ve svém skladu v Praze. Zvolte, jak se tam vaše zboží dostane. Způsob lze kdykoliv změnit v nastavení.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className={box(values.isShipping === true)}>
                <p className="font-medium">Zboží budeme vozit na sklad vinisto sami</p>
                <p className="text-xs text-muted-foreground">Nižší logistická provize.</p>
                <Button type="button" size="sm" variant={values.isShipping === true ? "default" : "outline"} className="mt-3" onClick={() => set("isShipping", true)}>
                  Zvolit tento způsob
                </Button>
              </div>
              <div className={box(values.isShipping === false)}>
                <p className="font-medium">Zboží si vinisto vyzvedne u nás</p>
                <p className="text-xs text-muted-foreground">Svoz zajišťuje vinisto, vyšší logistická provize.</p>
                <Button type="button" size="sm" variant={values.isShipping === false ? "default" : "outline"} className="mt-3" onClick={() => set("isShipping", false)}>
                  Zvolit tento způsob
                </Button>
              </div>
            </div>
            {values.isShipping === false && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Adresa pro svoz</p>
                <AddressForm idPrefix="r-p" value={values.pickupAddress} onChange={(a) => set("pickupAddress", a)} />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={() => goTo(2)}>
              ‹ Zpět
            </Button>
            <Button type="button" disabled={errors[2].length > 0} onClick={() => goTo(4)}>
              Pokračovat
            </Button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="space-y-4">
          <div className={card}>
            <h2 className="font-heading text-lg font-semibold">Profil prodejce</h2>
            <p className="text-sm text-muted-foreground">Tyto údaje budou zobrazeny na stránkách vinisto u Vašeho profilu, představte svou společnost svým zákazníkům. Zadané údaje lze samozřejmě kdykoliv změnit.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="r-pname">Název společnosti (na webu) *</Label>
                <Input id="r-pname" value={values.profile.name} placeholder={values.company} onChange={(e) => set("profile", { ...values.profile, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-web">Webové stránky</Label>
                <Input id="r-web" type="url" value={values.profile.web} placeholder="https://" onChange={(e) => set("profile", { ...values.profile, web: e.target.value })} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="r-desc">Popis společnosti</Label>
                <textarea id="r-desc" rows={3} value={values.profile.companyDescription} onChange={(e) => set("profile", { ...values.profile, companyDescription: e.target.value })} className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm" />
              </div>
              {values.supplierType === "PRODUCER" && (
                <>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="r-main">Profil hlavního vinaře</Label>
                    <textarea id="r-main" rows={3} value={values.profile.mainProfile} onChange={(e) => set("profile", { ...values.profile, mainProfile: e.target.value })} className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-region">Vinařská oblast</Label>
                    <Input id="r-region" value={values.profile.wineRegion} onChange={(e) => set("profile", { ...values.profile, wineRegion: e.target.value })} />
                  </div>
                </>
              )}
            </div>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={values.isAgreementFillOut} onChange={(e) => set("isAgreementFillOut", e.target.checked)} className="mt-1" />
              Jsem oprávněn tyto údaje za danou společnost vyplnit. *
            </label>
          </div>
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={() => goTo(3)}>
              ‹ Zpět
            </Button>
            <Button type="button" disabled={errors[3].length > 0} onClick={() => goTo(5)}>
              Pokračovat
            </Button>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="space-y-4">
          <div className={card}>
            <h2 className="font-heading text-lg font-semibold">Shrnutí / start prodeje</h2>
            <p className="text-sm text-muted-foreground">Zkontrolujte si prosím, že všechny uvedené údaje jsou správné.</p>
          </div>
          {[
            { title: "Přihlašovací údaje", step: 1, rows: [["Váš e-mail", values.email]] },
            {
              title: "Fakturační a kontaktní údaje",
              step: 2,
              rows: [
                ["Obchodní název", values.company],
                ["Typ dodavatele", values.supplierType === "PRODUCER" ? "Jsem vinař" : "Jsem distributor"],
                ["IČO", values.ico],
                ["DIČ", values.dic],
                ["Kontaktní osoba", values.address.addressee],
                ["Kontaktní e-mail", values.address.email],
                ["Telefonní číslo", values.address.phone.replace(/\D/g, "").length < 9 ? "" : values.address.phone],
                ["Adresa", values.address.street ? addr(values.address) : ""],
                ["Bankovní účet", values.bank.number ? `${values.bank.prefix || "000000"}-${values.bank.number}/${values.bank.code}` : ""],
              ],
            },
            {
              title: "Výběr služeb",
              step: 3,
              rows: [
                ["Způsob dopravy zboží", values.isShipping === true ? "Zboží vozíme na sklad vinisto sami" : values.isShipping === false ? "Zboží si vinisto vyzvedává u nás" : ""],
                ...(values.isShipping === false ? [["Adresa pro svoz", addr(values.pickupAddress)], ["Adresát", values.pickupAddress.addressee], ["Telefonní číslo", values.pickupAddress.phone]] : []),
              ],
            },
            {
              title: "Profil prodejce",
              step: 4,
              rows: [
                ["Název společnosti", values.profile.name],
                ["Webové stránky", values.profile.web],
                ["Popis společnosti", values.profile.companyDescription],
                ...(values.supplierType === "PRODUCER" ? [["Profil hlavního vinaře", values.profile.mainProfile], ["Vinařská oblast", values.profile.wineRegion]] : []),
              ],
            },
          ].map((block) => (
            <div key={block.title} className={card}>
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold">{block.title}</h3>
                <Button type="button" size="sm" variant="outline" onClick={() => goTo(block.step)}>
                  Upravit údaje ›
                </Button>
              </div>
              <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {block.rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd>{or(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <div className={card}>
            <h3 className="font-heading font-semibold">{allErrors.length ? "Už jen kousek! Zbývá doplnit pár údajů a můžete začít prodávat." : "Skvělé! Máte vyplněny všechny potřebné údaje ke startu prodeje!"}</h3>
            {allErrors.length > 0 && (
              <div className="text-sm">
                <p className="font-medium text-vinisto-wine">Údaje/akce potřebné ke startu prodeje:</p>
                <ul className="list-disc pl-5">
                  {allErrors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {warnings.flat().length > 0 && (
              <div className="text-sm">
                <p className="font-medium text-notion-orange">Doplňující údaje k vyplnění (lze doplnit kdykoliv v nastavení):</p>
                <ul className="list-disc pl-5">
                  {warnings.flat().map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
            {submitError && <p className="text-sm text-vinisto-wine">{submitError}</p>}
            <p className="text-xs text-muted-foreground">Po registraci vás kontaktujeme kvůli ověření a smlouvě. Následně zalistujete produkty a domluvíme první naskladnění.</p>
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => goTo(4)}>
                ‹ Zpět
              </Button>
              <Button type="button" disabled={allErrors.length > 0 || pending} onClick={submit}>
                {pending ? "Registruji…" : "Registrovat se"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
