/**
 * Serialise a schema.org entity for a `<script type="application/ld+json">`.
 *
 * `JSON.stringify` alone is not safe there. The browser ends the script at the
 * first `</script` whatever the JSON around it says, and the entities carry
 * CMS-published text (headings, FAQ answers, article titles) written in the
 * app's /admin. A `</script><script>…` in one of those fields would run on
 * qlim8.com. Escaping `<`, `>` and `&` as JSON unicode escapes keeps the value
 * identical for anything that parses the JSON and leaves the HTML parser
 * nothing to end the script on.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
