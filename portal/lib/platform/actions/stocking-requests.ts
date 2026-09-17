"use server";

// Potvrzení termínu závozu/vyzvednutí — jediná mutace prodejce u naskladnění.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/auth/server";
import { PlatformApiError } from "@/lib/platform/errors";
import { pragueToUnix } from "@/lib/period";
import { confirmStockingRequest } from "@/lib/platform/stocking-requests";
import type { ActionResult } from "./products";

const schema = z.object({
  id: z.string().min(1),
  /** YYYY-MM-DD */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Vyplňte prosím datum."),
  time: z.enum(["D_8_10", "D_10_12", "D_12_14", "D_14_16"], { message: "Vyberte prosím čas." }),
  pickup: z.boolean(),
});

export async function confirmStockingRequestAction(input: z.input<typeof schema>): Promise<ActionResult & { field?: "date" }> {
  const session = await requireSession();
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Neplatná data" };
  const { id, date, time, pickup } = parsed.data;
  const [y, m, d] = date.split("-").map(Number);
  const deliveryDate = pragueToUnix(y, m, d);
  const pastMessage = pickup
    ? "Nejbližší možný termín vyzvednutí je následující pracovní den."
    : "Nejbližší možný termín závozu je následující pracovní den.";
  // platforma vyžaduje budoucí datum; ověříme dřív, ať nečekáme na chybu
  const todayStart = (() => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Prague" }).format(now).split("-").map(Number);
    return pragueToUnix(parts[0], parts[1], parts[2]);
  })();
  if (deliveryDate <= todayStart) return { ok: false, error: pastMessage, field: "date" };

  try {
    await confirmStockingRequest({ id, loginHash: session.loginHash, deliveryDate, deliveryTime: time });
    revalidatePath("/naskladneni");
    revalidatePath(`/naskladneni/${id}`);
    revalidatePath("/");
    return { ok: true, message: "Požadavek na naskladnění byl potvrzen." };
  } catch (error) {
    console.error("[stocking action]", error);
    const code = error instanceof PlatformApiError ? `${error.code ?? ""} ${error.message}` : "";
    if (code.includes("STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE")) return { ok: false, error: pastMessage, field: "date" };
    return {
      ok: false,
      error: "Při potvrzování požadavku na naskladnění nastala chyba. Zkuste to prosím znovu, nebo kontaktujte podporu.",
    };
  }
}
