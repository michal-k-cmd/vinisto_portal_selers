import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Pohyby skladu" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Pohyby skladu"
      description="Log skladových pohybů produktů prodejce."
      etapa={2}
      legacy="Sklad → Log"
    />
  );
}
