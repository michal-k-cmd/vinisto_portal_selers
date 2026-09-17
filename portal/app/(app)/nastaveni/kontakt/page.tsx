import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Kontakt a adresa" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Kontakt a adresa"
      description="Kontaktní osoba a adresa prodejce."
      etapa={5}
      legacy="Nastavení → Kontaktní údaje"
    />
  );
}
