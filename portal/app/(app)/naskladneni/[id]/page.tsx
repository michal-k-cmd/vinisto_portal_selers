// Detail požadavku na naskladnění — port StockRequestDetail: hlavička,
// tisk (window.print s tiskovou variantou), PDF ze serveru, potvrzení termínu,
// dotaz na požadavek (chat), tabulka položek se součty kusů/kartonů.

import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { PrintButton } from "@/components/print-button";
import { ConfirmStockingButton } from "@/components/stocking/confirm-dialog";
import { requireSession } from "@/lib/auth/server";
import { formatDate } from "@/lib/format";
import { SPECIFICATION_ID_BATCH, SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from "@/lib/platform/fees";
import { localize, stripHtml, type Bundle, type SpecificationDetail } from "@/lib/platform/products";
import {
  DELIVERY_TIME_LABEL,
  DELIVERY_TYPE_LABEL,
  getStockingRequest,
  SELLER_STATE_LABEL,
  sellerState,
  type DeliveryTime,
  type DeliveryType,
  type StockingRequest,
} from "@/lib/platform/stocking-requests";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SPECIFICATION_ID_YEAR = "631576cc4114d721a1d6e539";
const BOTTLES_IN_BOX = 6;
const CONTACT = { phone: "+420 606 758 080", email: "prodejce@vinisto.cz" };

function specValue(specs: SpecificationDetail[] | null | undefined, definitionId: string): string {
  const spec = (specs ?? []).find(
    (s) => s.definition?.id === definitionId || (s.value as { definitionId?: string } | null)?.definitionId === definitionId,
  );
  const v = spec?.value;
  if (!v) return "–";
  if (v.selectedValueName?.length) return localize(v.selectedValueName);
  if (v.selectedValuesName?.length) return v.selectedValuesName.map((x) => localize(x)).join(", ");
  const raw = v.value;
  if (Array.isArray(raw)) return localize(raw);
  if (raw == null || raw === "") return "–";
  return String(raw);
}

type Row = {
  bundleId: string;
  name: string;
  warehouseIds: string;
  year: string;
  batch: string;
  kind: string;
  type: string;
  requested: number;
  delivered: number | null;
  difference: number | null;
  note: string;
};

function rows(request: StockingRequest): Row[] {
  const details = new Map<string, Bundle>((request.bundleDetails ?? []).map((b) => [b.id, b]));
  return (request.bundles ?? [])
    .map((b) => {
      const d = details.get(b.bundleId);
      return {
        bundleId: b.bundleId,
        name: d ? stripHtml(localize(d.name)) : b.bundleId,
        warehouseIds: (d?.warehouseId ?? []).join(", "),
        year: specValue(d?.specificationDetails, SPECIFICATION_ID_YEAR),
        batch: specValue(d?.specificationDetails, SPECIFICATION_ID_BATCH),
        kind: specValue(d?.specificationDetails, SPECIFICATION_ID_KIND),
        type: specValue(d?.specificationDetails, SPECIFICATION_ID_TYPE),
        requested: b.requestedCount ?? 0,
        delivered: b.deliveredCount ?? null,
        difference: b.countDifference ?? null,
        note: b.note ?? "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "cs"));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Požadavek na naskladnění ${id}` };
}

export default async function NaskladneniDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession();

  let request: StockingRequest | null = null;
  let error: unknown;
  try {
    request = await getStockingRequest(id, session.loginHash);
  } catch (e) {
    error = e;
  }
  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-2xl font-bold">Požadavek na naskladnění</h1>
        <DataError error={error} what="Požadavek na naskladnění" />
        <Link href="/naskladneni" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Zpět na výpis
        </Link>
      </div>
    );
  }
  if (!request) notFound();

  const state = sellerState(request.stockingState);
  const pickup = request.deliveryType === "VINISTO_DELIVERY";
  const items = rows(request);
  const totalCount = items.reduce((sum, r) => sum + r.requested, 0);
  const totalBoxes = Math.ceil(totalCount / BOTTLES_IN_BOX);
  const deliveryLabel = request.deliveryDate
    ? `${formatDate(request.deliveryDate * 1000)} ${DELIVERY_TIME_LABEL[request.deliveryTime as DeliveryTime] ?? ""}`.trim()
    : "–";

  const header: Array<[string, React.ReactNode]> = [
    ["Č. požadavku", request.requestNumber ?? "–"],
    ["Datum vystavení", request.createdAt ? formatDate(request.createdAt * 1000) : "–"],
    ["Způsob dopravy", DELIVERY_TYPE_LABEL[request.deliveryType as DeliveryType] ?? "–"],
    [
      "Dopravce / sledovací kód",
      <>
        {request.delivery?.name ? localize(request.delivery.name) : "–"}
        {request.trackingNumber && (
          <div>
            {request.trackingUrl ? (
              <a href={`//${request.trackingUrl}${request.trackingNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs underline-offset-2 hover:underline">
                {request.trackingNumber}
              </a>
            ) : (
              <span className="text-xs">{request.trackingNumber}</span>
            )}
          </div>
        )}
      </>,
    ],
    ["Naskladněno", request.stockingDate ? formatDate(request.stockingDate * 1000) : "–"],
    ["Stav", state ? <span className={cn("font-semibold", state === "WMS_STOCKED" ? "text-vinisto-green" : state === "CANCELLED" ? "text-vinisto-wine" : "text-notion-blue")}>{SELLER_STATE_LABEL[state]}</span> : "–"],
    ["Datum a čas závozu", deliveryLabel],
  ];

  return (
    <div className="space-y-4">
      {/* Hlavička (na obrazovce) */}
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <h1 className="font-heading text-2xl font-bold">Požadavek na naskladnění č. {request.requestNumber ?? "–"}</h1>
          <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {header.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <a href={`/naskladneni/${request.id}/pdf`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            PDF
          </a>
          {state === "SENT" && <ConfirmStockingButton id={request.id} pickup={pickup} />}
          <Link href="/kontakt" className={buttonVariants({ variant: "outline", size: "sm" })} title="Dotaz na požadavek řeší podpora pro prodejce">
            Dotaz na požadavek
          </Link>
          <Link href="/naskladneni" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Zpět na výpis
          </Link>
        </div>
      </div>

      {/* Tisková hlavička */}
      <div className="hidden print:block">
        <h1 className="text-xl font-bold">Požadavek na naskladnění č. {request.requestNumber ?? "–"}</h1>
        <dl className="mt-1 flex gap-6 text-sm">
          <div>
            <dt className="inline text-muted-foreground">Datum vystavení: </dt>
            <dd className="inline">{request.createdAt ? formatDate(request.createdAt * 1000) : "–"}</dd>
          </div>
          <div>
            <dt className="inline text-muted-foreground">Způsob dopravy: </dt>
            <dd className="inline">{DELIVERY_TYPE_LABEL[request.deliveryType as DeliveryType] ?? "–"}</dd>
          </div>
        </dl>
        <h2 className="mt-3 font-semibold">Zboží k naskladnění</h2>
      </div>

      <div className="overflow-x-auto rounded-md border border-border print:border-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden print:table-cell">ID</TableHead>
              <TableHead>Název produktu</TableHead>
              <TableHead>Ročník</TableHead>
              <TableHead>Šarže</TableHead>
              <TableHead>Druh</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead align="right">Požadováno kusů</TableHead>
              <TableHead align="right" className="print:hidden">Přijaté kusy</TableHead>
              <TableHead align="right" className="print:hidden">Rozdíl</TableHead>
              <TableHead className="print:hidden">Poznámka</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((r) => (
              <TableRow key={r.bundleId}>
                <TableCell className="hidden text-xs print:table-cell">{r.warehouseIds || "–"}</TableCell>
                <TableCell className="max-w-xs">
                  <Link href={`/produkty/${r.bundleId}`} className="font-medium hover:underline print:no-underline">
                    {r.name}
                  </Link>
                </TableCell>
                <TableCell>{r.year}</TableCell>
                <TableCell className="whitespace-nowrap">{r.batch}</TableCell>
                <TableCell>{r.kind}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell align="right" className="text-right font-semibold print:bg-muted">{r.requested}</TableCell>
                <TableCell align="right" className="text-right print:hidden">{r.delivered ?? "–"}</TableCell>
                <TableCell align="right" className={cn("text-right print:hidden", r.difference === 0 ? "text-vinisto-green" : r.difference != null ? "font-semibold text-vinisto-wine" : "")}>
                  {r.difference ?? "–"}
                </TableCell>
                <TableCell className="text-xs print:hidden">{r.note || ""}</TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-sm text-muted-foreground">
                  Požadavek neobsahuje žádné položky.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm font-medium print:hidden">
        Celkem k naskladnění kusů / kartonů: {totalCount} / {totalBoxes}
      </p>
      <table className="hidden text-sm print:table">
        <tbody>
          <tr>
            <th className="pr-4 text-left">Celkem</th>
            <td />
          </tr>
          <tr>
            <td className="pr-4">Počet lahví</td>
            <td className="text-right font-semibold">{totalCount}</td>
          </tr>
          <tr>
            <td className="pr-4">Počet kartonů</td>
            <td className="text-right font-semibold">{totalBoxes}</td>
          </tr>
        </tbody>
      </table>
      <p className="hidden text-xs text-muted-foreground print:block">
        Péče o prodejce {CONTACT.phone}, {CONTACT.email}
      </p>
    </div>
  );
}
