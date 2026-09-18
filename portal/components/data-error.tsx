// Poctivé zobrazení chyby platformy: říká, co selhalo, bez citlivých detailů.

import { Card, CardContent } from "@/components/ui/card";
import { PlatformApiError } from "@/lib/platform/errors";

function errorDetail(error: unknown): string | null {
  if (error instanceof PlatformApiError) return error.message;
  if (error instanceof Error && error.message) return error.message.slice(0, 300);
  if (typeof error === "string") return error.slice(0, 300);
  return null;
}

export function DataError({ error, what = "Data z platformy vinisto" }: { error?: unknown; what?: string }) {
  if (error) console.error("Data error:", error);
  const detail = errorDetail(error);
  return (
    <Card>
      <CardContent className="space-y-1 p-4 text-sm text-muted-foreground">
        <div>{what} se nepodařilo načíst.</div>
        {detail && (
          <div className="font-mono text-xs" title="chybová hláška platformy">
            {detail}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
