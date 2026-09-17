import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Provize" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Provize"
      description="Prodejní a logistické provize podle směru země."
      etapa={3}
      legacy="Vyúčtování → Provize"
    />
  );
}
