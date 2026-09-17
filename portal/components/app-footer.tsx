// Patička merkatos — dle Grafického manuálu Merkatos 2024:
// Nova blue #1605B9, Electric Mint #75FBD6, písmo DM Sans.
// Portál prodejce vyvíjí a provozuje merkatos.cz.

import Image from "next/image";

export function AppFooter() {
  return (
    <footer className="flex h-11 shrink-0 items-center gap-3 bg-[var(--merkatos-blue)] px-4 text-xs text-white/85">
      <a
        href="https://merkatos.cz"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
        aria-label="merkatos.cz"
      >
        <Image
          src="/merkatos-logo.png"
          alt="merkatos"
          width={512}
          height={186}
          className="h-6 w-auto brightness-0 invert"
        />
      </a>
      <span className="hidden font-dm sm:inline">marketplace &amp; fulfillment v jednom</span>
      <span className="ml-auto">
        portál prodejce vinisto vyvíjí a provozuje{" "}
        <a
          href="https://merkatos.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--merkatos-mint)] underline-offset-2 hover:underline"
        >
          merkatos.cz
        </a>{" "}
        · © {new Date().getFullYear()}
      </span>
    </footer>
  );
}
