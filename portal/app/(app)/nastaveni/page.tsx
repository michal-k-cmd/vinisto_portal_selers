import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Profil prodejce" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Profil prodejce"
      description="Základní údaje prodejce zobrazované zákazníkům."
      etapa={5}
      legacy="Nastavení → Profil"
    />
  );
}
