// Řaditelná hlavička tabulky — klik přepíná sloupec a směr (šipka ukazuje
// aktuální řazení). Server komponenta: řazení jde přes query parametry
// sort/dir, takže ho respektuje platforma (řadí se celý dataset).

import Link from "next/link";
import { TableHead } from "@/components/ui/table";

export function SortableHead({
  label,
  k,
  sort,
  dir,
  params,
  align,
  defaultKey,
  defaultDir,
}: {
  label: string;
  /** klíč řazení (whitelist v dotazu) */
  k: string;
  sort: string;
  dir: string;
  /** aktuální filtry stránky — proklik je drží */
  params: Record<string, string>;
  align?: "right" | "center";
  /** sloupec, podle kterého se řadí bez zvoleného sortu — nese šipku hned */
  defaultKey?: string;
  defaultDir?: "asc" | "desc";
}) {
  const activeKey = sort || defaultKey || "";
  const activeDir = sort ? (dir === "desc" ? "desc" : "asc") : (defaultDir ?? "asc");
  const active = activeKey === k;
  const next = new URLSearchParams(params);
  next.set("sort", k);
  next.set("dir", active && activeDir === "asc" ? "desc" : "asc");
  next.delete("page");
  return (
    <TableHead className={align === "right" ? "text-right" : align === "center" ? "text-center" : ""}>
      <Link href={`?${next.toString()}`} className="whitespace-nowrap hover:text-foreground">
        {label}
        {active ? (activeDir === "asc" ? " ↑" : " ↓") : ""}
      </Link>
    </TableHead>
  );
}
