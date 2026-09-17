"use server";

// Registrace nového prodejce: ARES podle IČO, založení účtu + prodejce,
// automatické přihlášení (session cookie) — vše přes server.

import { z } from "zod";
import { writeSessionCookie } from "@/lib/auth/session";
import { loginAgainstVinisto } from "@/lib/auth/vinisto-auth";
import { PlatformApiError } from "@/lib/platform/errors";
import { aresLookup, registerSupplier, type AresCompany } from "@/lib/platform/supplier";
import { isValidEmail, isValidIco, isValidWebsite, normalizePhone, serializeBankAccount, validateBankAccount } from "@/lib/validators";

export async function aresLookupAction(ico: string): Promise<{ ok: true; company: AresCompany } | { ok: false; error: string }> {
  const value = ico.trim();
  if (!isValidIco(value)) return { ok: false, error: "Neplatné IČO." };
  try {
    const company = await aresLookup(value);
    if (!company) return { ok: false, error: "IČO nebylo nalezeno." };
    return { ok: true, company };
  } catch (error) {
    console.error("[register] ares", error);
    return { ok: false, error: "IČO nebylo nalezeno." };
  }
}

const addressSchema = z.object({
  addressee: z.string().trim().min(1, "Vyplňte prosím jméno a příjmení."),
  phone: z.string().trim().min(1, "Vyplňte prosím telefonní číslo."),
  email: z.string().trim().optional(),
  street: z.string().trim().min(1, "Vyplňte prosím ulici."),
  landRegistryNumber: z.string().trim().min(1, "Vyplňte prosím číslo popisné."),
  houseNumber: z.string().trim().optional(),
  city: z.string().trim().min(1, "Vyplňte prosím město."),
  zip: z.string().trim().regex(/^\d{3}\s?\d{2}$/, "PSČ zadejte ve tvaru 555 00."),
});

const schema = z.object({
  email: z.string().trim().refine(isValidEmail, "Neplatný formát e-mailové adresy."),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků."),
  isAgreementCC: z.literal(true, { message: "Je potřeba souhlasit s obchodními podmínkami." }),
  supplierType: z.enum(["PRODUCER", "IMPORTER"]),
  ico: z.string().trim().refine(isValidIco, "Neplatné IČO."),
  dic: z.string().trim().optional(),
  company: z.string().trim().min(1, "Vyplňte prosím obchodní název."),
  address: addressSchema,
  bank: z.object({ prefix: z.string(), number: z.string(), code: z.string() }).optional(),
  isShipping: z.boolean({ message: "Výběr způsobu dopravy je povinný." }),
  pickupAddress: addressSchema.omit({ email: true }).optional(),
  profile: z.object({
    name: z.string().trim().optional(),
    web: z.string().trim().optional(),
    companyDescription: z.string().trim().optional(),
    mainProfile: z.string().trim().optional(),
    wineRegion: z.string().trim().optional(),
  }),
  isAgreementFillOut: z.literal(true, { message: "Potvrďte prosím, že jste oprávněni údaje vyplnit." }),
});

export type RegisterInput = z.input<typeof schema>;
export type RegisterResult = { ok: true } | { ok: false; error: string; field?: string };

export async function registerAction(input: RegisterInput): Promise<RegisterResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue?.message ?? "Neplatná data", field: issue?.path.join(".") };
  }
  const v = parsed.data;
  const phone = normalizePhone(v.address.phone);
  if (!phone) return { ok: false, error: "Zadejte platné telefonní číslo.", field: "address.phone" };
  if (v.address.email && !isValidEmail(v.address.email)) return { ok: false, error: "Neplatný formát kontaktního e-mailu.", field: "address.email" };
  if (v.profile.web && !isValidWebsite(v.profile.web)) return { ok: false, error: "Neplatný formát webové stránky.", field: "profile.web" };
  let bankAccountNumber: string | null = null;
  if (v.bank) {
    const bankError = validateBankAccount(v.bank);
    if (bankError) return { ok: false, error: bankError, field: "bank.number" };
    bankAccountNumber = serializeBankAccount(v.bank) || null;
  }
  let pickupPhone: string | null = null;
  if (!v.isShipping) {
    if (!v.pickupAddress) return { ok: false, error: "Vyplňte prosím adresu pro svoz.", field: "pickupAddress.street" };
    pickupPhone = normalizePhone(v.pickupAddress.phone);
    if (!pickupPhone) return { ok: false, error: "Zadejte platné telefonní číslo pro svoz.", field: "pickupAddress.phone" };
  }

  try {
    await registerSupplier({
      email: v.email,
      password: v.password,
      isAgreementCC: true,
      nameBilling: v.company,
      nameWeb: v.profile.name || v.company,
      ico: v.ico,
      dic: v.dic || null,
      supplierType: v.supplierType,
      isShipping: v.isShipping,
      address: {
        ...v.address,
        phone,
        email: v.address.email || v.email,
        houseNumber: v.address.houseNumber || null,
        zip: v.address.zip.replace(/\s/g, ""),
        note: "",
        title: "Adresa společnosti",
        countryCode: "CZ",
      },
      pickupAddress:
        !v.isShipping && v.pickupAddress
          ? { ...v.pickupAddress, phone: pickupPhone, houseNumber: v.pickupAddress.houseNumber || null, zip: v.pickupAddress.zip.replace(/\s/g, ""), note: "", title: "Adresa skladu", countryCode: "CZ" }
          : null,
      web: v.profile.web || null,
      companyDescription: v.profile.companyDescription || null,
      mainProfile: v.supplierType === "PRODUCER" ? v.profile.mainProfile || null : null,
      wineRegion: v.supplierType === "PRODUCER" ? v.profile.wineRegion || null : null,
      bankAccountNumber,
    });
  } catch (error) {
    console.error("[register] create", error);
    const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
    if (/EMAIL.*EXIST|ALREADY_EXISTS|ObjectAlreadyExists/i.test(code)) return { ok: false, error: "Účet s tímto e-mailem nebo IČO už existuje. Přihlaste se, nebo kontaktujte podporu.", field: "email" };
    return { ok: false, error: `Nastala chyba při registraci.${error instanceof PlatformApiError ? ` (${error.message})` : ""}` };
  }

  const login = await loginAgainstVinisto(v.email, v.password);
  if (!login.ok) {
    // účet vznikl, jen automatické přihlášení neprošlo — uživatel se přihlásí ručně
    return { ok: false, error: "Registrace proběhla, ale automatické přihlášení se nepovedlo. Přihlaste se prosím ručně." };
  }
  await writeSessionCookie(login.session);
  return { ok: true };
}
