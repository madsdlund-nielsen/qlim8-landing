import type { Metadata } from "next";
import About from "@/page-components/about";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { ABOUT_PAGE_KEY, ABOUT_COPY } from "@/content/copy/about";
// Shared with the homepage so the two blocks cannot drift apart again.
import { ORGANIZATION } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

// ISR: CMS-published copy/images refresh on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the title already ends in the brand, so the root layout's
  // "%s | qlim8" template would print it twice.
  title: { absolute: "Om os: Mads og historien bag qlim8" },
  description:
    "qlim8 er bygget af Mads Dahlén Lund-Nielsen, stifter og civilingeniør. Læs, hvorfor qlim8 findes, hvordan vi arbejder, og hvor dine data ligger.",
  alternates: { canonical: "https://qlim8.com/om-os" },
  openGraph: {
    title: "Om os: Mads og historien bag qlim8",
    description: "Mød mennesket bag qlim8. Ingen telefonsælgere, et direkte nummer og data på servere i EU.",
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
      <JsonLd schema={ORGANIZATION} />
      <About copy={copy} founderImage={founderImage} />
    </>
  );
}
