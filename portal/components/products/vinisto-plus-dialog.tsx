"use client";

// Modal „Zařadit do vinisto PLUS+“ — výše zvýhodnění, platnost, začátek.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createVinistoPlusAction } from "@/lib/platform/actions/products";
import { VINISTO_PLUS_DURATIONS, VINISTO_PLUS_PERCENTS } from "@/lib/platform/products-constants";

export function VinistoPlusButton({ bundleId, bundleName, size = "sm" }: { bundleId: string; bundleName: string; size?: "sm" | "default" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" size={size} onClick={() => setOpen(true)} className="border-vinisto-green text-vinisto-green hover:bg-vinisto-green hover:text-white">
        Zařadit do vinisto PLUS+
      </Button>
      <VinistoPlusDialog open={open} onClose={() => setOpen(false)} bundleId={bundleId} bundleName={bundleName} />
    </>
  );
}

export function VinistoPlusDialog({
  open,
  onClose,
  bundleId,
  bundleName,
}: {
  open: boolean;
  onClose: () => void;
  bundleId: string;
  bundleName: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [start, setStart] = useState<"immediately" | "fromDate">("immediately");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fromDate = String(form.get("validFrom") ?? "");
    const validFrom = start === "fromDate" && fromDate ? Math.floor(new Date(`${fromDate}T00:00:00+02:00`).getTime() / 1000) : undefined;
    startTransition(async () => {
      const result = await createVinistoPlusAction({
        bundleId,
        percent: Number(form.get("percent")),
        duration: String(form.get("duration")),
        validFrom,
      });
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        onClose();
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Dialog open={open} onClose={onClose} title="vinisto PLUS+">
      <form onSubmit={onSubmit} className="space-y-4">
        <p className="text-sm text-muted-foreground">{bundleName}</p>
        <div className="space-y-1.5">
          <Label htmlFor="vp-percent">Výše zvýhodnění</Label>
          <select id="vp-percent" name="percent" defaultValue="10" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
            {VINISTO_PLUS_PERCENTS.map((p) => (
              <option key={p} value={p}>
                {p} %
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vp-duration">Platnost</Label>
          <select id="vp-duration" name="duration" defaultValue="month:1" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
            {VINISTO_PLUS_DURATIONS.map((d) => (
              <option key={`${d.unit}:${d.count}`} value={`${d.unit}:${d.count}`}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="start" checked={start === "immediately"} onChange={() => setStart("immediately")} />
            Spustit okamžitě
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="start" checked={start === "fromDate"} onChange={() => setStart("fromDate")} />
            Spustit od
          </label>
          <Input type="date" name="validFrom" min={today} disabled={start !== "fromDate"} required={start === "fromDate"} />
        </fieldset>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Ukládám…" : "Zařadit do vinisto PLUS+"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
