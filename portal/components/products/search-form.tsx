"use client";

// Fulltext nad názvem produktu — po 300 ms bez psaní přepíše ?q= v URL.

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ProductSearchForm({ initial }: { initial: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initial);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (value.trim()) next.set("q", value.trim());
      else next.delete("q");
      next.delete("page");
      router.replace(`${pathname}?${next.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full sm:max-w-xs">
      <Input type="search" placeholder="Hledat podle názvu…" value={value} onChange={(e) => setValue(e.target.value)} aria-label="Hledat produkt" />
    </form>
  );
}
