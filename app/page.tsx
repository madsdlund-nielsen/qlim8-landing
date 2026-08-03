import type { Metadata } from "next";
import Landing from "@/page-components/landing";
import { HOMEPAGE_FAQS, buildFaqSchema, type HomepageFaq } from "@/content/homepage-faqs";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { HOME_PAGE_KEY, HOME_COPY } from "@/content/copy/home";
import { PRICING_COPY } from "@/content/copy/pricing";
import type { LandingImages } from "@/page-components/landing";

// ISR: CMS-published homepage copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | qlim8" title template so the
  // homepage title isn't suffixed with a second copy of the brand name.
  title: { absolute: "qlim8 - ESG er nemt" },
  description:
    "Klimaregnskab og ESG rapporter til små og mellemstore virksomheder. Start i dag fra 300 kr/md.",
  alternates: { canonical: "https://qlim8.com/" },
  openGraph: {
    title: "qlim8 - ESG er nemt",
    description:
      "Klimaregnskab og ESG rapporter til små og mellemstore virksomheder. Start i dag fra 300 kr/md.",
    url: "https://qlim8.com/",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8" }],
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "qlim8",
  url: "https://qlim8.com",
  logo: "https://qlim8.com/favicon.svg",
  description:
    "Automatisk klimaregnskab og ESG rapport til små og mellemstore virksomheder.",
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

// Both price fields come from one argument so they can't drift apart, and the
// figures themselves come from PRICING_COPY: the same source /priser builds its
// schema from. Uses the yearly-billed effective prices, matching the "fra 300
// kr/md" claim in the page description.
const softwareOffer = (name: string, monthlyDkk: number) => ({
  "@type": "Offer",
  name,
  price: String(monthlyDkk),
  priceCurrency: "DKK",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: String(monthlyDkk),
    priceCurrency: "DKK",
    unitText: "MONTH",
  },
});

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "qlim8",
  description:
    "qlim8 er en platform til automatisering af klimaregnskab og ESG rapporter der dækker alle 3 scopes.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    softwareOffer("Starter", PRICING_COPY.prices.starter.yearlyDkk),
    softwareOffer("Premium", PRICING_COPY.prices.premium.yearlyDkk),
  ],
  provider: {
    "@type": "Organization",
    name: "qlim8",
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

async function resolveLandingImages(): Promise<LandingImages> {
  const copy = await fetchMarketingCopy("landing.images", "da");
  return {
    hero: cmsImageUrl(copy, "hero"),
    features: [
      cmsImageUrl(copy, "feature1"),
      cmsImageUrl(copy, "feature2"),
      cmsImageUrl(copy, "feature3"),
    ],
  };
}

export default async function Page() {
  const [copy, faqs, images] = await Promise.all([
    resolvePageCopy(HOME_PAGE_KEY, HOME_COPY),
    resolveFaqs(),
    resolveLandingImages(),
  ]);
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
      <Landing copy={copy} faqs={faqs} images={images} />
    </>
  );
}
