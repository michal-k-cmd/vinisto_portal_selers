// Profil prodejce a uživatele — nastavení a registrace.
// Data pro nastavení: GET user-api/users/auth/GetAuthUserSupplier (plný objekt
// prodejce); změny: PUT supplier-api/suppliers/{id}/UpdateSupplier (celý objekt),
// PUT .../address, PUT user-api/users/{userId}, PUT user-api/users/auth/ChangePassword.

import "server-only";
import { HASH_TYPE } from "@/lib/auth/constants";
import { platformRequest } from "./client";
import { localize, type LangValue } from "./products";

export type CountryCode = "CZ" | "SK" | "DE" | "UK" | "PL";
export const COUNTRY_LABEL: Record<string, string> = { CZ: "Česko", SK: "Slovensko", DE: "Německo", UK: "Velká Británie", PL: "Polsko" };
export const COUNTRY_OPTIONS: CountryCode[] = ["CZ", "SK", "DE", "UK", "PL"];
export type SupplierType = "PRODUCER" | "IMPORTER";
export const SUPPLIER_TYPE_LABEL: Record<SupplierType, string> = { PRODUCER: "Vinař (výrobce)", IMPORTER: "Distributor / importér" };

export type Address = {
  addressee?: string | null;
  street?: string | null;
  landRegistryNumber?: string | null;
  houseNumber?: string | null;
  zip?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
  title?: string | null;
  countryCode?: string | null;
};

export type SupplierProfile = {
  id: string;
  nameWeb?: string | null;
  nameBilling?: string | null;
  abbreviationInFlexibee?: string | null;
  ico?: string | null;
  dic?: string | null;
  address?: Address | null;
  countryCode?: string | null;
  supplierType?: SupplierType | string | null;
  isShipping?: boolean | null;
  web?: LangValue[] | null;
  companyDescription?: LangValue[] | null;
  mainProfile?: LangValue[] | null;
  wineRegion?: LangValue[] | null;
  pickupAddress?: Address | null;
  bankAccountNumber?: string | null;
  couponPrefix?: string | null;
  internalSupplierNote?: string | null;
  maxPossibleSupplierDiscountPercentage?: number | null;
  maxB2cB2bPriceDifferencePercentage?: number | null;
  maxB2cPromotionDiscountPercentage?: number | null;
  maxB2cPromotionsPerYear?: number | null;
};

type UserReturn = { user?: { id?: string | null; email?: string | null; suppliers?: SupplierProfile[] | null } | null };

/** Plný profil aktivního prodejce (session nese jen id/název). */
export async function getSupplierProfile(loginHash: string, supplierId: string): Promise<SupplierProfile | null> {
  const data = await platformRequest<UserReturn>("user-api/users/auth/GetAuthUserSupplier", {
    query: { UserLoginHash: loginHash, hashType: HASH_TYPE },
  });
  return (data.user?.suppliers ?? []).find((s) => s.id === supplierId) ?? null;
}

/** Editovatelná pole prodejce (UpdateSupplier posílá celý objekt — texty jako string). */
export type SupplierEditFields = {
  nameWeb: string;
  nameBilling: string;
  ico: string;
  dic: string | null;
  countryCode: string;
  supplierType: SupplierType;
  isShipping: boolean;
  web: string | null;
  companyDescription: string | null;
  mainProfile: string | null;
  wineRegion: string | null;
  pickupAddress: Address | null;
  bankAccountNumber: string | null;
};

export function editFieldsOf(p: SupplierProfile): SupplierEditFields {
  const text = (v: LangValue[] | null | undefined) => {
    const s = localize(v, "");
    return s === "–" ? "" : s;
  };
  return {
    nameWeb: p.nameWeb ?? "",
    nameBilling: p.nameBilling ?? "",
    ico: p.ico ?? "",
    dic: p.dic ?? null,
    countryCode: p.countryCode ?? "CZ",
    supplierType: p.supplierType === "PRODUCER" ? "PRODUCER" : "IMPORTER",
    isShipping: Boolean(p.isShipping),
    web: text(p.web),
    companyDescription: text(p.companyDescription),
    mainProfile: text(p.mainProfile),
    wineRegion: text(p.wineRegion),
    pickupAddress: p.pickupAddress ?? null,
    bankAccountNumber: p.bankAccountNumber ?? null,
  };
}

/** PUT supplier-api/suppliers/{id}/UpdateSupplier — sloučí současný profil se změnami a pošle celek. */
export async function updateSupplier(input: { profile: SupplierProfile; changes: Partial<SupplierEditFields>; loginHash: string }): Promise<void> {
  const p = input.profile;
  const merged = { ...editFieldsOf(p), ...input.changes };
  await platformRequest(`supplier-api/suppliers/${encodeURIComponent(p.id)}/UpdateSupplier`, {
    method: "PUT",
    body: {
      userLoginHash: input.loginHash,
      ...merged,
      language: "CZECH",
      // pole, která UI needituje — posíláme zpět, ať je platforma nevynuluje
      abbreviationInFlexibee: p.abbreviationInFlexibee ?? undefined,
      couponPrefix: p.couponPrefix ?? undefined,
      internalSupplierNote: p.internalSupplierNote ?? undefined,
      maxPossibleSupplierDiscountPercentage: p.maxPossibleSupplierDiscountPercentage ?? undefined,
      maxB2cB2bPriceDifferencePercentage: p.maxB2cB2bPriceDifferencePercentage ?? undefined,
      maxB2cPromotionDiscountPercentage: p.maxB2cPromotionDiscountPercentage ?? undefined,
      maxB2cPromotionsPerYear: p.maxB2cPromotionsPerYear ?? undefined,
    },
  });
}

/** PUT supplier-api/suppliers/{id}/address — kontaktní adresa (celá). */
export async function updateSupplierAddress(input: { supplierId: string; address: Address; loginHash: string }): Promise<void> {
  await platformRequest(`supplier-api/suppliers/${encodeURIComponent(input.supplierId)}/address`, {
    method: "PUT",
    body: { ...input.address, userLoginHash: input.loginHash },
  });
}

/** PUT user-api/users/{userId} {userLoginHash, email} */
export async function updateUserEmail(input: { userId: string; email: string; loginHash: string }): Promise<void> {
  await platformRequest(`user-api/users/${encodeURIComponent(input.userId)}`, {
    method: "PUT",
    body: { userLoginHash: input.loginHash, email: input.email },
  });
}

/** PUT user-api/users/auth/ChangePassword {userLoginHash, oldPassword, newPassword} */
export async function changeUserPassword(input: { loginHash: string; oldPassword: string; newPassword: string }): Promise<void> {
  await platformRequest("user-api/users/auth/ChangePassword", {
    method: "PUT",
    body: { userLoginHash: input.loginHash, oldPassword: input.oldPassword, newPassword: input.newPassword },
  });
}

export type AresCompany = {
  ico: string;
  name: string;
  dic: string | null;
  street: string;
  landRegistryNumber: string;
  houseNumber: string;
  city: string;
  zip: string;
};

/** GET services-api/ares/{ico} — odpověď je JSON zabalený ve stringu. */
export async function aresLookup(ico: string): Promise<AresCompany | null> {
  const raw = await platformRequest<object>(`services-api/ares/${encodeURIComponent(ico)}`);
  const data = (typeof raw === "string" ? JSON.parse(raw) : raw) as {
    ico?: string;
    obchodniJmeno?: string;
    dic?: string;
    sidlo?: { nazevUlice?: string; cisloDomovni?: number; cisloOrientacni?: number; nazevObce?: string; nazevCastiObce?: string; psc?: number };
  };
  if (!data?.ico) return null;
  const s = data.sidlo ?? {};
  return {
    ico: data.ico,
    name: data.obchodniJmeno ?? "",
    dic: data.dic ?? null,
    street: s.nazevUlice ?? s.nazevCastiObce ?? "",
    landRegistryNumber: s.cisloDomovni != null ? String(s.cisloDomovni) : "",
    houseNumber: s.cisloOrientacni != null ? String(s.cisloOrientacni) : "",
    city: s.nazevObce ?? "",
    zip: s.psc != null ? String(s.psc) : "",
  };
}

export type RegistrationPayload = {
  email: string;
  password: string;
  isAgreementCC: boolean;
  nameBilling: string;
  nameWeb: string;
  ico: string;
  dic: string | null;
  supplierType: SupplierType;
  isShipping: boolean;
  address: Address;
  pickupAddress: Address | null;
  web: string | null;
  companyDescription: string | null;
  mainProfile: string | null;
  wineRegion: string | null;
  bankAccountNumber: string | null;
};

/** POST supplier-api/suppliers/CreateSupplierAndUser — veřejné, bez hashe. */
export async function registerSupplier(payload: RegistrationPayload): Promise<void> {
  await platformRequest("supplier-api/suppliers/CreateSupplierAndUser", {
    method: "POST",
    body: {
      ...payload,
      isNewsletterActive: false,
      registrationCountry: "CZ",
      countryCode: "CZ",
      language: "CZECH",
    },
  });
}
