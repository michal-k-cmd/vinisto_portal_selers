"use server";

// Server actions modulu Produkty. Hash i aktivní prodejce se berou ze
// session, klient posílá jen data formuláře. Po každé mutaci se
// revaliduje detail i seznam.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/auth/server";
import { PlatformApiError } from "@/lib/platform/errors";
import { DISCOUNT_PERCENT_MAX, DISCOUNT_PERCENT_MIN, VINISTO_PLUS_PERCENTS } from "@/lib/platform/products-constants";
import { B2B_PLATFORM, B2C_PLATFORM, DEFAULT_CURRENCY, vatPercentOf, withoutVat } from "@/lib/platform/prices";
import {
  createDiscountPrice,
  deleteBundlePrice,
  deleteDiscountPrice,
  getBundle,
  setBundlePrice,
  setClearanceSale,
} from "@/lib/platform/products";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

function fail(error: unknown, fallback: string): ActionResult {
  const message = error instanceof PlatformApiError ? error.message : fallback;
  console.error("[products action]", error);
  return { ok: false, error: message };
}

function revalidateProduct(bundleId: string) {
  revalidatePath(`/produkty/${bundleId}`);
  revalidatePath("/produkty");
  revalidatePath("/");
}

/** Nastavení prodejní ceny (zadává se S DPH, platformě jde bez DPH). */
const priceSchema = z.object({
  bundleId: z.string().min(1),
  platformId: z.union([z.literal(B2C_PLATFORM), z.literal(B2B_PLATFORM)]),
  priceWithVat: z.coerce.number().positive("Cena musí být kladné číslo"),
});

export async function setPriceAction(input: z.input<typeof priceSchema>): Promise<ActionResult> {
  const session = await requireSession();
  const parsed = priceSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Neplatná data" };
  const { bundleId, platformId, priceWithVat } = parsed.data;

  try {
    const bundle = await getBundle(bundleId);
    if (!bundle) return { ok: false, error: "Produkt nebyl nalezen" };
    // měna, sazba DPH a úroveň se berou z B2C Level1 ceny (stejně jako ve starém portálu)
    const b2c = (bundle.prices ?? []).find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2C_PLATFORM);
    const target = (bundle.prices ?? []).find((p) => p.level === "Level1" && (p.platformId ?? 0) === platformId);
    const vatPercent = b2c?.vatValue ?? vatPercentOf(b2c?.vat);
    await setBundlePrice({
      bundleId,
      loginHash: session.loginHash,
      priceWithoutVat: withoutVat(priceWithVat, vatPercent),
      currency: b2c?.currency ?? DEFAULT_CURRENCY,
      vat: b2c?.vat ?? null,
      priceLevel: target?.level ?? "Level1",
      platformId,
    });
    revalidateProduct(bundleId);
    return { ok: true, message: "Cena byla úspěšně upravena" };
  } catch (error) {
    return fail(error, "Při úpravě ceny nastala chyba");
  }
}

/** Vytvoření B2C slevy (částka nebo procento z ceny s DPH, 2–55 %). */
const discountSchema = z
  .object({
    bundleId: z.string().min(1),
    mode: z.enum(["percent", "amount"]),
    value: z.coerce.number().positive("Zadejte výši slevy"),
    validFrom: z.coerce.number().int().positive().optional(),
    validTo: z.coerce.number().int().positive().nullable().optional(),
  })
  .refine((d) => !d.validTo || !d.validFrom || d.validTo > d.validFrom, { message: "Konec slevy musí být po jejím začátku" });

export async function createDiscountAction(input: z.input<typeof discountSchema>): Promise<ActionResult> {
  const session = await requireSession();
  const parsed = discountSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Neplatná data" };
  const { bundleId, mode, value, validFrom, validTo } = parsed.data;

  try {
    const bundle = await getBundle(bundleId);
    if (!bundle) return { ok: false, error: "Produkt nebyl nalezen" };
    const b2c = (bundle.prices ?? []).find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2C_PLATFORM);
    if (!b2c?.valueWithVat) return { ok: false, error: "Produkt nemá nastavenou B2C cenu" };
    const priceWithVat = b2c.valueWithVat;
    const vatPercent = b2c.vatValue ?? vatPercentOf(b2c.vat);

    const percent = mode === "percent" ? value : (value / priceWithVat) * 100;
    if (percent < DISCOUNT_PERCENT_MIN || percent > DISCOUNT_PERCENT_MAX) {
      return { ok: false, error: `Sleva musí být mezi ${DISCOUNT_PERCENT_MIN} % a ${DISCOUNT_PERCENT_MAX} % z ceny` };
    }
    const discountedWithVat = mode === "percent" ? priceWithVat - (priceWithVat / 100) * value : priceWithVat - value;

    await createDiscountPrice({
      bundleId,
      loginHash: session.loginHash,
      valueWithoutVat: withoutVat(discountedWithVat, vatPercent),
      currency: b2c.currency ?? DEFAULT_CURRENCY,
      vat: b2c.vat,
      validFrom: validFrom ?? Math.floor(Date.now() / 1000) + 3600,
      validTo: validTo ?? null,
      priceLevel: "Level1",
      platformId: B2C_PLATFORM,
    });
    revalidateProduct(bundleId);
    return { ok: true, message: "Sleva byla úspěšně vytvořena" };
  } catch (error) {
    return fail(error, "Slevu se nepodařilo vytvořit");
  }
}

/** Smazání slevy; u vinisto PLUS+ slevy se smaže i základní PLUS+ cena. */
const deleteDiscountSchema = z.object({
  bundleId: z.string().min(1),
  discountId: z.string().min(1),
  priceLevel: z.string().min(1),
  platformId: z.coerce.number().int(),
  currency: z.string().min(1),
});

export async function deleteDiscountAction(input: z.input<typeof deleteDiscountSchema>): Promise<ActionResult> {
  const session = await requireSession();
  const parsed = deleteDiscountSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Neplatná data" };
  const d = parsed.data;
  try {
    await deleteDiscountPrice({
      bundleId: d.bundleId,
      loginHash: session.loginHash,
      currency: d.currency,
      discountId: d.discountId,
      priceLevel: d.priceLevel,
      platformId: d.platformId,
    });
    if (d.priceLevel === "VinistoPlus") {
      await deleteBundlePrice({ bundleId: d.bundleId, loginHash: session.loginHash, currency: d.currency, priceLevel: "VinistoPlus" });
    }
    revalidateProduct(d.bundleId);
    return { ok: true, message: "Sleva úspěšně odstraněna z produktu" };
  } catch (error) {
    return fail(error, "Nepovedlo se odstranit slevu z produktu");
  }
}

/** Zařazení do vinisto PLUS+: PLUS+ cena (pokud chybí) + dodavatelská sleva na úrovni VinistoPlus. */
const vinistoPlusSchema = z.object({
  bundleId: z.string().min(1),
  percent: z.coerce.number().refine((p) => (VINISTO_PLUS_PERCENTS as readonly number[]).includes(p), "Neplatná výše zvýhodnění"),
  duration: z.string().regex(/^(month|year):\d+$/),
  /** unix sekundy začátku; nevyplněno = ihned (+10 min) */
  validFrom: z.coerce.number().int().positive().optional(),
});

function addDuration(fromSec: number, unit: "month" | "year", count: number): number {
  const d = new Date(fromSec * 1000);
  if (unit === "month") d.setUTCMonth(d.getUTCMonth() + count);
  else d.setUTCFullYear(d.getUTCFullYear() + count);
  // konec dne
  d.setUTCHours(21, 59, 59, 0);
  return Math.floor(d.getTime() / 1000);
}

export async function createVinistoPlusAction(input: z.input<typeof vinistoPlusSchema>): Promise<ActionResult> {
  const session = await requireSession();
  const parsed = vinistoPlusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Neplatná data" };
  const { bundleId, percent, duration, validFrom } = parsed.data;
  const [unit, countStr] = duration.split(":") as ["month" | "year", string];

  try {
    const bundle = await getBundle(bundleId);
    if (!bundle) return { ok: false, error: "Produkt nebyl nalezen" };
    const b2c = (bundle.prices ?? []).find((p) => p.level === "Level1" && (p.platformId ?? 0) === B2C_PLATFORM);
    if (!b2c || typeof b2c.value !== "number") return { ok: false, error: "Produkt nemá nastavenou B2C cenu" };
    const currency = b2c.currency ?? DEFAULT_CURRENCY;

    const hasPlusPrice = (bundle.prices ?? []).some((p) => p.level === "VinistoPlus");
    if (!hasPlusPrice) {
      await setBundlePrice({
        bundleId,
        loginHash: session.loginHash,
        priceWithoutVat: b2c.value,
        currency,
        vat: b2c.vat ?? null,
        priceLevel: "VinistoPlus",
        platformId: B2C_PLATFORM,
      });
    }

    const from = validFrom ?? Math.floor(Date.now() / 1000) + 600;
    const to = addDuration(from, unit, Number(countStr));
    await createDiscountPrice({
      bundleId,
      loginHash: session.loginHash,
      valueWithoutVat: Number((b2c.value - (b2c.value / 100) * percent).toFixed(2)),
      currency,
      vat: b2c.vat,
      validFrom: from,
      validTo: to,
      priceLevel: "VinistoPlus",
      platformId: B2C_PLATFORM,
    });

    // úklid: dřívější PLUS+ sleva nastavená vinistem
    const vinistoPlusDiscount = (bundle.priceDiscounts ?? []).find((d) => d.level === "VinistoPlus" && d.type === "VinistoDiscount");
    if (vinistoPlusDiscount?.priceId) {
      await deleteDiscountPrice({
        bundleId,
        loginHash: session.loginHash,
        currency,
        discountId: vinistoPlusDiscount.priceId,
        priceLevel: "VinistoPlus",
        platformId: B2C_PLATFORM,
        discountType: "VinistoDiscount",
      });
    }
    revalidateProduct(bundleId);
    return { ok: true, message: "Produkt byl zařazen do vinisto PLUS+" };
  } catch (error) {
    return fail(error, "Při úpravě ceny nastala chyba");
  }
}

/** Doprodej — nevratná akce (platforma umí jen zapnout). */
export async function clearanceSaleAction(bundleId: string): Promise<ActionResult> {
  const session = await requireSession();
  if (!bundleId) return { ok: false, error: "Neplatná data" };
  try {
    await setClearanceSale({ bundleId, loginHash: session.loginHash, isClearanceSale: true });
    revalidateProduct(bundleId);
    return { ok: true, message: "Produkt je v doprodeji" };
  } catch (error) {
    return fail(error, "Stav produktu se nepodařilo změnit");
  }
}
