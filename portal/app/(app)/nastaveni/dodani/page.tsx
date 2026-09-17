import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Dodací údaje" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Dodací údaje"
      description="Adresa a podmínky pro svoz zboží do skladu."
      etapa={5}
      legacy="Nastavení → Dodací údaje"
    />
  );
}
