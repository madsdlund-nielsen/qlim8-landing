import type { Metadata } from "next";
import Privatlivspolitik from "@/page-components/privatlivspolitik";

export const metadata: Metadata = {
  title: "Privatlivspolitik | qlim8",
  description:
    "Sådan behandler qlim8 ApS personoplysninger om besøgende, brugere og kunder — dataansvar, retsgrundlag, opbevaring og dine rettigheder under GDPR.",
  alternates: { canonical: "https://qlim8.com/privatlivspolitik" },
  openGraph: {
    title: "Privatlivspolitik | qlim8",
    description: "Sådan behandler qlim8 personoplysninger.",
    url: "https://qlim8.com/privatlivspolitik",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 privatlivspolitik" }],
  },
};

export default function Page() {
  return <Privatlivspolitik />;
}
