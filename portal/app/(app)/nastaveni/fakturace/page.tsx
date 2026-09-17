import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Fakturační údaje" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Fakturační údaje"
      description="Fakturační údaje prodejce pro self-billing."
      etapa={5}
      legacy="Nastavení → Fakturační údaje"
    />
  );
}
