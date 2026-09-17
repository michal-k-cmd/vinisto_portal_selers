import { cn } from "@/lib/utils";

// Dlouhé tabulky rolují uvnitř (max 75vh) a hlavička sloupců zůstává
// přilepená nahoře — hodnoty jedou pod ní. Krátkých tabulek se to nedotkne.
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative max-h-[75vh] w-full overflow-x-auto overflow-y-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn(
        // sticky + plné pozadí + spodní linka přes shadow (border by při
        // border-collapse odroloval s obsahem)
        "sticky top-0 z-10 bg-card shadow-[0_1px_0_var(--border)] [&_tr]:border-b [&_tr]:border-border",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b border-border transition-colors hover:bg-accent/50", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-9 px-3 text-left align-middle text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-3 py-2 align-middle", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
