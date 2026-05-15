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

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "qlim8 ApS",
  url: "https://qlim8.com",
  logo: "https://qlim8.com/favicon.svg",
  description:
    "qlim8 er grundlagt af en civilingeniør med speciale i energisystemer. Vi gør professionelt klimaregnskab og ESG tilgængeligt for alle danske SMV'er.",
  address: { "@type": "PostalAddress", addressCountry: "DK" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "kontakt@qlim8.com",
    telephone: "+45 93 90 13 84",
  },
  sameAs: ["https://app.qlim8.com"],
  taxID: "DK46033736",
  foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "DK" } },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <About />
    </>
  );
}
