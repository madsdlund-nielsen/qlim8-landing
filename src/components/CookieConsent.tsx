"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { GOOGLE_ADS_ID } from "@/lib/tracking";
import {
  CONSENT_KEY,
  OPEN_COOKIE_SETTINGS,
  consentModeFor,
  currentConsent,
  serializeConsent,
  type ConsentChoice,
} from "@/lib/consent";

const GA_MEASUREMENT_ID = "G-B98XTFG3KX";

type Choice = Pick<ConsentChoice, "statistics" | "marketing">;

// Load the Google tag once, with Consent Mode v2 set from the visitor's
// choice before anything is configured, and configure only what was chosen:
// the GA4 property for statistics, the Google Ads account for marketing. With
// neither, nothing loads at all.
//
// The dataLayer/gtag shim is defined synchronously (the standard snippet) so
// the calls queue immediately and the library drains them once it loads.
function applyGoogleTags(choice: Choice) {
  const loaded = !!document.querySelector(`script[src*="googletagmanager.com/gtag"]`);
  if (!loaded && !choice.statistics && !choice.marketing) return;

  if (!loaded) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // The gtag library expects the live `arguments` object on the dataLayer;
      // rest params would push a plain array it does not recognise. This is the
      // one place `arguments` is the correct choice, matching Google's snippet.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", consentModeFor(choice));
    window.gtag("js", new Date());
  } else {
    window.gtag("consent", "update", consentModeFor(choice));
  }
  if (choice.statistics) window.gtag("config", GA_MEASUREMENT_ID);
  if (choice.marketing) window.gtag("config", GOOGLE_ADS_ID);

  if (!loaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

// Withdrawn consent: delete the Google cookies this page can reach, on the
// host and on the parent domain they are usually set on.
function deleteGoogleCookies(choice: Choice) {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => (!choice.statistics && (n === "_ga" || n.startsWith("_ga_"))) || (!choice.marketing && n === "_gcl_au"));
  const host = window.location.hostname;
  const domains = [host, `.${host.replace(/^www\./, "")}`];
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<Choice>({ statistics: false, marketing: false });

  useEffect(() => {
    const stored = currentConsent();
    if (stored) applyGoogleTags(stored);
    else setIsVisible(true);

    const reopen = () => {
      const now = currentConsent();
      setDraft({ statistics: now?.statistics ?? false, marketing: now?.marketing ?? false });
      setCustomizing(true);
      setIsVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const save = useCallback((choice: Choice) => {
    const before = currentConsent();
    try {
      localStorage.setItem(CONSENT_KEY, serializeConsent(choice));
    } catch {
      // Storage blocked: the choice holds for this page view only.
    }
    if (before && ((before.statistics && !choice.statistics) || (before.marketing && !choice.marketing))) {
      deleteGoogleCookies(choice);
    }
    applyGoogleTags(choice);
    setCustomizing(false);
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookieindstillinger"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Vi bruger nødvendige cookies, for at siden virker. Med dit samtykke bruger vi også Google Analytics til
            statistik og Google Ads til at måle vores annoncer.{" "}
            <a href="/cookies" className="text-primary hover:underline">
              Læs cookieerklæringen
            </a>
          </p>
        </div>

        {customizing && (
          <fieldset className="grid gap-2 text-sm text-gray-700 sm:pl-8">
            <legend className="sr-only">Vælg cookies</legend>
            <label className="flex items-start gap-2">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong>Nødvendige</strong>: husker dit valg. Kan ikke fravælges.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={draft.statistics}
                onChange={(e) => setDraft((d) => ({ ...d, statistics: e.target.checked }))}
                data-testid="checkbox-cookies-statistics"
              />
              <span>
                <strong>Statistik</strong>: Google Analytics viser os, hvordan siden bruges.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                data-testid="checkbox-cookies-marketing"
              />
              <span>
                <strong>Marketing</strong>: Google Ads måler, om vores annoncer virker.
              </span>
            </label>
          </fieldset>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2">
          {customizing ? (
            <Button size="sm" variant="outline" onClick={() => save(draft)} data-testid="button-save-cookies">
              Gem valg
            </Button>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setCustomizing(true)} data-testid="button-customize-cookies">
              Tilpas
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => save({ statistics: false, marketing: false })}
            data-testid="button-reject-cookies"
          >
            Kun nødvendige
          </Button>
          <Button
            size="sm"
            onClick={() => save({ statistics: true, marketing: true })}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-accept-cookies"
          >
            Acceptér alle
          </Button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
