"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buttonStyles } from "@/components/ds/Button";
import { DEMO_VIDEO_HREF, EMPLOYEE_BANDS, PHONE_CTA, PHONE_DISPLAY, type EmployeeBand } from "@/content/cta";
import {
  OPEN_DEMO_DIALOG_EVENT,
  isDemoHref,
  isEmployeeBand,
  looksLikeEmail,
  routeForBand,
  safeBookingUrl,
} from "@/lib/demoDialog";
import { resolveSignupSource, trackContactRequest } from "@/lib/tracking";
import { trackSiteEvent } from "@/lib/siteEvents";

// The demo dialog, mounted once in app/layout.tsx. Every "Book demo" on the
// site is a plain link to DEMO_HREF (/kontakt?emne=demo), in bundled and in
// CMS-published copy alike. A click on one is caught here, at the document and
// before the framework sees it, and opens this dialog instead of leaving the
// page. Without JavaScript the link still leads to the contact form.
//
// Step 1: name and e-mail. Step 2: the number of employees, in the bands of the
// app's slide-in. Up to nine goes to the film on /demo. Ten or more books a time
// in the calendar the app names in its answer (bookingUrl); Google Calendar is
// linked, never framed, because the CSP has no frame-src.

type Step = 1 | 2 | 3;
type Errors = { name?: string; email?: string; band?: string };
type Lead = { ok: boolean; message: string | null; bookingUrl: string | null };

const GENERIC_ERROR = `Noget gik galt. Prøv igen, eller ring på ${PHONE_DISPLAY}.`;
const FALLBACK_THANKS = "Tak! Vi kontakter dig for at aftale et tidspunkt til demoen.";

const INPUT =
  "w-full min-h-12 px-4 py-3 rounded-md border border-border-strong bg-card text-body text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive";

export function DemoDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [band, setBand] = useState<EmployeeBand | "">("");
  // Honeypot, like the contact form's: hidden from people, filled in by bots.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sendError, setSendError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<{ url: string | null; message: string | null }>({ url: null, message: null });

  const opener = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepChanged = useRef(false);

  const show = useCallback((from: HTMLElement | null) => {
    opener.current = from ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setOpen(true);
    trackSiteEvent("demo_dialog_opened");
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      if (!isDemoHref(anchor.getAttribute("href"), window.location.origin)) return;
      e.preventDefault();
      e.stopPropagation();
      show(anchor);
    };
    const onOpen = () => show(null);
    document.addEventListener("click", onClick, true);
    window.addEventListener(OPEN_DEMO_DIALOG_EVENT, onOpen);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(OPEN_DEMO_DIALOG_EVENT, onOpen);
    };
  }, [show]);

  // After a step change the heading takes focus, so a keyboard or screen-reader
  // user lands on the new step instead of on a button that is gone.
  useEffect(() => {
    if (!stepChanged.current) return;
    stepChanged.current = false;
    titleRef.current?.focus();
  }, [step]);

  const goTo = (next: Step) => {
    stepChanged.current = true;
    setStep(next);
  };

  const reset = () => {
    setStep(1);
    setName("");
    setEmail("");
    setBand("");
    setBooking({ url: null, message: null });
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    // Closed after the visit is complete: the next opening starts afresh.
    if (!next && step === 3) reset();
    if (!next) {
      setErrors({});
      setSendError(null);
    }
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Skriv dit navn.";
    if (!email.trim()) next.email = "Skriv din e-mail.";
    else if (!looksLikeEmail(email)) next.email = "E-mailen ser ikke helt rigtig ud. Tjek den og prøv igen.";
    setErrors(next);
    if (next.name || next.email) {
      (document.getElementById(next.name ? "demo-name" : "demo-email") as HTMLInputElement | null)?.focus();
      return;
    }
    goTo(2);
  };

  const sendLead = async (chosen: EmployeeBand): Promise<Lead> => {
    const source = resolveSignupSource("demo-dialog");
    try {
      // The same-origin proxy (app/api/contact/route.ts) forwards to qlim8-app.
      // keepalive lets the request finish even if the film's page takes over.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          topic: "demo",
          name: name.trim(),
          email: email.trim(),
          employees: chosen,
          source,
          website: website || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        trackContactRequest("demo", source);
        trackSiteEvent("demo_requested", { band: chosen });
        return {
          ok: true,
          message: typeof data.message === "string" ? data.message : null,
          bookingUrl: safeBookingUrl(data.bookingUrl),
        };
      }
      return { ok: false, message: typeof data?.message === "string" ? data.message : null, bookingUrl: null };
    } catch {
      return { ok: false, message: null, bookingUrl: null };
    }
  };

  const submitBand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!band || !isEmployeeBand(band)) {
      setErrors({ band: "Vælg, hvor mange ansatte I er." });
      return;
    }
    setErrors({});
    setSendError(null);

    if (routeForBand(band) === "video") {
      // The film is never held back by the lead: send it, and go.
      void sendLead(band);
      handleOpenChange(false);
      reset();
      opener.current = null;
      router.push(DEMO_VIDEO_HREF);
      return;
    }

    setLoading(true);
    const lead = await sendLead(band);
    setLoading(false);
    if (!lead.ok) {
      setSendError(lead.message || GENERIC_ERROR);
      return;
    }
    setBooking({ url: lead.bookingUrl, message: lead.message });
    goTo(3);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-md"
        data-testid="demo-dialog"
        onCloseAutoFocus={(e) => {
          // Back to the link that opened the dialog, even where the browser
          // does not focus a link on click.
          const el = opener.current;
          if (el && el.isConnected) {
            e.preventDefault();
            el.focus();
          }
        }}
      >
        <p className="text-trust text-muted-foreground" aria-live="polite" data-testid="demo-step">
          {step === 3 ? "Næsten færdig" : `Trin ${step} af 2`}
        </p>

        {step === 1 && (
          <form onSubmit={submitDetails} noValidate className="grid gap-5" data-testid="demo-step-1">
            <DialogHeader>
              <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
                Se qlim8 i praksis
              </DialogTitle>
              <DialogDescription className="text-body-sm">
                Fortæl os, hvem du er, så viser vi dig, hvordan qlim8 samler jeres klimaregnskab.
              </DialogDescription>
            </DialogHeader>
            <div>
              <label htmlFor="demo-name" className="mb-2 block text-body-sm font-medium text-foreground">Navn</label>
              <input
                id="demo-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "demo-name-error" : undefined}
                className={INPUT}
                placeholder="Dit fulde navn"
                data-testid="demo-input-name"
              />
              {errors.name && <p id="demo-name-error" className="mt-2 text-body-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="demo-email" className="mb-2 block text-body-sm font-medium text-foreground">E-mail</label>
              <input
                id="demo-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "demo-email-error" : undefined}
                className={INPUT}
                placeholder="din@email.dk"
                data-testid="demo-input-email"
              />
              {errors.email && <p id="demo-email-error" className="mt-2 text-body-sm text-destructive">{errors.email}</p>}
            </div>
            <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="demo-website">Lad dette felt være tomt</label>
              <input id="demo-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <button type="submit" className={buttonStyles({ variant: "primary", full: true })} data-testid="demo-next">
              Næste
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitBand} noValidate className="grid gap-5" data-testid="demo-step-2">
            <DialogHeader>
              <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
                Hvor mange ansatte er I?
              </DialogTitle>
              <DialogDescription className="text-body-sm">
                Så ved vi, om du skal se en film af platformen eller vælge et tidspunkt til en gennemgang sammen med os.
              </DialogDescription>
            </DialogHeader>
            <fieldset aria-describedby={errors.band ? "demo-band-error" : undefined}>
              <legend className="sr-only">Antal ansatte</legend>
              <div className="grid grid-cols-2 gap-2">
                {EMPLOYEE_BANDS.map((b) => (
                  <label
                    key={b.value}
                    className={`flex min-h-12 cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-center text-body-sm font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring ${
                      band === b.value ? "border-primary bg-band text-primary" : "border-border-strong bg-card text-foreground hover:bg-band"
                    }`}
                  >
                    <input
                      type="radio"
                      name="employees"
                      value={b.value}
                      checked={band === b.value}
                      onChange={() => {
                        setBand(b.value);
                        setErrors({});
                      }}
                      className="sr-only"
                      data-testid={`demo-band-${b.value}`}
                    />
                    {b.label}
                  </label>
                ))}
              </div>
              {errors.band && <p id="demo-band-error" role="alert" className="mt-2 text-body-sm text-destructive">{errors.band}</p>}
            </fieldset>
            {sendError && (
              <p className="rounded-md border border-destructive bg-card p-3 text-body-sm text-destructive" role="alert" data-testid="demo-error">
                {sendError}
              </p>
            )}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setSendError(null);
                  goTo(1);
                }}
                className={buttonStyles({ variant: "outline" })}
                data-testid="demo-back"
              >
                Tilbage
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${buttonStyles({ variant: "primary" })} disabled:cursor-not-allowed disabled:opacity-50`}
                data-testid="demo-submit"
              >
                {loading ? "Sender..." : "Fortsæt"}
              </button>
            </div>
            <p className="text-trust text-muted-foreground">
              Vi bruger kun dine oplysninger til at kontakte dig om demoen. Læs mere i vores{" "}
              <a href="/privatlivspolitik" className="text-primary underline underline-offset-2 hover:no-underline">
                privatlivspolitik
              </a>
              .
            </p>
          </form>
        )}

        {step === 3 && (
          <div className="grid gap-5" data-testid="demo-step-3">
            <DialogHeader>
              <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
                {booking.url ? "Vælg et tidspunkt til jeres demo" : "Tak, vi vender tilbage"}
              </DialogTitle>
              <DialogDescription className="text-body-sm">
                {booking.url
                  ? "Find et tidspunkt, der passer jer, i vores kalender."
                  : booking.message || FALLBACK_THANKS}
              </DialogDescription>
            </DialogHeader>
            {booking.url && (
              <a
                href={booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "primary", full: true })}
                data-testid="demo-booking-link"
              >
                Vælg tidspunkt i kalenderen
              </a>
            )}
            <p className="text-body-sm text-foreground">
              Hellere tale sammen nu? <a href={PHONE_CTA.href} className="font-semibold text-primary underline underline-offset-2 hover:no-underline">{PHONE_CTA.label}</a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
