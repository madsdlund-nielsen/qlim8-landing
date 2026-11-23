// The facts behind the "[konkurrent] alternativ" articles, the page on the large
// platforms and the hub, all in the `Sammenligning` category.
//
// Every claim about a vendor other than qlim8 was read from that vendor's own
// website on the OPDATERET date. `kilde` is documentation: it is the URL the
// answer was read from, it is never rendered (not in the table, not in the .md
// twin, not in the JSON-LD), and it is kept so a claim can be documented if a
// vendor asks. A cell is changed only after opening its source again, and
// OPDATERET is moved when that has been done. A competitor is never "Nej"
// without the vendor's own statement; where the vendor says nothing the cell is
// "Ikke oplyst".
//
// qlim8's own column comes from the app's catalog and code
// (scripts/fixtures/public-packages.v4.json and the integration catalog), not
// from a website. A qlim8 price appears only as a price token inside [[ ... ]]
// (src/lib/priceTokens.ts), each segment a sentence that can be removed.
//
// Plain imports with extensions, no `@/` alias: `npm test` runs this directly.
// The row labels, the cells and the prose are Danish; see
// docs/da/marketing/sammenligningssider.md for how to keep them true.
import type { Celle, Funktion, Leverandoer } from "./typer.ts";

/** The date every competitor cell was last checked against the vendor's own site (ISO). */
export const OPDATERET = "2026-11-23";

const IO: Celle = { svar: "Ikke oplyst" };

// ---------------------------------------------------------------------------
// The five Danish vendors: the shared table of the alternativ pages and the hub
// ---------------------------------------------------------------------------

export const FUNKTIONER: Funktion[] = [
  { key: "scope12", label: "Scope 1 og 2" },
  { key: "scope3", label: "Scope 3" },
  { key: "regnskab", label: "Henter data fra danske regnskabssystemer" },
  { key: "eloverblik", label: "Elforbrug fra Eloverblik" },
  { key: "vsBasis", label: "VS Basis-rapport" },
  { key: "vsUdvidet", label: "VS Udvidet (Comprehensive)" },
  { key: "esrs", label: "CSRD/ESRS-rapportering" },
  { key: "dma", label: "Dobbelt væsentlighedsanalyse" },
  { key: "audit", label: "Audit trail på beregningerne" },
  { key: "revisor", label: "Adgang for revisor" },
  { key: "leverandoer", label: "Leverandørportal" },
  { key: "reduktion", label: "Reduktionsmål og klimaplan" },
  { key: "sbti", label: "SBTi-mål" },
  { key: "api", label: "Åben API eller MCP" },
  { key: "hosting", label: "Primær hosting i EU" },
  { key: "sikkerhed", label: "ISO 27001 eller SOC 2" },
  { key: "gratis", label: "Gratis plan" },
  { key: "selvbetjening", label: "Køb uden salgsmøde" },
  { key: "raadgivning", label: "Rådgivning som tilkøb" },
];

const QLIM8_DANSK: Leverandoer = {
  key: "qlim8",
  navn: "qlim8",
  website: "https://qlim8.com",
  pris: {
    tekst:
      "Gratis-pakke uden udløbsdato. [[Basis {pris:starter} og Udvidet {pris:premium} pr. md., betalt årligt, ekskl. moms.]] [[Komplet {pris:business} pr. md.]] Koncern efter samtale.",
  },
  celler: {
    scope12: { svar: "Ja" },
    scope3: { svar: "Ja" },
    regnskab: { svar: "Ja", note: "e-conomic, Dinero, Billy, Uniconta (beta)" },
    eloverblik: { svar: "Ja", note: "time for time" },
    vsBasis: { svar: "Ja" },
    vsUdvidet: { svar: "Ja" },
    esrs: { svar: "Ja" },
    dma: { svar: "Ja" },
    audit: { svar: "Ja" },
    revisor: { svar: "Ja", note: "gratis revisorkonto" },
    leverandoer: { svar: "Delvist", note: "værdikæde via CVR, portal planlagt" },
    reduktion: { svar: "Ja" },
    sbti: { svar: "Nej", note: "planlagt" },
    api: { svar: "Ja", note: "REST API og MCP-server" },
    hosting: { svar: "Ja", note: "Tyskland" },
    sikkerhed: { svar: "Nej" },
    gratis: { svar: "Ja", note: "uden udløbsdato" },
    selvbetjening: { svar: "Ja", note: "pakker med Køb-knap" },
    raadgivning: { svar: "Nej", note: "via partnere" },
  },
};

const VERARCA: Leverandoer = {
  key: "verarca",
  navn: "Verarca",
  website: "https://verarca.dk",
  pris: {
    tekst: "299 kr./md. betalt årligt (scope 1 og 2, mikrovirksomhed). Managed: 499 kr./md. VS-moduler er tilkøb.",
    kilde: "https://verarca.dk/priser/",
  },
  celler: {
    scope12: { svar: "Ja", kilde: "https://verarca.dk/klimaregnskab/" },
    scope3: { svar: "Ja", note: "i scope 1, 2 og 3-pakkerne", kilde: "https://verarca.dk/priser/" },
    regnskab: {
      svar: "Ja",
      note: "e-conomic, Uniconta, Business Central, E-Komplet",
      kilde: "https://verarca.dk/integrationer/",
    },
    eloverblik: { svar: "Ja", kilde: "https://verarca.dk/tilfoej-integration-til-eloverblik/" },
    vsBasis: { svar: "Ja", note: "tilkøb", kilde: "https://verarca.dk/priser/" },
    vsUdvidet: { svar: "Ja", note: "tilkøb", kilde: "https://verarca.dk/priser/" },
    esrs: IO,
    dma: IO,
    audit: { svar: "Ja", kilde: "https://verarca.dk/klimaregnskab/" },
    revisor: IO,
    leverandoer: IO,
    reduktion: { svar: "Ja", note: "reduktionsmål i dashboard", kilde: "https://verarca.dk/priser/" },
    sbti: { svar: "Delvist", note: "datagrundlag til SBTi", kilde: "https://verarca.dk/certificeringer-sbti/" },
    api: { svar: "Delvist", note: "API-eksport af resultater", kilde: "https://verarca.dk/priser/" },
    hosting: IO,
    sikkerhed: IO,
    gratis: IO,
    selvbetjening: IO,
    raadgivning: { svar: "Ja", note: "Managed Carbon Service", kilde: "https://verarca.dk/priser/" },
  },
};

const GRONLOG: Leverandoer = {
  key: "gronlog",
  navn: "Grønlog",
  website: "https://gronlog.dk",
  pris: {
    tekst: "Gratis 0 kr. Starter 590 kr./md. Professional 1.490 kr./md. Enterprise efter tilbud.",
    kilde: "https://gronlog.dk/pricing",
  },
  celler: {
    scope12: { svar: "Ja", note: "også i gratisplanen", kilde: "https://gronlog.dk/pricing" },
    scope3: { svar: "Ja", note: "i de betalte planer", kilde: "https://gronlog.dk/pricing" },
    regnskab: { svar: "Ja", note: "Dinero, e-conomic og Billy", kilde: "https://gronlog.dk/funktioner/integrationer" },
    eloverblik: IO,
    vsBasis: { svar: "Ja", note: "gratisplanen kun visning", kilde: "https://gronlog.dk/pricing" },
    vsUdvidet: IO,
    esrs: { svar: "Delvist", note: "fuld ESRS i Enterprise", kilde: "https://gronlog.dk/pricing" },
    dma: IO,
    audit: { svar: "Ja", kilde: "https://gronlog.dk/funktioner/emissioner" },
    revisor: IO,
    leverandoer: { svar: "Ja", note: "i Professional", kilde: "https://gronlog.dk/pricing" },
    reduktion: { svar: "Ja", note: "scenarie- og målsætningsmodul", kilde: "https://gronlog.dk/compare/klimakompasset" },
    sbti: IO,
    api: { svar: "Delvist", note: "API under udvikling", kilde: "https://gronlog.dk/developers" },
    hosting: { svar: "Ja", note: "Frankfurt", kilde: "https://gronlog.dk/security" },
    sikkerhed: { svar: "Delvist", note: "via leverandører", kilde: "https://gronlog.dk/security" },
    gratis: { svar: "Ja", note: "scope 1 og 2", kilde: "https://gronlog.dk/pricing" },
    selvbetjening: { svar: "Ja", kilde: "https://gronlog.dk/pricing" },
    raadgivning: IO,
  },
};

const ECOMETRICS: Leverandoer = {
  key: "ecometrics",
  navn: "EcoMetrics",
  website: "https://ecometrics.dk",
  pris: {
    tekst: "Basic gratis. Plus 4.950 kr./år, Pro 11.950 kr./år, ekskl. moms.",
    kilde: "https://ecometrics.dk/pricing",
  },
  celler: {
    scope12: { svar: "Ja", kilde: "https://ecometrics.dk/pricing" },
    scope3: { svar: "Ja", note: "også i gratisplanen", kilde: "https://ecometrics.dk/pricing" },
    regnskab: {
      svar: "Ja",
      note: "e-conomic, Dinero, Billy, Uniconta m.fl.",
      kilde: "https://ecometrics.dk/solutions/integrationer",
    },
    eloverblik: { svar: "Ja", kilde: "https://ecometrics.dk/help/integrationer" },
    vsBasis: { svar: "Ja", note: "også i gratisplanen", kilde: "https://ecometrics.dk/pricing" },
    vsUdvidet: {
      svar: "Ja",
      kilde: "https://ecometrics.dk/help/kom-i-gang/vaelg-din-rapporteringsstandard",
    },
    esrs: { svar: "Delvist", note: "ESRS-mapping", kilde: "https://ecometrics.dk/pricing" },
    dma: { svar: "Ja", note: "i Plus og Pro", kilde: "https://ecometrics.dk/pricing" },
    audit: { svar: "Ja", kilde: "https://ecometrics.dk/security" },
    revisor: { svar: "Ja", note: "læseadgang", kilde: "https://ecometrics.dk/solutions/co2-beregning" },
    leverandoer: {
      svar: "Delvist",
      note: "leverandøroverblik og EPD",
      kilde: "https://ecometrics.dk/solutions/leverandorstyring",
    },
    reduktion: { svar: "Ja", note: "reduktionsmål", kilde: "https://ecometrics.dk/industries/transport" },
    sbti: IO,
    api: { svar: "Ja", note: "MCP med læseadgang", kilde: "https://ecometrics.dk/solutions/egen-ai" },
    hosting: { svar: "Ja", note: "Irland", kilde: "https://ecometrics.dk/security" },
    sikkerhed: IO,
    gratis: { svar: "Ja", note: "scope 1-3 og VS-rapport", kilde: "https://ecometrics.dk/pricing" },
    selvbetjening: { svar: "Ja", kilde: "https://ecometrics.dk/pricing" },
    raadgivning: IO,
  },
};

const WARDN: Leverandoer = {
  key: "wardn",
  navn: "Wardn",
  website: "https://wardn.com",
  pris: {
    tekst: "Free €0/md. + €1.600 engangsgebyr. Lite €200/md. + €1.200. Core €200/md. + €3.600.",
    kilde: "https://wardn.com/da/pricing",
  },
  celler: {
    scope12: IO,
    scope3: {
      svar: "Delvist",
      note: "pendling og tjenesterejser",
      kilde: "https://www.wardn.com/da/blog/platform-how-do-i-collect-data-for-employee-commuting-emissions",
    },
    regnskab: IO,
    eloverblik: IO,
    vsBasis: { svar: "Ja", note: "bygget til VSME", kilde: "https://wardn.com/da/product" },
    vsUdvidet: IO,
    esrs: IO,
    dma: IO,
    audit: { svar: "Delvist", note: "sporbarhed i Enterprise", kilde: "https://www.wardn.com/enterprise" },
    revisor: IO,
    leverandoer: { svar: "Ja", note: "i Enterprise", kilde: "https://www.wardn.com/enterprise" },
    reduktion: {
      svar: "Delvist",
      note: "mål beskrives i rapporten",
      kilde: "https://www.wardn.com/da/blog/platform-how-do-i-describe-my-companys-climate-targets-in-an-esg-report",
    },
    sbti: IO,
    api: { svar: "Delvist", note: "API i Enterprise", kilde: "https://www.wardn.com/da/enterprise" },
    hosting: IO,
    sikkerhed: IO,
    gratis: { svar: "Ja", note: "€0/md. + €1.600 engangsgebyr", kilde: "https://wardn.com/da/pricing" },
    selvbetjening: { svar: "Delvist", note: "kun Free er selvbetjent", kilde: "https://wardn.com/da/pricing" },
    raadgivning: { svar: "Ja", note: "i Core", kilde: "https://wardn.com/da/pricing" },
  },
};

const VALIFIED: Leverandoer = {
  key: "valified",
  navn: "Valified",
  website: "https://valified.com",
  pris: {
    tekst: "Fundament 1.290 kr./år. Fremdrift 7.990 kr./år. Komplet Fundament 5.990 kr. inkl. 1 år.",
    kilde: "https://valified.com/priser",
  },
  celler: {
    scope12: { svar: "Ja", kilde: "https://valified.com/priser" },
    scope3: IO,
    regnskab: IO,
    eloverblik: IO,
    vsBasis: { svar: "Ja", kilde: "https://valified.com/produkter/esg-rapport" },
    vsUdvidet: IO,
    esrs: IO,
    dma: IO,
    audit: IO,
    revisor: {
      svar: "Delvist",
      note: "rapporten deles med rådgiver",
      kilde: "https://valified.com/produkter/esg-rapport",
    },
    leverandoer: IO,
    reduktion: { svar: "Delvist", note: "mål og initiativer", kilde: "https://valified.com/produkter/fremdrift" },
    sbti: IO,
    api: IO,
    hosting: IO,
    sikkerhed: IO,
    gratis: { svar: "Delvist", note: "gratis Branchetjek", kilde: "https://valified.com/priser" },
    selvbetjening: { svar: "Ja", kilde: "https://valified.com/priser" },
    raadgivning: { svar: "Ja", note: "Komplet-pakker", kilde: "https://valified.com/priser" },
  },
};

/** qlim8 first, then the five Danish vendors. */
export const DANSKE: Leverandoer[] = [QLIM8_DANSK, VERARCA, GRONLOG, ECOMETRICS, WARDN, VALIFIED];

// ---------------------------------------------------------------------------
// The large platforms: the table of the page "De store klimaplatforme"
// ---------------------------------------------------------------------------

export const STORE_FUNKTIONER: Funktion[] = [
  { key: "danskUi", label: "Dansk brugerflade" },
  { key: "danskKontor", label: "Kontor i Danmark" },
  { key: "regnskab", label: "Danske regnskabssystemer" },
  { key: "eloverblik", label: "Elforbrug fra Eloverblik" },
  { key: "vs", label: "VS-rapport (VSME)" },
  { key: "esrs", label: "CSRD/ESRS-rapportering" },
  { key: "dma", label: "Dobbelt væsentlighedsanalyse" },
  { key: "leverandoer", label: "Leverandørportal" },
  { key: "reduktion", label: "Reduktionsmål og scenarier" },
  { key: "sbti", label: "SBTi-mål" },
  { key: "api", label: "Åben API eller MCP" },
  { key: "hosting", label: "Hosting i EU" },
  { key: "sikkerhed", label: "ISO 27001 eller SOC 2" },
  { key: "gratis", label: "Gratis plan" },
  { key: "selvbetjening", label: "Køb uden salgsmøde" },
  { key: "raadgivning", label: "Rådgivning" },
];

const QLIM8_STORE: Leverandoer = {
  key: "qlim8",
  navn: "qlim8",
  website: "https://qlim8.com",
  pris: {
    tekst:
      "Gratis-pakke uden udløbsdato. [[Basis {pris:starter:aar} og Udvidet {pris:premium:aar} om året, ekskl. moms.]] [[Komplet {pris:business:aar} om året.]] Koncern efter samtale.",
  },
  celler: {
    danskUi: { svar: "Ja" },
    danskKontor: { svar: "Ja" },
    regnskab: { svar: "Ja", note: "e-conomic, Dinero, Billy" },
    eloverblik: { svar: "Ja" },
    vs: { svar: "Ja", note: "Basis og Udvidet" },
    esrs: { svar: "Ja" },
    dma: { svar: "Ja" },
    leverandoer: { svar: "Delvist", note: "værdikæde via CVR, portal planlagt" },
    reduktion: { svar: "Ja" },
    sbti: { svar: "Nej", note: "planlagt" },
    api: { svar: "Ja", note: "REST API og MCP-server" },
    hosting: { svar: "Ja", note: "Tyskland" },
    sikkerhed: { svar: "Nej" },
    gratis: { svar: "Ja", note: "uden udløbsdato" },
    selvbetjening: { svar: "Ja", note: "pakker med Køb-knap" },
    raadgivning: { svar: "Nej", note: "via partnere" },
  },
};

const WATERSHED: Leverandoer = {
  key: "watershed",
  navn: "Watershed",
  website: "https://watershed.com",
  pris: {
    tekst: "Ikke offentlig. Estimeret 140.000-1.075.000 kr./år",
    kilde: "https://www.vendr.com/marketplace/watershed",
  },
  celler: {
    danskUi: IO,
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: IO,
    esrs: { svar: "Ja", kilde: "https://watershed.com/solutions/csrd" },
    dma: { svar: "Delvist", note: "kobling til ESRS", kilde: "https://watershed.com/solutions/csrd" },
    leverandoer: { svar: "Ja", kilde: "https://watershed.com/solutions/supply-chain" },
    reduktion: { svar: "Ja", kilde: "https://watershed.com/platform/act" },
    sbti: { svar: "Delvist", note: "mål og opfølgning", kilde: "https://watershed.com/platform/act" },
    api: { svar: "Delvist", note: "API til indlæsning", kilde: "https://watershed.com/platform/measure" },
    hosting: IO,
    sikkerhed: { svar: "Ja", note: "SOC 2", kilde: "https://watershed.com/legal/msa" },
    gratis: IO,
    selvbetjening: IO,
    raadgivning: { svar: "Ja", kilde: "https://watershed.com/solutions/csrd" },
  },
};

const POSITIONGREEN: Leverandoer = {
  key: "positiongreen",
  navn: "Position Green",
  website: "https://www.positiongreen.com",
  pris: {
    tekst: "Ikke offentlig. Estimeret 50.000-150.000 kr./år",
    kilde: "https://www.positiongreen.com/wp-content/uploads/2026/06/PG_Sustainability_25_web_v3.pdf",
  },
  celler: {
    danskUi: IO,
    danskKontor: { svar: "Ja", note: "København", kilde: "https://www.positiongreen.com/about" },
    regnskab: IO,
    eloverblik: IO,
    vs: {
      svar: "Ja",
      note: "Basis og Comprehensive",
      kilde: "https://www.positiongreen.com/esg-solutions/vsme-reporting/",
    },
    esrs: { svar: "Ja", kilde: "https://www.positiongreen.com/about" },
    dma: { svar: "Ja", kilde: "https://www.positiongreen.com/materiality-assessment/" },
    leverandoer: { svar: "Ja", kilde: "https://www.positiongreen.com/supplier-management/" },
    reduktion: { svar: "Ja", kilde: "https://www.positiongreen.com/carbon-management/" },
    sbti: { svar: "Delvist", note: "via rådgivning", kilde: "https://www.positiongreen.com/advisory/" },
    api: { svar: "Delvist", note: "API", kilde: "https://www.positiongreen.com/integrations/" },
    hosting: { svar: "Ja", kilde: "https://www.positiongreen.com/ai/" },
    sikkerhed: { svar: "Ja", note: "SOC 2", kilde: "https://www.positiongreen.com/integrations/" },
    gratis: IO,
    selvbetjening: IO,
    raadgivning: { svar: "Ja", note: "egne rådgivere", kilde: "https://www.positiongreen.com/carbon-management/" },
  },
};

const GREENLY: Leverandoer = {
  key: "greenly",
  navn: "Greenly",
  website: "https://greenly.earth",
  pris: {
    tekst: "Ingen prisliste. Greenly oplyser 15.000-80.000 €/år",
    kilde: "https://greenly.earth/en-gb/compare/greenly-vs-watershed",
  },
  celler: {
    danskUi: IO,
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/vsme" },
    esrs: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/csrd-reporting" },
    dma: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/csrd-reporting" },
    leverandoer: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/sustainable-procurement" },
    reduktion: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/sbti" },
    sbti: { svar: "Ja", kilde: "https://greenly.earth/en-gb/products/sbti" },
    api: { svar: "Delvist", note: "API som tilkøb", kilde: "https://greenly.earth/en-gb/info/pricing" },
    hosting: IO,
    sikkerhed: { svar: "Ja", note: "SOC 2", kilde: "https://greenly.earth/en-gb/info" },
    gratis: IO,
    selvbetjening: { svar: "Nej", note: "pris efter henvendelse", kilde: "https://greenly.earth/en-gb/info/pricing" },
    raadgivning: { svar: "Ja", note: "tilkøb", kilde: "https://greenly.earth/en-gb/info/pricing" },
  },
};

const PERSEFONI: Leverandoer = {
  key: "persefoni",
  navn: "Persefoni",
  website: "https://www.persefoni.com",
  pris: {
    tekst: "Pro gratis (1 bruger). Advanced ca. 374.000 kr./år (listepris)",
    kilde: "https://www.persefoni.com/pricing",
  },
  celler: {
    danskUi: {
      svar: "Nej",
      note: "ikke på sproglisten",
      kilde: "https://www.persefoni.com/blog/persefoni-2025-year-in-review",
    },
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: IO,
    esrs: { svar: "Delvist", note: "første version", kilde: "https://www.persefoni.com/sustainability-reporting" },
    dma: IO,
    leverandoer: {
      svar: "Delvist",
      note: "på vej",
      kilde: "https://www.persefoni.com/business/scope-3-supplier-engagement",
    },
    reduktion: {
      svar: "Ja",
      note: "tilkøb",
      kilde: "https://www.persefoni.com/business/decarbonization-management",
    },
    sbti: {
      svar: "Delvist",
      note: "opfølgning på mål",
      kilde: "https://www.persefoni.com/business/decarbonization-management",
    },
    api: { svar: "Ja", note: "API", kilde: "https://aws.amazon.com/marketplace/pp/prodview-xjkwazkrg2b62" },
    hosting: { svar: "Delvist", note: "USA, Irland og Japan", kilde: "https://www.persefoni.com/security" },
    sikkerhed: { svar: "Ja", note: "ISO 27001 og SOC 2", kilde: "https://www.persefoni.com/company/certifications" },
    gratis: { svar: "Ja", note: "Pro, 1 bruger", kilde: "https://www.persefoni.com/pricing" },
    selvbetjening: { svar: "Ja", note: "Pro", kilde: "https://www.persefoni.com/pricing" },
    raadgivning: { svar: "Ja", note: "tilkøb", kilde: "https://www.persefoni.com/pricing" },
  },
};

const COOLSET: Leverandoer = {
  key: "coolset",
  navn: "Coolset",
  website: "https://www.coolset.com",
  pris: {
    tekst: "Coolset oplyser 6.000-30.000 €/år (ca. 45.000-224.000 kr.)",
    kilde: "https://www.coolset.com/academy/top-carbon-accounting-software-tools",
  },
  celler: {
    danskUi: IO,
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: { svar: "Ja", note: "Basis og Comprehensive", kilde: "https://www.coolset.com/vsme" },
    esrs: { svar: "Ja", kilde: "https://www.coolset.com/csrd" },
    dma: { svar: "Ja", kilde: "https://www.coolset.com/csrd" },
    leverandoer: { svar: "Delvist", note: "til EUDR og PPWR", kilde: "https://www.coolset.com" },
    reduktion: { svar: "Ja", kilde: "https://www.coolset.com/target-setting-and-forecasting" },
    sbti: { svar: "Ja", kilde: "https://www.coolset.com/sbti" },
    api: { svar: "Ja", note: "REST API og MCP", kilde: "https://api.coolset.com/" },
    hosting: IO,
    sikkerhed: { svar: "Ja", note: "ISO 27001 og SOC 2", kilde: "https://www.coolset.com/legal/security-policy" },
    gratis: IO,
    selvbetjening: { svar: "Nej", note: "pris efter tilbud", kilde: "https://www.coolset.com/plans" },
    raadgivning: { svar: "Ja", note: "onboarding inkluderet", kilde: "https://www.coolset.com/plans" },
  },
};

const TERRASCOPE: Leverandoer = {
  key: "terrascope",
  navn: "Terrascope",
  website: "https://www.terrascope.com",
  pris: {
    tekst: "Ca. 136.000-476.000 kr./år (listepris)",
    kilde: "https://aws.amazon.com/marketplace/pp/prodview-4gxwt4uw6ue4u",
  },
  celler: {
    danskUi: IO,
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: IO,
    esrs: {
      svar: "Delvist",
      note: "klimadelen",
      kilde: "https://support.terrascope.com/en/articles/9614328-how-does-terrascope-help-companies-with-csrd",
    },
    dma: IO,
    leverandoer: { svar: "Ja", note: "indsamling af leverandørdata", kilde: "https://www.terrascope.com/scope-3-supplier-engagement" },
    reduktion: { svar: "Ja", kilde: "https://www.terrascope.com" },
    sbti: { svar: "Delvist", note: "især FLAG", kilde: "https://www.terrascope.com" },
    api: { svar: "Delvist", note: "API", kilde: "https://www.terrascope.com/solutions/data-management" },
    hosting: IO,
    sikkerhed: {
      svar: "Ja",
      note: "ISO 27001 og SOC 2",
      kilde: "https://aws.amazon.com/marketplace/pp/prodview-4gxwt4uw6ue4u",
    },
    gratis: IO,
    selvbetjening: {
      svar: "Delvist",
      note: "via AWS Marketplace",
      kilde: "https://aws.amazon.com/marketplace/pp/prodview-4gxwt4uw6ue4u",
    },
    raadgivning: { svar: "Ja", note: "tilkøb", kilde: "https://www.terrascope.com/saas-terms-and-conditions" },
  },
};

const PLANA: Leverandoer = {
  key: "plana",
  navn: "Plan A",
  website: "https://plana.earth",
  pris: { tekst: "Ikke offentlig. Estimeret 50.000-250.000 kr./år", kilde: "https://plana.earth/offerings" },
  celler: {
    danskUi: IO,
    danskKontor: IO,
    regnskab: IO,
    eloverblik: IO,
    vs: IO,
    esrs: { svar: "Ja", note: "tilkøb", kilde: "https://plana.earth/offerings" },
    dma: { svar: "Delvist", note: "som del af CSRD-tilkøb", kilde: "https://plana.earth/offerings" },
    leverandoer: { svar: "Delvist", note: "tilkøbsmodul", kilde: "https://plana.earth/offerings" },
    reduktion: { svar: "Ja", kilde: "https://plana.earth/set-decarbonisation-targets" },
    sbti: { svar: "Ja", kilde: "https://plana.earth/set-decarbonisation-targets" },
    api: { svar: "Ja", note: "API", kilde: "https://plana.earth/offerings" },
    hosting: IO,
    sikkerhed: { svar: "Ja", note: "SOC 2", kilde: "https://plana.earth/security" },
    gratis: IO,
    selvbetjening: IO,
    raadgivning: { svar: "Ja", note: "tilkøb", kilde: "https://plana.earth/offerings" },
  },
};

/** qlim8 first, then the seven international platforms. */
export const STORE: Leverandoer[] = [
  QLIM8_STORE,
  WATERSHED,
  POSITIONGREEN,
  GREENLY,
  PERSEFONI,
  COOLSET,
  TERRASCOPE,
  PLANA,
];

// ---------------------------------------------------------------------------
// The short paragraph per vendor, meant to be quoted: it names the vendor, says
// what it is and who it suits, and gives one price fact with unit and period.
// Plain text, two sentences, no links. The same wording is used on every page.
// ---------------------------------------------------------------------------

export const KORT_OM: Record<string, string> = {
  qlim8:
    "qlim8 er en dansk platform til klimaregnskab og VS-rapportering, der henter data fra e-conomic, Dinero og Billy og elforbrug fra Eloverblik. qlim8 har en gratis pakke uden udløbsdato, audit trail på hver beregning og gratis konti til revisor og konsulent.",
  verarca:
    "Verarca er et dansk klimaregnskab med integrationer til blandt andet e-conomic, Uniconta, Business Central og E-Komplet, og med Managed Carbon Service som rådgivning. Verarca oplyser 299 kr. om måneden betalt årligt for scope 1 og 2 til en mikrovirksomhed, og VS-modulerne er tilkøb.",
  gronlog:
    "Grønlog er et selvbetjent klimaværktøj med en gratis plan til scope 1 og 2 og betalte planer til 590 og 1.490 kr. om måneden. Grønlog forbinder til Dinero, e-conomic og Billy, og en leverandørportal er med i Professional-planen.",
  ecometrics:
    "EcoMetrics er en dansk ESG-platform med en gratis plan, der dækker scope 1 til 3 og en VS-rapport. EcoMetrics har en lang liste af danske integrationer, og dobbelt væsentlighedsanalyse og ESRS-mapping følger med Plus til 4.950 kr. om året ekskl. moms.",
  wardn:
    "Wardn er en dansk ESG-platform bygget specifikt til VS-rammeværket, hvor Core-planen giver fuld facilitering af projektet og hjælp til dataindsamling. Wardn koster €200 om måneden for Lite og Core, plus et engangsgebyr på €1.200 for Lite og €3.600 for Core.",
  valified:
    "Valified er et dansk værktøj, der laver en ESG-rapport efter VS Basis og sammenligner virksomheden med andre i branchen. Valified Fundament koster 1.290 kr. om året, og Komplet-pakkerne, hvor Valified gør arbejdet, koster 5.990 kr. for Komplet Fundament inklusive 1 år.",
  watershed:
    "Watershed er en amerikansk platform til klimaregnskab, CSRD og leverandørdata, rettet mod store virksomheder. Watershed offentliggør ikke priser, og ud fra købsdata på Vendr er prisen estimeret til 140.000 til 1.075.000 kr. om året.",
  positiongreen:
    "Position Green er en svensk platform til ESG-rapportering med egne rådgivere og kontor i København, rettet mod mellemstore og store virksomheder. Position Green dækker VS, CSRD og dobbelt væsentlighedsanalyse, har data i EU. Position Green offentliggør ikke priser, og prisen for en SMV er estimeret til 50.000 til 150.000 kr. om året.",
  greenly:
    "Greenly er en fransk platform til klimaregnskab, CSRD, SBTi og leverandørdata, der henvender sig til alt fra SMV'er til koncerner. Greenly har ingen prisliste, men oplyser selv 15.000 til 80.000 euro om året.",
  persefoni:
    "Persefoni er en amerikansk platform til klimaregnskab, hvor Persefoni Pro er gratis for én bruger med scope 1, 2 og 3. Advanced er rettet mod større virksomheder og har en listepris på ca. 374.000 kr. om året, og Persefoni har ISO 27001 og SOC 2.",
  coolset:
    "Coolset er en hollandsk platform til CO2, CSRD, VS og EU-krav som EUDR, rettet mod mellemstore virksomheder. Coolset oplyser selv en pris på 6.000 til 30.000 euro om året og har både en åben REST API og en MCP-server.",
  terrascope:
    "Terrascope er en platform fra Singapore til CO2-regnskab i komplekse forsyningskæder, med indsamling af leverandørdata og SBTi FLAG-mål. Terrascopes listepriser på AWS Marketplace svarer til ca. 136.000 til 476.000 kr. om året for virksomhedens CO2-regnskab.",
  plana:
    "Plan A er en tysk platform til CO2-regnskab og dekarbonisering, hvor CSRD er et tilkøb. Plan A offentliggør ikke priser, og prisen er estimeret til 50.000 til 250.000 kr. om året. Plan A har siden januar 2026 været en del af Diginex.",
};

// ---------------------------------------------------------------------------
// One line per vendor on when it is the best choice, shown right after KORT_OM
// on every page that has a short paragraph per vendor (the hub has its own).
// Plain text, one sentence, starts "Vælg <navn>, hvis I ...", no links.
// ---------------------------------------------------------------------------

export const VAELG: Record<string, string> = {
  qlim8:
    "Vælg qlim8, hvis I bruger e-conomic, Dinero eller Billy, vil starte gratis uden udløbsdato og vil have VS-rapport, dobbelt væsentlighedsanalyse og klimaplan i samme program.",
  verarca:
    "Vælg Verarca, hvis I bruger Business Central, Uniconta eller E-Komplet, eller vil have en person til at gennemgå jeres data i Managed Carbon Service.",
  gronlog:
    "Vælg Grønlog, hvis I vil have scope 3 og en fuld VS-rapport til en fast månedspris på 590 kr., eller skal bruge en leverandørportal nu.",
  ecometrics:
    "Vælg EcoMetrics, hvis I bruger Business Central, e-komplet, Visma Business NXT eller EG Xena, eller vil have en VS-rapport med i en gratis plan.",
  wardn:
    "Vælg Wardn, hvis I vil have en leverandør til at facilitere hele ESG-projektet, eller skal samle ESG-data fra datterselskaber og leverandører.",
  valified:
    "Vælg Valified, hvis I hurtigt og billigt skal aflevere en VS Basis-rapport til banken og vil se, hvordan I ligger i forhold til branchen.",
  watershed: "Vælg Watershed, hvis I er en stor, global virksomhed med CSRD-pligt og et bæredygtighedsteam.",
  positiongreen:
    "Vælg Position Green, hvis I er en mellemstor eller stor virksomhed, der vil have ESG-rapportering og rådgivning fra samme leverandør med kontor i København.",
  greenly: "Vælg Greenly, hvis I skal bruge SBTi-mål, CSRD og en leverandørportal i samme platform.",
  persefoni:
    "Vælg Persefoni, hvis I vil starte gratis som enkeltbruger, eller er en større virksomhed med krav om ISO 27001 og SOC 2.",
  coolset: "Vælg Coolset, hvis I er en mellemstor virksomhed, der også skal dække EU-krav som EUDR og PPWR.",
  terrascope:
    "Vælg Terrascope, hvis I har en kompleks forsyningskæde inden for fødevarer eller råvarer og skal bruge SBTi FLAG-mål.",
  plana: "Vælg Plan A, hvis I vil have CO2-regnskab og dekarbonisering fra en europæisk platform og kan tilkøbe CSRD.",
};
