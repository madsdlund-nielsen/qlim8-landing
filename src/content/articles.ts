import type { Article } from './article'
import { artikel as l193BankensEsgKrav } from './l193-bankens-esg-krav-smv'
import { artikel as hvadKosterKlimaregnskab } from './hvad-koster-klimaregnskab-2026'
import { artikel as vsmeBasisVsComprehensive } from './vsme-basis-vs-comprehensive'
import { artikel as undgaaGreenwashing } from './undgaa-greenwashing-smv'
import { artikel as scope3SmvGuide } from './scope-3-smv-guide'
import { artikel as vsmeAiAgentMcp } from './vsme-rapport-ai-agent-mcp'
import { artikel as hvadErVsmeVs } from './hvad-er-vsme-vs'
import { artikel as klimaregnskabSmvKlienterKonsulentkonto } from './klimaregnskab-smv-klienter-konsulentkonto'
import { artikel as bedsteKlimaregnskabsprogram } from './bedste-klimaregnskabsprogram'
import { artikel as storeKlimaplatformeSammenlignet } from './store-klimaplatforme-sammenlignet'
import { artikel as verarcaAlternativ } from './verarca-alternativ'
import { artikel as gronlogAlternativ } from './gronlog-alternativ'
import { artikel as ecometricsAlternativ } from './ecometrics-alternativ'
import { artikel as wardnAlternativ } from './wardn-alternativ'
import { artikel as valifiedAlternativ } from './valified-alternativ'
import { artikel as climaiderAlternativ } from './climaider-alternativ'

// Tilføj en ny artikel ved at:
// 1. Oprette en ny fil i src/content/ (f.eks. min-artikel.ts) med Article-typen
// 2. Importere og tilføje den til listen herunder (nyeste først)

export const articles: Article[] = [
  // Sammenligningssiderne (docs/da/marketing/sammenligningssider.md). Hubben
  // først, så den ligger øverst på /blog.
  bedsteKlimaregnskabsprogram,
  storeKlimaplatformeSammenlignet,
  verarcaAlternativ,
  gronlogAlternativ,
  ecometricsAlternativ,
  wardnAlternativ,
  valifiedAlternativ,
  climaiderAlternativ,
  klimaregnskabSmvKlienterKonsulentkonto,
  hvadErVsmeVs,
  vsmeAiAgentMcp,
  undgaaGreenwashing,
  scope3SmvGuide,
  vsmeBasisVsComprehensive,
  hvadKosterKlimaregnskab,
  l193BankensEsgKrav,
]
