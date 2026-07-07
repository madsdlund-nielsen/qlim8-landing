import { LegalDocument } from "@/components/public/LegalDocument";
import { LEGAL_COOKIES_COPY, type LegalCopy } from "@/content/copy/legal";

// Copy lives in src/content/copy/legal.ts (pageKey "page.legal.cookies");
// app/cookies/page.tsx passes the CMS-merged result.
export default function CookiePolicy({ copy = LEGAL_COOKIES_COPY }: { copy?: LegalCopy }) {
  return <LegalDocument copy={copy} />;
}
