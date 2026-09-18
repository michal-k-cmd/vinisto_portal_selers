// Ikonka „i“ s vysvětlením po najetí (bez JS, přes CSS hover/focus).

import { Info } from "lucide-react";

export function InfoTip({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <span className="group relative inline-flex align-middle">
      <button
        type="button"
        aria-label="Vysvětlení"
        className="rounded-full p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-border"
      >
        <Info className="size-4" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-1 hidden w-80 rounded-md border border-border bg-card p-3 text-xs font-normal leading-relaxed text-card-foreground shadow-md group-hover:block group-focus-within:block"
      >
        {title && <span className="mb-1 block font-semibold">{title}</span>}
        {children}
      </span>
    </span>
  );
}
