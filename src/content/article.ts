export type ArticleCategory = 'Compliance' | 'Scope 3' | 'Integration' | 'Økonomi'

export type ArticleSection =
  | { type: 'lead';          text: string }
  | { type: 'h2';            text: string }
  | { type: 'h3';            text: string }
  | { type: 'h4';            text: string }
  | { type: 'paragraph';     text: string }
  | { type: 'list';          items: string[] }
  | { type: 'ordered-list';  items: string[] }
  | { type: 'callout';       text: string }
  | { type: 'cta';           heading: string; text: string; buttonText: string; buttonHref: string }
  | { type: 'image';         assetId?: string; url: string; alt: string; caption?: string }
  | { type: 'richtext';      html: string }

export type Article = {
  slug:        string
  title:       string
  description: string
  category:    ArticleCategory
  publishedAt: string   // 'YYYY-MM-DD'
  updatedAt?:  string   // 'YYYY-MM-DD', sat af CMS'et ved redigering; udeladt for bundlede artikler
  readingTime: number   // estimeret minutter
  sections:    ArticleSection[]
}
