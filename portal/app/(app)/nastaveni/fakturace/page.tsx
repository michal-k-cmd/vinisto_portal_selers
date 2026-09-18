// Fakturační údaje — nameBilling, IČO, DIČ (UpdateSupplier).

import { Field } from "@/components/settings/fields";
import { SectionForm } from "@/components/settings/section-form";
import { loadSettings, SettingsSection } from "@/components/settings/settings-page";
import { saveInvoiceAction } from "@/lib/platform/actions/settings";
import { COUNTRY_LABEL, editFieldsOf, SUPPLIER_TYPE_LABEL } from "@/lib/platform/supplier";

export const metadata = { title: "Fakturační údaje" };
export const dynamic = "force-dynamic";

export default async function FakturacePage() {
  const { profile, error } = await loadSettings();
  const f = profile ? editFieldsOf(profile) : null;
  return (
    <SettingsSection title="Fakturační údaje" description="Údaje pro vyúčtování a vyplácení tržeb." error={error}>
      {f && (
        <SectionForm action={saveInvoiceAction}>
          <Field name="nameBilling" label="Název společnosti" defaultValue={f.nameBilling} required />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="ico" label="IČO" defaultValue={f.ico} required />
            <Field name="dic" label="DIČ" defaultValue={f.dic} placeholder="CZ12345678" hint="Neplátci DPH nechají prázdné." />
          </div>
          <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Typ prodejce</dt>
              <dd>{SUPPLIER_TYPE_LABEL[f.supplierType]}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Země prodejce</dt>
              <dd>{COUNTRY_LABEL[f.countryCode] ?? f.countryCode}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">Typ prodejce a zemi mění podpora pro prodejce.</p>
        </SectionForm>
      )}
    </SettingsSection>
  );
}
