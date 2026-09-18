// Změna v procentech se šipkou (port PercentageChange ze starého portálu):
// záporná hodnota je vínová se šipkou dolů, jinak zelená se šipkou nahoru.

import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function PercentageChange({ value, className }: { value: number; className?: string }) {
  const negative = value < 0;
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-medium", negative ? "text-vinisto-wine" : "text-vinisto-green", className)}>
      {negative ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
      {!negative && "+"}
      {value} %
    </span>
  );
}
