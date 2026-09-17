import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Časté dotazy" };

export default function FaqPage() {
  return (
    <SectionPlaceholder
      title="Časté dotazy"
      description="Odpovědi na časté dotazy prodejců (převezmou se ze stávajícího portálu)."
      etapa={6}
      legacy="FAQ"
    />
  );
}
