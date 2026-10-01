import type { Metadata } from "next";
import Pricing from "@/page-components/pricing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { PRICING_PAGE_KEY, PRICING_COPY } from "@/content/copy/pricing";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqPageSchema, buildSoftwareSchema } from "@/lib/schema";
import { fetchPublicPackages } from "@/lib/packages";
import { offersFromPackages } from "@/lib/packageView";

// ISR: CMS-published package copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Pakker: Starter, Premium & Enterprise",
  description:
    "Se hvad der er i qlim8's pakker, Starter, Premium og Enterprise, og sammenlign dem. Book en demo, så finder vi den pakke der passer til jer.",
  alternates: { canonical: "https://qlim8.com/priser" },
  openGraph: {
    title: "Pakker: Starter, Premium & Enterprise | qlim8",
    description:
      "Se hvad der er i qlim8's pakker, og book en demo, så finder vi den pakke der passer til jer.",
    url: "https://qlim8.com/priser",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 pakker" }],
  },
};

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
