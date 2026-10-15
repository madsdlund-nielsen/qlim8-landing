// The logic of the lead-capture slide-in (src/components/public/SlideIn.tsx),
// kept pure so it can be tested: when it starts, what is valid, how a phone
// number is read, what is sent, what is stored, and where it never shows.

import { DRIVERS, ERRORS, SIZES, TOPICS } from "../content/slideIn.ts";

export const SESSION_KEY = "qlim8_slidein_s";
export const PERSIST_KEY = "qlim8_slidein";
export const DELAY_MS = 8000;
export const SCROLL_PCT = 50;
export const MAX_AUTO_OPENS = 3;
export const COOLDOWN_DAYS = 30;
const DAY = 86_400_000;

export type Trigger = "tid" | "scroll" | "exit-intent" | "pille";
export type View = "waiting" | "hidden" | "open" | "minimized" | "gone";

export interface SlideInData {
  name: string;
  email: string;
  size: string;
  driver: string;
  phone: string;
  phoneSkipped: boolean;
  interests: string[];
  vsme: boolean;
}

/** What survives a reload, in sessionStorage. */
export interface SessionState {
  touched: boolean;
  counted: boolean;
  signedUp: boolean;
  step: number;
  data: SlideInData;
  triggeredBy: Trigger | null;
  completedAt: string | null;
  leadId: string | null;
}

/** What survives the session, in localStorage, and only with marketing consent. */
export interface Persistent {
  signedUp: boolean;
  dismissCount: number;
  lastDismissAt: number;
  signedUpAt?: string;
}

export function emptyData(): SlideInData {
  return { name: "", email: "", size: "", driver: "", phone: "", phoneSkipped: false, interests: [], vsme: false };
}

export function emptySession(): SessionState {
  return {
    touched: false,
    counted: false,
    signedUp: false,
    step: 0,
    data: emptyData(),
    triggeredBy: null,
    completedAt: null,
    leadId: null,
  };
}

export function emptyPersistent(): Persistent {
  return { signedUp: false, dismissCount: 0, lastDismissAt: 0 };
}

const TRIGGERS: readonly string[] = ["tid", "scroll", "exit-intent", "pille"];

function parseJson(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const v: unknown = JSON.parse(raw);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const bool = (v: unknown): boolean => v === true;

/** Stored session state, repaired field by field; rubbish gives a fresh one. */
export function parseSession(raw: string | null): SessionState {
  const o = parseJson(raw);
  const base = emptySession();
  if (!o) return base;
  const d = (o.data && typeof o.data === "object" ? o.data : {}) as Record<string, unknown>;
  const step = typeof o.step === "number" && Number.isInteger(o.step) && o.step >= 0 && o.step <= 5 ? o.step : 0;
  return {
    touched: bool(o.touched),
    counted: bool(o.counted),
    signedUp: bool(o.signedUp),
    step,
    data: {
      name: str(d.name),
      email: str(d.email),
      size: str(d.size),
      driver: str(d.driver),
      phone: str(d.phone),
      phoneSkipped: bool(d.phoneSkipped),
      interests: Array.isArray(d.interests) ? d.interests.filter((i): i is string => typeof i === "string") : [],
      vsme: bool(d.vsme),
    },
    triggeredBy: typeof o.triggeredBy === "string" && TRIGGERS.includes(o.triggeredBy) ? (o.triggeredBy as Trigger) : null,
    completedAt: typeof o.completedAt === "string" ? o.completedAt : null,
    leadId: typeof o.leadId === "string" && o.leadId ? o.leadId : null,
  };
}

export function serializeSession(s: SessionState): string {
  return JSON.stringify(s);
}

export function parsePersistent(raw: string | null): Persistent {
  const o = parseJson(raw);
  const base = emptyPersistent();
  if (!o) return base;
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : 0);
  return {
    signedUp: bool(o.signedUp),
    dismissCount: Math.floor(num(o.dismissCount)),
    lastDismissAt: num(o.lastDismissAt),
    ...(typeof o.signedUpAt === "string" ? { signedUpAt: o.signedUpAt } : {}),
  };
}

export interface StartDecision {
  view: View;
  touched: boolean;
  counted: boolean;
  why: string;
}

/** How the slide-in starts on a page load. */
export function decideStart(input: {
  persistent: Persistent;
  session: Pick<SessionState, "signedUp" | "touched" | "counted">;
  consentDecided: boolean;
  now?: number;
}): StartDecision {
  const { persistent: p, session: s, consentDecided } = input;
  const now = input.now ?? Date.now();
  const keep = { touched: s.touched, counted: s.counted };
  if (p.signedUp || s.signedUp) return { view: "gone", ...keep, why: "signed up" };
  if (!consentDecided) return { view: "waiting", ...keep, why: "cookie banner unanswered" };
  if (s.touched) return { view: "minimized", ...keep, why: "closed earlier in this session" };
  if (p.dismissCount >= MAX_AUTO_OPENS && now - p.lastDismissAt < COOLDOWN_DAYS * DAY) {
    return { view: "minimized", touched: true, counted: true, why: "closed in several visits, pause" };
  }
  return { view: "hidden", ...keep, why: "armed" };
}

/** The persistent record after a visitor closed the panel for the first time in a session. */
export function recordDismiss(p: Persistent, now: number = Date.now()): Persistent {
  const stale = now - p.lastDismissAt > COOLDOWN_DAYS * DAY;
  return { ...p, dismissCount: (stale ? 0 : p.dismissCount) + 1, lastDismissAt: now };
}

export function recordSignup(p: Persistent, at: string): Persistent {
  return { ...p, signedUp: true, signedUpAt: at };
}

/** Has the visitor scrolled far enough to open it? */
export function scrollReached(scrollY: number, scrollHeight: number, innerHeight: number, pct: number = SCROLL_PCT): boolean {
  const max = scrollHeight - innerHeight;
  return max > 0 && scrollY / max >= pct / 100;
}

/** Exit intent: the pointer left through the top edge of the window. */
export function isExitIntent(clientY: number): boolean {
  return clientY <= 0;
}

/** Eight digits of a Danish number (+45 and 0045 allowed), or null. */
export function phoneDigits(v: string): string | null {
  const d = String(v).replace(/[\s\-().]/g, "").replace(/^(\+45|0045)/, "");
  return /^\d{8}$/.test(d) ? d : null;
}

/** "12345678" as "12 34 56 78". */
export function formatPhone(digits: string): string {
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Field = "name" | "email" | "size" | "driver" | "phone" | "interests";
export type Errors = Partial<Record<Field, string>>;

export function validateStep(step: number, d: SlideInData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.name.trim()) e.name = ERRORS.name;
    if (!EMAIL.test(d.email.trim())) e.email = ERRORS.email;
  }
  if (step === 2) {
    if (!d.size) e.size = ERRORS.choose;
    if (!d.driver) e.driver = ERRORS.choose;
  }
  if (step === 3 && !d.phoneSkipped && !phoneDigits(d.phone)) e.phone = ERRORS.phone;
  if (step === 4 && !d.interests.length) e.interests = ERRORS.interests;
  return e;
}

export interface LeadPayload {
  name: string;
  email: string;
  companySize: string;
  driver: string;
  phone: string | null;
  interests: string[];
  triggeredBy: Trigger | null;
  source: string;
}

/** The body of POST /api/whitepaper-lead. */
export function buildLeadPayload(d: SlideInData, triggeredBy: Trigger | null, source: string): LeadPayload {
  return {
    name: d.name.trim(),
    email: d.email.trim(),
    companySize: d.size,
    driver: d.driver,
    phone: d.phoneSkipped ? null : phoneDigits(d.phone),
    interests: [...d.interests],
    triggeredBy,
    source,
  };
}

/** Only values the app's lists contain may be sent. */
export function isKnownChoice(d: SlideInData): boolean {
  return (
    (SIZES as readonly string[]).includes(d.size) &&
    (DRIVERS as readonly string[]).includes(d.driver) &&
    d.interests.every((i) => (TOPICS as readonly string[]).includes(i))
  );
}

// Pages without the slide-in: where the visitor is already acting on a form or
// reading the legal text, and everything that is not a page.
const HIDDEN_PREFIXES = [
  "/kontakt",
  "/priser",
  "/nyhedsbrev",
  "/privatlivspolitik",
  "/cookies",
  "/handelsbetingelser",
  "/databehandleraftale",
  "/docs",
  "/api",
  "/md",
];

export function isHiddenRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (path.endsWith(".md")) return true;
  return HIDDEN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}
