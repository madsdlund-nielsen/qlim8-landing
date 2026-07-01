import type { Metadata } from "next";
import Landing from "@/page-components/landing";
import { HOMEPAGE_FAQS, buildFaqSchema, type HomepageFaq } from "@/content/homepage-faqs";
import { fetchMarketingCopy } from "@/lib/cms";

// ISR — CMS-published homepage copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "qlim8 » ESG uden besværet — klimaregnskab til danske SMV'er fra 250 kr/md",
  description:
    "qlim8 henter din bogføring, kategoriserer scope 1-3 automatisk og leverer en VSME-rapport banken og kunderne forstår. Hosted i EU. Fra 250 kr/md.",
  alternates: { canonical: "https://qlim8.com/" },
  openGraph: {
    title: "qlim8 » ESG uden besværet — klimaregnskab til SMV'er",
    description:
      "Automatisk scope 1-3, VSME-rapport på 10 minutter, fuld kontrol over data. Hosted i EU. Fra 250 kr/md.",
    url: "https://qlim8.com/",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8" }],
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "qlim8 ApS",
  url: "https://qlim8.com",
  logo: "https://qlim8.com/favicon.svg",
  description:
    "Automatisk klimaregnskab og ESG-rapportering til danske SMV'er.",
  address: { "@type": "PostalAddress", addressCountry: "DK" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "kontakt@qlim8.com",
    telephone: "+45 93 90 13 84",
  },
  sameAs: ["https://app.qlim8.com"],
  taxID: "DK46033736",
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "qlim8",
  description:
    "Klimaregnskab og ESG-rapporteringsplatform til danske SMV'er. Automatisk scope 1-3, VSME-rapportering, bank- og kunde-rapportering.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "250",
      priceCurrency: "DKK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "250",
        priceCurrency: "DKK",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: "625",
      priceCurrency: "DKK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "625",
        priceCurrency: "DKK",
        unitText: "MONTH",
      },
    },
  ],
  provider: {
    "@type": "Organization",
    name: "qlim8 ApS",
    url: "https://qlim8.com",
  },
};

// CMS-published homepage FAQ override (pageKey "homepage.faqs"), with a fallback
// to the bundled list. Validated to the {q,a}[] shape so malformed copy can't
// break the page or its structured data.
async function resolveFaqs(): Promise<HomepageFaq[]> {
  const copy = await fetchMarketingCopy("homepage.faqs", "da");
  const items = copy?.items;
  if (
    Array.isArray(items) &&
    items.every((i) => i && typeof i.q === "string" && typeof i.a === "string")
  ) {
    return items as HomepageFaq[];
  }
  return HOMEPAGE_FAQS;
}

export default async function Page() {
  const faqs = await resolveFaqs();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />
      <Landing faqs={faqs} />
    </>
  );
}
