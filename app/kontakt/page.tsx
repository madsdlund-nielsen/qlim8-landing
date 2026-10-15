import type { Metadata } from "next";
import Kontakt from "@/page-components/kontakt";
import { resolvePageCopy } from "@/lib/pageCopy";
import { CONTACT_PAGE_KEY, CONTACT_COPY } from "@/content/copy/contact";
import { JsonLd } from "@/components/JsonLd";
import { CONTACT_PAGE_SCHEMA } from "@/lib/pageSchemas";

// ISR: CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kontakt: ring, skriv eller tag en uformel snak",
  description:
    "Ring direkte på +45 93 90 13 84, skriv til os, eller book en uformel snak på 15 minutter. Ingen telefonsælgere, bare et menneske, der kender qlim8.",
  alternates: { canonical: "https://qlim8.com/kontakt" },
  openGraph: {
    title: "Kontakt qlim8: ring, skriv eller tag en snak",
    description: "Ring direkte på +45 93 90 13 84, eller skriv til os. Ingen telefonsælgere, bare en rolig snak.",
    url: "https://qlim8.com/kontakt",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Kontakt qlim8" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(CONTACT_PAGE_KEY, CONTACT_COPY);
  return (
    <>
      <JsonLd schema={CONTACT_PAGE_SCHEMA} />
      <Kontakt copy={copy} />
    </>
  );
}
