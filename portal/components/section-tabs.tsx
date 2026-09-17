"use client";

// Horizontální pod-navigace uvnitř modulu. Záložky se předávají z definice
// modulu (lib/modules) přes sectionTabsOf() — jeden zdroj pravdy se sidebarem.

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/lib/modules";

export function SectionTabs({ tabs }: { tabs: NavChild[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-1 border-b border-border pb-2">
      {tabs.map((tab) => {
        const active = pathname === tab.href.split("?")[0];
        return (
          <span key={tab.href} className="group relative">
            <Link
              href={tab.href}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors",
                active
                  ? "bg-merkatos-blue font-medium text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {tab.label}
              {tab.hint && (
                <HelpCircle className="size-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-80" />
              )}
            </Link>
            {tab.hint && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-30 mt-1 hidden w-72 rounded-md border border-border bg-card p-2.5 text-xs leading-relaxed text-card-foreground shadow-md group-hover:block group-focus-within:block"
              >
                {tab.hint}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
