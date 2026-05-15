import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/index.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--app-font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qlim8.com"),
  title: {
    default: "qlim8 » ESG uden besværet — klimaregnskab til danske SMV'er",
    template: "%s | qlim8",
  },
  description:
    "Automatisk scope 1-3, VSME-rapport på 10 minutter, hosting i EU. Klimaregnskab uden regneark, konsulenter og kaos. Fra 250 kr/md.",
  keywords: [
    "klimaregnskab",
    "ESG",
    "VSME",
    "scope 3",
    "CSRD",
    "L193",
    "SMV",
    "bæredygtighed",
    "Danmark",
  ],
  authors: [{ name: "qlim8 ApS" }],
  creator: "qlim8 ApS",
  publisher: "qlim8 ApS",
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
      <body>
        <Providers>
          {children}
          <CookieConsent />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
