"use client";

// „Dotaz na vyúčtování“ — informativní modál s odkazem na chat podpory
// (port BillingQuote modálu; ID vyúčtování se nepředává ani ve starém portálu).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { openSupportChat } from "@/lib/chat";

export function BillingQuoteButton({ size = "sm" }: { size?: "sm" | "default" }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function startChat() {
    setOpen(false);
    if (!openSupportChat()) router.push("/kontakt");
  }

  return (
    <>
      <Button type="button" variant="outline" size={size} onClick={() => setOpen(true)}>
        Dotaz na vyúčtování
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Dotaz na vyúčtování">
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Máte k vyúčtování dotaz, nebo jste našli nějaké nesrovnalosti? To nás velice mrzí. Tlačítkem „Zahájit chat“ zahájíte
            konverzaci s podporou pro prodejce, která s Vámi vše ráda vyřeší.
          </p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zpět
            </Button>
            <Button type="button" onClick={startChat}>
              Zahájit chat
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
