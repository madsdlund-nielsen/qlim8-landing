// Renders the typed ArticleSection block union (lead/h2/paragraph/list/callout/
// cta/image/richtext). Extracted from the article template so long-form prose
// bodies can be reused by marketing pages too.
import { Button } from "@/components/ds/Button";
import type { ArticleSection } from "@/content/article";

function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-lead text-foreground font-medium mb-8 border-l-2 border-sage pl-5">
          {section.text}
        </p>
      );
    case "h2":
      return <h2 className="mt-12 mb-4">{section.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3">{section.text}</h3>;
    case "h4":
      return <h4 className="mt-6 mb-2 font-display text-lg font-medium text-primary">{section.text}</h4>;
    case "paragraph":
      return <p className="text-foreground text-body mb-5">{section.text}</p>;
    case "list":
      return (
        <ul className="space-y-2 my-5 text-foreground text-body">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed flex gap-2.5">
              <span className="mt-2 h-1 w-2.5 shrink-0 bg-sage" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="space-y-2 my-5 list-decimal list-inside text-foreground text-body">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="my-8 p-5 border-l-2 border-sage bg-band text-body-sm text-foreground">
          {section.text}
        </div>
      );
    case "cta":
      return (
        <div className="my-10 rounded-lg bg-primary p-7 text-primary-foreground">
          <p className="mb-2 font-display text-h3 text-primary-foreground">{section.heading}</p>
          <p className="mb-5 max-w-xl text-body-sm text-primary-foreground">{section.text}</p>
          <Button href={section.buttonHref} variant="inverted">
            {section.buttonText}
          </Button>
        </div>
      );
    case "image":
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.url} alt={section.alt} className="w-full h-auto rounded-lg" />
          {section.caption && (
            <figcaption className="text-body-sm text-muted-foreground mt-2 text-center">{section.caption}</figcaption>
          )}
        </figure>
      );
    case "richtext":
      // Sanitized on write by the app (server/cms/sanitizeRichText.ts); only
      // super-admins author, so the stored HTML is trusted here.
      return (
        <div
          className="prose prose-gray max-w-none my-5 text-body"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      );
    default:
      return null;
  }
}

export function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </>
  );
}
