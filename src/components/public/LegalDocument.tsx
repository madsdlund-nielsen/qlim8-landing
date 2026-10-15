import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import type { LegalCopy } from "@/content/copy/legal";

// Shared renderer for the legal pages (/cookies, /handelsbetingelser,
// /privatlivspolitik). The document body is a rich-text HTML string from
// src/content/copy/legal.ts, CMS-overridable per page. Overrides are
// sanitized on write in qlim8-app (same trust boundary as blog rich text),
// so the stored HTML renders here without re-sanitizing.
export function LegalDocument({ copy }: { copy: LegalCopy }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <header className="mb-10">
          <h1 className="mb-4">
            {copy.title}
          </h1>
          <p className="text-body-sm text-muted-foreground">
            {copy.metaLine}
            <br />
            {copy.versionLine}
          </p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-medium prose-h2:text-h2 prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-h3 prose-h3:mt-7 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-body-sm prose-li:text-body-sm prose-li:my-1 prose-ul:my-3 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-table:text-body-sm prose-th:text-left [&_table]:block [&_table]:overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: copy.bodyHtml }} />
          {copy.footerHtml && (
            <p
              className="text-trust text-muted-foreground pt-8 border-t border-border mt-12"
              dangerouslySetInnerHTML={{ __html: copy.footerHtml }}
            />
          )}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
