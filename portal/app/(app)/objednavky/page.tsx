import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Objednávky" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Objednávky"
      description="Objednávky obsahující produkty prodejce a jejich detail."
      etapa={3}
      legacy="Objednávky"
    />
  );
}
