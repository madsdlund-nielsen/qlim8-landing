/**
 * Emit one or more schema.org entities as JSON-LD.
 *
 * Pages used to inline `<script type="application/ld+json" dangerouslySetInnerHTML>`
 * by hand, which is why several pages (all of /docs, /api and the blog index)
 * simply had none: adding structured data meant repeating four lines of
 * boilerplate, so it kept getting skipped.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
