// Fetches the packages from qlim8-app (GET /api/public/packages). Cached like
// the CMS copy (ISR, tag "packages"); a publish in the app's Admin → Packages
// revalidates the tag. On any failure this returns null and the site keeps
// its sales-led page (src/lib/packageView.ts: isSelfServe).
import { cmsFetch } from "./cms";
import type { PublicPackages } from "./packageView";

export async function fetchPublicPackages(language: "da" | "en" = "da"): Promise<PublicPackages | null> {
  const data = await cmsFetch<PublicPackages>(`/api/public/packages?language=${language}`, ["packages"]);
  // A shape this site does not know is treated like no answer.
  if (!data || !Array.isArray(data.packages) || !data.comparison || !Array.isArray(data.comparison.rows)) return null;
  return data;
}
