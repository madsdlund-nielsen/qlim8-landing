import type { Metadata } from "next";
import MarketingHubTemplate from "@/page-components/marketing-hub";
import { PRODUKT_HUB } from "@/content/marketing/produkt";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildHubMetadata, buildHubJsonLd } from "@/lib/marketingPage";
import { hubCards } from "@/content/navigation";
import type { MarketingHubCopy } from "@/content/marketing/types";

export const revalidate = 300;

export const metadata: Metadata = buildHubMetadata(PRODUKT_HUB);

export default async function Page() {
  const cards = hubCards("produkt");
  const copy = await resolvePageCopy<MarketingHubCopy>(
    PRODUKT_HUB.pageKey,
    PRODUKT_HUB.defaults,
  );
  const jsonLd = buildHubJsonLd(PRODUKT_HUB, cards);
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
