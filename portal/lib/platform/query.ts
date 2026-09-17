// Serializace query parametrů pro platformu (čistá funkce, bez server-only).

export type QueryValue = string | number | boolean | null | undefined | Array<string | number>;
export type Query = Record<string, QueryValue>;

/** Pole jako opakovaný klíč (`bundleIds=a&bundleIds=b`), prázdné hodnoty se vynechají. */
export function serializeQuery(query?: Query): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, String(item));
    } else {
      params.set(key, String(value));
    }
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

/** Cesta do logu bez hashe uživatele. */
export function pathForLog(path: string): string {
  return path.replace(/([?&])(UserLoginHash|userLoginHash)=[^&]*/g, "$1$2=***");
}
