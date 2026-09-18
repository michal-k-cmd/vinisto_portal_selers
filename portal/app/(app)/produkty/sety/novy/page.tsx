// Nový set — varianta z ?typ=, neplatná/chybějící → 1 + 1 zdarma.

import { redirect } from "next/navigation";
import { SetEditor } from "@/components/sets/set-editor";
import { requireSession } from "@/lib/auth/server";
import { isSetType, SET_TYPE_LABEL, SET_TYPE_SLOTS } from "@/lib/platform/sets-constants";

export const metadata = { title: "Nový set" };
export const dynamic = "force-dynamic";

export default async function NovySetPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  await requireSession();
  if (!isSetType(sp.typ)) redirect("/produkty/sety/novy?typ=OnePlusOneFree");
  const setType = sp.typ;
  const [paid, free] = SET_TYPE_SLOTS[setType];
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold">Nový set {SET_TYPE_LABEL[setType]}</h2>
      <SetEditor
        initial={{
          setType,
          state: "Concept",
          name: "",
          shortDescription: "",
          description: "",
          paid: Array.from({ length: paid }, () => null),
          free: Array.from({ length: free }, () => null),
        }}
      />
    </div>
  );
}
