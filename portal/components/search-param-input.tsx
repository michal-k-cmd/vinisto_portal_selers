"use client";

// Textové pole svázané s query parametrem: po 300 ms bez psaní přepíše URL
// (a vynuluje stránkování). Server komponenta stránky pak filtr aplikuje.

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function SearchParamInput({
  param,
  initial,
  placeholder,
  label,
  pageParam = "page",
  className,
}: {
  param: string;
  initial: string;
  placeholder: string;
  label: string;
  pageParam?: string;
  className?: string;
}) {
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
      if (value.trim()) next.set(param, value.trim());
      else next.delete(param);
      next.delete(pageParam);
      router.replace(`${pathname}?${next.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      type="search"
      placeholder={placeholder}
      aria-label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
    />
  );
}
