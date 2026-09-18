import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { PRICING_PAGE_KEY, PRICING_COPY } from "@/content/copy/pricing";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqPageSchema, buildSoftwareSchema } from "@/lib/schema";
import { buildPricingOffers } from "@/lib/pricingSchema";

// ISR: CMS-published pricing copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Priser: Starter, Premium & Enterprise",
  description:
    "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 1.195 kr/md (ved årlig betaling). Alle priser er ekskl. moms.",
  alternates: { canonical: "https://qlim8.com/priser" },
  openGraph: {
    title: "Priser: Starter, Premium & Enterprise | qlim8",
    description:
      "Vælg den plan der passer til din virksomhed. Starter fra 300 kr/md, Premium fra 1.195 kr/md.",
    url: "https://qlim8.com/priser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 priser" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(PRICING_PAGE_KEY, PRICING_COPY);
  // The same #software entity the homepage emits, with offers built from the
  // resolved (CMS-merged) copy so structured data and the rendered prices agree.
  return (
    <>
      <JsonLd schema={[buildSoftwareSchema(buildPricingOffers(copy)), buildFaqPageSchema(copy.faq.items)]} />
      <Pricing copy={copy} />
    </>
  );
}
