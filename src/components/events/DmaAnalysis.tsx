"use client";
// The interactive part of /events/dma: the hero, the ten topics with two 1-5
// questions each and the live matrix beside them, and, once every topic is
// answered, the profile (counts per group, the topics ranked, the same matrix,
// an info dialog per topic) with a form to have the profile sent. The answers
// stay in this component's state; only the form sends anything, and then
// through the contact proxy (app/api/contact/route.ts) as a question, so the
// request lands in the app's contact list with the profile in the message.
import { useEffect, useRef, useState } from "react";
import { Check, Leaf, Scale, Users, X } from "lucide-react";
import { Button, ButtonRow } from "@/components/ds/Button";
import { cn } from "@/lib/utils";
import { resolveSignupSource, trackContactRequest } from "@/lib/tracking";
import {
  DMA_BOOKING_URL,
  DMA_COPY,
  DMA_SCALE_WORDS,
  DMA_TOPICS,
  DMA_ZONE_LABEL,
  type DmaGroup,
  type DmaTopic,
} from "@/content/copy/events-dma";
import { DmaLegend, DmaMatrix, zoneOf, type DmaAnswers } from "./DmaMatrix";

const GROUPS: { name: DmaGroup; Icon: typeof Leaf }[] = [
  { name: "Miljø", Icon: Leaf },
  { name: "Mennesker", Icon: Users },
  { name: "Ledelse", Icon: Scale },
];

const CARD = "min-w-0 rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8";
const INPUT =
  "min-h-12 w-full rounded-md border border-border-strong bg-card px-4 py-3 text-body text-foreground placeholder:text-muted-foreground";

function emptyAnswers(): DmaAnswers {
  return Object.fromEntries(DMA_TOPICS.map((t) => [t.code, { i: null, f: null }]));
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DmaAnalysis() {
  const [answers, setAnswers] = useState<DmaAnswers>(emptyAnswers);
  const [cur, setCur] = useState(DMA_TOPICS[0].code);
  const [pin, setPin] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const complete = (code: string) => zoneOf(answers[code]) !== null;
  const done = DMA_TOPICS.filter((t) => complete(t.code)).length;
  const allDone = done === DMA_TOPICS.length;
  const topic = DMA_TOPICS.find((t) => t.code === cur)!;
  const idx = DMA_TOPICS.indexOf(topic);
  const a = answers[cur];
  const zone = zoneOf(a);

  const select = (code: string) => {
    if (timer.current) clearTimeout(timer.current);
    setCur(code);
  };

  const answer = (dim: "i" | "f", val: number) => {
    const was = complete(cur);
    const next = { ...answers, [cur]: { ...answers[cur], [dim]: val } };
    setAnswers(next);
    if (was || zoneOf(next[cur]) === null) return;
    if (timer.current) clearTimeout(timer.current);
    const remaining = DMA_TOPICS.filter((t) => zoneOf(next[t.code]) === null);
    if (remaining.length === 0) {
      timer.current = setTimeout(() => scrollToId("profil"), 700);
      return;
    }
    // On to the next unanswered topic, after a moment to see the badge land.
    timer.current = setTimeout(() => {
      for (let k = 1; k <= DMA_TOPICS.length; k++) {
        const t2 = DMA_TOPICS[(idx + k) % DMA_TOPICS.length];
        if (zoneOf(next[t2.code]) === null) {
          setCur(t2.code);
          return;
        }
      }
    }, 600);
  };

  const togglePin = (code: string) => setPin((p) => (p === code ? null : code));
  const hl = hover ?? pin;

  return (
    <>
      <section aria-labelledby="dma-h1" className="mx-auto w-full max-w-(--container-max) px-4 sm:px-6">
        <div className="grid items-center gap-8 py-16 md:py-section lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h1 id="dma-h1" className="mb-6 text-balance">
              {DMA_COPY.hero.title}
            </h1>
            <p className="mb-8 max-w-(--measure-body) text-lead text-foreground">{DMA_COPY.hero.lead}</p>
            <ButtonRow>
              <Button variant="primary" onClick={() => scrollToId("analyse")}>
                {DMA_COPY.hero.start}
              </Button>
              {allDone && (
                <Button variant="secondary" href={DMA_BOOKING_URL} target="_blank" rel="noopener">
                  {DMA_COPY.hero.book}
                </Button>
              )}
            </ButtonRow>
            <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-trust text-muted-foreground">
              {DMA_COPY.hero.trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-1">
                  <Check aria-hidden="true" strokeWidth={2} className="h-4 w-4 shrink-0 text-sage" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-band p-6 sm:p-8">
            <ol className="m-0 grid list-none gap-6 p-0">
              {DMA_COPY.hero.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-4">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <b className="mb-0.5 block font-display text-xl font-medium text-primary">{s.title}</b>
                    <span className="text-body-sm text-muted-foreground">{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="analyse" aria-labelledby="dma-h2a" className="mx-auto w-full max-w-(--container-max) scroll-mt-28 px-4 pb-16 sm:px-6 md:pb-section">
        <div className="mb-12 grid gap-4">
          <h2 id="dma-h2a">{DMA_COPY.analysis.title}</h2>
          <p className="max-w-(--measure-body) text-lead text-foreground">{DMA_COPY.analysis.lead}</p>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className={CARD} aria-live="polite">
            <div className="mb-2 flex flex-wrap justify-between gap-2 text-body-sm text-muted-foreground">
              <span>
                Emne {idx + 1} af {DMA_TOPICS.length}
              </span>
              <span>{done} besvaret</span>
            </div>
            <div className="mb-6 flex gap-1" role="group" aria-label="Vælg emne">
              {DMA_TOPICS.map((x) => (
                <button
                  key={x.code}
                  type="button"
                  onClick={() => select(x.code)}
                  aria-current={x.code === cur}
                  aria-label={`${x.code} ${x.name}${complete(x.code) ? ", besvaret" : ""}`}
                  className="relative h-7 flex-1 border-0 bg-transparent p-0"
                >
                  <span
                    className={cn(
                      "absolute inset-x-0 top-2.5 h-2 rounded-full transition-colors duration-200",
                      x.code === cur ? "bg-primary" : complete(x.code) ? "bg-sage" : "bg-sand",
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="mb-2 inline-block text-body-sm font-semibold text-sage">{topic.group}</span>
            <h3 className="mb-2">{topic.name}</h3>
            <p className="m-0 text-body-sm text-muted-foreground">{topic.desc}</p>

            <Question dim="i" topic={topic} value={a.i} onAnswer={answer} />
            <Question dim="f" topic={topic} value={a.f} onAnswer={answer} />

            {done === 5 && <p className="mt-4 text-body-sm font-semibold text-sage">Du er halvvejs. Dit billede tager form.</p>}

            <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
              <Button variant="outline" disabled={idx === 0} className="disabled:cursor-default disabled:opacity-45" onClick={() => select(DMA_TOPICS[idx - 1].code)}>
                Forrige emne
              </Button>
              {allDone ? (
                <Button variant="primary" onClick={() => scrollToId("profil")}>
                  Se din profil
                </Button>
              ) : (
                <Button
                  variant="primary"
                  disabled={idx === DMA_TOPICS.length - 1}
                  className="disabled:cursor-default disabled:opacity-45"
                  onClick={() => select(DMA_TOPICS[idx + 1].code)}
                >
                  Næste emne
                </Button>
              )}
            </div>
          </div>

          <div className={CARD}>
            <h3 className="mb-2">Dit billede</h3>
            <p className="mb-6 text-body-sm text-muted-foreground">Hver cirkel er et emne. Jo højere og længere til højre, jo mere væsentligt.</p>
            <DmaMatrix answers={answers} current={cur} onSelect={select} />
            <p className="mt-6 min-h-12 text-body-sm text-pretty">
              <b className="font-semibold text-primary">
                {topic.code} {topic.name}:
              </b>{" "}
              {zone
                ? `påvirkning ${a.i}, økonomi ${a.f}. ${DMA_ZONE_LABEL[zone]}.`
                : "besvar begge spørgsmål, så lander emnet i billedet."}
            </p>
            <DmaLegend withThreshold />
          </div>
        </div>
      </section>

      <section id="profil" aria-labelledby="dma-h2p" className="scroll-mt-28 bg-band py-16 md:py-section">
        <div className="mx-auto w-full max-w-(--container-max) px-4 sm:px-6">
          {allDone ? (
            <Profile answers={answers} hl={hl} pin={pin} onPin={togglePin} onHover={setHover} onInfo={setInfo} />
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 id="dma-h2p">Din profil venter</h2>
              <p className="mx-auto mt-2 max-w-[50ch] text-muted-foreground">
                Når du har besvaret alle ti emner, samler vi dit billede her og viser, hvad der fylder mest.
              </p>
            </div>
          )}
        </div>
      </section>

      <InfoDialog code={info} answers={answers} onClose={() => setInfo(null)} />
    </>
  );
}

function Question({
  dim,
  topic,
  value,
  onAnswer,
}: {
  dim: "i" | "f";
  topic: DmaTopic;
  value: number | null;
  onAnswer: (dim: "i" | "f", val: number) => void;
}) {
  const label = dim === "i" ? "Din påvirkning" : "Din økonomi";
  return (
    <div className="mt-8">
      <div className="mb-1 flex items-center gap-2 text-body-sm font-semibold text-primary">
        <i className={cn("size-3 flex-none rounded-[3px]", dim === "i" ? "bg-primary" : "bg-warm")} />
        {label}
      </div>
      <p className="mb-4 text-pretty">{dim === "i" ? topic.qi : topic.qf}</p>
      <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={dim === "i" ? "Påvirkning" : "Økonomi"}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onAnswer(dim, n)}
            className={cn(
              "min-h-12 rounded-md border font-semibold tabular-nums transition-colors duration-200",
              value === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border-strong bg-transparent text-primary hover:bg-band",
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] gap-2 text-body-sm text-muted-foreground">
        <span>Ingen</span>
        <b className="font-semibold text-foreground">{value != null ? DMA_SCALE_WORDS[value - 1] : "Vælg et tal"}</b>
        <span className="text-right">Meget høj</span>
      </div>
    </div>
  );
}

function Profile({
  answers,
  hl,
  pin,
  onPin,
  onHover,
  onInfo,
}: {
  answers: DmaAnswers;
  hl: string | null;
  pin: string | null;
  onPin: (code: string) => void;
  onHover: (code: string | null) => void;
  onInfo: (code: string) => void;
}) {
  const z = (code: string) => zoneOf(answers[code]);
  const mat = DMA_TOPICS.filter((t) => z(t.code) !== "none");
  const both = mat.filter((t) => z(t.code) === "both");
  const rest = DMA_TOPICS.filter((t) => z(t.code) === "none");
  const sorted = [...mat].sort((x, y) => {
    const ax = answers[x.code];
    const ay = answers[y.code];
    return ay.i! + ay.f! - (ax.i! + ax.f!);
  });
  const n = mat.length;
  const level = n <= 2 ? "et overskueligt billede" : n <= 5 ? "et fokuseret billede" : "et bredt billede";
  const line =
    n <= 2
      ? "Kun få emner når grænsen, så du kan koncentrere dig om dem."
      : n <= 5
        ? "Et par emner fylder mest, og det giver et roligt sted at starte."
        : "Mange emner når grænsen. Det er helt normalt, og det hjælper at tage dem ét ad gangen.";

  const item = (t: DmaTopic, muted: boolean) => {
    const zone = z(t.code)!;
    return (
      <li
        key={t.code}
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_44px] items-center rounded-lg border bg-card transition-colors duration-200",
          hl === t.code ? "border-primary ring-1 ring-primary ring-inset" : "border-border",
        )}
      >
        <button
          type="button"
          aria-pressed={pin === t.code}
          onClick={() => onPin(t.code)}
          onMouseEnter={() => onHover(t.code)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(t.code)}
          onBlur={() => onHover(null)}
          className="grid min-h-16 grid-cols-[36px_minmax(0,1fr)] items-center gap-4 rounded-lg border-0 bg-transparent px-4 py-3 text-left"
        >
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full text-xs font-semibold",
              muted
                ? "border-[1.5px] border-border-strong bg-card text-muted-foreground"
                : zone === "fin"
                  ? "bg-warm text-primary-hover"
                  : "bg-primary text-primary-foreground",
              !muted && zone === "both" && "ring-2 ring-warm ring-offset-2 ring-offset-card",
            )}
          >
            {t.code}
          </span>
          <div>
            <b className="block font-semibold">{t.name}</b>
            <span className="text-body-sm text-muted-foreground">{DMA_ZONE_LABEL[zone]}</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onInfo(t.code)}
          aria-label={`Mere om ${t.name}`}
          className="group grid size-11 place-items-center rounded-md border-0 bg-transparent"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-full border-[1.5px] border-sage font-display text-[17px] font-medium text-sage italic transition-colors duration-200 group-hover:bg-sage group-hover:text-primary-foreground"
          >
            i
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      <div className="mb-8 grid gap-4">
        <h2 id="dma-h2p">Din væsentlighedsprofil: {level}</h2>
        <p className="max-w-(--measure-body) text-lead text-foreground">
          {n} af {DMA_TOPICS.length} emner er væsentlige for din virksomhed
          {both.length > 0 &&
            `, og ${both.length}${both.length === 1 ? " af dem er dobbelt væsentligt" : " af dem er dobbelt væsentlige"}`}
          . {line}
        </p>
      </div>

      <LeadForm answers={answers} />

      <div className="grid gap-4 md:grid-cols-3 md:gap-8">
        {GROUPS.map(({ name, Icon }) => {
          const list = DMA_TOPICS.filter((t) => t.group === name);
          const m = list.filter((t) => z(t.code) !== "none").length;
          return (
            <div key={name} className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-band text-sage">
                <Icon aria-hidden="true" strokeWidth={1.75} className="size-6" />
              </span>
              <h3 className="mt-4 mb-2">{name}</h3>
              <p className="mb-1 font-display text-[32px] leading-10 font-medium text-primary">
                {m} af {list.length}
              </p>
              <p className="text-body-sm text-muted-foreground">
                {m === 0 ? "Ingen emner er væsentlige her lige nu." : m === 1 ? "Ét emne er væsentligt." : `${m} emner er væsentlige.`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4">{n ? "Dine væsentlige emner" : "Ingen væsentlige emner endnu"}</h3>
          {n > 0 && (
            <>
              <p className="-mt-2 mb-4 text-body-sm text-muted-foreground">
                Vælg et emne for at se det i billedet. Tryk på (i) for mere om emnet.
              </p>
              <ul className="m-0 grid list-none gap-2 p-0">{sorted.map((t) => item(t, false))}</ul>
            </>
          )}
          {rest.length > 0 && (
            <>
              <h3 className="mt-8 mb-4 text-lg leading-[26px] text-muted-foreground">Ikke væsentlige lige nu</h3>
              <ul className="m-0 grid list-none gap-2 p-0">{rest.map((t) => item(t, true))}</ul>
            </>
          )}
        </div>
        <div className={cn(CARD, "lg:sticky lg:top-28")}>
          <h3 className="mb-2">Dit billede</h3>
          <p className="mb-6 text-body-sm text-muted-foreground">Vælg et emne i listen, så fremhæver vi det her.</p>
          <DmaMatrix answers={answers} highlight={hl} onSelect={onPin} />
          <DmaLegend />
        </div>
      </div>
    </>
  );
}

/** The profile as plain text, for the message that reaches us with the request. */
function profileMessage(answers: DmaAnswers): string {
  const lines = DMA_TOPICS.map((t) => {
    const a = answers[t.code];
    return `${t.code} ${t.name}: påvirkning ${a.i}, økonomi ${a.f} (${DMA_ZONE_LABEL[zoneOf(a)!].toLowerCase()})`;
  });
  return ["Væsentlighedsprofil fra qlim8.com/events/dma. Send profilen til afsenderen.", "", ...lines].join("\n");
}

function LeadForm({ answers }: { answers: DmaAnswers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!name.trim()) {
      setError("Skriv dit navn, så vi ved, hvem profilen er til.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setError("Skriv en e-mail, vi kan sende profilen til, for eksempel navn@virksomhed.dk.");
      return;
    }
    setError(null);
    setLoading(true);
    const source = resolveSignupSource("events-dma");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "question",
          name: name.trim(),
          email: v,
          message: profileMessage(answers),
          source,
          website: website || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        trackContactRequest("question", source);
        setSent(`Tak. Vi sender din væsentlighedsprofil til ${v}.`);
      } else {
        setError(data.message || "Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.");
      }
    } catch {
      setError("Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(CARD, "mb-12 grid gap-4")}>
      <h3>Få tilsendt din væsentlighedsprofil</h3>
      <p className="max-w-(--measure-body)">
        Vi sender dit billede og de emner, der fylder mest, så du kan gemme det eller dele det med din ledelse, din bank eller din revisor.
      </p>
      {sent ? (
        <div className="flex items-start gap-3 rounded-md bg-band p-4" role="status">
          <Check aria-hidden="true" strokeWidth={2} className="mt-0.5 size-6 flex-none text-sage" />
          <p className="font-semibold">{sent}</p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="dma-name" className="block text-body-sm font-semibold text-primary">
                Dit navn
              </label>
              <input id="dma-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
            </div>
            <div>
              <label htmlFor="dma-email" className="block text-body-sm font-semibold text-primary">
                Din e-mail
              </label>
              <input
                id="dma-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="navn@virksomhed.dk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby="dma-help dma-err"
                className={INPUT}
              />
            </div>
          </div>
          {/* Honeypot: hidden from people, filled in by naive bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="dma-website">Website</label>
            <input id="dma-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div>
            <Button type="submit" variant="primary" disabled={loading} className="disabled:opacity-60">
              {loading ? "Sender..." : "Få tilsendt din væsentlighedsprofil"}
            </Button>
          </div>
          {error && (
            <p id="dma-err" role="alert" className="m-0 text-body-sm text-warm-ink">
              {error}
            </p>
          )}
          <p id="dma-help" className="m-0 text-trust text-muted-foreground">
            Ingen binding. Vi bruger kun dine oplysninger til at sende profilen og følge op, og du kan altid sige fra.
          </p>
        </form>
      )}
    </div>
  );
}

function InfoDialog({ code, answers, onClose }: { code: string | null; answers: DmaAnswers; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = code ? DMA_TOPICS.find((x) => x.code === code) : undefined;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (t && !d.open) d.showModal();
    if (!t && d.open) d.close();
  }, [t]);

  const zone = t ? zoneOf(answers[t.code]) : null;
  const a = t ? answers[t.code] : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="dma-info-title"
      className="m-auto max-h-[calc(100vh-32px)] w-[min(560px,calc(100%-32px))] overflow-auto rounded-lg bg-card p-6 text-foreground shadow-soft backdrop:bg-primary-hover/50 sm:p-8"
    >
      {t && (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Luk"
            className="absolute -top-3 -right-3 grid size-11 place-items-center rounded-md bg-transparent hover:bg-band"
          >
            <X aria-hidden="true" strokeWidth={1.75} className="size-[22px] text-primary" />
          </button>
          <h3 id="dma-info-title" className="mr-8 mb-2">
            {t.name}
          </h3>
          {zone && a && (
            <p className="mb-4 text-body-sm font-semibold text-sage">
              I dit billede: {DMA_ZONE_LABEL[zone].toLowerCase()} (påvirkning {a.i}, økonomi {a.f})
            </p>
          )}
          <p className="mb-4 text-pretty">{t.info.what}</p>
          <p className="mt-6 mb-1 text-body-sm font-semibold text-primary">Sådan kan qlim8 hjælpe</p>
          <p className="mb-4 text-pretty">{t.info.help}</p>
          <ButtonRow className="mt-6">
            {t.info.links.map((l, i) => (
              <Button key={l.href + l.label} href={l.href} variant={i === 0 ? "primary" : "outline"}>
                {l.label}
              </Button>
            ))}
          </ButtonRow>
        </div>
      )}
    </dialog>
  );
}
