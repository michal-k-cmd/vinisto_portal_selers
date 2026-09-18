// Kontaktní údaje — supplier.address (PUT .../address).

import { AddressFields } from "@/components/settings/fields";
import { SectionForm } from "@/components/settings/section-form";
import { loadSettings, SettingsSection } from "@/components/settings/settings-page";
import { saveContactAction } from "@/lib/platform/actions/settings";

export const metadata = { title: "Kontakt a adresa" };
export const dynamic = "force-dynamic";

export default async function KontaktPage() {
  const { profile, error } = await loadSettings();
  return (
    <SettingsSection title="Kontaktní údaje" description="Primární kontakt pro komunikaci mezi vámi a vinisto." error={error}>
      {profile && (
        <SectionForm action={saveContactAction}>
          <AddressFields address={profile.address} />
        </SectionForm>
      )}
    </SettingsSection>
  );
}
