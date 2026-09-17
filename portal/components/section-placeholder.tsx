// Stránka modulu, který ještě nemá obsah (přenáší se v pozdější etapě).
// Poctivost: říká, co tu bude a odkud se to bere, nic nepředstírá.

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionPlaceholder({
  title,
  description,
  etapa,
  legacy,
}: {
  title: string;
  description: string;
  etapa?: number;
  /** Název obrazovky ve starém portálu, kterou tahle nahradí. */
  legacy?: string;
}) {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Připravuje se</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {etapa !== undefined && <p>Přenáší se v etapě {etapa} přestavby portálu.</p>}
          {legacy && <p>Do té doby je funkce dostupná ve stávajícím portálu ({legacy}).</p>}
        </CardContent>
      </Card>
    </div>
  );
}
