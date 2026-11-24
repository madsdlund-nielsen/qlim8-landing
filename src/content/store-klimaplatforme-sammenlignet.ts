import type { Article } from './article'
import { DEMO_HREF, DEMO_LABEL } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { STORE, STORE_FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'

export const artikel: Article = {
  slug: 'store-klimaplatforme-sammenlignet',
  title: 'De store klimaplatforme sammenlignet: Watershed, Position Green, Greenly, Persefoni, Coolset, Terrascope og Plan A',
  seoTitle: 'Watershed, Greenly, Position Green og 4 andre sammenlignet',
  description:
    'Watershed, Position Green, Greenly, Persefoni, Coolset, Terrascope og Plan A sammenlignet: priser i kroner, SOC 2 og ISO 27001, danske integrationer og VS-dækning, set fra en dansk SMV.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 9,
  sections: [
    {
      type: 'lead',
      text: `De store internationale klimaplatforme er det rigtige valg, når en virksomhed har CSRD-pligt, en køber der kræver SOC 2 eller ISO 27001, eller selskaber i flere lande. For en dansk SMV, hvis bogføring ligger i et dansk regnskabsprogram, og som skal aflevere en VS-rapport, er en dansk platform som qlim8 værd at undersøge først. De syv platforme i artiklen koster ud fra de oplyste priser mellem ca. 45.000 kr. og over en million kroner om året, og Persefoni er den eneste af de syv, der oplyser en gratis plan.`,
    },
    {
      type: 'paragraph',
      text: `Artiklen sammenligner Watershed, Position Green, Greenly, Persefoni, Coolset, Terrascope og Plan A med qlim8. Den siger, hvornår en stor platform er det rigtige valg, hvad de koster, og hvad hver af dem selv oplyser om funktioner, certificeringer og kontor i Danmark.`,
    },

    { type: 'h2', text: 'Hvornår er en stor international klimaplatform det rigtige valg?' },
    {
      type: 'richtext',
      html: `<p>En international platform er det rigtige valg, når kravene er større end <a href="/blog/hvad-er-vsme-vs">VS-rapporten</a>.</p>`,
    },
    {
      type: 'paragraph',
      text: `VS er den frivillige standard, der tidligere hed VSME. Fem situationer peger mod en stor platform.`,
    },
    {
      type: 'list',
      items: [
        `CSRD-pligt: Virksomheder med over 1.000 ansatte og over 450 mio. euro i omsætning skal rapportere efter ESRS. Alle syv platforme oplyser ESRS-rapportering, helt eller delvist. qlim8 har også ESRS-rapportering, men en CSRD-virksomhed har ofte flere selskaber, og qlim8 har endnu ikke flere CVR-numre i én organisation.`,
        `Krav om ISO 27001 eller SOC 2: Persefoni, Coolset og Terrascope oplyser både ISO 27001 og SOC 2. Watershed, Position Green, Greenly og Plan A oplyser SOC 2. qlim8 har hverken ISO 27001 eller SOC 2.`,
        `SBTi-mål: Greenly, Coolset og Plan A oplyser SBTi-mål som en funktion. qlim8 har SBTi-mål på planen, men ikke i produktet i dag.`,
        `Produkt-LCA: Spørg hver platform, om den kan beregne livscyklus for jeres produkter. qlim8 kan modtage PCF- og EPD-dokumenter som upload.`,
        `Flere selskaber i flere lande: Skal flere selskaber med i samme regnskab, er de store platforme stedet at lede. qlim8 henter bogføring fra e-conomic, Dinero og Billy.`,
      ],
    },

    { type: 'h2', text: 'Hvornår er en dansk SMV-platform nok?' },
    {
      type: 'richtext',
      html: `<p>En dansk platform er nok, når jeres bogføring ligger i <a href="/integrationer">e-conomic, Dinero eller Billy</a>, og kravet er en VS-rapport til banken og kunderne.</p>`,
    },
    {
      type: 'paragraph',
      text: `Det gælder også, når elforbruget skal hentes fra Eloverblik, og når virksomheden ikke har et bæredygtighedsteam. Ingen af de syv store platforme oplyser danske regnskabssystemer eller Eloverblik på deres hjemmesider. Den slags integrationer er det, de danske platforme er bygget omkring.`,
    },

    { type: 'h2', text: 'De store klimaplatforme side om side' },
    {
      type: 'paragraph',
      text: `Tabellen viser, hvad de syv platforme selv oplyser på deres hjemmesider, og hvad qlim8 har til sammenligning. Ikke oplyst betyder, at leverandøren ikke nævner det, ikke at den mangler det.`,
    },
    { type: 'richtext', html: sammenligningstabel(STORE, STORE_FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'De syv store platforme kort' },
    { type: 'h3', text: 'Watershed' },
    { type: 'paragraph', text: KORT_OM.watershed },
    { type: 'paragraph', text: VAELG.watershed },
    { type: 'h3', text: 'Position Green' },
    { type: 'paragraph', text: KORT_OM.positiongreen },
    { type: 'paragraph', text: VAELG.positiongreen },
    { type: 'h3', text: 'Greenly' },
    { type: 'paragraph', text: KORT_OM.greenly },
    { type: 'paragraph', text: VAELG.greenly },
    { type: 'h3', text: 'Persefoni' },
    { type: 'paragraph', text: KORT_OM.persefoni },
    { type: 'paragraph', text: VAELG.persefoni },
    { type: 'h3', text: 'Coolset' },
    { type: 'paragraph', text: KORT_OM.coolset },
    { type: 'paragraph', text: VAELG.coolset },
    { type: 'h3', text: 'Terrascope' },
    { type: 'paragraph', text: KORT_OM.terrascope },
    { type: 'paragraph', text: VAELG.terrascope },
    { type: 'h3', text: 'Plan A' },
    { type: 'paragraph', text: KORT_OM.plana },
    { type: 'paragraph', text: VAELG.plana },
    { type: 'h3', text: 'qlim8' },
    {
      type: 'richtext',
      html: `<p>qlim8 er en dansk platform til klimaregnskab og VS-rapportering for SMV'er, med integration til e-conomic, Dinero og Billy, elforbrug fra Eloverblik og <a href="/priser">en gratis pakke uden udløbsdato</a>. qlim8 har ikke ISO 27001 eller SOC 2, og SBTi-mål er planlagt.</p>`,
    },
    { type: 'paragraph', text: VAELG.qlim8 },

    { type: 'h2', text: 'Hvad adskiller qlim8 fra de store platforme?' },
    {
      type: 'paragraph',
      text: `qlim8 oplyser danske integrationer, Eloverblik og en gratis pakke, mens de store platforme oplyser certificeringer, SBTi og leverandørportaler. Det er fem forskelle, der betyder noget i et valg.`,
    },
    {
      type: 'list',
      items: [
        `Danske systemer: qlim8 henter data fra e-conomic, Dinero og Billy og elforbrug fra Eloverblik. Ingen af de syv store platforme oplyser nogen af delene.`,
        `Dansk: qlim8 har dansk brugerflade og dansk support. Persefoni oplyser ikke dansk blandt sine sprog, og Position Green har kontor i København.`,
        `Certificering: de syv store platforme oplyser SOC 2, ISO 27001 eller begge. qlim8 har ingen af dem.`,
        `Leverandørdata: Watershed, Position Green, Greenly og Terrascope oplyser en leverandørportal. qlim8 henter hele værdikæden via CVR-numre, men en egentlig leverandørportal er planlagt.`,
        `Pris: Persefoni Pro er gratis for én bruger, og de øvrige platforme ligger på ca. 45.000 kr. om året og derover, hvor tallet for Watershed, Position Green og Plan A er estimeret. Gratis-pakken i qlim8 har ingen udløbsdato.`,
      ],
    },
    {
      type: 'paragraph',
      text: `[[Basis koster {pris:starter:aar} om året og Udvidet {pris:premium:aar} om året i qlim8, ekskl. moms.]] Komplet og Koncern aftales efter behov. Priserne står på /priser.`,
    },
    {
      type: 'cta',
      heading: 'Se, om en dansk platform er nok til jer',
      text: `Book en demo, så gennemgår vi jeres regnskabssystem og jeres krav fra banken eller kunderne. Vi tager også telefonen på +45 93 90 13 84.`,
      buttonText: DEMO_LABEL,
      buttonHref: DEMO_HREF,
    },

    { type: 'h2', text: 'Sådan har vi fundet priserne' },
    {
      type: 'paragraph',
      text: `Priserne i tabellen er fundet på tre måder, og tabellen viser, hvilken der gælder for hver platform.`,
    },
    {
      type: 'list',
      items: [
        `Listepriser: Persefoni og Terrascope har offentlige listepriser på AWS Marketplace. Persefoni Advanced koster 55.000 dollar for 12 måneder, ca. 374.000 kr., for virksomheder med under 250 mio. dollar i omsætning. Terrascopes CO2-regnskab koster 20.000 til 70.000 dollar for 12 måneder, ca. 136.000 til 476.000 kr. Persefoni Pro er gratis for én bruger.`,
        `Leverandørens eget prisniveau: Coolset oplyser selv 6.000 til 30.000 euro om året, ca. 45.000 til 224.000 kr. Greenly har ingen prisliste, men oplyser selv 15.000 til 80.000 euro om året, ca. 112.000 til 598.000 kr.`,
        `Estimat: Watershed, Position Green og Plan A offentliggør ikke priser, og tallene i tabellen er estimerede. Watershed: ca. 140.000 til 1.075.000 kr. om året ud fra købspriser, som Vendr har registreret. Position Green: ca. 50.000 til 150.000 kr. om året. Position Greens årsrapport for 2025 oplyser en årlig abonnementsomsætning på 220 mio. norske kroner og over 1.000 kunder, altså i gennemsnit højst ca. 150.000 kr. pr. kunde, og en SMV ligger typisk under gennemsnittet. Plan A: ca. 50.000 til 250.000 kr. om året, som er vores skøn ud fra, hvad sammenlignelige europæiske platforme selv oplyser.`,
      ],
    },
    {
      type: 'paragraph',
      text: `Dollar er omregnet med 1 dollar = 6,80 kr., euro med 1 euro = 7,47 kr. og norsk krone med 1 norsk krone = 0,70 kr. (ECB, 20. november 2026). Alle priser er uden moms og uden eventuelle gebyrer for implementering og rådgivning.`,
    },
    {
      type: 'richtext',
      html: `<p><a href="/blog/hvad-koster-klimaregnskab-2026">Hvad et klimaregnskab koster i alt</a>, afhænger også af intern tid og rådgivning.</p>`,
    },

    { type: 'h2', text: 'Kan man skifte mellem en stor platform og qlim8?' },
    {
      type: 'richtext',
      html: `<p>Et skifte mellem <a href="/blog/bedste-klimaregnskabsprogram">danske SMV-platforme</a> og en stor international platform kan gå begge veje, fordi grundlaget er jeres egen bogføring.</p>`,
    },
    {
      type: 'paragraph',
      text: `En virksomhed kan starte i qlim8 og flytte til en større platform, når en CSRD-pligt eller et indkøbskrav kræver det. qlim8 kan eksportere en Excel-rapport med alle linjer, så tallene følger med. Omvendt kan en virksomhed, der har valgt en stor platform, men kun skal bruge en VS-rapport, flytte til en dansk platform.`,
    },

    { type: 'h2', text: 'Spørgsmål om de store klimaplatforme' },
    { type: 'h3', text: 'Hvad koster Watershed?' },
    {
      type: 'paragraph',
      text: `Watershed offentliggør ikke priser, og et estimat ud fra registrerede købspriser er ca. 140.000 til 1.075.000 kr. om året (estimeret, uden moms).`,
    },
    { type: 'h3', text: 'Hvad koster Position Green?' },
    {
      type: 'paragraph',
      text: `Position Green offentliggør ikke priser, og prisen for en SMV er estimeret til ca. 50.000 til 150.000 kr. om året ud fra selskabets egen årsrapport.`,
    },
    { type: 'h3', text: 'Hvad koster Persefoni?' },
    {
      type: 'paragraph',
      text: `Persefoni Pro er gratis for én bruger, og Persefoni Advanced koster 55.000 dollar for 12 måneder, ca. 374.000 kr., som listepris på AWS Marketplace.`,
    },
    { type: 'h3', text: 'Hvad koster Coolset?' },
    {
      type: 'paragraph',
      text: `Coolset oplyser selv 6.000 til 30.000 euro om året, ca. 45.000 til 224.000 kr., uden moms og uden gebyrer for implementering og rådgivning.`,
    },
    { type: 'h3', text: 'Hvad koster Greenly?' },
    {
      type: 'paragraph',
      text: `Greenly har ingen prisliste, men oplyser selv 15.000 til 80.000 euro om året, ca. 112.000 til 598.000 kr.`,
    },
    { type: 'h3', text: 'Har Position Green kontor i Danmark?' },
    {
      type: 'paragraph',
      text: `Ja, Position Green har kontor i København og er grundlagt i 2015 med hovedkontor i Sverige.`,
    },
    { type: 'h3', text: 'Hvilke af de store platforme har SOC 2 eller ISO 27001?' },
    {
      type: 'paragraph',
      text: `Persefoni, Coolset og Terrascope oplyser både ISO 27001 og SOC 2, mens Watershed, Position Green, Greenly og Plan A oplyser SOC 2. qlim8 har hverken ISO 27001 eller SOC 2.`,
    },
    { type: 'h3', text: 'Er der et dansk alternativ til Watershed for en SMV?' },
    {
      type: 'paragraph',
      text: `Ja, danske platforme som qlim8, Verarca, Grønlog, EcoMetrics, Wardn og Valified er sammenlignet på pris og funktioner i artiklen om de bedste klimaregnskabsprogrammer til en dansk SMV.`,
    },
  ],
}
