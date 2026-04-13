import { useEffect } from "react";
import { useLocation } from "wouter";

const PUBLIC_PAGE_TITLES: Record<string, string> = {
  "/auth": "qlim8 | Log ind",
};

const AUTHENTICATED_PAGE_TITLES: Record<string, string> = {
  "/": "qlim8 | Dashboard",
  "/onboarding": "qlim8 | Onboarding",
  "/pricing": "qlim8 | Priser",
  "/collectors": "qlim8 | Datakilder",
  "/ledger": "qlim8 | Udledninger",
  "/reduction": "qlim8 | Reduktionshub",
  "/scenarios": "qlim8 | Scenarieplanner",
  "/klimaagenten": "qlim8 | Klimaagenten",
  "/reporting": "qlim8 | Eksportstudio",
  "/settings": "qlim8 | Indstillinger",
  "/account": "qlim8 | Konto",
  "/admin": "qlim8 | Admin",
};

export function usePageTitle(options?: { 
  customTitle?: string; 
  isAuthenticated?: boolean;
  isLoading?: boolean;
}) {
  const [location] = useLocation();
  const { customTitle, isAuthenticated, isLoading } = options || {};

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (customTitle) {
      document.title = `qlim8 | ${customTitle}`;
      return;
    }

    if (location.startsWith("/public/")) {
      document.title = "qlim8 | Offentlig profil";
      return;
    }

    const titles = isAuthenticated ? AUTHENTICATED_PAGE_TITLES : PUBLIC_PAGE_TITLES;
    const title = titles[location];
    
    if (title) {
      document.title = title;
    } else if (isAuthenticated) {
      document.title = "qlim8 | Dashboard";
    }
  }, [location, customTitle, isAuthenticated, isLoading]);
}

export function setPageTitle(pageName: string) {
  document.title = pageName === "" ? "qlim8 | ESG er nemt" : `qlim8 | ${pageName}`;
}
