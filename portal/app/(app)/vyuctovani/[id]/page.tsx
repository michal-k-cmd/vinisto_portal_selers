// Detail vyúčtování — port BillingDetail: hlavička, tabulka položek se
// souhrnnými řádky slev, zboží na cestě; navíc PDF/XLS i z detailu.

import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BillingQuoteButton } from "@/components/billing/billing-quote-button";
import { DataError } from "@/components/data-error";
import { InfoTip } from "@/components/info-tip";
import { requireSession } from "@/lib/auth/server";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { billingPeriod, billingStateLabel, billingStateTone, getBilling, hasInvoice, type Billing, type BillingBundle } from "@/lib/platform/billing";
import { localize, stripHtml } from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SELLER_DISCOUNT_TIP = "Součet akcí a slev, které jste poskytli a zákazníci využili ve svých objednávkách.";
const VINISTO_DISCOUNT_TIP = "Součet akcí, slev a poukazů, které poskytlo vinisto a zákazníci využili ve svých objednávkách. Marketingová podpora, kompletně hradí vinisto.";

function money(value: number | null | undefined): string {
  return value ? formatPrice(value, "CZK", 2) : "";
}

function bundleName(b: BillingBundle): string {
  return b.name?.length ? stripHtml(localize(b.name)) : b.id;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Vyúčtování ${id}` };
}

export default async function VyuctovaniDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession();

  let billing: Billing | null = null;
  let error: unknown;
  try {
    billing = await getBilling(id, session.loginHash);
  } catch (e) {
    error = e;
  }
  if (error) {
    return (
      <div className="space-y-4">
        <DataError error={error} what="Detail vyúčtování" />
        <Link href="/vyuctovani" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>
    );
  }
  if (!billing) notFound();

  const bundles = billing.bundles ?? [];
  const onTheWay = billing.bundlesOnTheWay ?? [];
  const header: Array<[string, React.ReactNode]> = [
    ["Č. vyúčtování", billing.billingNumber ?? "–"],
    ["Zaúčtovací období", billingPeriod(billing.timeFrom, billing.timeTo)],
    ["Vystaveno", billing.createdAt ? formatDate(billing.createdAt * 1000) : "–"],
    ["Sleva prodejce", formatPrice(billing.totalSellerDiscount ?? 0, "CZK", 2)],
    ["Sleva vinisto", <span key="sv" className="font-semibold">{formatPrice(billing.totalVinistoDiscount ?? 0, "CZK", 2)}</span>],
    ["Celkový obrat (bez DPH)", <span key="ts" className="font-semibold">{billing.totalSum == null ? "–" : formatPrice(billing.totalSum, "CZK", 2)}</span>],
    ["Stav", <span key="st" className={cn("font-semibold", billingStateTone(billing.state))}>{billingStateLabel(billing.state)}</span>],
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold">Vyúčtování č. {billing.billingNumber ?? "–"}</h2>
          <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {header.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap gap-2">
          {billing.billingPdf && (
            <>
              <a href={`/vyuctovani/${billing.id}/pdf`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                PDF vyúčtování
              </a>
              <a href={`/vyuctovani/${billing.id}/xls`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                XLS
              </a>
            </>
          )}
          {hasInvoice(billing) && (
            <a href={`/vyuctovani/${billing.id}/pdf?typ=faktura`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              PDF faktury
            </a>
          )}
          <BillingQuoteButton />
          <Link href="/vyuctovani" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Zpět na výpis
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Název produktu</TableHead>
              <TableHead>Šarže</TableHead>
              <TableHead className="text-right">Prodaných kusů</TableHead>
              <TableHead className="text-right">Obrat</TableHead>
              <TableHead className="text-right">Služby vinisto</TableHead>
              <TableHead className="text-right">Čistý zisk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bundles.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                  Vyúčtování neobsahuje žádné prodané položky.
                </TableCell>
              </TableRow>
            )}
            {bundles.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs">{b.id}</TableCell>
                <TableCell className="max-w-xs">
                  <Link href={`/produkty/${b.id}`} className="font-medium hover:underline">
                    {bundleName(b)}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap">{b.bundleLot || "–"}</TableCell>
                <TableCell className="text-right">{formatNumber(b.soldPcs)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">{money(b.sumPrice)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">{money(b.sumFee)}</TableCell>
                <TableCell className="whitespace-nowrap text-right font-medium">{money(b.totalProfit)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/40">
              <TableCell className="text-xs font-medium">Sleva prodejce</TableCell>
              <TableCell colSpan={4} className="text-xs">
                Úhrn slev a poukazů od prodejce <InfoTip>{SELLER_DISCOUNT_TIP}</InfoTip>
              </TableCell>
              <TableCell className="whitespace-nowrap text-right">{formatPrice(billing.totalSellerDiscount ?? 0, "CZK", 2)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow className="bg-muted/40">
              <TableCell className="text-xs font-medium">Sleva vinisto</TableCell>
              <TableCell colSpan={3} className="text-xs">
                Úhrn slev a poukazů od vinisto (pouze informativní, nevstupuje do fakturace) <InfoTip>{VINISTO_DISCOUNT_TIP}</InfoTip>
              </TableCell>
              <TableCell className="whitespace-nowrap text-right">{formatPrice(billing.totalVinistoDiscount ?? 0, "CZK", 2)}</TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {onTheWay.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-heading text-base font-semibold">
            Zboží na cestě{" "}
            <InfoTip>Prodané kusy z dodaných objednávek, které zatím nebyly zákazníkem uhrazeny — do tohoto vyúčtování nevstupují.</InfoTip>
          </h3>
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Název produktu</TableHead>
                  <TableHead>Šarže</TableHead>
                  <TableHead className="text-right">Kusů</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onTheWay.map((b, i) => (
                  <TableRow key={`${b.id}-${i}`}>
                    <TableCell className="font-mono text-xs">{b.id}</TableCell>
                    <TableCell>{bundleName(b)}</TableCell>
                    <TableCell>{b.bundleLot || "–"}</TableCell>
                    <TableCell className="text-right">{formatNumber(b.soldPcs)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </div>
  );
}
