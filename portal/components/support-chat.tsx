"use client";

// SupportBox chat s podporou pro prodejce. Widget se načte jen když jsou
// nastavené SUPPORTBOX_CHAT_ID a SUPPORTBOX_CHAT_SECRET (server je předá
// jako props). Běží skrytě — otevírá se tlačítky „Chat s podporou“ /
// „Zahájit chat“ (lib/chat.ts), stejně jako ve starém portálu.

import { useEffect } from "react";

declare global {
  interface Window {
    supportBoxChatVariables?: Record<string, string>;
  }
}

export function SupportChat({
  chatId,
  chatSecret,
  email,
  supplierName,
  supplierId,
}: {
  chatId: string;
  chatSecret: string;
  email: string;
  supplierName: string;
  supplierId: string;
}) {
  useEffect(() => {
    if (!chatId || !chatSecret) return;
    if (document.getElementById("supportbox-entry")) return;

    window.supportBoxChatVariables = { fullName: supplierName, email, customerId: supplierId };
    const config = document.createElement("script");
    config.id = "supportbox-config";
    config.text = `var supportBoxChatRunAsHidden = true; var supportBoxChatId = ${JSON.stringify(chatId)}; var supportBoxChatSecret = ${JSON.stringify(chatSecret)}; var supportBoxChatVariables = window.supportBoxChatVariables;`;
    const entry = document.createElement("script");
    entry.id = "supportbox-entry";
    entry.src = "https://chat.supportbox.cz/web-chat/entry-point";
    entry.async = true;
    entry.defer = true;
    document.body.append(config, entry);
    // Widget se záměrně neodstraňuje — opakované vložení dělá duplicitní iframe.
  }, [chatId, chatSecret, email, supplierName, supplierId]);

  useEffect(() => {
    if (window.supportBoxChatVariables) {
      window.supportBoxChatVariables.fullName = supplierName;
      window.supportBoxChatVariables.email = email;
      window.supportBoxChatVariables.customerId = supplierId;
    }
  }, [email, supplierName, supplierId]);

  return null;
}
