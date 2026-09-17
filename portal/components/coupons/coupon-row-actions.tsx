"use client";

// Akce v řádku kupónu: Upravit / Smazat / Aktivovat — jen u neaktivních kupónů.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { activateCouponAction, deleteCouponAction } from "@/lib/platform/actions/discount-coupons";
import { CouponDialog, type CouponFormValues } from "./coupon-dialog";

export function CouponRowActions({ initial, prefix, eurRate }: { initial: CouponFormValues; prefix: string; eurRate: number | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState<"delete" | "activate" | null>(null);
  const id = initial.id!;

  function run(kind: "delete" | "activate") {
    startTransition(async () => {
      const result = kind === "delete" ? await deleteCouponAction(id) : await activateCouponAction(id);
      setConfirm(null);
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <div className="flex justify-end gap-1">
      <Button type="button" variant="outline" size="sm" onClick={() => setEdit(true)}>
        Upravit
      </Button>
      <Button type="button" variant="outline" size="sm" className="text-vinisto-wine" onClick={() => setConfirm("delete")}>
        Smazat
      </Button>
      <Button type="button" size="sm" onClick={() => setConfirm("activate")}>
        Aktivovat
      </Button>
      {edit && <CouponDialog open={edit} onClose={() => setEdit(false)} initial={initial} prefix={prefix} eurRate={eurRate} />}
      <Dialog open={confirm !== null} onClose={() => setConfirm(null)} title={confirm === "delete" ? "Smazat kupón" : "Aktivovat kupón"}>
        <div className="space-y-4 text-sm">
          <p>{confirm === "delete" ? "Opravdu si přejete smazat kupón?" : "Opravdu si přejete aktivovat kupón? Aktivní kupón už nepůjde upravit ani smazat."}</p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setConfirm(null)}>
              Ne
            </Button>
            <Button type="button" variant={confirm === "delete" ? "destructive" : "default"} disabled={pending} onClick={() => confirm && run(confirm)}>
              {pending ? "Pracuji…" : "Ano"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
