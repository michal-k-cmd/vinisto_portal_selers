import type { Metadata, Viewport } from "next";
import { DM_Sans, Roboto, Ubuntu } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Písma dle brand manuálů: Ubuntu (vinisto nadpisy), Roboto (vinisto texty),
// DM Sans (merkatos — patička). Vše z Google Fonts, jak manuály doporučují.
const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-ubuntu",
});
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: { default: "vinisto prodejce", template: "%s · vinisto prodejce" },
  description:
    "Portál prodejce vinisto — produkty, naskladnění, objednávky, vyúčtování a nastavení prodejce.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#68A910",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${roboto.variable} ${ubuntu.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
