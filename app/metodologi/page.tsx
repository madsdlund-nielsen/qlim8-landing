import type { Metadata } from "next";
import Metodologi from "@/page-components/metodologi";
import { resolvePageCopy } from "@/lib/pageCopy";
import { METHODOLOGY_PAGE_KEY, METHODOLOGY_COPY } from "@/content/copy/methodology";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildTechArticleSchema } from "@/lib/schema";
import { contentDate } from "@/lib/contentDates";

// ISR: CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Metodologi: sådan beregner qlim8 dit klimaregnskab",
  description:
    "Alle emissionsfaktorer, datakilder og beregningsmetoder vi bruger til at producere dit scope 1-3 klimaregnskab. DEFRA, BEIS, Klimakompasset, GHG Protocol, fuld åbenhed, ingen sorte bokse.",
  alternates: { canonical: "https://qlim8.com/metodologi" },
  openGraph: {
    title: "qlim8 metodologi: alle emissionsfaktorer og beregninger",
    description:
      "Fuld åbenhed om kilder, faktorer og beregningsmetoder. DEFRA, BEIS, Klimakompasset, GHG Protocol.",
    url: "https://qlim8.com/metodologi",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 metodologi" }],
  },
};

// Priority 0.8 in the sitemap and, until now, the only high-priority page
// with no structured data at all.
const PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "Metodologi: sådan beregner qlim8 dit klimaregnskab",
    description:
      "Alle emissionsfaktorer, datakilder og beregningsmetoder bag et scope 1-3 klimaregnskab i qlim8: DEFRA, BEIS, Klimakompasset og GHG Protocol.",
    path: "/metodologi",
    dateModified: contentDate("/metodologi"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Metodologi", href: "/metodologi" },
  ]),
];

export default async function Page() {
  const copy = await resolvePageCopy(METHODOLOGY_PAGE_KEY, METHODOLOGY_COPY);
  return (
    <>
      <JsonLd schema={PAGE_SCHEMA} />
      <Metodologi copy={copy} />
    </>
  );
}
