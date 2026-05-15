import type { Article } from './article'
import { artikel as bankensNyeKrav } from './bankens-nye-krav-esg-smv-finansiering'
import { artikel as hvadKosterKlimaregnskab } from './hvad-koster-klimaregnskab-2026'
import { artikel as vsmeBasisVsComprehensive } from './vsme-basis-vs-comprehensive'
import { artikel as undgaaGreenwashing } from './undgaa-greenwashing-smv'
import { artikel as scope3SmvGuide } from './scope-3-smv-guide'
import { artikel as csrdLeverandoerRapportering } from './csrd-leverandoer-rapportering'

// Tilføj en ny artikel ved at:
// 1. Oprette en ny fil i src/content/ (f.eks. min-artikel.ts) med Article-typen
// 2. Importere og tilføje den til listen herunder (nyeste først)

export const articles: Article[] = [
  hvadKosterKlimaregnskab,
  vsmeBasisVsComprehensive,
  undgaaGreenwashing,
  scope3SmvGuide,
  csrdLeverandoerRapportering,
  bankensNyeKrav,
]
