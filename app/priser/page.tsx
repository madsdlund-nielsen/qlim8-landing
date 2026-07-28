import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { PRICING_PAGE_KEY, PRICING_COPY, type PricingCopy } from "@/content/copy/pricing";

// ISR — CMS-published pricing copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Priser | qlim8 – Starter, Premium & Enterprise",
  description:
    "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 1.195 kr/md (ved årlig betaling). Alle priser er ekskl. moms.",
  alternates: { canonical: "https://qlim8.com/priser" },
  openGraph: {
    title: "Priser | qlim8 – Starter, Premium & Enterprise",
    description:
      "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 1.195 kr/md.",
    url: "https://qlim8.com/priser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 priser" }],
  },
};

// Built from the resolved copy so CMS-edited prices stay in sync with the
// structured data search engines read.
function buildProductSchema(copy: PricingCopy) {
  const offer = (name: string, description: string, price: number) => ({
    "@type": "Offer",
    name,
    description,
    price: String(price),
    priceCurrency: "DKK",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(price),
      priceCurrency: "DKK",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
      unitText: "MONTH",
    },
    availability: "https://schema.org/InStock",
    url: "https://qlim8.com/priser",
  });

  const { starter, premium } = copy.prices;
  return {
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
      lowPrice: String(Math.min(starter.yearlyDkk, starter.monthlyDkk)),
      highPrice: String(Math.max(premium.yearlyDkk, premium.monthlyDkk)),
      offerCount: 3,
      offers: [
        offer("Starter (årlig)", "qlim8 Starter ved årlig betaling.", starter.yearlyDkk),
        offer("Starter (månedlig)", "qlim8 Starter ved månedlig betaling.", starter.monthlyDkk),
        offer("Premium (årlig)", "qlim8 Premium ved årlig betaling.", premium.yearlyDkk),
        offer("Premium (månedlig)", "qlim8 Premium ved månedlig betaling.", premium.monthlyDkk),
        {
          "@type": "Offer",
          name: "Enterprise",
          description:
            "Custom volumen, supply-chain modul, SSO og dedikeret support. Kontakt for pris.",
          priceCurrency: "DKK",
          availability: "https://schema.org/InStock",
          url: "https://qlim8.com/kontakt",
        },
      ],
    },
  };
}

export default async function Page() {
  const copy = await resolvePageCopy(PRICING_PAGE_KEY, PRICING_COPY);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductSchema(copy)) }}
      />
      <Pricing copy={copy} />
    </>
  );
}
