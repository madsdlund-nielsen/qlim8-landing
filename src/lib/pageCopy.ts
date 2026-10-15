// Server-side resolver used by app/**/page.tsx wrappers: fetches the
// CMS-published override for a page (pageKey "page.*") and deep-merges it
// over the bundled defaults from src/content/copy/*. Falls back to the
// bundled copy whenever the CMS is unreachable or the override is malformed.
//
// The result then passes through applyPriceTokens (src/lib/priceTokens.ts):
// a price in copy is a pris token inside double square brackets, filled from the
// packages API here, so the rendered pages, the .md twins, the JSON-LD and
// the CMS overrides all show the catalog's price or none.

import { fetchMarketingCopy } from "@/lib/cms";
import { mergeCopy } from "@/lib/copyMerge";
import { fetchPublicPackages } from "@/lib/packages";
import { applyPriceTokens } from "@/lib/priceTokens";

export async function resolvePageCopy<T>(pageKey: string, defaults: T): Promise<T> {
  const [override, packages] = await Promise.all([fetchMarketingCopy(pageKey, "da"), fetchPublicPackages()]);
  const merged = !override || Object.keys(override).length === 0 ? defaults : mergeCopy(defaults, override);
  return applyPriceTokens(merged, packages);
}
