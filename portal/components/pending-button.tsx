"use client";

// Tlačítko formuláře se stavem odesílání: po kliknutí se zamkne (žádné
// dvojité odeslání) a ukáže, že se pracuje — server akce s API voláním
// trvají i pár sekund a bez odezvy lidi klikají znovu.

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function PendingButton({
  children,
  pendingText = "Pracuji…",
  variant,
  size,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size} disabled={pending}>
      {pending ? `⏳ ${pendingText}` : children}
    </Button>
  );
}
