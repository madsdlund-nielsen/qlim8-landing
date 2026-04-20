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
    default: "qlim8 » Automatisk Klimaregnskab & ESG til SMV",
    template: "%s | qlim8",
  },
  description:
    "ESG behøver ikke være dyrt. Få overblik over Scope 1, 2 & 3 samt en færdig VSME-rapport. Fra 250 kr/md.",
  openGraph: {
    siteName: "qlim8",
    locale: "da_DK",
    type: "website",
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
