import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "wouter";

const GA_MEASUREMENT_ID = "G-B98XTFG3KX";
const COOKIE_CONSENT_KEY = "qlim8_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

function loadGoogleAnalytics() {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  };
}

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (stored === "accepted") {
      setStatus("accepted");
      loadGoogleAnalytics();
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
    loadGoogleAnalytics();
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
          <Cookie className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>
              Vi bruger cookies til at forbedre din oplevelse og analysere trafik på siden.{" "}
              <Link href="/cookies" className="text-emerald-600 hover:underline">
                Læs vores cookiepolitik
              </Link>
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
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700"
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
