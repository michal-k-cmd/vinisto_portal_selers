import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Naskladnění" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Naskladnění"
      description="Požadavky na naskladnění do skladu vinisto: seznam, detail, potvrzení termínu, svoz a PDF."
      etapa={2}
      legacy="Produkty → Naskladnění"
    />
  );
}
