// Per-route content dates for sitemap <lastmod> and schema dateModified.
//
// The JSON is written by scripts/content-dates.mjs from git history (last
// commit touching each route's content files) and regenerated in CI before
// every build. It is imported statically so it is bundled into the standalone
// server, where the sitemap is regenerated on the ISR cadence.
//
// Routes that also have CMS-published copy combine this with the CMS row's
// `updatedAt`, so an edit made in /admin moves the date without a deploy.
import dates from "@/generated/content-dates.json";
import { latestOf } from "@/lib/dates";

export { latestOf };

const CONTENT_DATES: Record<string, string> = dates;

/** Git date for a route, or undefined for a route the script does not cover. */
export function contentDate(route: string): Date | undefined {
  const iso = CONTENT_DATES[route];
  return iso ? new Date(iso) : undefined;
}

/** Every route the generated file covers. */
export function contentDateRoutes(): string[] {
  return Object.keys(CONTENT_DATES);
}
