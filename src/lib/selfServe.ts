// Server helper: does the app's catalog sell anything by itself (isSelfServe)?
// The design-system components that carry a call to action or a trust line
// ask this themselves, so the sales-led switch is built into them and a page
// cannot forget it. The packages fetch is cached (ISR, tag "packages") and
// de-duplicated within a render, so asking from many components costs one request.
import { fetchPublicPackages } from "@/lib/packages";
import { isSelfServe } from "@/lib/packageView";

export async function getSelfServe(): Promise<boolean> {
  return isSelfServe(await fetchPublicPackages());
}
