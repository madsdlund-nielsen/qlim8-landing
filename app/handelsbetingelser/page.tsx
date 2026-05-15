import type { Metadata } from "next";
import Handelsbetingelser from "@/page-components/handelsbetingelser";

export const metadata: Metadata = {
  title: "Handelsbetingelser | qlim8",
  description:
    "qlim8's handelsbetingelser for ESG-platformen (SaaS). Aftalegrundlag, abonnement, priser, databehandling, ansvar og opsigelse for erhvervsdrivende kunder.",
  alternates: { canonical: "https://qlim8.com/handelsbetingelser" },
  openGraph: {
    title: "Handelsbetingelser | qlim8",
    description: "qlim8's handelsbetingelser for ESG-platformen.",
    url: "https://qlim8.com/handelsbetingelser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 handelsbetingelser" }],
  },
};

export default function Page() {
  return <Handelsbetingelser />;
}
