import type { Metadata } from "next";
import Demo from "@/page-components/demo";

// Canonical stays free of query parameters: campaign links (?ref=, ?utm_*)
// must not register as separate pages.
export const metadata: Metadata = {
  title: "Se qlim8 i praksis",
  description:
    "En film på godt to minutter, der følger en ny bruger fra oprettelse til færdig VSME-rapport: data fra regnskabssystemet, scope 1-3, beregninger og rapport.",
  alternates: { canonical: "https://qlim8.com/demo" },
  openGraph: {
    title: "Se qlim8 i praksis | qlim8",
    description: "Film af platformen: fra oprettelse og regnskabsdata til scope 1-3 og en færdig VSME-rapport.",
    url: "https://qlim8.com/demo",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8: se platformen i praksis" }],
  },
};

export default function Page() {
  return <Demo />;
}
