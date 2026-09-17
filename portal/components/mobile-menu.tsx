"use client";

// Sdílený stav mobilního draweru: hlavička i plovoucí tlačítko otevírají
// totéž menu (žádné druhé, separátní podmenu v headeru).

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MobileMenuCtx = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const Ctx = createContext<MobileMenuCtx | null>(null);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
    [open],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMobileMenu(): MobileMenuCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useMobileMenu musí být uvnitř MobileMenuProvider");
  }
  return ctx;
}
