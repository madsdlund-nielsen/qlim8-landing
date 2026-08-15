import type { MetadataRoute } from "next";

// Everything here is already allowed by the `*` rule, so naming the AI crawlers
// changes nothing about what they may fetch today. It is worth writing down
// anyway for two reasons: it records that open access to these agents is a
// decision rather than an oversight, and it means a future `Disallow` added to
// the wildcard rule cannot silently take the answer engines down with it.
//
// Split into the two families that actually behave differently. Training and
// answer-engine crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended) fetch on
// their own schedule to build an index. User-triggered fetchers (ChatGPT-User,
// Claude-User, Perplexity-User) fetch a page because a person just asked about
// it, and several of them ignore robots.txt by design on that basis.
const INDEXING_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "Diffbot",
  "Timpibot",
  "omgili",
  "YouBot",
];

const USER_TRIGGERED_AGENTS = ["ChatGPT-User", "Claude-User", "Claude-SearchBot", "Perplexity-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: INDEXING_AGENTS, allow: "/" },
      { userAgent: USER_TRIGGERED_AGENTS, allow: "/" },
    ],
    sitemap: "https://qlim8.com/sitemap.xml",
    host: "https://qlim8.com",
  };
}
