// Detail objednávky — port OrderDetail: hlavička, položky (cena za kus i
// řádkový součet), navíc doprava/platba a historie stavů z dat, která
// platforma už vrací. Položky aktivního prodejce jsou zvýrazněné.

import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { formatDate, formatDateTime, formatNumber, formatPrice } from "@/lib/format";
import { getOrder, orderCreatedAt, orderStateLabel, orderStateTone, type Order } from "@/lib/platform/orders";
import { localize, stripHtml } from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Objednávka ${id}` };
}

export default async function ObjednavkaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession();
  const supplier = activeSupplier(session);

  let order: Order | null = null;
  let error: unknown;
  try {
    order = await getOrder(id, session.loginHash);
  } catch (e) {
    error = e;
  }
  if (error) {
    return (
      <div className="space-y-4">
        <DataError error={error} what="Detail objednávky" />
        <Link href="/objednavky" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>
    );
  }
  if (!order) notFound();

  const currency = order.orderCurrency ?? "CZK";
  const created = orderCreatedAt(order);
  const items = order.orderItems ?? [];
  const mine = items.filter((i) => i.bundle?.supplierId === supplier.id).length;
  const history = [...(order.stateChangeRecords ?? [])].sort((a, b) => (a.changeTime ?? 0) - (b.changeTime ?? 0));

  const header: Array<[string, React.ReactNode]> = [
    ["Číslo objednávky", order.orderNumber ?? "–"],
    ["Datum objednávky", created ? formatDate(created * 1000) : "–"],
    ["Celková cena (s DPH)", <span key="p" className="font-semibold">{formatPrice(order.orderPriceWithVat, currency, 2)}</span>],
    ["Stav", <span key="s" className={cn("font-semibold", orderStateTone(order.state))}>{orderStateLabel(order.state)}</span>],
    ["Doprava", order.delivery?.name?.length ? localize(order.delivery.name) : "–"],
    ["Platba", order.payment?.name?.length ? localize(order.payment.name) : "–"],
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold">Objednávka č. {order.orderNumber ?? "–"}</h2>
          <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {header.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Link href="/objednavky" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Název produktu</TableHead>
              <TableHead className="text-right">Počet kusů</TableHead>
              <TableHead className="text-right">Cena za kus (s DPH)</TableHead>
              <TableHead className="text-right">Celkem (s DPH)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                  Objednávka neobsahuje žádné položky.
                </TableCell>
              </TableRow>
            )}
            {items.map((item, i) => {
              const b = item.bundle;
              const own = b?.supplierId === supplier.id;
              const unit = b?.price?.valueWithVat ?? null;
              const qty = item.quantity ?? 0;
              return (
                <TableRow key={`${b?.id ?? i}`} className={own ? "bg-vinisto-green/5" : ""}>
                  <TableCell className="font-mono text-xs">{b?.id ?? "–"}</TableCell>
                  <TableCell className="max-w-md">
                    {own ? (
                      <Link href={`/produkty/${b.id}`} className="font-medium hover:underline">
                        {stripHtml(b.name ?? b.id)}
                      </Link>
                    ) : (
                      <span>{stripHtml(b?.name ?? "–")}</span>
                    )}
                    {own && (
                      <Badge variant="green" className="ml-2">
                        váš produkt
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(qty)}</TableCell>
                  <TableCell className="whitespace-nowrap text-right">{formatPrice(unit, currency, 2)}</TableCell>
                  <TableCell className="whitespace-nowrap text-right font-medium">{unit == null ? "—" : formatPrice(unit * qty, currency, 2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {items.length > 0 && mine === 0 && (
        <p className="text-xs text-muted-foreground">Žádná položka této objednávky nepatří aktuálně zvolenému prodejci.</p>
      )}

      {history.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-heading text-base font-semibold">Historie stavů</h3>
          <ol className="space-y-1 text-sm">
            {history.map((h, i) => (
              <li key={`${h.state}-${h.changeTime}-${i}`} className="flex flex-wrap gap-x-3">
                <span className="w-40 shrink-0 text-muted-foreground">{h.changeTime ? formatDateTime(h.changeTime * 1000) : "–"}</span>
                <span className={cn("font-medium", orderStateTone(h.state))}>{orderStateLabel(h.state)}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
