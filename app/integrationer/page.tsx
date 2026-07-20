import type { Metadata } from "next";
import MarketingHubTemplate from "@/page-components/marketing-hub";
import { INTEGRATIONER_HUB } from "@/content/marketing/integrationer";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildHubMetadata, buildHubJsonLd } from "@/lib/marketingPage";
import { hubCards } from "@/content/navigation";
import type { MarketingHubCopy } from "@/content/marketing/types";

export const revalidate = 300;

export const metadata: Metadata = buildHubMetadata(INTEGRATIONER_HUB);

export default async function Page() {
  const cards = hubCards("integrationer");
  const copy = await resolvePageCopy<MarketingHubCopy>(
    INTEGRATIONER_HUB.pageKey,
    INTEGRATIONER_HUB.defaults,
  );
  const jsonLd = buildHubJsonLd(INTEGRATIONER_HUB, cards, copy.faq?.items);
  return (
    <>
      {jsonLd.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <MarketingHubTemplate copy={copy} cards={cards} />
    </>
  );
}
