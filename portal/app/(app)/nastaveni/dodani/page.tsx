// Doprava zboží — způsob dovozu a svozová adresa (pickupAddress).

import { AddressFields } from "@/components/settings/fields";
import { DeliveryTypeSelect } from "@/components/settings/delivery-type-select";
import { SectionForm } from "@/components/settings/section-form";
import { loadSettings, SettingsSection } from "@/components/settings/settings-page";
import { saveDeliveryAction } from "@/lib/platform/actions/settings";

export const metadata = { title: "Dodací údaje" };
export const dynamic = "force-dynamic";

export default async function DodaniPage() {
  const { profile, error } = await loadSettings();
  return (
    <SettingsSection title="Doprava zboží" description="Způsob, jakým se vaše zboží dostává na sklad vinisto. Ovlivňuje výši logistické provize." error={error}>
      {profile && (
        <SectionForm action={saveDeliveryAction}>
          <DeliveryTypeSelect initial={Boolean(profile.isShipping)}>
            <AddressFields address={profile.pickupAddress} />
          </DeliveryTypeSelect>
        </SectionForm>
      )}
    </SettingsSection>
  );
}
