// The copywriter's six questions (copy/forside.md), fact-checked against the
// fact base. The earlier eleven answers are gone with their claims ("omkring
// 50.000 faktorer", "EPD-databaser", "gratis for altid", natlige kørsler,
// pakkeniveauer); the topics they covered live on the pages they belong to.
export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "Hvad er qlim8?",
    a: "qlim8 er en dansk platform til klimaregnskab og ESG-rapportering for SMV'er. Den forbindes med e-conomic, Dinero eller Billy og Eloverblik, så udledningen i Scope 1, 2 og 3 bygger på virksomhedens egne tal.",
  },
  {
    q: "Binder jeg mig til noget ved at oprette en profil?",
    a: "Nej. Gratis-pakken i qlim8 har ingen binding og ingen udløbsdato, og du skal ikke bruge et kreditkort. Oprettelsen tager et par minutter.",
  },
  {
    q: "Hvad hvis jeg ikke har alle bilag eller el-data klar med det samme?",
    a: "Så starter du med det, der ligger i bogføringen, og tag resten i dit eget tempo. Elforbruget hentes fra Eloverblik hver uge, når du har givet fuldmagt med MitID. Står du fast, hjælper vi dig med hullerne.",
  },
  {
    q: "Hvor kommer qlim8's emissionsfaktorer fra?",
    a: "Primært fra danske kilder: Klimakompasset for fysiske mængder som liter og kg og Energinets data for el. Hvor der kun findes et indkøbsbeløb, bruger qlim8 spend-baserede faktorer fra det internationale datasæt EXIOBASE 3.8.2.",
  },
  {
    q: "Er mine data sikre og fortrolige i qlim8?",
    a: "Servere, database og fillager står i EU, i Tyskland. Data behandles efter GDPR med en databehandleraftale og deles kun med de underdatabehandlere, der står i aftalen, og med de systemer, du selv forbinder. Al trafik går over HTTPS, og hver kundes data holdes adskilt.",
  },
  {
    q: "Hvad hvis jeg er i tvivl om, hvilken pakke der passer?",
    a: "Start med den gratis profil, eller ring til qlim8 på +45 93 90 13 84. Vi gennemgår dine behov i øjenhøjde, og har du ikke brug for en betalt pakke endnu, siger vi det ærligt.",
  },
];

export type HomepageFaq = { q: string; a: string };

// Build the FAQPage JSON-LD from any FAQ list (bundled defaults or a
// CMS-published override), so the structured data stays in sync with what's
// rendered.
export function buildFaqSchema(faqs: HomepageFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
