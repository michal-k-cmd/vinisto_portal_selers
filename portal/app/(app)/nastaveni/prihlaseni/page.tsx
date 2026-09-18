// Přihlašovací údaje — změna e-mailu a hesla (user-api).

import { Field } from "@/components/settings/fields";
import { SectionForm } from "@/components/settings/section-form";
import { SettingsSection } from "@/components/settings/settings-page";
import { requireSession } from "@/lib/auth/server";
import { changeEmailAction, changePasswordAction } from "@/lib/platform/actions/settings";

export const metadata = { title: "Přihlašovací údaje" };
export const dynamic = "force-dynamic";

export default async function PrihlaseniPage() {
  const session = await requireSession();
  return (
    <div className="space-y-4">
      <SettingsSection title="E-mail" description="Přihlašovací e-mail účtu.">
        <SectionForm action={changeEmailAction}>
          <Field name="email" label="E-mail" defaultValue={session.email} type="email" required autoComplete="email" />
        </SectionForm>
      </SettingsSection>
      <SettingsSection title="Heslo">
        <SectionForm action={changePasswordAction} resetOnSuccess>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field name="currentPassword" label="Současné heslo" type="password" required autoComplete="current-password" />
            <Field name="newPassword" label="Nové heslo" type="password" required autoComplete="new-password" hint="Alespoň 6 znaků." />
            <Field name="confirmPassword" label="Nové heslo znovu" type="password" required autoComplete="new-password" />
          </div>
        </SectionForm>
      </SettingsSection>
    </div>
  );
}
