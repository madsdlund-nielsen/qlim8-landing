"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ds/Button";
import { cn } from "@/lib/utils";
import { CONSENT_CHANGED, OPEN_COOKIE_SETTINGS, currentConsent } from "@/lib/consent";
import { resolveSignupSource, trackWhitepaperLead } from "@/lib/tracking";
import { trackSiteEvent } from "@/lib/siteEvents";
import {
  DELAY_MS,
  PERSIST_KEY,
  SESSION_KEY,
  buildLeadPayload,
  decideStart,
  formatPhone,
  isExitIntent,
  isHiddenRoute,
  parsePersistent,
  parseSession,
  phoneDigits,
  recordDismiss,
  recordSignup,
  scrollReached,
  serializeSession,
  validateStep,
  type Errors,
  type Field,
  type SessionState,
  type SlideInData,
  type Trigger,
  type View,
} from "@/lib/slideIn";
import { BOOK_TITLE, COPY, DRIVERS, PRIVACY_URL, SIZES, TOPICS, TOTAL_STEPS } from "@/content/slideIn";

const INPUT =
  "w-full min-h-12 px-4 py-3 rounded-md border border-border-strong bg-card text-body text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive";
const TEXT_BUTTON =
  "inline-flex min-h-12 items-center justify-center rounded-md px-4 text-button font-semibold text-muted-foreground hover:text-foreground hover:underline";
const PANEL_ID = "slidein-panel";
const TITLE_ID = "slidein-title";
const FALLBACK = "Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.";

// localStorage and sessionStorage can be missing or throw (private windows,
// blocked site data): every access is wrapped and the component works without.
function read(kind: "local" | "session", key: string): string | null {
  try {
    return (kind === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}
function write(kind: "local" | "session", key: string, value: string) {
  try {
    (kind === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    // Storage unavailable: the state holds for this page view only.
  }
}

/** Mounted once in the root layout; renders nothing on the pages in isHiddenRoute. */
export function SlideIn() {
  const pathname = usePathname();
  if (isHiddenRoute(pathname)) return null;
  return <SlideInPanel />;
}

async function postJson(url: string, body: unknown): Promise<{ ok: boolean; message: string; leadId?: string }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => null);
    const message = data && typeof data.message === "string" && data.message ? data.message : FALLBACK;
    if (res.ok && data?.success) return { ok: true, message, leadId: typeof data.leadId === "string" ? data.leadId : undefined };
    return { ok: false, message };
  } catch {
    return { ok: false, message: FALLBACK };
  }
}

function SlideInPanel() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("waiting");
  const [s, setS] = useState<SessionState>(() => parseSession(null));
  const [decided, setDecided] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [vsmeBusy, setVsmeBusy] = useState(false);
  const [vsmeError, setVsmeError] = useState("");

  const shown = useRef(new Set<Field>());
  const pendingFocus = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const focusPill = useRef(false);

  // Load the session and the cookie choice, decide how to start.
  useEffect(() => {
    const session = parseSession(read("session", SESSION_KEY));
    const isDecided = currentConsent() !== null;
    const start = decideStart({
      persistent: parsePersistent(read("local", PERSIST_KEY)),
      session,
      consentDecided: isDecided,
    });
    setS({ ...session, touched: start.touched, counted: start.counted });
    setDecided(isDecided);
    setView(start.view);
    setReady(true);
  }, []);

  // The banner: a saved choice lets the slide-in start; reopening the banner hides it meanwhile.
  const latest = useRef(s);
  latest.current = s;
  useEffect(() => {
    const onChanged = () => {
      setBannerOpen(false);
      setDecided(true);
      const cur = latest.current;
      setView((v) =>
        v === "waiting"
          ? decideStart({ persistent: parsePersistent(read("local", PERSIST_KEY)), session: cur, consentDecided: true }).view
          : v,
      );
      if (currentConsent()?.marketing && cur.signedUp) {
        write("local", PERSIST_KEY, JSON.stringify(recordSignup(parsePersistent(read("local", PERSIST_KEY)), cur.completedAt ?? new Date().toISOString())));
      }
    };
    const onOpen = () => setBannerOpen(true);
    window.addEventListener(CONSENT_CHANGED, onChanged);
    window.addEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    return () => {
      window.removeEventListener(CONSENT_CHANGED, onChanged);
      window.removeEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    };
  }, []);

  // Session state, so a reload continues where the visitor was.
  useEffect(() => {
    if (ready) write("session", SESSION_KEY, serializeSession(s));
  }, [ready, s]);

  const openPanel = useCallback((by: Trigger) => {
    pendingFocus.current = true;
    // Cookieless analytics (src/lib/siteEvents.ts): the pill is a reopening, the rest a showing.
    if (by === "pille") trackSiteEvent("slidein_reopened");
    else trackSiteEvent("slidein_shown", { trigger: by });
    setS((cur) => ({ ...cur, touched: true, triggeredBy: cur.triggeredBy ?? by }));
    setView("open");
  }, []);

  // Triggers: the first of a delay, half way down the page, or leaving through the top.
  useEffect(() => {
    if (view !== "hidden" || !decided) return;
    const timer = window.setTimeout(() => openPanel("tid"), DELAY_MS);
    const onScroll = () => {
      if (scrollReached(window.scrollY, document.documentElement.scrollHeight, window.innerHeight)) openPanel("scroll");
    };
    const onLeave = (e: MouseEvent) => {
      if (isExitIntent(e.clientY)) openPanel("exit-intent");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [view, decided, openPanel]);

  const finish = useCallback(() => setView("gone"), []);

  const minimize = useCallback(() => {
    if (s.step === 5) {
      finish();
      return;
    }
    focusPill.current = true;
    setView("minimized");
    trackSiteEvent("slidein_minimized", { step: s.step });
    if (!s.counted) {
      if (currentConsent()?.marketing) {
        write("local", PERSIST_KEY, JSON.stringify(recordDismiss(parsePersistent(read("local", PERSIST_KEY)))));
      }
      setS((cur) => ({ ...cur, touched: true, counted: true }));
    } else {
      setS((cur) => ({ ...cur, touched: true }));
    }
  }, [s.step, s.counted, finish]);

  useEffect(() => {
    if (view !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") minimize();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [view, minimize]);

  // Focus: the step heading after a step change, the pill after minimising.
  useEffect(() => {
    if (view === "open" && pendingFocus.current) {
      pendingFocus.current = false;
      headingRef.current?.focus({ preventScroll: true });
    }
    if (view === "minimized" && focusPill.current) {
      focusPill.current = false;
      pillRef.current?.focus({ preventScroll: true });
    }
  }, [view, s.step, s.data.vsme, bannerOpen]);

  const go = (step: number) => {
    pendingFocus.current = true;
    trackSiteEvent("slidein_step", { step });
    shown.current = new Set();
    setErrors({});
    setSubmitError("");
    setS((cur) => ({ ...cur, step, touched: true }));
    setView("open");
  };

  const setData = (patch: Partial<SlideInData>, field?: Field) => {
    const data = { ...s.data, ...patch };
    setS((cur) => ({ ...cur, data }));
    if (field && shown.current.has(field)) setErrors((e) => ({ ...e, [field]: validateStep(s.step, data)[field] }));
  };

  const blur = (field: Field) => {
    let data = s.data;
    if (field === "phone") {
      const digits = phoneDigits(data.phone);
      if (digits) {
        data = { ...data, phone: formatPhone(digits) };
        setS((cur) => ({ ...cur, data }));
      }
    }
    shown.current.add(field);
    setErrors((e) => ({ ...e, [field]: validateStep(s.step, data)[field] }));
  };

  const focusFirst = (field: Field) => {
    const el = document.getElementById(`slidein-f-${field}`) ?? document.querySelector<HTMLElement>(`#${PANEL_ID} [data-group="${field}"] input`);
    el?.focus();
  };

  const submitStep = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep(s.step, s.data);
    setErrors(errs);
    (Object.keys(errs) as Field[]).forEach((f) => shown.current.add(f));
    const first = Object.keys(errs)[0] as Field | undefined;
    if (first) {
      focusFirst(first);
      return;
    }
    if (s.step < TOTAL_STEPS) {
      go(s.step + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const source = resolveSignupSource("slidein");
    const res = await postJson("/api/whitepaper-lead", buildLeadPayload(s.data, s.triggeredBy, source));
    if (!res.ok) {
      setSubmitting(false);
      setSubmitError(res.message);
      return;
    }
    const completedAt = new Date().toISOString();
    if (currentConsent()?.marketing) {
      write("local", PERSIST_KEY, JSON.stringify(recordSignup(parsePersistent(read("local", PERSIST_KEY)), completedAt)));
    }
    trackWhitepaperLead(source);
    trackSiteEvent("whitepaper_requested", s.triggeredBy ? { trigger: s.triggeredBy } : undefined);
    setSubmitting(false);
    pendingFocus.current = true;
    setS((cur) => ({ ...cur, signedUp: true, step: 5, completedAt, leadId: res.leadId ?? null }));
    setView("open");
  };

  const requestVsme = async () => {
    setVsmeBusy(true);
    setVsmeError("");
    if (!s.leadId) {
      setVsmeBusy(false);
      setVsmeError(FALLBACK);
      return;
    }
    const res = await postJson(`/api/whitepaper-lead/${encodeURIComponent(s.leadId)}/vsme`, { email: s.data.email.trim() });
    setVsmeBusy(false);
    if (!res.ok) {
      setVsmeError(res.message);
      return;
    }
    trackSiteEvent("vsme_requested");
    pendingFocus.current = true;
    setS((cur) => ({ ...cur, data: { ...cur.data, vsme: true } }));
  };

  if (!ready || !decided || bannerOpen || view === "waiting" || view === "hidden" || view === "gone") return null;

  const d = s.data;
  const fieldError = (f: Field) => (
    <p id={`slidein-e-${f}`} role="alert" className="text-trust text-destructive empty:hidden">
      {errors[f]}
    </p>
  );

  return (
    <>
      {view === "open" && (
        <section
          id={PANEL_ID}
          role="dialog"
          aria-modal="false"
          aria-labelledby={TITLE_ID}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-40 max-h-[calc(100dvh-3rem)] w-95 overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-card shadow-soft max-sm:inset-x-4 max-sm:bottom-[max(1rem,env(safe-area-inset-bottom))] max-sm:max-h-[85dvh] max-sm:w-auto"
        >
          <div className="flex items-center gap-3 pl-5 pr-2 pt-3">
            <Avatar />
            <div className="min-w-0 flex-1 leading-tight">
              <strong className="block text-body-sm font-semibold text-foreground">{COPY.brand}</strong>
              <span className="text-trust text-muted-foreground">{COPY.brandSub}</span>
            </div>
            <button
              type="button"
              onClick={minimize}
              aria-label={COPY.close}
              className="grid size-12 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-band hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 4l10 10M14 4 4 14" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          <div key={s.step} className="px-5 pb-5 pt-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300">

            {s.step === 0 && (
              <>
                <Heading ref={headingRef}>{COPY.welcomeTitle}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">{COPY.welcomeLead(BOOK_TITLE)}</p>
                <div className="mt-4 flex items-center gap-4 rounded-md bg-band p-3">
                  <Cover />
                  <span>
                    <strong className="block text-body-sm font-semibold leading-snug text-primary">{COPY.freebieTitle}</strong>
                    <small className="mt-0.5 block text-trust text-muted-foreground">{COPY.freebieSmall}</small>
                  </span>
                </div>
                <div className="mt-4 grid gap-1">
                  <Button full onClick={() => go(1)}>
                    {COPY.welcomeCta}
                  </Button>
                  <button type="button" className={TEXT_BUTTON} onClick={minimize}>
                    {COPY.notNow}
                  </button>
                </div>
              </>
            )}

            {s.step === 1 && (
              <>
                <Heading ref={headingRef}>{COPY.contactTitle}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">{COPY.contactLead}</p>
                <form noValidate onSubmit={submitStep} className="mt-4 grid gap-4">
                  <div className="grid gap-1.5">
                    <label htmlFor="slidein-f-name" className="text-body-sm font-semibold text-foreground">
                      {COPY.nameLabel}
                    </label>
                    <input
                      id="slidein-f-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      autoCapitalize="words"
                      required
                      className={INPUT}
                      value={d.name}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby="slidein-e-name"
                      onChange={(e) => setData({ name: e.target.value }, "name")}
                      onBlur={() => blur("name")}
                    />
                    {fieldError("name")}
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="slidein-f-email" className="text-body-sm font-semibold text-foreground">
                      {COPY.emailLabel}
                    </label>
                    <input
                      id="slidein-f-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      required
                      className={INPUT}
                      value={d.email}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby="slidein-e-email"
                      onChange={(e) => setData({ email: e.target.value }, "email")}
                      onBlur={() => blur("email")}
                    />
                    {fieldError("email")}
                  </div>
                  <Button type="submit" full>
                    {COPY.next}
                  </Button>
                </form>
              </>
            )}

            {s.step === 2 && (
              <>
                <Heading ref={headingRef}>{COPY.aboutTitle}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">{COPY.aboutLead}</p>
                <form noValidate onSubmit={submitStep} className="mt-4 grid gap-4">
                  <fieldset data-group="size" className="m-0 grid min-w-0 gap-2 border-0 p-0">
                    <legend className="p-0 text-body-sm font-semibold text-foreground">{COPY.sizeLegend}</legend>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((o) => (
                        <Option key={o} type="radio" name="size" value={o} checked={d.size === o} onChange={() => setData({ size: o }, "size")} chip />
                      ))}
                    </div>
                    {fieldError("size")}
                  </fieldset>
                  <fieldset data-group="driver" className="m-0 grid min-w-0 gap-2 border-0 p-0">
                    <legend className="p-0 text-body-sm font-semibold text-foreground">{COPY.driverLegend}</legend>
                    <div className="grid gap-2">
                      {DRIVERS.map((o) => (
                        <Option key={o} type="radio" name="driver" value={o} checked={d.driver === o} onChange={() => setData({ driver: o }, "driver")} />
                      ))}
                    </div>
                    {fieldError("driver")}
                  </fieldset>
                  <div className="grid grid-cols-[auto_1fr] gap-2">
                    <button type="button" className={TEXT_BUTTON} onClick={() => go(1)}>
                      {COPY.back}
                    </button>
                    <Button type="submit">{COPY.next}</Button>
                  </div>
                </form>
              </>
            )}

            {s.step === 3 && (
              <>
                <Heading ref={headingRef}>{COPY.phoneTitle}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">{COPY.phoneLead}</p>
                <form noValidate onSubmit={submitStep} className="mt-4 grid gap-4">
                  <div className="grid gap-1.5">
                    <label htmlFor="slidein-f-phone" className="text-body-sm font-semibold text-foreground">
                      {COPY.phoneLabel}
                    </label>
                    <div className="flex items-stretch">
                      <span
                        aria-hidden="true"
                        className="grid place-items-center rounded-l-md border border-r-0 border-border-strong bg-band px-3 text-body font-semibold text-muted-foreground"
                      >
                        +45
                      </span>
                      <input
                        id="slidein-f-phone"
                        name="tel"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        className={cn(INPUT, "rounded-l-none tabular-nums")}
                        value={d.phone}
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby="slidein-e-phone"
                        onChange={(e) => setData({ phone: e.target.value, phoneSkipped: false }, "phone")}
                        onBlur={() => blur("phone")}
                      />
                    </div>
                    {fieldError("phone")}
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-2">
                    <button type="button" className={TEXT_BUTTON} onClick={() => go(2)}>
                      {COPY.back}
                    </button>
                    <Button type="submit">{COPY.next}</Button>
                  </div>
                  <button
                    type="button"
                    className={TEXT_BUTTON}
                    onClick={() => {
                      setS((cur) => ({ ...cur, data: { ...cur.data, phoneSkipped: true, phone: "" } }));
                      go(4);
                    }}
                  >
                    {COPY.skip}
                  </button>
                </form>
              </>
            )}

            {s.step === 4 && (
              <>
                <Heading ref={headingRef}>{COPY.topicsTitle}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">{d.driver === DRIVERS[0] ? COPY.topicsLeadBank : COPY.topicsLead}</p>
                <form noValidate onSubmit={submitStep} className="mt-4 grid gap-4">
                  <fieldset data-group="interests" className="m-0 grid min-w-0 gap-2 border-0 p-0">
                    <legend className="sr-only">{COPY.topicsLegend}</legend>
                    <div className="grid gap-2">
                      {TOPICS.map((t) => (
                        <Option
                          key={t}
                          type="checkbox"
                          name="interests"
                          value={t}
                          checked={d.interests.includes(t)}
                          onChange={(checked) =>
                            setData({ interests: checked ? [...d.interests, t] : d.interests.filter((i) => i !== t) }, "interests")
                          }
                        />
                      ))}
                    </div>
                    {fieldError("interests")}
                    <p role="alert" className="text-trust text-destructive empty:hidden">
                      {submitError}
                    </p>
                  </fieldset>
                  <div className="grid grid-cols-[auto_1fr] gap-2">
                    <button type="button" className={TEXT_BUTTON} onClick={() => go(3)}>
                      {COPY.back}
                    </button>
                    <Button type="submit" disabled={submitting} className="disabled:opacity-60">
                      {COPY.submit}
                    </Button>
                  </div>
                  <p className="text-trust text-muted-foreground">
                    {COPY.finePrefix}
                    <a href={PRIVACY_URL} target="_blank" rel="noopener" className="text-primary underline">
                      {COPY.finePrivacy}
                    </a>
                    {COPY.fineSuffix}
                  </p>
                </form>
              </>
            )}

            {s.step === 5 && (
              <>
                <svg viewBox="0 0 48 48" aria-hidden="true" className="mb-3 size-12">
                  <circle cx="24" cy="24" r="24" className="fill-band" />
                  <path d="M14 25l7 7 13-15" fill="none" className="stroke-primary" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Heading ref={headingRef}>{COPY.thanks(d.name.trim().split(/\s+/)[0] ?? "")}</Heading>
                <p className="mt-2 text-body-sm text-muted-foreground">
                  {COPY.thanksLeadBefore}
                  <strong className="font-semibold text-foreground">{d.email}</strong>
                  {COPY.thanksLeadAfter}
                </p>
                {d.interests.length > 0 && (
                  <p className="mt-3 rounded-md bg-band p-3 text-body-sm text-foreground">{COPY.alsoSending(d.interests.join(", "))}</p>
                )}
                {d.vsme ? (
                  <>
                    <p role="status" className="mt-3 rounded-md bg-band p-3 text-body-sm text-foreground">
                      <strong className="font-semibold">{COPY.vsmeSentStrong}</strong>
                      {COPY.vsmeSentRest}
                    </p>
                    <div className="mt-4 grid">
                      <Button full onClick={finish}>
                        {COPY.closeDone}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 rounded-md border border-border-strong p-3">
                      <strong className="text-body-sm font-semibold text-primary">{COPY.followupTitle}</strong>
                      <p className="mt-1 text-body-sm text-muted-foreground">{COPY.followupText}</p>
                    </div>
                    <p role="alert" className="mt-2 text-trust text-destructive empty:hidden">
                      {vsmeError}
                    </p>
                    <div className="mt-3 grid gap-1">
                      <Button full onClick={requestVsme} disabled={vsmeBusy} className="disabled:opacity-60">
                        {COPY.followupYes}
                      </Button>
                      <button type="button" className={TEXT_BUTTON} onClick={finish}>
                        {COPY.followupNo}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {view === "minimized" && (
        <button
          ref={pillRef}
          type="button"
          aria-expanded="false"
          aria-controls={PANEL_ID}
          onClick={() => openPanel("pille")}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-40 flex min-h-14 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-border bg-card py-2 pl-2.5 pr-5 text-left shadow-soft hover:border-primary max-sm:bottom-[max(1rem,env(safe-area-inset-bottom))] max-sm:right-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300"
        >
          <Avatar dot />
          <span className="min-w-0 leading-tight">
            <strong className="block text-body-sm font-semibold text-foreground">{s.step === 0 ? COPY.pillStart : COPY.pillResume}</strong>
            <span className="block text-trust text-muted-foreground">{s.step === 0 ? COPY.pillStartSub : COPY.pillResumeSub}</span>
          </span>
        </button>
      )}
    </>
  );
}

function Heading({ children, ref }: { children: React.ReactNode; ref: React.Ref<HTMLHeadingElement> }) {
  return (
    <h2 id={TITLE_ID} ref={ref} tabIndex={-1} className="font-display text-h3 text-primary outline-none">
      {children}
    </h2>
  );
}

function Avatar({ dot }: { dot?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-primary font-display font-semibold text-primary-foreground",
        dot ? "size-10 text-lead" : "size-8 text-body-sm",
      )}
    >
      Q
      {dot && (
        <span className="absolute -bottom-px -right-px size-3 rounded-full border-2 border-card bg-sage">
          <span className="absolute -inset-0.5 rounded-full bg-sage opacity-60 motion-safe:animate-ping" />
        </span>
      )}
    </span>
  );
}

function Cover() {
  return (
    <svg viewBox="0 0 64 80" aria-hidden="true" className="h-[72px] w-14 shrink-0">
      <rect x="9" y="9" width="52" height="68" rx="4" className="fill-card stroke-border" />
      <rect x="5" y="5" width="52" height="68" rx="4" className="fill-card stroke-border" />
      <rect x="1" y="1" width="52" height="68" rx="4" className="fill-card stroke-border-strong" />
      <path d="M9 17C9 12 13 9 27 9c0 6-4 9-18 9Z" className="fill-primary" />
      {[28, 38, 48, 58].map((y) => (
        <g key={y}>
          <rect x="9" y={y} width="6" height="6" rx="1.5" className="fill-primary" />
          <rect x="19" y={y + 1.5} width="26" height="3" rx="1.5" className="fill-border" />
        </g>
      ))}
    </svg>
  );
}

function Option({
  type,
  name,
  value,
  checked,
  onChange,
  chip,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  chip?: boolean;
}) {
  return (
    <label className="relative block min-w-0">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 m-0 size-full cursor-pointer opacity-0"
      />
      <span
        className={cn(
          "flex min-h-12 items-center gap-3 rounded-md border px-4 py-2 text-body-sm leading-snug text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          checked ? "border-primary bg-band font-semibold" : "border-border-strong bg-card hover:bg-band",
        )}
      >
        {!chip && (
          <span
            aria-hidden="true"
            className={cn(
              "flex size-5 shrink-0 items-center justify-center border",
              type === "radio" ? "rounded-full" : "rounded-sm",
              checked ? "border-primary bg-primary" : "border-border-strong bg-card",
            )}
          >
            {checked && (
              <svg viewBox="0 0 10 10" className="size-2.5">
                <path d="M1.5 5.2 4 7.6 8.5 2.6" fill="none" className="stroke-primary-foreground" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}
        {value}
      </span>
    </label>
  );
}
