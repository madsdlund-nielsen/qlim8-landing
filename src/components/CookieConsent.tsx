"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { GOOGLE_ADS_ID } from "@/lib/tracking";

const GA_MEASUREMENT_ID = "G-B98XTFG3KX";
const COOKIE_CONSENT_KEY = "qlim8_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

// Load the Google tag and configure both the GA4 property and the Google Ads
// account on it. One gtag library serves both ids.
//
// The dataLayer/gtag shim is defined synchronously (the standard snippet) so
// the config calls queue immediately and the library drains them once it
// loads. Configuring inside script.onload instead would call window.gtag
// before anything defines it.
function loadGoogleTags() {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // The gtag library expects the live `arguments` object on the dataLayer;
    // rest params would push a plain array it does not recognise. This is the
    // one place `arguments` is the correct choice, matching Google's snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  window.gtag("config", GOOGLE_ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (stored === "accepted") {
      setStatus("accepted");
      loadGoogleTags();
    } else if (stored === "rejected") {
      setStatus("rejected");
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setStatus("accepted");
    setIsVisible(false);
    loadGoogleTags();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setStatus("rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>
              Vi bruger cookies til at forbedre din oplevelse og analysere trafik på siden.{" "}
              <a href="/cookies" className="text-primary hover:underline">
                Læs vores cookiepolitik
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="flex-1 sm:flex-none"
            data-testid="button-reject-cookies"
          >
            Kun nødvendige
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
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
