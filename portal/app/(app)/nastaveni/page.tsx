// Profil prodejce — nameWeb, web, popisy (UpdateSupplier).

import { Field } from "@/components/settings/fields";
import { SectionForm } from "@/components/settings/section-form";
import { loadSettings, SettingsSection } from "@/components/settings/settings-page";
import { saveProfileAction } from "@/lib/platform/actions/settings";
import { editFieldsOf } from "@/lib/platform/supplier";

export const metadata = { title: "Profil prodejce" };
export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const { profile, error } = await loadSettings();
  const f = profile ? editFieldsOf(profile) : null;
  return (
    <SettingsSection title="Profil prodejce" description="Tyto údaje vidí zákazníci na stránkách vinisto u vašeho profilu." error={error}>
      {f && (
        <SectionForm action={saveProfileAction}>
          <Field name="nameWeb" label="Název pro zobrazení na webu" defaultValue={f.nameWeb} required />
          <Field name="web" label="Webová stránka" defaultValue={f.web} placeholder="https://" type="url" />
          <Field name="companyDescription" label="Popis společnosti" defaultValue={f.companyDescription} textarea />
          {f.supplierType === "PRODUCER" && (
            <>
              <Field name="mainProfile" label="Popis hlavního vinaře" defaultValue={f.mainProfile} textarea />
              <Field name="wineRegion" label="Vinařská oblast" defaultValue={f.wineRegion} />
            </>
          )}
        </SectionForm>
      )}
    </SettingsSection>
  );
}
