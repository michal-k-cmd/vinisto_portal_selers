// Společný layout modulu s podmenu: nadpis modulu + záložky z registru.

import { SectionTabs } from "@/components/section-tabs";
import { moduleByKey, sectionTabsOf } from "@/lib/modules";

export function ModuleLayout({ moduleKey, children }: { moduleKey: string; children: React.ReactNode }) {
  const mod = moduleByKey(moduleKey);
  if (!mod) throw new Error(`Neznámý modul: ${moduleKey}`);
  const tabs = sectionTabsOf(mod);
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">{mod.label}</h1>
      {tabs.length > 1 && <SectionTabs tabs={tabs} />}
      {children}
    </div>
  );
}
