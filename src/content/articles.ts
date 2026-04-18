import type { Article } from './article'
import { artikel as bankensNyeKrav } from './bankens-nye-krav-esg-smv-finansiering'

// Tilføj en ny artikel ved at:
// 1. Oprette en ny fil i src/content/ (f.eks. min-artikel.ts) med Article-typen
// 2. Importere og tilføje den til listen herunder (nyeste først)

export const articles: Article[] = [
  bankensNyeKrav,
]
