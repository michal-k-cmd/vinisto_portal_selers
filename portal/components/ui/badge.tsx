import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        green: "bg-notion-green/15 text-notion-green",
        red: "bg-notion-red/15 text-notion-red",
        blue: "bg-notion-blue/15 text-notion-blue",
        yellow: "bg-notion-yellow/15 text-notion-yellow",
        /** aktivní volba (filtr, štítek) — merkatos modrá s bílým textem */
        selected: "bg-merkatos-blue text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
