"use client";

// Sidebar ve stylu CML: rozbalovací strom (modul → podmenu), aktivní
// položka s barevným proužkem vlevo. Skupina s aktivní routou se rozbalí
// automaticky. Dole přepínač prodejce, e-mail a odhlášení.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu as MenuIcon,
  PackagePlus,
  Settings,
  ShoppingCart,
  Warehouse,
  Wine,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ModuleDef, NavChild } from "@/lib/modules";
import { marketingUrlFor } from "@/lib/modules";
import type { SessionSupplier } from "@/lib/auth/session";
import { useMobileMenu } from "@/components/mobile-menu";
import { SupplierSwitch } from "@/components/supplier-switch";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Wine,
  PackagePlus,
  Warehouse,
  ShoppingCart,
  FileText,
  Megaphone,
  Settings,
};

function hrefPath(href: string): string {
  return href.split("?")[0];
}

export function AppSidebar({
  modules,
  email,
  suppliers,
  activeSupplierId,
  suppliersTruncated = false,
}: {
  modules: ModuleDef[];
  email: string;
  suppliers: SessionSupplier[];
  activeSupplierId: string;
  suppliersTruncated?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { open: mobileOpen, setOpen: setMobileOpen } = useMobileMenu();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  useEffect(() => {
    setOpen((prev) => {
      const next = { ...prev };
      for (const mod of modules) {
        if (mod.route !== "/" && pathname.startsWith(mod.route)) next[mod.key] = true;
      }
      return next;
    });
  }, [pathname, modules]);

  const isModuleActive = (mod: ModuleDef) =>
    mod.route === "/" ? pathname === "/" : pathname.startsWith(mod.route);

  const isChildActive = (child: NavChild) => !child.external && hrefPath(child.href) === pathname;

  // externí odkaz na marketingové balíčky nese id aktivního prodejce
  const childHref = (child: NavChild) =>
    child.external && child.href.includes("vinisto-mkt") ? marketingUrlFor(activeSupplierId) : child.href;

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/login");
      router.refresh();
    } else {
      toast.error("Odhlášení se nepovedlo");
    }
  }

  const accountFooter = (
    <div className="mt-auto shrink-0 space-y-2 border-t border-border p-3">
      <SupplierSwitch suppliers={suppliers} activeSupplierId={activeSupplierId} truncated={suppliersTruncated} />
      <div className="truncate px-1 text-xs text-muted-foreground" title={email}>
        {email}
      </div>
      <button
        type="button"
        onClick={logout}
        className="flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <LogOut className="size-3.5" />
        Odhlásit
      </button>
    </div>
  );

  const navContent = (
    <nav className="flex-1 overflow-y-auto py-2">
      {modules.map((mod) => {
        const Icon = ICONS[mod.icon] ?? LayoutDashboard;
        const hasChildren = (mod.children?.length ?? 0) > 0;
        const expanded = open[mod.key] ?? false;
        const active = isModuleActive(mod);
        const exactActive = pathname === mod.route;

        return (
          <div key={mod.key}>
            <div
              className={cn(
                "relative flex items-center",
                active &&
                  "before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-r before:bg-merkatos-blue",
              )}
            >
              <Link
                href={mod.route}
                className={cn(
                  "flex min-w-0 flex-1 items-center gap-2.5 px-4 py-2 text-sm transition-colors",
                  exactActive
                    ? "bg-merkatos-blue font-medium text-white"
                    : active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{mod.label}</span>
              </Link>
              {hasChildren && (
                <button
                  type="button"
                  aria-label={expanded ? "Sbalit" : "Rozbalit"}
                  onClick={() => setOpen((prev) => ({ ...prev, [mod.key]: !expanded }))}
                  className="mr-2 rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              )}
            </div>

            {hasChildren && expanded && (
              <div className="pb-1">
                {mod.children!.map((child) =>
                  child.external ? (
                    <a
                      key={child.href}
                      href={childHref(child)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 pl-[2.9rem] pr-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {child.label}
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  ) : (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block py-1.5 pl-[2.9rem] pr-4 text-sm transition-colors",
                        isChildActive(child)
                          ? "bg-merkatos-blue font-medium text-white"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {child.label}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border bg-muted/40 lg:flex">
        {navContent}
        {accountFooter}
      </aside>

      <button
        type="button"
        aria-label="Otevřít menu"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex size-12 items-center justify-center rounded-full bg-[var(--vinisto-green)] text-white shadow-lg lg:hidden"
      >
        <MenuIcon className="size-5" />
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-background shadow-xl">
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
              <span className="font-heading text-sm font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Zavřít menu"
                onClick={() => setMobileOpen(false)}
                className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            {navContent}
            {accountFooter}
          </aside>
        </div>
      )}
    </>
  );
}
