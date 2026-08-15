import type { Metadata } from "next";
import About from "@/page-components/about";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { ABOUT_PAGE_KEY, ABOUT_COPY } from "@/content/copy/about";
// Shared with the homepage so the two blocks cannot drift apart again.
import { ORGANIZATION } from "@/lib/schema";

// ISR: CMS-published copy/images refresh on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Om qlim8: Vi demokratiserer klimaregnskab",
  description:
    "qlim8 er grundlagt af en civilingeniør med speciale i energisystemer. Vi gør professionelt klimaregnskab og ESG tilgængeligt for alle danske SMV'er til en overkommelig pris.",
  alternates: { canonical: "https://qlim8.com/om-os" },
  openGraph: {
    title: "Om qlim8: Vi demokratiserer klimaregnskab",
    description:
      "Vi gør professionelt klimaregnskab og ESG tilgængeligt for alle danske SMV'er.",
    url: "https://qlim8.com/om-os",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Om qlim8" }],
  },
};

export default async function Page() {
  const [copy, imageCopy] = await Promise.all([
    resolvePageCopy(ABOUT_PAGE_KEY, ABOUT_COPY),
    fetchMarketingCopy("about.images", "da"),
  ]);
  const founderImage = cmsImageUrl(imageCopy, "founder");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <About copy={copy} founderImage={founderImage} />
    </>
  );
}
