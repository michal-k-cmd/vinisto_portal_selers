import { SectionPlaceholder } from "@/components/section-placeholder";

export const metadata = { title: "Seznam produktů" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="Seznam produktů"
      description="Produkty prodejce se skladem, cenami a slevami; detail produktu s kategoriemi a provizemi."
      etapa={1}
      legacy="Produkty → Seznam produktů"
    />
  );
}
