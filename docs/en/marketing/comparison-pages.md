# Comparison pages

## What they are

Eight "[name] alternativ" articles (Verarca, Grønlog, EcoMetrics, Wardn, Valified, Climaider, esgBRICKS and E-SG.cloud), two guides without the vendor table (Klimakompasset, which is a public tool, and climate accounting in Excel, which is a method), one page on the large climate platforms and one hub, all in the `Sammenligning` category. esgBRICKS and E-SG.cloud follow the same recipe as the other vendor pages, while the Klimakompasset and Excel pages are guides with a bridge to qlim8, are not columns in the table and have no entry in `KORT_OM` or `VAELG`. The articles are written as plain statements. There are no citations in the text, because the owner wants pages that read as plain text.

## Where the facts live

Everything said about a competitor lives in `src/content/sammenligning/data.ts`:

- `FUNKTIONER` and `DANSKE`: the table of qlim8 and the seven Danish vendors (Verarca, Grønlog, EcoMetrics, Wardn, Valified, esgBRICKS and E-SG.cloud; 19 rows).
- `STORE_FUNKTIONER` and `STORE`: the table on the page about the large platforms (16 rows).
- `KORT_OM`: one short paragraph per vendor (15), written to be quoted as it stands.
- `OPDATERET`: the date the cells were last checked against the vendor's own website. Verarca, Grønlog, EcoMetrics, Wardn and Valified were read on 23 November 2026, esgBRICKS and E-SG.cloud on 24 November 2026, and the date under the table is 24 November 2026.

Each cell has a `svar` (`Ja`, `Nej`, `Delvist` or `Ikke oplyst`), a short `note` and a `kilde`. `kilde` is the URL the answer was read from. It is never rendered, not in the table, not in the `.md` twin, not in JSON-LD. It is kept so a claim can be documented if a vendor asks. The table is built by `src/content/sammenligning/byg.ts`.

qlim8's own column comes from the app's catalog and code (`scripts/fixtures/public-packages.v4.json` and the integration catalog), not from a website. A qlim8 price appears only as a price token in `[[ ... ]]`, so the sentence can be removed without breaking the rest.

## The prices on the large-platforms page

The prices are of three kinds, and the table and the section "Sådan har vi fundet priserne" show which one applies to each platform. List prices are public (Persefoni and Terrascope on AWS Marketplace). The vendor's own stated level is a figure the vendor gives itself (Coolset and Greenly). Estimates are ours: Watershed from the purchase prices Vendr has recorded, Position Green from its 2025 annual report (ARR NOK 220 million over more than 1,000 customers) and Plan A by comparison with what comparable European platforms state, which is the weakest basis of the three. An estimate is always labelled "estimeret" on the page. `VAELG` gives each vendor one line on when it is the best choice, placed right after the `KORT_OM` paragraph (the hub has its own). There are 15 `VAELG` texts, as many as `KORT_OM`.

## The rule about Nej

A competitor is never `Nej` without the vendor's own statement (a language list, a plan overview that only says "Get in touch"). Where the vendor says nothing, the cell is `Ikke oplyst`. Nothing is taken from a third party. A `Nej` about a competitor must carry a `note`, and the test fails without it.

## How to re-verify a cell

1. Open the URL in the cell's `kilde`.
2. Compare it with the cell. If the statement still stands, change nothing.
3. If it changed, edit `svar`, `note` and `kilde` in `data.ts`. Keep the note under 60 characters.
4. Move `OPDATERET` once the sources have been gone through.
5. Run `npm run lint`, `npm run typecheck` and `npm test`. `src/lib/sammenligning.test.ts` holds the data to its shape (the four answer values, `Nej` only with a note, an https source on every answer except `Ikke oplyst`, qlim8 first, no URL in the rendered table).

A vendor who writes to kontakt@qlim8.com gets the cell corrected the same way.

## Known follow-ups

- Valified relaunches its platform on 3 December 2026. Re-check every Valified cell and price before and after.
- Climaider ApS is under bankruptcy according to CVR mirrors (declared 20 October 2026). The owner has confirmed it, and the page is published with qlim8's offer to Climaider customers. The page makes no claims about Climaider's product, and Climaider is not a column in the table.
- qlim8's own column must be re-read against the packages fixture whenever the catalog changes (packages, prices, what is live or planned).
- esgBRICKS and E-SG.cloud were read on 24 November 2026. Re-check price and wording at the next review. esgBRICKS states no price for access to the platform alone, and the pages never say that the platform cannot be bought.
- The pages never name a version number of EFRAG's template: qlim8 uses the newest one as a rule, and a number in the copy goes stale with the next edition (the owner's rule, November 2026). No page claims that qlim8 fills EFRAG's template until the app's export follows the newest edition. The pages say "qlim8 laver VS-rapporten" and "en Excel-rapport med hver linje (dato, kategori, mængde, emissionsfaktor og kilde)". The Excel page may tell the reader that EFRAG's own template is called VS Digital Template, is an XLSX file at EFRAG and has Danish as a language choice.
- The pages do not say how many customers another vendor has, not even when the vendor states the figure itself, as Valified does (the owner's rule, November 2026). The one exception is Position Green's customer count from its annual report, in the section "Sådan har vi fundet priserne", because the price estimate is calculated from it.
