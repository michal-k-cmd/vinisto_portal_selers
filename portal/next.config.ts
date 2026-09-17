import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Monorepo: Next hledá lockfile v rootu repa, ať netraceuje soubory jinde.
  outputFileTracingRoot: path.join(__dirname, ".."),
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.vinisto.cz" }, { protocol: "https", hostname: "**.vinisto.dev" }],
  },
};

export default nextConfig;
