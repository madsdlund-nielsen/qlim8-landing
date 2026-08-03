import type { Metadata } from "next";
import Nyhedsbrev from "@/page-components/nyhedsbrev";

// Canonical stays free of query parameters: campaign links (?ref=, ?utm_*)
// must not register as separate pages.
export const metadata: Metadata = {
  title: "Nyhedsbrev | qlim8",
  description:
    "Få konkrete guides til klimaregnskab, scope 1-3, VSME og L193 direkte i indbakken. Skrevet til danske SMV'er, uden konsulentjargon og uden spam.",
  alternates: { canonical: "https://qlim8.com/nyhedsbrev" },
  openGraph: {
    title: "Nyhedsbrev | qlim8",
    description:
      "ESG-viden i indbakken: klimaregnskab, compliance og bæredygtighed for danske SMV'er.",
    url: "https://qlim8.com/nyhedsbrev",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 nyhedsbrev" }],
  },
};

export default function Page() {
  return <Nyhedsbrev />;
}
