"use client";

// Hlavička dělená na poloviny: levá vinisto zelená (logo + „prodejce"),
// pravá merkatos Nova blue (logo merkatos) — řez barev pod úhlem 45°
// (tvrdý přechod, žádný gradient dle brand pravidel merkatos).

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { VinistoLogo } from "@/components/vinisto-logo";
import { useMobileMenu } from "@/components/mobile-menu";

export function AppHeader({ supplierName }: { supplierName: string }) {
  const { toggle, open } = useMobileMenu();

  return (
    <header
      className="flex h-14 shrink-0 items-center gap-3 px-4 text-white"
      style={{
        background:
          "linear-gradient(135deg, var(--vinisto-green) 0%, var(--vinisto-green) 50%, var(--merkatos-blue) 50%, var(--merkatos-blue) 100%)",
      }}
    >
      <Link href="/" className="flex items-center text-white" aria-label="vinisto prodejce — domů">
        <VinistoLogo height={34} />
      </Link>
      <span className="font-heading text-xl font-medium md:text-2xl">prodejce</span>
      <span
        className="hidden max-w-[40vw] truncate rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium md:inline-block"
        title={supplierName}
      >
        {supplierName}
      </span>

      <a
        href="https://merkatos.cz"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto transition-opacity hover:opacity-80"
        aria-label="merkatos.cz"
      >
        <Image
          src="/merkatos-logo.png"
          alt="merkatos"
          width={512}
          height={186}
          className="h-11 w-auto brightness-0 invert"
        />
      </a>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-white/10 lg:hidden"
      >
        <Menu className="size-4" />
        Menu
      </button>
    </header>
  );
}
