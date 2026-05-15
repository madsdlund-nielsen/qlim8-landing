import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";

export const metadata: Metadata = {
  title: "Priser | qlim8 – Starter, Premium & Enterprise",
  description:
    "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 750 kr/md. Alle priser er ekskl. moms.",
  alternates: { canonical: "https://qlim8.com/priser" },
  openGraph: {
    title: "Priser | qlim8 – Starter, Premium & Enterprise",
    description:
      "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 750 kr/md.",
    url: "https://qlim8.com/priser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 priser" }],
  },
};

export default function Page() {
  return <Pricing />;
}
