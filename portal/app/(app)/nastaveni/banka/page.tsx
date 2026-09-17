import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Bankovní údaje" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Bankovní údaje"
      description="Účet pro výplaty z vyúčtování."
      etapa={5}
      legacy="Nastavení → Bankovní údaje"
    />
  );
}
