// Provize prodejce — port CommissionsList: pravidla pro směr prodeje
// (země původu prodejce → cílová země) a výchozí provize jako poslední řádek.

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { InfoTip } from "@/components/info-tip";
import { activeSupplier, requireSession } from "@/lib/auth/server";
import { destinationCountryOptions, getSupplierFeeRules, getSupplierFeeValues, type FeeRuleRow, type SupplierFeeValues } from "@/lib/platform/fees";
import { defaultFeeRow, FEE_RULE_STATE_LABEL, feeTableRow, splitFee } from "@/lib/platform/fees-format";
import { getSpecificationValueNames, specValueResolver } from "@/lib/platform/products";
import { cn } from "@/lib/utils";

export const metadata = { title: "Provize" };
export const dynamic = "force-dynamic";

const COUNTRIES = ["CZ", "SK", "DE"];

/** Poplatek ve dvou řádcích: B2C a B2B (jako v adminu). */
function FeeCell({ value }: { value: string }) {
  if (!value) return <TableCell className="text-xs text-muted-foreground">–</TableCell>;
  const [b2c, b2b] = splitFee(value);
  return (
    <TableCell className="whitespace-nowrap text-xs tabular-nums">
      <div>
        <span className="text-muted-foreground">B2C </span>
        {b2c}
      </div>
      <div>
        <span className="text-muted-foreground">B2B </span>
        {b2b}
      </div>
    </TableCell>
  );
}

export default async function ProvizePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const session = await requireSession();
  const supplier = activeSupplier(session);
  const originCountry = supplier.countryCode && COUNTRIES.includes(supplier.countryCode) ? supplier.countryCode : "CZ";
  const destinationCountry = typeof sp.cil === "string" && COUNTRIES.includes(sp.cil) ? sp.cil : originCountry;

  const [rules, values, specNames] = await Promise.all([
    getSupplierFeeRules({ supplierId: supplier.id, loginHash: session.loginHash, originCountry, destinationCountry })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: [] as FeeRuleRow[], error })),
    getSupplierFeeValues({ supplierId: supplier.id, loginHash: session.loginHash, originCountry, destinationCountry })
      .then((data) => ({ data, error: null as unknown }))
      .catch((error) => ({ data: null as SupplierFeeValues | null, error })),
    getSpecificationValueNames(),
  ]);

  const resolve = specValueResolver(specNames);
  const rows = [...rules.data.map((r, i) => feeTableRow(r, i, resolve)), defaultFeeRow(values.data)];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-lg font-semibold">Provize</h2>
        <InfoTip>Provize a poplatky se mohou lišit podle země kvůli rozdílným nákladům na logistiku, daním a obchodním pravidlům.</InfoTip>
        <span className="ml-2 text-sm text-muted-foreground">Směr prodeje</span>
        <div className="flex gap-1">
          {destinationCountryOptions(originCountry).map((c) => (
            <Link
              key={c}
              href={c === originCountry ? "/vyuctovani/provize" : `/vyuctovani/provize?cil=${c}`}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                c === destinationCountry ? "bg-merkatos-blue text-white" : "border border-border hover:bg-accent",
              )}
            >
              {c === originCountry ? c : `${originCountry} → ${c}`}
            </Link>
          ))}
        </div>
      </div>

      {rules.error ? (
        <DataError error={rules.error} what="Provizní pravidla" />
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pravidlo</TableHead>
                <TableHead>Podmínky</TableHead>
                <TableHead>Platnost od / do</TableHead>
                <TableHead>Cena produktu od / do</TableHead>
                <TableHead>Domácí produkce – prodej</TableHead>
                <TableHead>Zahraniční produkce – prodej</TableHead>
                <TableHead>Logistika – dovážíme na sklad</TableHead>
                <TableHead>Logistika – vozí vinisto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key} className={row.isDefault ? "bg-muted/40" : ""}>
                  <TableCell className={cn("text-xs", row.isDefault && "font-medium")}>
                    <div className="font-medium">{row.name || (row.isDefault ? "Výchozí provize" : "–")}</div>
                    {row.state && <div className={cn("text-[11px]", row.state === "Active" ? "text-vinisto-green" : "text-muted-foreground")}>{FEE_RULE_STATE_LABEL[row.state] ?? row.state}</div>}
                  </TableCell>
                  <TableCell className="text-xs">
                    {row.conditions.map((c) => (
                      <div key={c}>{c}</div>
                    ))}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{row.validity}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{row.price}</TableCell>
                  <FeeCell value={row.domestic} />
                  <FeeCell value={row.foreign} />
                  <FeeCell value={row.logisticsSupplier} />
                  <FeeCell value={row.logisticsVinisto} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {values.error ? <p className="text-xs text-muted-foreground">Výchozí hodnoty provizí se nepodařilo načíst, řádek „Výchozí provize“ ukazuje 0 %.</p> : null}
    </div>
  );
}
