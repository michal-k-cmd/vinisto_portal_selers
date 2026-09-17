// Sekce „Provize“ v detailu produktu — pravidla aplikovaná na produkt
// podle směru prodeje (země původu → cílová země), s výchozími hodnotami
// prodejce jako posledním řádkem, když žádné pravidlo neplatí.

import Link from "next/link";
import { InfoTip } from "@/components/info-tip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataError } from "@/components/data-error";
import { formatPrice } from "@/lib/format";
import {
  destinationCountryOptions,
  getAppliedFeeRules,
  getSupplierFeeValues,
  type AppliedFeeRule,
  type FeeRecord,
  type LogisticFeeRecord,
} from "@/lib/platform/fees";
import { monthYear, ruleConditions } from "@/lib/platform/fees-format";
import { cn } from "@/lib/utils";

function feeLines(fees: Record<string, FeeRecord | FeeRecord[] | LogisticFeeRecord[] | undefined> | null | undefined, integrations: Map<number, string>): string[] {
  if (!fees) return [];
  const lines: string[] = [];
  for (const [key, value] of Object.entries(fees)) {
    if (key === "supplierTransport" || key === "vinistoTransport" || value == null) continue;
    const platform = integrations.get(Number(key)) ?? `Platforma ${key}`;
    for (const rec of Array.isArray(value) ? value : [value]) {
      lines.push(`${platform}: ${rec.fixedPrice ?? 0} Kč + ${rec.percentage ?? 0} %`);
    }
  }
  return lines;
}

function logisticLines(fees: LogisticFeeRecord[] | null | undefined, integrations: Map<number, string>): string[] {
  return (fees ?? []).map((f) => `${integrations.get(f.platformId ?? -1) ?? `Platforma ${f.platformId}`}: ${f.fixedPrice ?? 0} Kč + ${f.percentage ?? 0} %`);
}

export async function FeeRulesSection({
  bundleId,
  supplierId,
  loginHash,
  sourceCountry,
  targetCountry,
  showHistory,
  integrations,
  baseParams,
}: {
  bundleId: string;
  supplierId: string;
  loginHash: string;
  sourceCountry: string;
  targetCountry: string;
  showHistory: boolean;
  integrations: Map<number, string>;
  baseParams: Record<string, string>;
}) {
  let rules: AppliedFeeRule[] = [];
  let defaults: Awaited<ReturnType<typeof getSupplierFeeValues>> | null = null;
  let error: unknown;
  try {
    [rules, defaults] = await Promise.all([
      getAppliedFeeRules({ bundleId, loginHash, sourceCountry, destinationCountry: targetCountry, showHistory }),
      getSupplierFeeValues({ supplierId, loginHash, originCountry: sourceCountry, destinationCountry: targetCountry }).catch(() => null),
    ]);
  } catch (e) {
    error = e;
  }

  const href = (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams(baseParams);
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) next.delete(k);
      else next.set(k, v);
    }
    const qs = next.toString();
    return qs ? `?${qs}` : "?";
  };

  return (
    <section className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-lg font-semibold">Provize</h2>
        <span className="text-sm text-muted-foreground">Směr prodeje</span>
        <InfoTip>Provize a poplatky se mohou lišit podle země kvůli rozdílným nákladům na logistiku, daním a obchodním pravidlům.</InfoTip>
        <div className="flex gap-1">
          {destinationCountryOptions(sourceCountry).map((c) => (
            <Link
              key={c}
              href={href({ cil: c === sourceCountry ? undefined : c })}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                c === targetCountry ? "bg-merkatos-blue text-white" : "border border-border hover:bg-accent",
              )}
            >
              {c === sourceCountry ? c : `${sourceCountry} → ${c}`}
            </Link>
          ))}
        </div>
        <Link href={href({ historie: showHistory ? undefined : "1" })} className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline">
          {showHistory ? "zobrazit jen aktivní pravidla" : "zobrazit historii pravidel"}
        </Link>
      </div>

      {error ? (
        <DataError error={error} what="Provizní pravidla" />
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Podmínky</TableHead>
                <TableHead>Platnost od / do</TableHead>
                <TableHead>Cena produktu od / do</TableHead>
                <TableHead>Domácí produkce – prodej B2C / B2B</TableHead>
                <TableHead>Zahraniční produkce – prodej B2C / B2B</TableHead>
                <TableHead>Logistika – dovážíme na sklad</TableHead>
                <TableHead>Logistika – vozí vinisto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                    Pro dané parametry nebylo nalezeno žádné provizní pravidlo
                  </TableCell>
                </TableRow>
              )}
              {rules.map((rule, i) => (
                <TableRow key={rule.id ?? i}>
                  <TableCell className="text-xs">{ruleConditions(rule).map((c) => <div key={c}>{c}</div>)}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {monthYear(rule.validFrom, "neomezeně")} – {monthYear(rule.validTo, "neomezeně")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {!rule.bundlePriceFrom && !rule.bundlePriceTo ? "" : `${rule.bundlePriceFrom ? formatPrice(rule.bundlePriceFrom) : "neomezeně"} – ${rule.bundlePriceTo ? formatPrice(rule.bundlePriceTo) : "neomezeně"}`}
                  </TableCell>
                  <TableCell className="text-xs">{feeLines(rule.originFees, integrations).map((l) => <div key={l}>{l}</div>)}</TableCell>
                  <TableCell className="text-xs">{feeLines(rule.destinationFees, integrations).map((l) => <div key={l}>{l}</div>)}</TableCell>
                  <TableCell className="text-xs">{logisticLines(rule.originFees?.supplierTransport, integrations).map((l) => <div key={l}>{l}</div>)}</TableCell>
                  <TableCell className="text-xs">{logisticLines(rule.originFees?.vinistoTransport, integrations).map((l) => <div key={l}>{l}</div>)}</TableCell>
                </TableRow>
              ))}
              {rules.length === 0 && defaults && (
                <TableRow>
                  <TableCell className="text-xs font-medium">Výchozí provize</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell className="text-xs">{defaults.defaultSaleFeeValue ?? 0} % / {defaults.defaultSaleFeeValueB2b ?? 0} %</TableCell>
                  <TableCell className="text-xs">{defaults.defaultSaleFeeValue ?? 0} % / {defaults.defaultSaleFeeValueB2b ?? 0} %</TableCell>
                  <TableCell className="text-xs">{defaults.defaultLogisticFeeSupplierTransport ?? 0} % / {defaults.defaultLogisticFeeSupplierTransport ?? 0} %</TableCell>
                  <TableCell className="text-xs">{defaults.defaultLogisticFeeVinistoTransport ?? 0} % / {defaults.defaultLogisticFeeVinistoTransport ?? 0} %</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
