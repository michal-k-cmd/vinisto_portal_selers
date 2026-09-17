// Časté dotazy — texty ze starého portálu, akordeon přes nativní <details>.

import Link from "next/link";
import { FAQ } from "@/lib/content/faq";

export const metadata = { title: "Časté dotazy" };

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Časté dotazy</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Nenašli jste odpověď? Napište nám přes{" "}
          <Link href="/kontakt" className="underline-offset-2 hover:underline">
            kontakt na podporu prodejců
          </Link>
          .
        </p>
      </div>
      {FAQ.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="font-heading text-lg font-semibold">{section.heading}</h2>
          <div className="divide-y divide-border rounded-md border border-border bg-card">
            {section.items.map((item) => (
              <details key={item.q} className="group px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium marker:hidden group-open:text-vinisto-green">
                  {item.q}
                </summary>
                <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {item.a.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
