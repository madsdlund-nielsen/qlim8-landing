import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";

export const metadata: Metadata = {
  title: "Priser | qlim8 – Starter, Premium & Enterprise",
  description:
    "Vælg den plan der passer til din virksomhed. Starter fra 250 kr/md, Premium fra 625 kr/md (ved årlig betaling). Alle priser er ekskl. moms.",
  alternates: { canonical: "https://qlim8.com/priser" },
  openGraph: {
    title: "Priser | qlim8 – Starter, Premium & Enterprise",
    description:
      "Vælg den plan der passer til din virksomhed. Starter fra 250 kr/md, Premium fra 625 kr/md.",
    url: "https://qlim8.com/priser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 priser" }],
  },
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "qlim8",
  description:
    "Automatisk klimaregnskab og ESG-rapportering til danske SMV'er. Henter bogføring, kategoriserer scope 1-3 og leverer VSME-rapporter.",
  brand: { "@type": "Brand", name: "qlim8" },
  url: "https://qlim8.com/priser",
  image: "https://qlim8.com/opengraph.jpg",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "DKK",
    lowPrice: "250",
    highPrice: "750",
    offerCount: 3,
    offers: [
      {
        "@type": "Offer",
        name: "Starter (årlig)",
        description: "qlim8 Starter ved årlig betaling.",
        price: "250",
        priceCurrency: "DKK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "250",
          priceCurrency: "DKK",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: "https://qlim8.com/priser",
      },
      {
        "@type": "Offer",
        name: "Starter (månedlig)",
        description: "qlim8 Starter ved månedlig betaling.",
        price: "300",
        priceCurrency: "DKK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "300",
          priceCurrency: "DKK",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: "https://qlim8.com/priser",
      },
      {
        "@type": "Offer",
        name: "Premium (årlig)",
        description: "qlim8 Premium ved årlig betaling.",
        price: "625",
        priceCurrency: "DKK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "625",
          priceCurrency: "DKK",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: "https://qlim8.com/priser",
      },
      {
        "@type": "Offer",
        name: "Premium (månedlig)",
        description: "qlim8 Premium ved månedlig betaling.",
        price: "750",
        priceCurrency: "DKK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "750",
          priceCurrency: "DKK",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: "https://qlim8.com/priser",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        description: "Custom volumen, supply-chain modul, SSO og dedikeret support. Kontakt for pris.",
        priceCurrency: "DKK",
        availability: "https://schema.org/InStock",
        url: "https://qlim8.com/kontakt",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
      />
      <Pricing />
    </>
  );
}
