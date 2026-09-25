// The systems the homepage's integrations band shows, as logos. These are the
// input connectors qlim8-app ships: the `available` accounting entries of its
// shared/integrations/catalog.ts (Integrations › Input › ERP & finance) plus
// Eloverblik (Utilities & energy), which is a data source rather than a
// catalog entry. Kept in step by hand, like the palette: this repo has no
// import path into that one. A `coming_soon` connector stays off the band,
// since showing it would promise something the product does not do yet.
//
// Dynamics 365 Business Central is shipped but not shown: Microsoft licenses
// its product icons for diagrams, training and documentation, not for a
// marketing logo band.
//
// The files in public/logos/ are the vendors' own (press kit, site header or
// asset CDN), untouched except for one: quickbooks.svg draws "qb" as a white
// shape on the green circle, so it is wrapped in a filter that turns white
// into a hole. The band paints every file through a mask in one ink colour,
// so only the shape of each file matters, not its colours.

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
  { id: "xero", name: "Xero", src: "/logos/xero.svg", width: 103, height: 29, scale: 0.8 },
  { id: "quickbooks", name: "QuickBooks Online", src: "/logos/quickbooks.svg", width: 661, height: 106 },
  { id: "uniconta", name: "Uniconta", src: "/logos/uniconta.svg", width: 300, height: 42, scale: 1.1 },
  { id: "zenegy", name: "Zenegy", src: "/logos/zenegy.svg", width: 116.84, height: 20.56 },
  { id: "netsuite", name: "Oracle NetSuite", src: "/logos/netsuite.svg", width: 200.02, height: 72.61 },
];
