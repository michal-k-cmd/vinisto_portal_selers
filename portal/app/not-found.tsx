import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="font-heading text-3xl font-bold">Stránka nenalezena</h1>
      <p className="text-sm text-muted-foreground">Taková adresa v portálu prodejce není.</p>
      <Link href="/" className="text-sm font-medium text-[var(--vinisto-green)] underline-offset-2 hover:underline">
        Zpět na přehled
      </Link>
    </div>
  );
}
