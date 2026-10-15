"use client";
import { useEffect, useState } from "react";
import { resolveSignupSource, trackContactRequest } from "@/lib/tracking";

type Topic = "demo" | "question";

// /kontakt?emne=demo (DEMO_HREF in src/content/cta.ts) opens the form with
// "Book en demo" chosen. Read after mount rather than with useSearchParams, so
// the page stays prerendered, the same way NewsletterSignupDialog reads its
// deep link.
const TOPIC_PARAM = "emne";

const INPUT =
  "w-full min-h-12 px-4 py-3 rounded-md border border-border-strong bg-card text-body text-foreground placeholder:text-muted-foreground";

/**
 * The contact form: a demo booking or a question, sent through the same-origin
 * proxy (app/api/contact/route.ts) to qlim8-app, which stores it and notifies
 * us. The only way to become a customer besides calling: there is no signup.
 */
export function ContactForm({ submitLabel }: { submitLabel: string }) {
  const [topic, setTopic] = useState<Topic>("question");
  const [fields, setFields] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  // Honeypot: hidden from people, filled in by naive bots. The app drops any
  // request that carries it.
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get(TOPIC_PARAM) === "demo") setTopic("demo");
  }, []);

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields({ ...fields, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const source = resolveSignupSource("kontakt");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          name: fields.name,
          email: fields.email,
          company: fields.company || undefined,
          phone: fields.phone || undefined,
          message: fields.message || undefined,
          source,
          website: website || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        trackContactRequest(topic, source);
        setSent(data.message || "Tak! Vi vender tilbage hurtigst muligt.");
      } else {
        setError(data.message || "Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.");
      }
    } catch {
      setError("Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg bg-band p-8" role="status" data-testid="contact-sent">
        <p className="font-display text-h3 text-primary mb-2">
          {topic === "demo" ? "Tak for din booking" : "Tak for din besked"}
        </p>
        <p className="text-foreground">{sent}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
      <fieldset>
        <legend className="block text-body-sm font-medium text-foreground mb-2">Hvad drejer det sig om?</legend>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["demo", "Book en demo"],
              ["question", "Et spørgsmål"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center justify-center has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring rounded-md border px-4 py-3 text-body-sm font-medium transition-colors ${
                topic === value ? "border-primary bg-band text-primary" : "border-border-strong bg-card text-foreground hover:bg-band"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={value}
                checked={topic === value}
                onChange={() => setTopic(value)}
                className="sr-only"
                data-testid={`radio-topic-${value}`}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="contact-name" className="block text-body-sm font-medium text-foreground mb-2">Navn</label>
        <input id="contact-name" type="text" autoComplete="name" required value={fields.name} onChange={set("name")} className={INPUT} placeholder="Dit fulde navn" data-testid="input-name" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-body-sm font-medium text-foreground mb-2">E-mail</label>
        <input id="contact-email" type="email" autoComplete="email" required value={fields.email} onChange={set("email")} className={INPUT} placeholder="din@email.dk" data-testid="input-email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className="block text-body-sm font-medium text-foreground mb-2">Virksomhed</label>
          <input id="contact-company" type="text" autoComplete="organization" value={fields.company} onChange={set("company")} className={INPUT} placeholder="Dit virksomhedsnavn" data-testid="input-company" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-body-sm font-medium text-foreground mb-2">
            Telefon {topic === "demo" ? "" : <span className="font-normal text-muted-foreground">(valgfri)</span>}
          </label>
          <input id="contact-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} className={INPUT} placeholder="12 34 56 78" data-testid="input-phone" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-body-sm font-medium text-foreground mb-2">
          Besked {topic === "demo" && <span className="font-normal text-muted-foreground">(valgfri)</span>}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required={topic === "question"}
          value={fields.message}
          onChange={set("message")}
          className={`${INPUT} resize-none`}
          placeholder={
            topic === "demo"
              ? "Fortæl gerne kort, hvad I skal bruge klimaregnskabet til, og hvornår det passer jer."
              : "Hvordan kan vi hjælpe dig?"
          }
          data-testid="input-message"
        />
      </div>
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Lad dette felt være tomt</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error && (
        <p className="rounded-md border border-destructive bg-card p-3 text-body-sm text-destructive" role="alert" data-testid="contact-error">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="min-h-12 w-full rounded-md bg-primary px-6 py-3 text-button font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        data-testid="button-submit"
      >
        {loading ? "Sender..." : topic === "demo" ? "Book demo" : submitLabel}
      </button>
    </form>
  );
}
