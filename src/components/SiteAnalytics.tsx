"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE_EVENT_NAMES, trackSiteEvent, type SiteEventName } from "@/lib/siteEvents";

// Mounted once in app/layout.tsx. Reports a pageview on every page load and
// client-side navigation (src/lib/siteEvents.ts: cookieless, no consent
// needed), and a click on any link or button inside an element marked
// `data-site-event="<event>"`. That lets a server component, such as the
// closing call to action on /demo, be measured without becoming a client
// component.
export function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackSiteEvent("pageview");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const control = target?.closest("a, button");
      const scope = control?.closest<HTMLElement>("[data-site-event]");
      const name = scope?.dataset.siteEvent;
      if (!control || !name || !(SITE_EVENT_NAMES as readonly string[]).includes(name)) return;
      const label = (control.textContent ?? "").trim().slice(0, 64);
      trackSiteEvent(name as SiteEventName, label ? { label } : undefined);
    };
    // Capture phase: the demo dialog stops some clicks from bubbling.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
