// Objednávky — port OrderList: seznam z order-api/orders podle hashe
// uživatele, řazení podle data, detail. Platforma zatím neumí SupplierId,
// takže výběr objednávek dělá backend (stejně jako ve starém portálu).

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { Pagination, pageFromParams } from "@/components/pagination";
import { SortableHead } from "@/components/sortable-head";
import { requireSession } from "@/lib/auth/server";
import { formatDate, formatPrice } from "@/lib/format";
import { listOrders, orderCreatedAt, ORDERS_PAGE_SIZE, orderStateLabel, orderStateTone, type Order } from "@/lib/platform/orders";
import { cn } from "@/lib/utils";

export const metadata = { title: "Objednávky" };
export const dynamic = "force-dynamic";

export default async function ObjednavkyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();

  const page = pageFromParams(sp.page);
  const sort = sp.sort === "datum" ? "datum" : "";
  const dir = sort ? (sp.dir === "asc" ? "asc" : "desc") : "desc";
  const params: Record<string, string> = {};
  if (sort) {
    params.sort = sort;
    params.dir = dir;
  }

  let error: unknown;
  let items: Order[] = [];
  let count = 0;
  try {
    const result = await listOrders({ loginHash: session.loginHash, page, desc: dir === "desc" });
    items = result.items;
    count = result.count;
  } catch (e) {
    error = e;
  }

  const sortProps = { sort, dir, params, defaultKey: "datum", defaultDir: "desc" as const };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Objednávky obsahující vaše produkty. Ceny jsou uvedeny včetně DPH.</p>

      {error ? (
        <DataError error={error} what="Seznam objednávek" />
      ) : items.length === 0 ? (
        <p className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">Nebyly nalezeny žádné záznamy.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Číslo objednávky</TableHead>
                <SortableHead label="Datum objednávky" k="datum" {...sortProps} />
                <TableHead>Stav</TableHead>
                <TableHead className="text-right">Celková cena</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((o) => {
                const created = orderCreatedAt(o);
                return (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.orderNumber ?? "–"}</TableCell>
                    <TableCell>{created ? formatDate(created * 1000) : "–"}</TableCell>
                    <TableCell className={cn("font-semibold", orderStateTone(o.state))}>{orderStateLabel(o.state)}</TableCell>
                    <TableCell className="whitespace-nowrap text-right">{formatPrice(o.orderPriceWithVat, o.orderCurrency ?? "CZK", 2)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Link href={`/objednavky/${o.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                          Detail objednávky
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
      <Pagination page={page} pageSize={ORDERS_PAGE_SIZE} total={count} params={params} />
    </div>
  );
}
