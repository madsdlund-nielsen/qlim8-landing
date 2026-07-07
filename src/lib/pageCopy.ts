// Server-side resolver used by app/**/page.tsx wrappers: fetches the
// CMS-published override for a page (pageKey "page.*") and deep-merges it
// over the bundled defaults from src/content/copy/*. Falls back to the
// bundled copy whenever the CMS is unreachable or the override is malformed.

import { fetchMarketingCopy } from "@/lib/cms";
import { mergeCopy } from "@/lib/copyMerge";

export async function resolvePageCopy<T>(pageKey: string, defaults: T): Promise<T> {
  const override = await fetchMarketingCopy(pageKey, "da");
  if (!override || Object.keys(override).length === 0) return defaults;
  return mergeCopy(defaults, override);
}
