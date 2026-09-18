"use client";

// Výběr způsobu dovozu; svozová adresa se ukazuje jen když si zboží vyzvedává vinisto.

import { useState } from "react";
import { Label } from "@/components/ui/label";

export function DeliveryTypeSelect({ initial, children }: { initial: boolean; children: React.ReactNode }) {
  const [isShipping, setIsShipping] = useState(initial);
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="f-isShipping">Způsob dovozu zboží *</Label>
        <select id="f-isShipping" name="isShipping" value={String(isShipping)} onChange={(e) => setIsShipping(e.target.value === "true")} className="h-9 w-full max-w-md rounded-md border border-border bg-background px-3 text-sm">
          <option value="true">Zboží dovážíme na sklad vinisto sami</option>
          <option value="false">Zboží si vinisto vyzvedává u nás</option>
        </select>
      </div>
      {!isShipping && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Adresa pro svoz</p>
          {children}
        </div>
      )}
    </>
  );
}
