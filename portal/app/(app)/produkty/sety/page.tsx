import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Sety" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Sety"
      description="Zvýhodněné sety prodejce (např. 1+1 zdarma), tvorba a odeslání ke schválení."
      etapa={4}
      legacy="Produkty → Sety"
    />
  );
}
