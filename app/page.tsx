import type { Metadata } from "next";
import Landing from "@/page-components/landing";
import { HOMEPAGE_FAQS, buildFaqSchema, type HomepageFaq } from "@/content/homepage-faqs";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { resolvePageCopy } from "@/lib/pageCopy";
import { applyPriceTokens } from "@/lib/priceTokens";
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
// Self-serve: the copywriter's description (a free profile, no binding).
// Sales-led (catalog v1, or the API cannot be reached): the earlier
// description, which promises no free start.
export async function generateMetadata(): Promise<Metadata> {
  const selfServe = isSelfServe(await fetchPublicPackages());
  const title = "Klimaregnskab og ESG-rapport til danske SMV'er";
  const description = selfServe
    ? "Få ro i maven med et klimaregnskab bygget oven på din bogføring i e-conomic, Dinero eller Billy. Gratis profil uden binding og personlig hjælp."
    : "Klimaregnskab og ESG rapporter til små og mellemstore virksomheder, hentet direkte fra dit regnskabssystem. Book en demo.";
  return {
    // The root layout's "%s | qlim8" template puts the brand after the title.
    title,
    description,
    alternates: { canonical: "https://qlim8.com/" },
    openGraph: {
      title: `${title} | qlim8`,
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
    // A price in an answer is a token: filled from the packages API, or the
    // sentence dropped (src/lib/priceTokens.ts). Also what the FAQPage JSON-LD sees.
    return applyPriceTokens(items as HomepageFaq[], await fetchPublicPackages());
  }
  return applyPriceTokens(HOMEPAGE_FAQS, await fetchPublicPackages());
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
