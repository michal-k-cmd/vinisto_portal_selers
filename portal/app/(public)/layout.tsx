// Veřejné stránky (registrace, kontakt, FAQ) — bez session, jednoduchý shell
// s vinisto hlavičkou a merkatos patičkou.

import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { VinistoLogo } from "@/components/vinisto-logo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 bg-[var(--vinisto-green)] px-4 text-white">
        <Link href="/" className="flex items-center text-white" aria-label="vinisto prodejce">
          <VinistoLogo height={34} />
        </Link>
        <span className="font-heading text-xl font-medium">prodejce</span>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/kontakt" className="hover:underline">
            Kontakt
          </Link>
          <Link href="/login" className="rounded-md bg-white/15 px-3 py-1.5 hover:bg-white/25">
            Přihlásit
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 lg:p-6">{children}</main>
      <AppFooter />
    </div>
  );
}
