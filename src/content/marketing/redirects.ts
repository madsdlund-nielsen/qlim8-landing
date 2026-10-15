// The pages that were merged or dropped in the 2026 restructuring (12 industry
// pages became 4, 21 product pages became 6) and where each one goes now.
// The table is redirects.json, one row per old page. next.config.ts turns each
// row into two 301 redirects, the page and its markdown twin, so a link, a
// bookmark or a crawler that still has the old address lands on the page that
// took over its subject (next.config.ts imports the JSON itself: it cannot load
// this file). scripts/lib/redirects.test.mjs holds the table to the
// live routes: every destination exists, no source is still a page, and no
// destination is itself a source (no chains).

import rows from "./redirects.json";

export interface RedirectRow {
  /** The old path, e.g. "/kundetyper/tomrer". */
  from: string;
  /** The live path it moves to, e.g. "/kundetyper/byggeri-og-haandvaerk". */
  to: string;
}

export const REDIRECTS: readonly RedirectRow[] = rows;
