// Bankovní údaje — číslo účtu ve tvaru předčíslí - číslo / kód banky.

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionForm } from "@/components/settings/section-form";
import { loadSettings, SettingsSection } from "@/components/settings/settings-page";
import { saveBankAction } from "@/lib/platform/actions/settings";
import { parseBankAccount } from "@/lib/validators";

export const metadata = { title: "Bankovní údaje" };
export const dynamic = "force-dynamic";

export default async function BankaPage() {
  const { profile, error } = await loadSettings();
  const parts = parseBankAccount(profile?.bankAccountNumber);
  return (
    <SettingsSection title="Bankovní údaje" description="Účet, na který vinisto vyplácí vyúčtování." error={error}>
      {profile && (
        <SectionForm action={saveBankAction}>
          <div className="space-y-1.5">
            <Label htmlFor="f-number">Bankovní účet</Label>
            <div className="flex flex-wrap items-center gap-2">
              <Input name="prefix" defaultValue={parts.prefix} placeholder="Předčíslí" maxLength={6} inputMode="numeric" className="w-28" aria-label="Předčíslí" />
              <span>-</span>
              <Input id="f-number" name="number" defaultValue={parts.number} placeholder="Číslo účtu" maxLength={10} inputMode="numeric" className="w-40" />
              <span>/</span>
              <Input name="code" defaultValue={parts.code} placeholder="Kód banky" maxLength={4} inputMode="numeric" className="w-28" aria-label="Kód banky" />
            </div>
          </div>
        </SectionForm>
      )}
    </SettingsSection>
  );
}
