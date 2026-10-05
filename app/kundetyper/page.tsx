import type { Metadata } from "next";
import MarketingHubTemplate from "@/page-components/marketing-hub";
import { KUNDETYPER_HUB } from "@/content/marketing/kundetyper";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildHubMetadata, buildHubJsonLd } from "@/lib/marketingPage";
import { hubCards } from "@/content/navigation";
import type { MarketingHubCopy } from "@/content/marketing/types";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;

export const metadata: Metadata = buildHubMetadata(KUNDETYPER_HUB);

export default async function Page() {
  const cards = hubCards("kundetyper");
  const copy = await resolvePageCopy<MarketingHubCopy>(
    KUNDETYPER_HUB.pageKey,
    KUNDETYPER_HUB.defaults,
  );
  const jsonLd = buildHubJsonLd(KUNDETYPER_HUB, cards, copy.faq?.items);
  return (
    <>
      <JsonLd schema={jsonLd} />
      <MarketingHubTemplate copy={copy} cards={cards} />
    </>
  );
}
