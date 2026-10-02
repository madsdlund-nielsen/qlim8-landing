import type { Metadata } from "next";
import Landing from "@/page-components/landing";
import { HOMEPAGE_FAQS, buildFaqSchema, type HomepageFaq } from "@/content/homepage-faqs";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { HOME_PAGE_KEY, HOME_COPY } from "@/content/copy/home";
import { JsonLd } from "@/components/JsonLd";
import type { LandingImages } from "@/page-components/landing";
import { ORGANIZATION, WEBSITE, buildSoftwareSchema } from "@/lib/schema";
import { fetchPublicPackages } from "@/lib/packages";
import { isSelfServe, offersFromPackages } from "@/lib/packageView";

// ISR: CMS-published homepage copy refreshes on this cadence (busted instantly
// by the app's revalidate webhook on publish).
export const revalidate = 300;

// The call to action follows the app's catalog, like the buttons on the page.
export async function generateMetadata(): Promise<Metadata> {
  const cta = isSelfServe(await fetchPublicPackages()) ? "Kom gratis i gang, eller book en demo." : "Book en demo.";
  const description = `Klimaregnskab og ESG rapporter til små og mellemstore virksomheder, hentet direkte fra dit regnskabssystem. ${cta}`;
  return {
    // `absolute` opts out of the root layout's "%s | qlim8" title template so the
    // homepage title isn't suffixed with a second copy of the brand name.
    title: { absolute: "qlim8 - ESG er nemt" },
    description,
    alternates: { canonical: "https://qlim8.com/" },
    openGraph: {
      title: "qlim8 - ESG er nemt",
      description,
      url: "https://qlim8.com/",
      images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8" }],
    },
  };
}

// Organization and WebSite come from src/lib/schema.ts, where they are
// @id-addressable and shared with /om-os rather than copy-pasted into it. The
// SoftwareApplication is the same #software entity /priser emits.

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
  const [copy, faqs, images, packages] = await Promise.all([
    resolvePageCopy(HOME_PAGE_KEY, HOME_COPY),
    resolveFaqs(),
    resolveLandingImages(),
    fetchPublicPackages(),
  ]);
  return (
    <>
      <JsonLd
        schema={[
          ORGANIZATION,
          WEBSITE,
          // The same offers /priser emits, from the same packages API.
          buildSoftwareSchema(offersFromPackages(packages)),
          buildFaqSchema(faqs),
        ]}
      />
      <Landing copy={copy} faqs={faqs} images={images} packages={packages} />
    </>
  );
}
