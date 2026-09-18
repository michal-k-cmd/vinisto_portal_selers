// Správa setů — port SetList: dlaždice pro založení setu, záložky podle stavu
// (?stav=), tabulka s hledáním, filtrem typu a řazením přes platformu.

import Link from "next/link";
import { Plus, Wine } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SearchParamInput } from "@/components/search-param-input";
import { SortableHead } from "@/components/sortable-head";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatPrice } from "@/lib/format";
import { localize, stripHtml } from "@/lib/platform/products";
import { listSupplierSets, SETS_PAGE_SIZE, SETS_TAB_LABEL, type SetsSort, type SetsTab, type SupplierSet } from "@/lib/platform/sets";
import { isSetType, SET_STATE_LABEL, SET_TYPE_LABEL, SET_TYPE_SLOTS, SET_TYPES } from "@/lib/platform/sets-constants";
import { cn } from "@/lib/utils";

export const metadata = { title: "Sety" };
export const dynamic = "force-dynamic";

const TABS: SetsTab[] = ["koncept", "schvalene", "zamitnute"];
const SORT_KEYS: SetsSort[] = ["nazev", "typ", "cena", "skladem", "stav"];

function Bottles({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Wine key={i} className="size-4 text-merkatos-violet" />
      ))}
    </span>
  );
}

export default async function SetyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  const tab = (TABS.includes(sp.stav as SetsTab) ? sp.stav : "koncept") as SetsTab;
  const page = pageFromParams(sp.page);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const typ = isSetType(sp.typ) ? sp.typ : undefined;
  const sort = (SORT_KEYS.includes(sp.sort as SetsSort) ? sp.sort : "") as SetsSort | "";
  const dir = sort ? (sp.dir === "asc" ? "asc" : "desc") : "desc";
  const params: Record<string, string> = {};
  if (tab !== "koncept") params.stav = tab;
  if (q) params.q = q;
  if (typ) params.typ = typ;
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }
  const hasFilter = Boolean(q || typ);

  const list = await listSupplierSets({ supplierId: supplier.id, page, tab, search: q || undefined, setType: typ, sort: sort || undefined, desc: dir === "desc" })
    .then((data) => ({ data, error: null as unknown }))
    .catch((error) => ({ data: { items: [] as SupplierSet[], count: 0 }, error }));

  const tabHref = (t: SetsTab) => {
    const next = new URLSearchParams(params);
    next.delete("page");
    if (t === "koncept") next.delete("stav");
    else next.set("stav", t);
    const qs = next.toString();
    return qs ? `?${qs}` : "/produkty/sety";
  };
  const sortProps = { sort, dir, params, defaultKey: "", defaultDir: "desc" as const };

  return (
    <div className="space-y-4">
      {/* Dlaždice */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SET_TYPES.map((t) => {
          const [paid, free] = SET_TYPE_SLOTS[t];
          return (
            <Link key={t} href={`/produkty/sety/novy?typ=${t}`} className="flex flex-col items-center gap-2 rounded-lg border border-vinisto-beige bg-card p-3 text-sm transition-colors hover:bg-accent">
              <span className="flex items-center gap-2">
                <Bottles count={paid} />
                {free > 0 && (
                  <>
                    <Plus className="size-4 text-muted-foreground" />
                    <Bottles count={free} />
                  </>
                )}
              </span>
              <span className="font-medium">Vytvořit {SET_TYPE_LABEL[t]}</span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-heading text-lg font-semibold">{SETS_TAB_LABEL[tab].heading}</h2>
        <nav className="flex flex-wrap gap-1 border-b border-border pb-2">
          {TABS.map((t) => (
            <Link key={t} href={tabHref(t)} className={cn("rounded-md px-3 py-1.5 text-sm", t === tab ? "bg-merkatos-blue font-medium text-white" : "text-muted-foreground hover:bg-accent")}>
              {SETS_TAB_LABEL[t].tab}
            </Link>
          ))}
        </nav>
        <form method="get" className="flex flex-wrap items-center gap-2 text-sm">
          {tab !== "koncept" && <input type="hidden" name="stav" value={tab} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
          {sort && <input type="hidden" name="dir" value={dir} />}
          <SearchParamInput param="q" initial={q} placeholder="Název produktu…" label="Název produktu" className="w-52" />
          <select name="typ" defaultValue={typ ?? ""} className="rounded-md border border-border bg-background px-2 py-1.5 text-sm" aria-label="Typ setu">
            <option value="">Typ setu: vše</option>
            {SET_TYPES.map((t) => (
              <option key={t} value={t}>
                {SET_TYPE_LABEL[t]}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-md border border-border px-3 py-1.5 hover:bg-accent">
            Filtrovat
          </button>
          {hasFilter && (
            <Link href={tabHref(tab).replace(/[?&](q|typ)=[^&]*/g, "").replace(/^\?$/, "/produkty/sety")} className="text-xs text-muted-foreground underline-offset-2 hover:underline">
              Zrušit filtry
            </Link>
          )}
        </form>

        {list.error ? (
          <DataError error={list.error} what="Sety" />
        ) : list.data.items.length === 0 ? (
          <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
            {hasFilter ? "Nebyly nalezeny žádné záznamy pro zvolené filtry." : "Nebyly nalezeny žádné záznamy."}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHead label="Název produktu" k="nazev" {...sortProps} />
                  <SortableHead label="Typ setu" k="typ" {...sortProps} />
                  <SortableHead label="Cena produktu vč. DPH" k="cena" align="right" {...sortProps} />
                  <SortableHead label="Skladem" k="skladem" align="right" {...sortProps} />
                  <SortableHead label="Stav" k="stav" {...sortProps} />
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.data.items.map((s) => {
                  const state = s.states?.[0];
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{stripHtml(localize(s.name))}</TableCell>
                      <TableCell>{isSetType(s.setType) ? SET_TYPE_LABEL[s.setType] : ""}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatPrice(s.totalSetPrice)}</TableCell>
                      <TableCell className="text-right">{s.availableCount ?? "–"}</TableCell>
                      <TableCell className="font-medium text-notion-orange">{state ? (SET_STATE_LABEL[state] ?? state) : ""}</TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Link href={`/produkty/sety/${s.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                            Detail
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        <Pagination page={page} pageSize={SETS_PAGE_SIZE} total={list.data.count} params={params} />
      </div>
    </div>
  );
}
