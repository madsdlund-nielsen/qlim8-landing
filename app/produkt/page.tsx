import type { Metadata } from "next";
import Produkt from "@/page-components/produkt";

export const metadata: Metadata = {
  title: "Produktet | qlim8 – Klimaregnskab gjort simpelt",
  description:
    "Udforsk qlim8's funktioner: Command Center, Carbon Ledger, AI-kategorisering og VSME-rapportering. Alt hvad din virksomhed behøver til et revisionsklart klimaregnskab.",
  alternates: { canonical: "https://qlim8.com/produkt" },
  openGraph: {
    title: "Produktet | qlim8 – Klimaregnskab gjort simpelt",
    description:
      "Command Center, Carbon Ledger, AI-kategorisering og VSME-rapportering.",
    url: "https://qlim8.com/produkt",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 produkt" }],
  },
};

export default function Page() {
  return <Produkt />;
}
