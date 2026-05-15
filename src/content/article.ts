export type ArticleCategory = 'Compliance' | 'Scope 3' | 'Integration' | 'Økonomi'

export const categoryMeta: Record<ArticleCategory, { bg: string; text: string }> = {
  Compliance:  { bg: 'bg-accent', text: 'text-primary' },
  'Scope 3':   { bg: 'bg-orange-50',  text: 'text-orange-700'  },
  Integration: { bg: 'bg-blue-50',    text: 'text-blue-700'    },
  Økonomi:     { bg: 'bg-teal-50',    text: 'text-teal-700'    },
}

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

export type Article = {
  slug:        string
  title:       string
  description: string
  category:    ArticleCategory
  publishedAt: string   // 'YYYY-MM-DD'
  readingTime: number   // estimeret minutter
  sections:    ArticleSection[]
}
