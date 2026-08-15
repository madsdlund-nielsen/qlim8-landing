import type { Metadata } from "next";
import Landing from "@/page-components/landing";
import { HOMEPAGE_FAQS, buildFaqSchema, type HomepageFaq } from "@/content/homepage-faqs";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { HOME_PAGE_KEY, HOME_COPY } from "@/content/copy/home";
import { PRICING_COPY } from "@/content/copy/pricing";
import type { LandingImages } from "@/page-components/landing";
import { ORGANIZATION, WEBSITE, buildSoftwareSchema } from "@/lib/schema";

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

// The price fields come from one argument so they can't drift apart, and the
// figures come from PRICING_COPY: the same source /priser builds its schema
// from. Uses the yearly-billed effective prices, matching the "fra 300 kr/md"
// claim in the page description.
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

// Organization and WebSite now come from src/lib/schema.ts, where they are
// @id-addressable and shared with /om-os rather than copy-pasted into it.
const SOFTWARE_SCHEMA = buildSoftwareSchema([
  softwareOffer("Starter", PRICING_COPY.prices.starter.yearlyDkk),
  softwareOffer("Premium", PRICING_COPY.prices.premium.yearlyDkk),
]);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }}
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
