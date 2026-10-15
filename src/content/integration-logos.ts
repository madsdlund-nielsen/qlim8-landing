// The systems the integration row shows (IntegrationRow), with their logos: input
// connectors of qlim8-app (shared/integrations/catalog.ts, Integrations ›
// Input), plus Eloverblik, which is a data source rather than a catalog
// entry. Kept in step by hand, like the palette: this repo has no import path
// into that one.
//
// A logo is here only if nothing its owner publishes forbids it or asks for
// permission first. Left off on their owners' own terms (checked September
// 2026), though every one of them may still be named in plain text:
//   - Dinero: dinero.dk may not be used commercially "uden vores skriftlige
//     samtykke" (dinero.dk/sikkerhed/vilkaar), which covers its logo pack.
//   - Uniconta: the Integration Partner Agreement, §2.4, grants no right to
//     the Uniconta name or logo, only to say that we integrate.
//   - DataLøn: its API terms, §5, allow no logos "uden forudgående skriftlig
//     aftale".
//   - Danløn: owned by Paychex, which prohibits use of its subsidiaries'
//     trademarks without prior approval (paychex.com/corporate/trademarks).
//   - QuickBooks Online: Intuit allows no use of its logos without an express
//     written licence (intuit.com/legal/trademark).
//   - Oracle NetSuite: Oracle logos need a specific licence (oracle.com/legal/logos).
//   - Xero: logos come from Xero to certified app partners, and co-branding
//     needs Xero's approval (Xero app partner brand guidelines).
//   - Dynamics 365 Business Central: Microsoft licenses its product icons for
//     diagrams, training and documentation, not marketing.
// A written OK from any of them puts it back: add the file and a line below.
//
// The files in public/logos/ are the vendors' own, in their own colours, with
// only the viewBox trimmed to the artwork. See public/logos/README.txt.

export interface IntegrationLogo {
  /** The catalog id in qlim8-app, or "eloverblik". */
  id: string;
  /** The system's name: the card's title, and the logo's accessible name. */
  name: string;
  /** The vendor's own file, or null where its terms allow no logo (the card shows the name only). */
  src: string | null;
  /** The artwork's size (SVG viewBox, or PNG pixels), for the aspect ratio. 0 without a logo. */
  width: number;
  height: number;
  /** Optical correction on top of the area-based sizing, if a mark needs it. */
  scale?: number;
  /**
   * What the app's catalog says today: "live" connects now, "kommer-snart" is
   * built next. Coming-soon systems stay on the page with a "Kommer snart"
   * label (the owner is building Intega), and nothing on the page may say that
   * qlim8 already fetches data from one.
   */
  status: "live" | "kommer-snart";
  /**
   * How the connection is made, in the card under the name. It is per system
   * because it is not the same for all of them: Dinero is a login through
   * Visma Connect, e-conomic takes two keys, Billy an API key, Eloverblik a
   * power of attorney with MitID. Placeholder wording until the copywriter
   * has been through it; the facts come from the connectors in qlim8-app.
   */
  subline: string;
}

export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { id: "economic", name: "e-conomic", src: "/logos/economic.svg", width: 283.48, height: 63.88, scale: 1.15, status: "live", subline: "To nøgler fra din e-conomic-aftale" },
  // Dinero's brand terms allow no logo without written consent (see above): the name stands alone.
  { id: "dinero", name: "Dinero", src: null, width: 0, height: 0, status: "live", subline: "Log ind med Visma Connect" },
  // Billy is becoming Shine Regnskab; billy.dk still serves this lockup.
  { id: "billy", name: "Billy", src: "/logos/billy.svg", width: 878, height: 398.3, scale: 1.1, status: "live", subline: "En API-nøgle fra Billy" },
  { id: "eloverblik", name: "Eloverblik", src: "/logos/eloverblik.svg", width: 285.81, height: 35.28, status: "live", subline: "Fuldmagt med MitID" },
  { id: "zenegy", name: "Zenegy", src: "/logos/zenegy.svg", width: 116.84, height: 20.56, status: "live", subline: "Lønsystem" },
  // Payroll and HR: "Kommer snart" in the app's catalog for now.
  { id: "salary", name: "Shine Salary", src: "/logos/salary.svg", width: 410.309, height: 144.3, scale: 1.1, status: "kommer-snart", subline: "Lønsystem" },
  { id: "hr_on", name: "HR-ON", src: "/logos/hr-on.svg", width: 284.906, height: 84, status: "kommer-snart", subline: "HR-system" },
  // Visma Enterprise became Intega on 6 March 2026. Intega publishes its logo
  // as PNG only (integaone.dk), at 2522 × 757. Coming soon: the owner is building it.
  { id: "visma_enterprise", name: "Intega", src: "/logos/intega.png", width: 2522, height: 757, status: "kommer-snart", subline: "Lønsystem" },
];
