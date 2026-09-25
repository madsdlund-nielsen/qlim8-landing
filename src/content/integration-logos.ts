// The systems the homepage's integrations band shows, as logos: the input
// connectors of qlim8-app (shared/integrations/catalog.ts, Integrations ›
// Input), plus Eloverblik, which is a data source rather than a catalog
// entry. Kept in step by hand, like the palette: this repo has no import path
// into that one.
//
// A connector is here only if its vendor's published terms allow its logo on
// our site. Shipped but left off, on their owners' own terms:
//   - QuickBooks Online: Intuit allows no use of its logos without an express
//     written licence (intuit.com/legal/trademark).
//   - Oracle NetSuite: Oracle logos need a specific licence or authorisation
//     (oracle.com/legal/logos).
//   - Xero: logos come from Xero to certified app partners, and co-branding
//     needs Xero's approval (Xero app partner brand guidelines).
//   - Dynamics 365 Business Central: Microsoft licenses its product icons for
//     diagrams, training and documentation, not marketing.
// They can still be named in plain text.
//
// The files in public/logos/ are the vendors' own, in their own colours:
// no brand rules we found allow a recoloured logo. See public/logos/README.txt.

export interface IntegrationLogo {
  /** The catalog id in qlim8-app, or "eloverblik". */
  id: string;
  /** Accessible name and hover title; the band shows no text of its own. */
  name: string;
  src: string;
  /** The SVG viewBox size, for the aspect ratio. */
  width: number;
  height: number;
  /** Optical correction on top of the area-based sizing, if a mark needs it. */
  scale?: number;
}

export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { id: "economic", name: "e-conomic", src: "/logos/economic.svg", width: 283.46, height: 63.88, scale: 1.15 },
  { id: "dinero", name: "Dinero", src: "/logos/dinero.svg", width: 1054, height: 266 },
  { id: "billy", name: "Billy", src: "/logos/billy.svg", width: 878, height: 398.3, scale: 1.1 },
  { id: "eloverblik", name: "Eloverblik", src: "/logos/eloverblik.svg", width: 286, height: 36 },
  { id: "uniconta", name: "Uniconta", src: "/logos/uniconta.svg", width: 300, height: 42, scale: 1.1 },
  { id: "zenegy", name: "Zenegy", src: "/logos/zenegy.svg", width: 116.84, height: 20.56 },
];
