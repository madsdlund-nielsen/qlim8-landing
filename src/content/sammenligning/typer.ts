// The shared shape of a comparison ("[konkurrent] alternativ") article's table.
//
// The vendor data lives in src/content/sammenligning/data.ts and must only
// need to satisfy these types; byg.ts turns it into the one HTML table every
// comparison article shows. Plain types, no imports, so `npm test` can load
// it without the `@/` alias.

/** The answer to "does this vendor do this?". Exactly these four, never free text. */
export type Svar = "Ja" | "Nej" | "Delvist" | "Ikke oplyst";

export type Celle = {
  svar: Svar;
  /**
   * A short qualifier shown after the answer: "Delvist: kun scope 1 og 2".
   * Visible to the reader, so keep it to a few words. May carry a price token
   * ([[ ... {pris:starter} ... ]], src/lib/priceTokens.ts).
   */
  note?: string;
  /**
   * The URL the answer was read from. Documentation only: it is NEVER rendered
   * (not in the table, not in the .md twin), so it can be as specific as a
   * deep link and a reviewer can check the claim against it.
   */
  kilde?: string;
};

export type Funktion = {
  /** Stable key, the one `Leverandoer.celler` is indexed by. */
  key: string;
  /** The row label the reader sees. */
  label: string;
};

export type Leverandoer = {
  key: string;
  /** The name in the column header. */
  navn: string;
  /** The vendor's own site; documentation, not rendered by the table. */
  website: string;
  pris: {
    /** Shown in the "Pris" row. May carry a price token for a qlim8 price. */
    tekst: string;
    /** Where the price was read; never rendered, like `Celle.kilde`. */
    kilde?: string;
  };
  /** One cell per `Funktion.key`; a key with no cell reads "Ikke oplyst". */
  celler: Record<string, Celle>;
};
