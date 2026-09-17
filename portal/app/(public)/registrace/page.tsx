import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Registrace prodejce" };

export default function RegistracePage() {
  return (
    <SectionPlaceholder
      title="Registrace prodejce"
      description="Registrační průvodce nového prodejce (údaje, produkty, služby, fakturace s ARES)."
      etapa={5}
      legacy="Registrace"
    />
  );
}
