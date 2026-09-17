"use server";

// Server actions setů: uložení konceptu (+ odeslání ke schválení), smazání
// konceptu a vyhledání produktů do setu.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { PlatformApiError } from "@/lib/platform/errors";
import { createSupplierSet, deleteSetConcept, editSupplierSet, searchSetCandidates, sendSetForApproval } from "@/lib/platform/sets";
import { SET_TYPES, SET_TYPE_SLOTS, type SetSlotProduct } from "@/lib/platform/sets-constants";
import type { ActionResult } from "./products";

const schema = z.object({
  id: z.string().optional(),
  setType: z.enum(SET_TYPES as [string, ...string[]]),
  name: z.string().trim().min(1, "Vyplňte prosím název setu."),
  shortDescription: z.string().trim().min(1, "Vyplňte prosím krátký popis."),
  description: z.string().trim().min(1, "Vyplňte prosím detailní popis."),
  paidBundles: z.array(z.string().nullable()),
  freeBundles: z.array(z.string().nullable()),
  send: z.boolean(),
});

export type SaveSetInput = z.input<typeof schema>;
export type SaveSetResult = (ActionResult & { field?: string; id?: string }) | { ok: true; message?: string; id: string; field?: undefined };

export async function saveSetAction(input: SaveSetInput): Promise<SaveSetResult> {
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue?.message ?? "Neplatná data", field: String(issue?.path[0] ?? "") };
  }
  const v = parsed.data;
  const setType = v.setType as (typeof SET_TYPES)[number];
  const [paidCount, freeCount] = SET_TYPE_SLOTS[setType];
  const paid = v.paidBundles.filter((x): x is string => Boolean(x));
  const free = v.freeBundles.filter((x): x is string => Boolean(x));
  if (paid.length !== paidCount || free.length !== freeCount) {
    return { ok: false, error: "Některé produkty ve vašem setu chybí.", field: "bundles" };
  }

  const payload = { name: v.name, shortDescription: v.shortDescription, description: v.description, setType, paidBundles: paid, freeBundles: free };
  let id = v.id ?? "";
  try {
    id = v.id
      ? await editSupplierSet({ id: v.id, payload, loginHash: session.loginHash, supplierId: supplier.id })
      : await createSupplierSet({ payload, loginHash: session.loginHash, supplierId: supplier.id });
  } catch (error) {
    console.error("[sets action] save", error);
    const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
    if (code.includes("ObjectAlreadyExists")) return { ok: false, error: "Produkt s tímto názvem již existuje.", field: "name" };
    return { ok: false, error: v.id ? "Při úpravě setu nastala chyba." : "Při vytváření setu nastala chyba." };
  }

  let message = v.id ? "Set byl úspěšně upraven." : "Set byl úspěšně vytvořen.";
  if (v.send && id) {
    try {
      await sendSetForApproval(id, session.loginHash);
      message = "Set byl odeslán na schválení.";
    } catch (error) {
      console.error("[sets action] send", error);
      revalidatePath("/produkty/sety");
      return { ok: false, error: "Set byl uložen, ale při odesílání na schválení nastala chyba.", id };
    }
  }
  revalidatePath("/produkty/sety");
  if (id) revalidatePath(`/produkty/sety/${id}`);
  return { ok: true, message, id };
}

export async function deleteSetAction(id: string): Promise<ActionResult> {
  const session = await requireSession();
  try {
    await deleteSetConcept(id, session.loginHash);
    revalidatePath("/produkty/sety");
    return { ok: true, message: "Set byl úspěšně odstraněn." };
  } catch (error) {
    console.error("[sets action] delete", error);
    return { ok: false, error: "Při odstraňování setu nastala chyba." };
  }
}

export async function searchSetProductsAction(search: string): Promise<{ ok: true; items: SetSlotProduct[] } | { ok: false; error: string }> {
  const session = await requireSession();
  const supplier = activeSupplier(session);
  try {
    const items = await searchSetCandidates({ supplierId: supplier.id, search: search.trim() || undefined, limit: 20 });
    return { ok: true, items };
  } catch (error) {
    console.error("[sets action] search", error);
    return { ok: false, error: "Produkty se nepodařilo načíst." };
  }
}
