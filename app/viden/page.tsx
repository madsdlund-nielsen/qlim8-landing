import type { Metadata } from "next";
import Viden from "@/page-components/viden";

export const metadata: Metadata = {
  title: "Viden om ESG & Klimaregnskab | qlim8",
  description:
    "Artikler og guides om klimaregnskab, VSME-standarden, Scope 1-3 emissioner og ESG-compliance for danske virksomheder. Hold dig opdateret med de seneste krav.",
  alternates: { canonical: "https://qlim8.com/viden" },
  openGraph: {
    title: "Viden om ESG & Klimaregnskab | qlim8",
    description:
      "Artikler og guides om klimaregnskab, VSME-standarden og Scope 1-3 emissioner.",
    url: "https://qlim8.com/viden",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 viden" }],
  },
};

export default function Page() {
  return <Viden />;
}
