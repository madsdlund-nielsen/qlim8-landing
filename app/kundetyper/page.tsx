import type { Metadata } from "next";
import MarketingHubTemplate from "@/page-components/marketing-hub";
import { KUNDETYPER_HUB } from "@/content/marketing/kundetyper";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildHubMetadata } from "@/lib/marketingPage";
import { hubCards } from "@/content/navigation";
import type { MarketingHubCopy } from "@/content/marketing/types";

export const revalidate = 300;

export const metadata: Metadata = buildHubMetadata(KUNDETYPER_HUB);

export default async function Page() {
  const copy = await resolvePageCopy<MarketingHubCopy>(
    KUNDETYPER_HUB.pageKey,
    KUNDETYPER_HUB.defaults,
  );
  return <MarketingHubTemplate copy={copy} cards={hubCards("kundetyper")} />;
}
