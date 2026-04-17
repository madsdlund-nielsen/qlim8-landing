import type { Metadata } from "next";
import Kontakt from "@/page-components/kontakt";

export const metadata: Metadata = {
  title: "Kontakt qlim8 – Vi er her for at hjælpe",
  description:
    "Har du spørgsmål om klimaregnskab, ESG eller qlim8? Kontakt os via formularen eller send en email. Vi svarer altid hurtigt.",
  alternates: { canonical: "https://qlim8.com/kontakt" },
  openGraph: {
    title: "Kontakt qlim8 – Vi er her for at hjælpe",
    description:
      "Har du spørgsmål om klimaregnskab, ESG eller qlim8? Vi svarer altid hurtigt.",
    url: "https://qlim8.com/kontakt",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Kontakt qlim8" }],
  },
};

export default function Page() {
  return <Kontakt />;
}
