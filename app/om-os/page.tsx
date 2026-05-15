import type { Metadata } from "next";
import About from "@/page-components/about";

export const metadata: Metadata = {
  title: "Om qlim8 – Vi demokratiserer klimaregnskab",
  description:
    "qlim8 er grundlagt af en civilingeniør med speciale i energisystemer. Vi gør professionelt klimaregnskab og ESG tilgængeligt for alle danske SMV'er til en overkommelig pris.",
  alternates: { canonical: "https://qlim8.com/om-os" },
  openGraph: {
    title: "Om qlim8 – Vi demokratiserer klimaregnskab",
    description:
      "Vi gør professionelt klimaregnskab og ESG tilgængeligt for alle danske SMV'er.",
    url: "https://qlim8.com/om-os",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Om qlim8" }],
  },
};

export default function Page() {
  return <About />;
}
