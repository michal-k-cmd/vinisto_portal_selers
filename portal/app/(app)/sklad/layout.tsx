import { ModuleLayout } from "@/components/module-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout moduleKey="sklad">{children}</ModuleLayout>;
}
