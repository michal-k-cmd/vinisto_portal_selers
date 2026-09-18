"use client";

// „Chat s podporou“ — otevře SupportBox widget; bez widgetu vede na Kontakt.

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { openSupportChat } from "@/lib/chat";
import { cn } from "@/lib/utils";

export function SupportChatButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (!openSupportChat()) router.push("/kontakt");
      }}
      className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent", className)}
    >
      <MessageCircle className="size-4" />
      Chat s podporou
    </button>
  );
}
