"use server";

// Server actions nastavení prodejce a účtu. Každá sekce ukládá celý svůj
// blok; UpdateSupplier vždy posílá celý objekt sloučený se současným profilem.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { readSession, writeSessionCookie } from "@/lib/auth/session";
import { fetchAuthUserSupplier } from "@/lib/auth/vinisto-auth";
import { PlatformApiError } from "@/lib/platform/errors";
import {
  changeUserPassword,
  COUNTRY_OPTIONS,
  getSupplierProfile,
  updateSupplier,
  updateSupplierAddress,
  updateUserEmail,
  type Address,
} from "@/lib/platform/supplier";
import { isValidEmail, isValidIco, isValidWebsite, normalizePhone, serializeBankAccount, validateBankAccount } from "@/lib/validators";

export type SettingsResult = { ok: true; message: string } | { ok: false; error: string; field?: string };
type Values = Record<string, string>;

function fail(error: unknown, fallback: string): SettingsResult {
  console.error("[settings action]", error);
  const detail = error instanceof PlatformApiError ? ` (${error.message})` : "";
  return { ok: false, error: `${fallback}${detail}` };
}

/** Po změně údajů obnoví session (název prodejce, e-mail) — best effort. */
async function refreshSession(patch?: { email?: string }) {
  try {
    const session = await readSession();
    if (!session) return;
    const profile = await fetchAuthUserSupplier(session.loginHash);
    await writeSessionCookie({
      ...session,
      email: patch?.email ?? profile?.email ?? session.email,
      suppliers: profile?.suppliers ?? session.suppliers,
      suppliersTruncated: undefined,
      validatedAt: Date.now(),
    });
  } catch (error) {
    console.error("[settings action] refresh session", error);
  }
}

async function loadProfile() {
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const profile = await getSupplierProfile(session.loginHash, supplier.id);
  if (!profile) throw new PlatformApiError("Profil prodejce se nepodařilo načíst.");
  return { session, supplier, profile };
}

const addressSchema = z.object({
  title: z.string().trim().optional(),
  addressee: z.string().trim().min(1, "Vyplňte prosím adresáta."),
  phone: z.string().trim().min(1, "Vyplňte prosím telefonní číslo."),
  email: z.string().trim().optional(),
  street: z.string().trim().min(1, "Vyplňte prosím ulici."),
  landRegistryNumber: z.string().trim().min(1, "Vyplňte prosím číslo popisné."),
  houseNumber: z.string().trim().optional(),
  city: z.string().trim().min(1, "Vyplňte prosím město."),
  zip: z.string().trim().regex(/^\d{3}\s?\d{2}$/, "PSČ zadejte ve tvaru 555 00."),
  countryCode: z.enum(COUNTRY_OPTIONS as [string, ...string[]]),
  note: z.string().trim().optional(),
});

function parseAddress(values: Values): { ok: true; address: Address } | { ok: false; error: string; field: string } {
  const parsed = addressSchema.safeParse(values);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue?.message ?? "Neplatná adresa", field: String(issue?.path[0] ?? "") };
  }
  const v = parsed.data;
  const phone = normalizePhone(v.phone);
  if (!phone) return { ok: false, error: "Zadejte platné telefonní číslo.", field: "phone" };
  if (v.email && !isValidEmail(v.email)) return { ok: false, error: "Neplatný formát e-mailové adresy.", field: "email" };
  return {
    ok: true,
    address: {
      title: v.title || null,
      addressee: v.addressee,
      phone,
      email: v.email || null,
      street: v.street,
      landRegistryNumber: v.landRegistryNumber,
      houseNumber: v.houseNumber || null,
      city: v.city,
      zip: v.zip.replace(/\s/g, ""),
      countryCode: v.countryCode,
      note: v.note || null,
    },
  };
}

export async function saveProfileAction(values: Values): Promise<SettingsResult> {
  const nameWeb = (values.nameWeb ?? "").trim();
  if (!nameWeb) return { ok: false, error: "Vyplňte prosím název pro zobrazení na webu.", field: "nameWeb" };
  const web = (values.web ?? "").trim();
  if (!isValidWebsite(web)) return { ok: false, error: "Neplatný formát webové stránky (např. https://vinarstvi.cz).", field: "web" };
  try {
    const { session, profile } = await loadProfile();
    await updateSupplier({
      profile,
      loginHash: session.loginHash,
      changes: {
        nameWeb,
        web: web || null,
        companyDescription: (values.companyDescription ?? "").trim() || null,
        mainProfile: (values.mainProfile ?? "").trim() || null,
        wineRegion: (values.wineRegion ?? "").trim() || null,
      },
    });
    await refreshSession();
    revalidatePath("/nastaveni");
    return { ok: true, message: "Vaše údaje byly úspěšně změněny." };
  } catch (error) {
    return fail(error, "Nepodařilo se změnit vaše údaje, zkuste to prosím znovu.");
  }
}

export async function saveInvoiceAction(values: Values): Promise<SettingsResult> {
  const nameBilling = (values.nameBilling ?? "").trim();
  const ico = (values.ico ?? "").trim();
  const dic = (values.dic ?? "").trim();
  if (!nameBilling) return { ok: false, error: "Vyplňte prosím název společnosti.", field: "nameBilling" };
  if (!isValidIco(ico)) return { ok: false, error: "Neplatné IČO.", field: "ico" };
  if (dic && !/^[A-Z]{2}\d{8,10}$/.test(dic)) return { ok: false, error: "DIČ zadejte ve tvaru CZ12345678.", field: "dic" };
  try {
    const { session, profile } = await loadProfile();
    await updateSupplier({ profile, loginHash: session.loginHash, changes: { nameBilling, ico, dic: dic || null } });
    await refreshSession();
    revalidatePath("/nastaveni/fakturace");
    return { ok: true, message: "Vaše fakturační údaje byly úspěšně změněny." };
  } catch (error) {
    return fail(error, "Nepodařilo se změnit vaše fakturační údaje, zkuste to prosím znovu.");
  }
}

export async function saveBankAction(values: Values): Promise<SettingsResult> {
  const parts = { prefix: values.prefix ?? "", number: values.number ?? "", code: values.code ?? "" };
  const error = validateBankAccount(parts);
  if (error) return { ok: false, error, field: "number" };
  try {
    const { session, profile } = await loadProfile();
    await updateSupplier({ profile, loginHash: session.loginHash, changes: { bankAccountNumber: serializeBankAccount(parts) || null } });
    revalidatePath("/nastaveni/banka");
    return { ok: true, message: "Vaše bankovní údaje byly úspěšně změněny." };
  } catch (error) {
    return fail(error, "Nepodařilo se změnit vaše bankovní údaje, zkuste to prosím znovu.");
  }
}

export async function saveContactAction(values: Values): Promise<SettingsResult> {
  const parsed = parseAddress(values);
  if (!parsed.ok) return parsed;
  try {
    const session = await requireSession();
    const supplier = activeSupplier(session);
    await updateSupplierAddress({ supplierId: supplier.id, address: parsed.address, loginHash: session.loginHash });
    revalidatePath("/nastaveni/kontakt");
    return { ok: true, message: "Vaše kontaktní údaje byly úspěšně změněny." };
  } catch (error) {
    return fail(error, "Nepodařilo se změnit vaše kontaktní údaje, zkuste to prosím znovu.");
  }
}

export async function saveDeliveryAction(values: Values): Promise<SettingsResult> {
  const isShipping = values.isShipping === "true";
  let pickupAddress: Address | null | undefined;
  if (!isShipping) {
    const parsed = parseAddress(values);
    if (!parsed.ok) return parsed;
    pickupAddress = parsed.address;
  }
  try {
    const { session, profile } = await loadProfile();
    await updateSupplier({
      profile,
      loginHash: session.loginHash,
      changes: { isShipping, ...(pickupAddress ? { pickupAddress } : {}) },
    });
    await refreshSession();
    revalidatePath("/nastaveni/dodani");
    return { ok: true, message: "Vaše dodací údaje byly úspěšně změněny." };
  } catch (error) {
    return fail(error, "Nepodařilo se změnit vaše dodací údaje, zkuste to prosím znovu.");
  }
}

export async function changeEmailAction(values: Values): Promise<SettingsResult> {
  const email = (values.email ?? "").trim();
  if (!email) return { ok: false, error: "E-mail je povinný.", field: "email" };
  if (!isValidEmail(email)) return { ok: false, error: "Neplatný formát e-mailové adresy.", field: "email" };
  try {
    const session = await requireSession();
    await updateUserEmail({ userId: session.userId, email, loginHash: session.loginHash });
    await refreshSession({ email });
    revalidatePath("/nastaveni/prihlaseni");
    return { ok: true, message: "Váš e-mail byl úspěšně aktualizován." };
  } catch (error) {
    const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
    if (code.includes("USER_UPDATE_USER_EMAIL_EXIST")) return { ok: false, error: "Tento e-mail již používá jiný uživatel.", field: "email" };
    return fail(error, "Nepodařilo se aktualizovat váš e-mail, zkuste to prosím znovu.");
  }
}

export async function changePasswordAction(values: Values): Promise<SettingsResult> {
  const current = values.currentPassword ?? "";
  const next = values.newPassword ?? "";
  const confirm = values.confirmPassword ?? "";
  if (!current) return { ok: false, error: "Zadejte prosím současné heslo.", field: "currentPassword" };
  if (next.length < 6) return { ok: false, error: "Nové heslo musí mít alespoň 6 znaků.", field: "newPassword" };
  if (next === current) return { ok: false, error: "Nové heslo musí být jiné než současné.", field: "newPassword" };
  if (next !== confirm) return { ok: false, error: "Hesla se neshodují.", field: "confirmPassword" };
  try {
    const session = await requireSession();
    await changeUserPassword({ loginHash: session.loginHash, oldPassword: current, newPassword: next });
    return { ok: true, message: "Vaše heslo bylo úspěšně změněno." };
  } catch (error) {
    const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
    if (code.includes("USER_WRONG_OLD_PASS")) return { ok: false, error: "Nesprávně zadané současné heslo.", field: "currentPassword" };
    return fail(error, "Nepodařilo se změnit vaše heslo, zkuste to prosím znovu.");
  }
}
