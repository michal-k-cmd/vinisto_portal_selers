// Sdílená pole formulářů nastavení (server-safe, bez stavu).

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COUNTRY_LABEL, COUNTRY_OPTIONS, type Address } from "@/lib/platform/supplier";

export function Field({
  name,
  label,
  defaultValue,
  placeholder,
  required,
  type = "text",
  textarea,
  hint,
  autoComplete,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </Label>
      {textarea ? (
        <textarea id={id} name={name} defaultValue={defaultValue ?? ""} placeholder={placeholder} rows={3} className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm" />
      ) : (
        <Input id={id} name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} autoComplete={autoComplete} />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function CountrySelect({ name, defaultValue, label = "Stát" }: { name: string; defaultValue?: string | null; label?: string }) {
  const id = `f-${name}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label} *</Label>
      <select id={id} name={name} defaultValue={defaultValue ?? "CZ"} className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm">
        {COUNTRY_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {COUNTRY_LABEL[c]}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Adresní pole (kontaktní i svozová adresa) — názvy polí odpovídají API. */
export function AddressFields({ address }: { address?: Address | null }) {
  const a = address ?? {};
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field name="title" label="Název" defaultValue={a.title} placeholder="Domovská adresa" />
      <Field name="addressee" label="Adresát" defaultValue={a.addressee} placeholder="Jméno a příjmení" required />
      <Field name="phone" label="Telefonní číslo" defaultValue={a.phone} placeholder="+420 123 456 789" required type="tel" autoComplete="tel" />
      <Field name="email" label="E-mail" defaultValue={a.email} placeholder="muj@email.cz" type="email" autoComplete="email" />
      <Field name="street" label="Ulice" defaultValue={a.street} placeholder="Bělohorská" required />
      <div className="grid grid-cols-2 gap-3">
        <Field name="landRegistryNumber" label="Číslo popisné" defaultValue={a.landRegistryNumber} placeholder="2252" required />
        <Field name="houseNumber" label="Číslo orientační" defaultValue={a.houseNumber} placeholder="42" />
      </div>
      <Field name="city" label="Město" defaultValue={a.city} placeholder="Pelhřimov" required />
      <Field name="zip" label="PSČ" defaultValue={a.zip} placeholder="555 00" required />
      <CountrySelect name="countryCode" defaultValue={a.countryCode} />
      <Field name="note" label="Poznámka" defaultValue={a.note} />
    </div>
  );
}
