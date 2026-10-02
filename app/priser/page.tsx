import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { PRICING_PAGE_KEY, PRICING_COPY } from "@/content/copy/pricing";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqPageSchema, buildSoftwareSchema } from "@/lib/schema";
import { fetchPublicPackages } from "@/lib/packages";
import { isSelfServe, offersFromPackages } from "@/lib/packageView";

// ISR: CMS-published package copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

// Sales-led (catalog version 1, or the API cannot be reached): packages
// without prices, behind a demo. Self-serve: the prices are on the page.
export async function generateMetadata(): Promise<Metadata> {
  const selfServe = isSelfServe(await fetchPublicPackages());
  const title = selfServe ? "Pakker og priser: Free, Starter og Premium" : "Pakker: Starter, Premium & Enterprise";
  const description = selfServe
    ? "Free er gratis for altid. Se priserne på Starter og Premium, sammenlign alle pakker, og tal med os om Business og Enterprise."
    : "Se hvad der er i qlim8's pakker, Starter, Premium og Enterprise, og sammenlign dem. Book en demo, så finder vi den pakke der passer til jer.";
  return {
    title,
    description,
    alternates: { canonical: "https://qlim8.com/priser" },
    openGraph: {
      title: `${title} | qlim8`,
      description: selfServe
        ? "Free er gratis for altid. Se priserne på Starter og Premium, og kom i gang i dag."
        : "Se hvad der er i qlim8's pakker, og book en demo, så finder vi den pakke der passer til jer.",
      url: "https://qlim8.com/priser",
      images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 pakker" }],
    },
  };
}

export default async function Page() {
  const [copy, packages] = await Promise.all([
    resolvePageCopy(PRICING_PAGE_KEY, PRICING_COPY),
    fetchPublicPackages(),
  ]);
  // The same #software entity the homepage emits, with the same offers: one
  // per public yearly price, none while the catalog sells nothing by itself.
  return (
    <>
      <JsonLd schema={[buildSoftwareSchema(offersFromPackages(packages)), buildFaqPageSchema(copy.faq.items)]} />
      <Pricing copy={copy} packages={packages} />
    </>
  );
}
