import type { Metadata } from "next";
import EventsDma from "@/page-components/events-dma";

// ISR: the founder portrait and the self-serve switch come from the app.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Dobbelt væsentlighedsanalyse på 3 minutter",
  description:
    "Svar på to korte spørgsmål om ti emner, og se hvad der er væsentligt for din virksomhed: påvirkning på mennesker og miljø, og betydning for din økonomi.",
  alternates: { canonical: "https://qlim8.com/events/dma" },
  openGraph: {
    title: "Dobbelt væsentlighedsanalyse på 3 minutter",
    description: "Se hvad der er væsentligt for din virksomhed. Ti emner, to spørgsmål pr. emne, og dit billede tager form undervejs.",
    url: "https://qlim8.com/events/dma",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Dobbelt væsentlighedsanalyse med qlim8" }],
  },
};

export default function Page() {
  return <EventsDma />;
}
