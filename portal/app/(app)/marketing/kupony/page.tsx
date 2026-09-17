import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Slevové kupóny" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Slevové kupóny"
      description="Vlastní slevové kupóny prodejce: vytvoření, editace, aktivace."
      etapa={4}
      legacy="Marketing → Slevové kupóny"
    />
  );
}
