// Registry of bundled default copy per CMS pageKey. Served to the qlim8-app
// admin CMS via /api/cms/defaults so the editor can show the site's actual
// current content next to any stored overrides.

import { HOMEPAGE_FAQS } from "@/content/homepage-faqs";
import { HOME_PAGE_KEY, HOME_COPY } from "./home";
import { PRICING_PAGE_KEY, PRICING_COPY } from "./pricing";
import { ABOUT_PAGE_KEY, ABOUT_COPY } from "./about";
import { METHODOLOGY_PAGE_KEY, METHODOLOGY_COPY } from "./methodology";
import { CONTACT_PAGE_KEY, CONTACT_COPY } from "./contact";
import { CAREERS_PAGE_KEY, CAREERS_COPY } from "./careers";
import {
  LEGAL_COOKIES_PAGE_KEY,
  LEGAL_TERMS_PAGE_KEY,
  LEGAL_PRIVACY_PAGE_KEY,
  LEGAL_COOKIES_COPY,
  LEGAL_TERMS_COPY,
  LEGAL_PRIVACY_COPY,
} from "./legal";

export const COPY_DEFAULTS: Record<string, unknown> = {
  [HOME_PAGE_KEY]: HOME_COPY,
  // Pre-existing pageKeys consumed by app/page.tsx and app/om-os/page.tsx.
  // FAQ defaults are the bundled list; image defaults are empty strings,
  // meaning "use the bundled asset" (resolvers treat blank as unset).
  "homepage.faqs": { items: HOMEPAGE_FAQS },
  "landing.images": { hero: "", feature1: "", feature2: "", feature3: "" },
  "about.images": { founder: "" },
  [PRICING_PAGE_KEY]: PRICING_COPY,
  [ABOUT_PAGE_KEY]: ABOUT_COPY,
  [METHODOLOGY_PAGE_KEY]: METHODOLOGY_COPY,
  [CONTACT_PAGE_KEY]: CONTACT_COPY,
  [CAREERS_PAGE_KEY]: CAREERS_COPY,
  [LEGAL_COOKIES_PAGE_KEY]: LEGAL_COOKIES_COPY,
  [LEGAL_TERMS_PAGE_KEY]: LEGAL_TERMS_COPY,
  [LEGAL_PRIVACY_PAGE_KEY]: LEGAL_PRIVACY_COPY,
};

export const COPY_PAGE_KEYS = Object.keys(COPY_DEFAULTS);
