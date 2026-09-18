// Chat s podporou pro prodejce (SupportBox widget). Widget se načítá až
// v etapě 6 přes ENV; do té doby funkce vrací false a UI nabídne kontakt.

declare global {
  interface Window {
    supportBoxApi?: { show: () => void; hide: () => void; open: () => void; close: () => void };
  }
}

/** Otevře chat, pokud je widget načtený. Vrací, zda se to povedlo. */
export function openSupportChat(): boolean {
  if (typeof window === "undefined" || !window.supportBoxApi) return false;
  window.supportBoxApi.show();
  window.supportBoxApi.open();
  return true;
}
