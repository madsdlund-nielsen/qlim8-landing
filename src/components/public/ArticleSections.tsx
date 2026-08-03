// Renders the typed ArticleSection block union (lead/h2/paragraph/list/callout/
// cta/image/richtext). Extracted from the article template so long-form prose
// bodies can be reused by marketing pages too.
import type { ArticleSection } from "@/content/article";

function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8 border-l-2 border-gray-300 pl-5">
          {section.text}
        </p>
      );
    case "h2":
      return <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{section.text}</h2>;
    case "h3":
      return <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">{section.text}</h3>;
    case "h4":
      return <h4 className="text-base font-semibold text-gray-800 mt-6 mb-2">{section.text}</h4>;
    case "paragraph":
      return <p className="text-gray-700 leading-relaxed mb-5 text-[17px]">{section.text}</p>;
    case "list":
      return (
        <ul className="space-y-2 my-5 text-gray-700 text-[17px]">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed">, {item}</li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="space-y-2 my-5 list-decimal list-inside text-gray-700 text-[17px]">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="my-8 p-5 border-l-2 border-gray-300 bg-gray-50 text-[15px] text-gray-800 leading-relaxed">
          {section.text}
        </div>
      );
    case "cta":
      return (
        <div className="my-10 p-7 bg-gray-900 rounded-2xl">
          <p className="text-white font-bold text-lg mb-2">{section.heading}</p>
          <p className="text-gray-300 text-sm mb-5 max-w-xl">{section.text}</p>
          <a
            href={section.buttonHref}
            className="inline-block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm transition-colors"
          >
            {section.buttonText}
          </a>
        </div>
      );
    case "image":
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.url} alt={section.alt} className="w-full h-auto rounded-lg" />
          {section.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">{section.caption}</figcaption>
          )}
        </figure>
      );
    case "richtext":
      // Sanitized on write by the app (server/cms/sanitizeRichText.ts); only
      // super-admins author, so the stored HTML is trusted here.
      return (
        <div
          className="prose prose-gray max-w-none my-5 text-[17px]"
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
