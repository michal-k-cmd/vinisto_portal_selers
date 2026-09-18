"use client";

// Formulář jedné sekce nastavení: posbírá pole, zavolá server action,
// ukáže toast a případnou chybu u pole (data z FormData → objekt).

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { SettingsResult } from "@/lib/platform/actions/settings";

export function SectionForm({
  action,
  children,
  submitLabel = "Uložit změny",
  className,
  resetOnSuccess,
}: {
  action: (values: Record<string, string>) => Promise<SettingsResult>;
  children: React.ReactNode;
  submitLabel?: string;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ field?: string; message: string } | null>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values: Record<string, string> = {};
    for (const [k, v] of new FormData(form).entries()) if (typeof v === "string") values[k] = v;
    setError(null);
    startTransition(async () => {
      const result = await action(values);
      if (result.ok) {
        toast.success(result.message);
        if (resetOnSuccess) form.reset();
        router.refresh();
      } else {
        setError({ field: result.field, message: result.error });
        toast.error(result.error);
        const el = result.field ? form.querySelector<HTMLElement>(`[name="${result.field}"]`) : null;
        el?.focus();
      }
    });
  }

  return (
    <form onSubmit={submit} className={className ?? "space-y-4"} noValidate>
      {children}
      {error && <p className="text-xs text-vinisto-wine">{error.message}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Ukládám…" : submitLabel}
        </Button>
        <Button type="reset" size="sm" variant="outline" disabled={pending} onClick={() => setError(null)}>
          Zahodit změny
        </Button>
      </div>
    </form>
  );
}
