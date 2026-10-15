// A copy text with a blank line in it is several paragraphs. The copy files
// write the break as "\n\n" inside one string, so a field stays one editable
// value in the CMS (a textarea keeps the line breaks) and the .md twin gets the
// same break for free, since markdown paragraphs are separated by a blank line.

/** The paragraphs of a text, split on blank lines; empty parts are dropped. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
