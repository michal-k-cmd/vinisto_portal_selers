// Stránkování přes query parametr `page` (server komponenta, drží ostatní filtry).

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  pageSize,
  total,
  params,
  paramName = "page",
}: {
  page: number;
  pageSize: number;
  total: number;
  params: Record<string, string>;
  /** název query parametru se stránkou (výchozí `page`) */
  paramName?: string;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  const href = (p: number) => {
    const next = new URLSearchParams(params);
    if (p <= 1) next.delete(paramName);
    else next.set(paramName, String(p));
    const qs = next.toString();
    return qs ? `?${qs}` : "?";
  };

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const link = (p: number, label: string, disabled: boolean) =>
    disabled ? (
      <span className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground opacity-50">{label}</span>
    ) : (
      <Link href={href(p)} className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent">
        {label}
      </Link>
    );

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 pt-2 text-sm text-muted-foreground")}>
      <span>
        {from}–{to} z {total}
      </span>
      <div className="flex items-center gap-1">
        {link(page - 1, "‹ Předchozí", page <= 1)}
        <span className="px-2">
          {page} / {pages}
        </span>
        {link(page + 1, "Další ›", page >= pages)}
      </div>
    </div>
  );
}

/** Načte číslo stránky z query (1-based, bezpečně). */
export function pageFromParams(value: string | string[] | undefined): number {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}
