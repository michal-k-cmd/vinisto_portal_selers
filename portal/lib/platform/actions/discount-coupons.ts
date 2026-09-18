"use server";

// Server actions pro slevové kupóny: vytvoření, úprava, aktivace, smazání.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { fetchSupplierCouponPrefix } from "@/lib/auth/vinisto-auth";
import { PlatformApiError } from "@/lib/platform/errors";
import { pragueInputToUnix } from "@/lib/period";
import { activateCoupon, createSupplierCoupon, deleteCoupon, updateCoupon, type CouponPayload } from "@/lib/platform/discount-coupons";
import type { ActionResult } from "./products";

const PATH = "/marketing/kupony";
const MIN_DAYS = 14;

const schema = z
  .object({
    id: z.string().optional(),
    isReusable: z.enum(["true", "false"]),
    code: z
      .string()
      .trim()
      .min(1, "Vyplňte prosím kód kupónu.")
      .refine((v) => !/\s/.test(v), "Slevový kód nesmí obsahovat mezery."),
    discountCouponType: z.enum(["AMOUNT", "PERCENTAGE"]),
    validFrom: z.string().min(1, "Vyplňte prosím platnost od."),
    validTo: z.string().min(1, "Vyplňte prosím platnost do."),
    percentageDiscount: z.string().optional(),
    amountDiscount: z.string().optional(),
    hasMinOrderValue: z.boolean().optional(),
    minOrderValue: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.discountCouponType === "PERCENTAGE") {
      const p = Number(v.percentageDiscount);
      if (!v.percentageDiscount || Number.isNaN(p)) ctx.addIssue({ code: "custom", path: ["percentageDiscount"], message: "Vyplňte prosím výši slevy v procentech." });
      else if (p < 5 || p > 50) ctx.addIssue({ code: "custom", path: ["percentageDiscount"], message: "Sleva musí být v rozmezí 5–50 %." });
    } else {
      const a = Number(v.amountDiscount);
      if (!v.amountDiscount || Number.isNaN(a)) ctx.addIssue({ code: "custom", path: ["amountDiscount"], message: "Vyplňte prosím výši slevy v Kč." });
      else if (a <= 0) ctx.addIssue({ code: "custom", path: ["amountDiscount"], message: "Výše slevy musí být kladná." });
      if (v.hasMinOrderValue) {
        const m = Number(v.minOrderValue);
        if (!v.minOrderValue || Number.isNaN(m) || m <= 0) ctx.addIssue({ code: "custom", path: ["minOrderValue"], message: "Vyplňte prosím minimální hodnotu košíku." });
        else if (!Number.isNaN(a) && a > m) ctx.addIssue({ code: "custom", path: ["minOrderValue"], message: "Minimální hodnota košíku musí být vyšší než sleva." });
      }
    }
  });

export type CouponFormInput = z.input<typeof schema>;
export type CouponActionResult = ActionResult & { field?: string };

function fieldError(field: string, error: string): { ok: false; error: string; field: string } {
  return { ok: false, error, field };
}

type Built = { ok: false; error: string; field?: string } | { ok: true; payload: CouponPayload; id?: string };

async function buildPayload(input: CouponFormInput, prefix: string): Promise<Built> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return fieldError(String(issue?.path[0] ?? ""), issue?.message ?? "Neplatná data");
  }
  const v = parsed.data;
  const validFrom = pragueInputToUnix(v.validFrom);
  const validTo = pragueInputToUnix(v.validTo);
  if (validFrom == null) return fieldError("validFrom", "Neplatné datum platnosti od.");
  if (validTo == null) return fieldError("validTo", "Neplatné datum platnosti do.");
  const now = Math.floor(Date.now() / 1000);
  if (validTo <= now) return fieldError("validTo", "Platnost kupónu do musí být v budoucnosti.");
  if (validTo < validFrom + MIN_DAYS * 86_400) return fieldError("validTo", "Minimální platnost kupónu je 14 dní od začátku platnosti.");

  const code = v.code.startsWith(prefix) ? v.code.slice(prefix.length) : v.code;
  const payload: CouponPayload = {
    code,
    isReusable: v.isReusable === "true",
    discountCouponType: v.discountCouponType,
    validFrom,
    validTo,
  };
  if (v.discountCouponType === "PERCENTAGE") payload.percentageDiscount = Math.round(Number(v.percentageDiscount));
  else {
    payload.amountDiscount = Math.round(Number(v.amountDiscount));
    if (v.hasMinOrderValue) payload.allowedFrom = Math.round(Number(v.minOrderValue));
  }
  return { ok: true, payload, id: v.id };
}

function platformError(error: unknown, fallback: string): CouponActionResult {
  console.error("[coupons action]", error);
  const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
  if (code.includes("DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS")) return fieldError("code", "Slevový kupón se stejným kódem již existuje.");
  if (code.includes("INSUFFICIENT_TIME_SPAN")) return fieldError("validTo", "Minimální platnost kupónu je 14 dní od začátku platnosti.");
  if (code.includes("PERCENTAGE_VALUE_INVALD")) return fieldError("percentageDiscount", "Sleva musí být v rozmezí 5–50 %.");
  if (code.includes("AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM")) return fieldError("minOrderValue", "Minimální hodnota košíku musí být vyšší než sleva.");
  if (code.includes("AMOUNT_VALUE_INVALD")) return fieldError("amountDiscount", "Neplatná výše slevy.");
  if (code.includes("NO_LONGER_ACTIVE")) return { ok: false, error: "Kupón už není aktivní." };
  return { ok: false, error: error instanceof PlatformApiError ? `${fallback} (${error.message})` : fallback };
}

export async function saveCouponAction(input: CouponFormInput): Promise<CouponActionResult> {
  const session = await requireSession();
  const supplier = activeSupplier(session);
  let prefix = "";
  try {
    prefix = await fetchSupplierCouponPrefix(session.loginHash, supplier.id);
  } catch {
    // bez prefixu se kód pošle tak, jak je
  }
  const built = await buildPayload(input, prefix);
  if (!built.ok) return built;
  try {
    if (built.id) {
      await updateCoupon({ id: built.id, loginHash: session.loginHash, payload: built.payload });
      revalidatePath(PATH);
      return { ok: true, message: "Slevový kupón byl úspěšně upraven." };
    }
    await createSupplierCoupon({ supplierId: supplier.id, loginHash: session.loginHash, payload: built.payload });
    revalidatePath(PATH);
    return { ok: true, message: "Slevový kupón byl úspěšně vytvořen." };
  } catch (error) {
    return platformError(error, built.id ? "Slevový kupón se nepodařilo upravit." : "Slevový kupón se nepodařilo vytvořit.");
  }
}

export async function activateCouponAction(id: string): Promise<ActionResult> {
  const session = await requireSession();
  try {
    await activateCoupon(id, session.loginHash);
    revalidatePath(PATH);
    return { ok: true, message: "Slevový kupón byl úspěšně aktivován." };
  } catch (error) {
    return platformError(error, "Slevový kupón se nepovedlo aktivovat.");
  }
}

export async function deleteCouponAction(id: string): Promise<ActionResult> {
  const session = await requireSession();
  try {
    await deleteCoupon(id, session.loginHash);
    revalidatePath(PATH);
    return { ok: true, message: "Slevový kupón byl úspěšně odstraněn." };
  } catch (error) {
    return platformError(error, "Slevový kupón se nepovedlo odstranit.");
  }
}
