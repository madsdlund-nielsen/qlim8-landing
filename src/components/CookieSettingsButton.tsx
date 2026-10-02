"use client";
import { OPEN_COOKIE_SETTINGS } from "@/lib/consent";

// "Cookieindstillinger" in the footer: reopens the cookie banner, so a visitor
// can change or withdraw a choice at any time, as the cookie declaration
// promises. The banner (CookieConsent) listens for the event.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      data-testid="button-cookie-settings"
    >
      Cookieindstillinger
    </button>
  );
}
