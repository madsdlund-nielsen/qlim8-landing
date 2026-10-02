import { LegalDocument } from "@/components/public/LegalDocument";
import { LEGAL_DPA_COPY, type LegalCopy } from "@/content/copy/legal";

// Copy lives in src/content/copy/legal.ts (pageKey "page.legal.dpa");
// app/databehandleraftale/page.tsx passes the CMS-merged result.
export default function Databehandleraftale({ copy = LEGAL_DPA_COPY }: { copy?: LegalCopy }) {
  return <LegalDocument copy={copy} />;
}
