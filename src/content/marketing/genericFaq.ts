// Generic qlim8 / ESG FAQ items appended to every marketing page (leaves + hubs)
// on top of each page's own page-specific questions, so every page carries a
// mix of site-appropriate + general questions in both the rendered FAQ and the
// FAQPage JSON-LD. Answers are the vetted homepage copy (src/content/
// homepage-faqs.ts) so nothing here overclaims. Appended with de-dup, so a page
// that already asks one of these keeps its own version.

import type { FaqItem, MarketingCollection } from "./types";

export const GENERIC_ESG_FAQ: FaqItem[] = [
  {
    q: "Hvad er et klimaregnskab?",
    a: "Et klimaregnskab opgør din virksomheds udledning af drivhusgasser (CO₂e) fordelt på Scope 1, 2 og 3. qlim8 bygger det oven på dit eksisterende regnskab: vi henter posteringer fra dit regnskabssystem og elforbrug fra Eloverblik og omregner dem til udledninger med validerede emissionsfaktorer, så du slipper for regneark.",
  },
  {
    q: "Hvad er forskellen på Scope 1, 2 og 3?",
    a: "Scope 1 er direkte udledninger fra kilder, du selv ejer eller kontrollerer, fx egne køretøjer og gasfyr. Scope 2 er indirekte udledninger fra købt energi som el og fjernvarme. Scope 3 dækker resten af værdikæden: indkøb, transport, affald, forretningsrejser, og udgør typisk 70-90 % af en SMV's samlede aftryk. qlim8 beregner alle tre automatisk.",
  },
  {
    q: "Skal min virksomhed lave et klimaregnskab?",
    a: "Der er sjældent et direkte lovkrav for mindre virksomheder, men i praksis bliver et klimaregnskab i stigende grad krævet af banken (til finansiering), af større kunder og i offentlige og private udbud, ofte fordi de selv er underlagt CSRD og skal bruge data fra deres leverandørkæde. qlim8 gør det håndterbart uden ekstern konsulent.",
  },
  {
    q: "Hvor hurtigt kan jeg komme i gang med qlim8?",
    a: "Når dit regnskabssystem er tilkoblet, har du et grundlæggende klimaregnskab samme dag. Qlim8 henter historiske data ved første tilkobling og opdaterer derefter automatisk. Du kan oprette en gratis konto uden kreditkort og prøve platformen med eksempeldata med det samme. Priserne starter ved 300 kr/md.",
  },
];

// A few hub-level questions per section, shown before the generic set on the
// three section landing pages.
export const HUB_FAQ_SEED: Record<MarketingCollection, FaqItem[]> = {
  kundetyper: [
    {
      q: "Understøtter qlim8 min branche?",
      a: "qlim8 er bygget til danske SMV'er på tværs af brancher, fra håndværk og transport til produktion, rådgivning og revision. Klimaregnskabet bygges på dit regnskab og elforbrug, så metoden er den samme uanset branche; det er dine data og din værdikæde, der afgør, hvor udledningerne ligger. Find din branche ovenfor for de konkrete pointer.",
    },
    {
      q: "Hvorfor er qlim8 bygget specifikt til danske virksomheder?",
      a: "Vi henter data native fra danske regnskabssystemer (Dinero, e-conomic, Billy) og elforbrug fra Eloverblik via Energinet, og vi bruger danske emissionsfaktorer. Det betyder, at du slipper for et mapping-projekt og får tal, der passer til dansk regnskabs- og rapporteringskontekst.",
    },
  ],
  produkt: [
    {
      q: "Hvad kan jeg bruge qlim8 til?",
      a: "qlim8 samler klimaregnskabet ét sted: et dashboard med overblik, udforskning af data bag tallene, rapportering (Excel, PDF, VSME) klar til revisor og bank, samt tiltag, scenarier, revisor-adgang og leverandørkæde, så klimaregnskabet bliver et arbejdsredskab hele året, ikke kun en årlig rapport.",
    },
    {
      q: "Kan jeg prøve produktet gratis?",
      a: "Ja. Du kan oprette en gratis konto uden kreditkort og afprøve platformen med eksempeldata. Når du tilkobler dit regnskabssystem, overtager dine egne data dashboardet med det samme.",
    },
  ],
  integrationer: [
    {
      q: "Hvilke systemer kan qlim8 hente data fra?",
      a: "qlim8 integrerer direkte med regnskabssystemerne e-conomic, Dinero og Billy, henter elforbrug fra Eloverblik, og tilbyder et fuldt REST API og en MCP server til skræddersyede setups. En Appelsin-integration er på vej.",
    },
    {
      q: "Skal jeg indtaste data manuelt?",
      a: "Nej: det er hele pointen. qlim8 henter dine posteringer og dit elforbrug automatisk og kategoriserer dem i det rigtige scope, så du undgår manuel indtastning i regneark. Du kan altid gennemgå og justere kategoriseringen.",
    },
  ],
};

export const GENERIC_FAQ_TITLE = "Ofte stillede spørgsmål";

function norm(q: string): string {
  return q.trim().toLowerCase();
}

/** Append items whose question isn't already present (case-insensitive). */
export function mergeFaqItems(existing: FaqItem[], extra: FaqItem[]): FaqItem[] {
  const seen = new Set(existing.map((i) => norm(i.q)));
  const out = [...existing];
  for (const item of extra) {
    if (!seen.has(norm(item.q))) {
      seen.add(norm(item.q));
      out.push(item);
    }
  }
  return out;
}
