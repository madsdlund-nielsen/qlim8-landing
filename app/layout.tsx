import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/index.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--app-font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qlim8.com"),
  title: {
    default: "qlim8 - ESG er nemt",
    template: "%s | qlim8",
  },
  description:
    "Dansk ESG-platform: automatisk scope 1-3, VSME-rapport på 10 minutter, hosting i EU. Spørg dine tal i Claude eller ChatGPT via vores MCP-server. Fra 300 kr/md.",
  keywords: [
    "klimaregnskab",
    "ESG",
    "VSME",
    "VSME-rapport",
    "scope 3",
    "CSRD",
    "L193",
    "SMV",
    "bæredygtighed",
    "Danmark",
    "MCP",
    "MCP server",
    "Model Context Protocol",
    "AI-agent",
  ],
  authors: [{ name: "qlim8" }],
  creator: "qlim8",
  publisher: "qlim8",
  openGraph: {
    siteName: "qlim8",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@qlim8",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.variable}>
      {/* No app-wide client provider: the site is Danish-only and server-
          rendered. The I18nProvider that used to wrap this shipped a 300 KB,
          eight-language dictionary to every visitor and fetched CMS overrides
          from the browser on every page, and nothing consumed it. */}
      <body>
        {children}
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
