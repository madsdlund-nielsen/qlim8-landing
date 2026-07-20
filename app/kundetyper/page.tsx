import type { Metadata } from "next";
import MarketingHubTemplate from "@/page-components/marketing-hub";
import { KUNDETYPER_HUB } from "@/content/marketing/kundetyper";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildHubMetadata, buildHubJsonLd } from "@/lib/marketingPage";
import { hubCards } from "@/content/navigation";
import type { MarketingHubCopy } from "@/content/marketing/types";

export const revalidate = 300;

export const metadata: Metadata = buildHubMetadata(KUNDETYPER_HUB);

export default async function Page() {
  const cards = hubCards("kundetyper");
  const copy = await resolvePageCopy<MarketingHubCopy>(
    KUNDETYPER_HUB.pageKey,
    KUNDETYPER_HUB.defaults,
  );
  const jsonLd = buildHubJsonLd(KUNDETYPER_HUB, cards);
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
