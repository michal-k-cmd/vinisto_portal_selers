"use client";

// Potvrzované akce detailu produktu: odebrání slevy a přepnutí do doprodeje.

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { clearanceSaleAction, deleteDiscountAction, type ActionResult } from "@/lib/platform/actions/products";

function useConfirmedAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const run = (question: string, action: () => Promise<ActionResult>) => {
    if (!window.confirm(question)) return;
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };
  return { pending, run };
}

export function DeleteDiscountButton(props: { bundleId: string; discountId: string; priceLevel: string; platformId: number; currency: string }) {
  const { pending, run } = useConfirmedAction();
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() => run("Opravdu chcete odstranit slevu z produktu?", () => deleteDiscountAction(props))}
    >
      Odebrat
    </Button>
  );
}

export function ClearanceSaleButton({ bundleId }: { bundleId: string }) {
  const { pending, run } = useConfirmedAction();
  return (
    <Button
      type="button"
      size="sm"
      disabled={pending}
      className="bg-[#dca056] text-white hover:opacity-90"
      onClick={() =>
        run(
          "Přepnout produkt do doprodeje? vinisto doprodá aktuální zásoby a už nebude zasílat požadavky na naskladnění. Akci nelze v portálu vrátit.",
          () => clearanceSaleAction(bundleId),
        )
      }
    >
      Doprodej
    </Button>
  );
}
