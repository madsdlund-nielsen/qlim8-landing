import { LegalDocument } from "@/components/public/LegalDocument";
import { LEGAL_TERMS_COPY, type LegalCopy } from "@/content/copy/legal";

// Copy lives in src/content/copy/legal.ts (pageKey "page.legal.terms");
// app/handelsbetingelser/page.tsx passes the CMS-merged result.
export default function Handelsbetingelser({ copy = LEGAL_TERMS_COPY }: { copy?: LegalCopy }) {
  return <LegalDocument copy={copy} />;
}
