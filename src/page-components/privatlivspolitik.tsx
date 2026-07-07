import { LegalDocument } from "@/components/public/LegalDocument";
import { LEGAL_PRIVACY_COPY, type LegalCopy } from "@/content/copy/legal";

// Copy lives in src/content/copy/legal.ts (pageKey "page.legal.privacy");
// app/privatlivspolitik/page.tsx passes the CMS-merged result.
export default function Privatlivspolitik({ copy = LEGAL_PRIVACY_COPY }: { copy?: LegalCopy }) {
  return <LegalDocument copy={copy} />;
}
