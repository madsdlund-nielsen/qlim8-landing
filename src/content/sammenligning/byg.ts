// Builds the comparison table of a "[konkurrent] alternativ" article as one
// richtext HTML string, and the "last updated" line under it.
//
// The output uses only tags the app's rich-text sanitizer allows
// (server/cms/sanitizeRichText.ts in qlim8-app: table, thead, tbody, tr, th,
// td, p, a, ...), so the same HTML works in a bundled article and, pasted into
// /admin, in a CMS one. Every text is HTML-escaped. The one thing that passes
// through untouched is the price-token markup `[[ ... {pris:starter} ... ]]`
// in `pris.tekst` and `note`: none of `[ ] { } :` is changed by escaping, and
// src/lib/priceTokens.ts fills (or removes) the tokens at render time.
//
// Plain imports with extensions, no `@/` alias: `npm test` runs this directly.
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "../cta.ts";
import type { Celle, Funktion, Leverandoer } from "./typer.ts";

/** Shown for a vendor/function pair with no cell. */
export const IKKE_OPLYST = "Ikke oplyst";

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** "Delvist: kun scope 1 og 2": the answer, then the note when there is one. The source URL is never shown. */
export function celleTekst(celle: Celle | undefined): string {
  if (!celle) return IKKE_OPLYST;
  const note = celle.note?.trim();
  return note ? `${celle.svar}: ${note}` : celle.svar;
}

/**
 * One `<table>`: a header row ("Funktion", then each vendor in the order
 * given), a first body row "Pris" from `pris.tekst`, then one row per function.
 */
export function sammenligningstabel(leverandoerer: Leverandoer[], funktioner: Funktion[]): string {
  const head = `<thead><tr><th>Funktion</th>${leverandoerer.map((l) => `<th>${escapeHtml(l.navn)}</th>`).join("")}</tr></thead>`;
  const pris = `<tr><td>Pris</td>${leverandoerer.map((l) => `<td>${escapeHtml(l.pris.tekst)}</td>`).join("")}</tr>`;
  const rows = funktioner.map(
    (f) =>
      `<tr><td>${escapeHtml(f.label)}</td>${leverandoerer.map((l) => `<td>${escapeHtml(celleTekst(l.celler[f.key]))}</td>`).join("")}</tr>`,
  );
  return `<table>${head}<tbody>${pris}${rows.join("")}</tbody></table>`;
}

const MAANEDER = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
];

/** "2026-11-23" as "23. november 2026"; anything that is not an ISO date is returned as it came. */
export function danskDato(dato: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dato.trim());
  if (!m) return dato;
  const month = MAANEDER[Number(m[2]) - 1];
  return month ? `${Number(m[3])}. ${month} ${m[1]}` : dato;
}

/** The richtext paragraph under a comparison table: when it was updated, where the facts come from, how to correct them. */
export function opdateretLinje(dato: string): string {
  return (
    `<p>Sidst opdateret ${escapeHtml(danskDato(dato))}. ` +
    "Oplysningerne om de andre leverandører er hentet fra deres egne hjemmesider. " +
    `Er noget forkert eller forældet, så skriv til <a href="${CONTACT_EMAIL_HREF}">${CONTACT_EMAIL}</a>, så retter vi det.</p>`
  );
}
