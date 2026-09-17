// Kontakt na podporu prodejců (hodnoty ze starého portálu, createConfigFile.ts).

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Kontakt" };

const KONTAKT = {
  email: "prodejce@vinisto.cz",
  telefon: "+420 606 758 080",
  hodiny: "pondělí až pátek, 8–20 h",
};

export default function KontaktPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Kontakt</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Podpora prodejců vinisto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            E-mail:{" "}
            <a href={`mailto:${KONTAKT.email}`} className="font-medium underline-offset-2 hover:underline">
              {KONTAKT.email}
            </a>
          </p>
          <p>
            Telefon:{" "}
            <a href={`tel:${KONTAKT.telefon.replace(/\s/g, "")}`} className="font-medium underline-offset-2 hover:underline">
              {KONTAKT.telefon}
            </a>{" "}
            <span className="text-muted-foreground">({KONTAKT.hodiny})</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
