// The systems the homepage's integrations band shows, as logos: input
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
  /** Accessible name and hover title; the band shows no text of its own. */
  name: string;
  src: string;
  /** The artwork's size (SVG viewBox, or PNG pixels), for the aspect ratio. */
  width: number;
  height: number;
  /** Optical correction on top of the area-based sizing, if a mark needs it. */
  scale?: number;
}

export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { id: "economic", name: "e-conomic", src: "/logos/economic.svg", width: 283.48, height: 63.88, scale: 1.15 },
  // Billy is becoming Shine Regnskab; billy.dk still serves this lockup.
  { id: "billy", name: "Billy", src: "/logos/billy.svg", width: 878, height: 398.3, scale: 1.1 },
  { id: "zenegy", name: "Zenegy", src: "/logos/zenegy.svg", width: 116.84, height: 20.56 },
  { id: "eloverblik", name: "Eloverblik", src: "/logos/eloverblik.svg", width: 285.81, height: 35.28 },
  // Payroll and HR. "Kommer snart" in the app's catalog for now.
  { id: "salary", name: "Shine Salary", src: "/logos/salary.svg", width: 410.309, height: 144.3, scale: 1.1 },
  { id: "hr_on", name: "HR-ON", src: "/logos/hr-on.svg", width: 284.906, height: 84 },
  // Visma Enterprise became Intega on 6 March 2026. Intega publishes its logo
  // as PNG only (integaone.dk), at 2522 × 757.
  { id: "visma_enterprise", name: "Intega", src: "/logos/intega.png", width: 2522, height: 757 },
];
