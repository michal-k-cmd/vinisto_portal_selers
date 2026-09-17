"use client";

// Modal „Zvolte termín závozu / vyzvednutí“ — datum (od zítřka) a časové okno.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { confirmStockingRequestAction } from "@/lib/platform/actions/stocking-requests";

const TIMES: Array<{ value: "D_8_10" | "D_10_12" | "D_12_14" | "D_14_16"; label: string }> = [
  { value: "D_8_10", label: "8:00 - 10:00" },
  { value: "D_10_12", label: "10:00 - 12:00" },
  { value: "D_12_14", label: "12:00 - 14:00" },
  { value: "D_14_16", label: "14:00 - 16:00" },
];

function tomorrow(): string {
  const d = new Date(Date.now() + 86_400_000);
  return d.toISOString().slice(0, 10);
}

export function ConfirmStockingButton({ id, pickup, size = "sm" }: { id: string; pickup: boolean; size?: "sm" | "default" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" size={size} onClick={() => setOpen(true)}>
        Potvrdit požadavek
      </Button>
      <ConfirmStockingDialog open={open} onClose={() => setOpen(false)} id={id} pickup={pickup} />
    </>
  );
}

export function ConfirmStockingDialog({ open, onClose, id, pickup }: { open: boolean; onClose: () => void; id: string; pickup: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);
  const what = pickup ? "vyzvednutí" : "závozu";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDateError(null);
    if (!date) {
      setDateError(pickup ? "Vyplňte prosím datum vyzvednutí." : "Vyplňte prosím datum závozu.");
      return;
    }
    if (!time) {
      toast.error(pickup ? "Vyberte prosím čas vyzvednutí." : "Vyberte prosím čas závozu.");
      return;
    }
    startTransition(async () => {
      const result = await confirmStockingRequestAction({ id, date, time: time as "D_8_10", pickup });
      if (result.ok) {
        toast.success(result.message ?? "Hotovo");
        onClose();
        router.refresh();
      } else if (result.field === "date") {
        setDateError(result.error);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onClose={onClose} title={pickup ? "Zvolte termín vyzvednutí" : "Zvolte termín závozu"}>
      <form onSubmit={submit} className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          {pickup ? "Zadejte prosím termín, kdy si u Vás můžeme zboží vyzvednout." : "Zadejte prosím termín, kdy od Vás můžeme očekávat závoz zboží."}
        </p>
        <div className="space-y-1.5">
          <Label htmlFor="sr-date">Termín {what}</Label>
          <Input id="sr-date" type="date" min={tomorrow()} value={date} onChange={(e) => { setDate(e.target.value); setDateError(null); }} required />
          {dateError && <p className="text-xs text-vinisto-wine">{dateError}</p>}
        </div>
        {date && (
          <div className="space-y-1.5">
            <Label htmlFor="sr-time">Čas {what}</Label>
            <select id="sr-time" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              <option value="">vyberte jednu z možností</option>
              {TIMES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Zpět
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Potvrzuji…" : "Potvrdit požadavek"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
