import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Přihlašovací údaje" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Přihlašovací údaje"
      description="Změna e-mailu a hesla účtu."
      etapa={5}
      legacy="Nastavení → Přihlašovací údaje"
    />
  );
}
