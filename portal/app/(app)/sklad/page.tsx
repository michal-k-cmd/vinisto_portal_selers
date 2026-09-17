import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Sklad" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Sklad"
      description="Skladové zásoby produktů prodejce ve skladu vinisto."
      etapa={2}
      legacy="Sklad (skrytá stránka /warehouse-list)"
    />
  );
}
