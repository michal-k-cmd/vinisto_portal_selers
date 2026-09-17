import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Monorepo: Next hledá lockfile v rootu repa, ať netraceuje soubory jinde.
  outputFileTracingRoot: path.join(__dirname, ".."),
  // Staré cesty SPA (client_admin) → nové routy, ať fungují uložené odkazy.
  async redirects() {
    const legacy: Array<[string, string]> = [
      ["/overview", "/"],
      ["/bundle-list", "/produkty"],
      ["/bundle-detail/:id", "/produkty/:id"],
      ["/set-list", "/produkty/sety"],
      ["/set-detail", "/produkty/sety/novy"],
      ["/set-detail/:id", "/produkty/sety/:id"],
      ["/warehouse-list", "/sklad"],
      ["/stock-request-list", "/naskladneni"],
      ["/stock-request-detail/:id", "/naskladneni/:id"],
      ["/order", "/objednavky"],
      ["/order/:id", "/objednavky/:id"],
      ["/billing", "/vyuctovani"],
      ["/billing/:id", "/vyuctovani/:id"],
      ["/commissions", "/vyuctovani/provize"],
      ["/discount-coupons", "/marketing/kupony"],
      ["/settings", "/nastaveni"],
      ["/register", "/registrace"],
      ["/register/:path*", "/registrace"],
      ["/contact", "/kontakt"],
    ];
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.vinisto.cz" }, { protocol: "https", hostname: "**.vinisto.dev" }],
  },
};

export default nextConfig;
