import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Vyúčtování a faktury" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Vyúčtování a faktury"
      description="Self-billing vyúčtování prodejce, detail, PDF faktury a XLS export."
      etapa={3}
      legacy="Vyúčtování → Vyúčtování a faktury"
    />
  );
}
