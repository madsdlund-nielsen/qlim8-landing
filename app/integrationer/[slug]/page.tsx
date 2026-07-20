import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketingPageTemplate from "@/page-components/marketing-page";
import { getCollection, getNode } from "@/content/marketing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { buildMarketingMetadata, buildMarketingJsonLd } from "@/lib/marketingPage";
import type { MarketingPageCopy } from "@/content/marketing/types";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return getCollection("integrationer").map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const node = getNode("integrationer", (await params).slug);
  return node ? buildMarketingMetadata(node) : {};
}

export default async function Page({ params }: Props) {
  const node = getNode("integrationer", (await params).slug);
  if (!node) notFound();
  const copy = await resolvePageCopy<MarketingPageCopy>(node.pageKey, node.defaults);
  const jsonLd = buildMarketingJsonLd(node, copy);
  return (
    <>
      {jsonLd.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <MarketingPageTemplate node={node} copy={copy} />
    </>
  );
}
