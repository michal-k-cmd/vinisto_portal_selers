"use client";

// Tichá revalidace session: když ji server označí za starou (>5 min od
// posledního ověření u platformy), zavolá se /api/auth/refresh, který
// cookie obnoví, nebo při neplatném hashi session ukončí → /login.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SessionRefresh({ stale }: { stale: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!stale) return;
    let cancelled = false;
    fetch("/api/auth/refresh", { method: "POST" })
      .then((res) => {
        if (cancelled) return;
        if (res.status === 401) {
          router.push("/login?reason=expired");
          router.refresh();
        }
      })
      .catch(() => {
        // výpadek sítě — necháme session běžet, zkusí se při dalším renderu
      });
    return () => {
      cancelled = true;
    };
  }, [stale, router]);

  return null;
}
