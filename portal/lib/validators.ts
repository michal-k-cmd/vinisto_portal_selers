// Čisté validátory pro nastavení a registraci (IČO, bankovní účet, web, telefon).

/** České IČO: 8 číslic + kontrolní součet modulo 11. */
export function isValidIco(value: string): boolean {
  const v = value.trim();
  if (!/^\d{8}$/.test(v)) return false;
  const digits = v.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += digits[i] * (8 - i);
  const mod = sum % 11;
  const check = mod === 1 ? 0 : mod === 0 || mod === 10 ? 1 : 11 - mod;
  return digits[7] === check;
}

export type BankAccountParts = { prefix: string; number: string; code: string };

/** Rozloží uložený účet („000000 - 123 / 0800“ i „000000-123/0800“) na části. */
export function parseBankAccount(value: string | null | undefined): BankAccountParts {
  const raw = (value ?? "").replace(/\s/g, "");
  if (!raw) return { prefix: "", number: "", code: "" };
  const [beforeCode, code = ""] = raw.split("/");
  const [a, b] = beforeCode.split("-");
  const hasPrefix = b !== undefined;
  return { prefix: hasPrefix ? a : "", number: hasPrefix ? b : a, code };
}

function mod11(digits: string, weights: number[]): boolean {
  const padded = digits.padStart(weights.length, "0");
  let sum = 0;
  for (let i = 0; i < weights.length; i++) sum += Number(padded[i]) * weights[i];
  return sum % 11 === 0;
}

/** Vrátí českou chybu, nebo null. Prázdný účet je v pořádku. */
export function validateBankAccount(parts: BankAccountParts): string | null {
  const prefix = parts.prefix.trim();
  const number = parts.number.trim();
  const code = parts.code.trim();
  if (!prefix && !number && !code) return null;
  if (!number || !code) return "Neplatné číslo účtu.";
  if (!/^\d{1,6}$/.test(prefix || "0")) return "Neplatné předčíslí.";
  if (!/^\d{1,10}$/.test(number)) return "Neplatné číslo účtu.";
  if (!/^\d{4}$/.test(code)) return "Tento kód banky neznáme.";
  if (prefix && !mod11(prefix, [10, 5, 8, 4, 2, 1])) return "Neplatné předčíslí.";
  if (!mod11(number, [6, 3, 7, 9, 10, 5, 8, 4, 2, 1])) return "Neplatné číslo účtu.";
  return null;
}

/** Uložený tvar účtu — stejný jako starý portál („000000 - 1234567890 / 0800“), aby seděl s daty. */
export function serializeBankAccount(parts: BankAccountParts): string {
  const number = parts.number.trim();
  const code = parts.code.trim();
  if (!number && !code) return "";
  const prefix = parts.prefix.trim() || "000000";
  return `${prefix} - ${number} / ${code}`;
}

/** http(s) URL s doménou; prázdná hodnota projde. */
export function isValidWebsite(value: string): boolean {
  const v = value.trim();
  if (!v) return true;
  try {
    const url = new URL(v);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(url.hostname);
  } catch {
    return false;
  }
}

/** Telefon: „+420 123456789“ (jako starý portál); bez předvolby se doplní +420. Null = neplatné. */
export function normalizePhone(value: string): string | null {
  const v = value.trim().replace(/[\s-]+/g, " ");
  if (!v) return null;
  const m = /^(\+\d{1,3})?\s*([\d ]{6,20})$/.exec(v);
  if (!m) return null;
  const digits = m[2].replace(/\s/g, "");
  if (digits.length < 6 || digits.length > 15) return null;
  return `${m[1] ?? "+420"} ${digits}`;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
