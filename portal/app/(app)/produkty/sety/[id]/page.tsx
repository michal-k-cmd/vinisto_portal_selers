// Detail / editace setu — data z get-set-bundle, produkty se skladem a cenami.

import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { DataError } from "@/components/data-error";
import { SetEditor } from "@/components/sets/set-editor";
import { requireSession } from "@/lib/auth/server";
import { localize, stripHtml } from "@/lib/platform/products";
import { getSupplierSet, toSlotProducts, type SupplierSet } from "@/lib/platform/sets";
import { isSetType, SET_TYPE_SLOTS, type SetSlotProduct, type SetState } from "@/lib/platform/sets-constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Set ${id}` };
}

function pad(list: SetSlotProduct[], length: number): Array<SetSlotProduct | null> {
  return Array.from({ length: Math.max(length, list.length) }, (_, i) => list[i] ?? null);
}

export default async function SetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireSession();

  let set: SupplierSet | null = null;
  let error: unknown;
  try {
    set = await getSupplierSet(id);
  } catch (e) {
    error = e;
  }
  if (error) {
    return (
      <div className="space-y-4">
        <DataError error={error} what="Detail setu" />
        <Link href="/produkty/sety" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>
    );
  }
  if (!set) notFound();

  const setType = isSetType(set.setType) ? set.setType : "OnePlusOneFree";
  const [paidCount, freeCount] = SET_TYPE_SLOTS[setType];
  const [paid, free] = await Promise.all([toSlotProducts(set.paidBundles ?? []), toSlotProducts(set.freeBundles ?? [])]);
  const state: SetState = set.states?.[0] ?? "Concept";

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold">{stripHtml(localize(set.name, "Set"))}</h2>
      <SetEditor
        initial={{
          id: set.id,
          setType,
          state,
          name: localize(set.name, ""),
          shortDescription: localize(set.shortDescription, ""),
          description: localize(set.description, ""),
          paid: pad(paid, paidCount),
          free: pad(free, freeCount),
        }}
      />
    </div>
  );
}
