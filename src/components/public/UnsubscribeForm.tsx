"use client";
import { useEffect, useState } from "react";

type LoadState = "loading" | "form" | "already" | "invalid" | "done";

const REASONS: { value: string; label: string }[] = [
  { value: "too_many_emails", label: "Jeg får for mange mails" },
  { value: "not_relevant", label: "Indholdet er ikke relevant for mig" },
  { value: "never_signed_up", label: "Jeg har aldrig tilmeldt mig" },
  { value: "other", label: "Andet" },
];

export function UnsubscribeForm({ id, token }: { id: string; token: string }) {
  const [state, setState] = useState<LoadState>("loading");
  const [reason, setReason] = useState("");
  const [freeText, setFreeText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount, ask the backend whether this is a valid link and whether the
  // subscriber is already unsubscribed, so we render the right view.
  useEffect(() => {
    if (!id || !token) {
      setState("invalid");
      return;
    }
    const qs = new URLSearchParams({ id, token }).toString();
    fetch(`/api/newsletter/unsubscribe?${qs}`)
      .then(async (res) => {
        if (res.status === 403 || res.status === 404) {
          setState("invalid");
          return;
        }
        const data = await res.json();
        if (data?.ok && data.alreadyUnsubscribed) setState("already");
        else if (data?.ok) setState("form");
        else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          token,
          reason,
          freeText: freeText.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.ok) setState("done");
      else setError("Noget gik galt. Prøv igen senere.");
    } catch {
      setError("Noget gik galt. Prøv igen senere.");
    } finally {
      setSubmitting(false);
    }
  };

  if (state === "loading") {
    return <p className="text-gray-600">Indlæser…</p>;
  }

  if (state === "invalid") {
    return (
      <div data-testid="unsubscribe-invalid">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Linket er ugyldigt</h1>
        <p className="text-gray-600">
          Dette afmeldingslink er ugyldigt eller udløbet. Brug linket nederst i en af vores
          seneste mails, eller kontakt os på{" "}
          <a className="text-primary underline" href="mailto:kontakt@qlim8.com">
            kontakt@qlim8.com
          </a>
          .
        </p>
      </div>
    );
  }

  if (state === "already") {
    return (
      <div data-testid="unsubscribe-already">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Du er allerede afmeldt</h1>
        <p className="text-gray-600">
          Du modtager ikke længere markedsføringsmails fra qlim8. Du behøver ikke gøre mere.
        </p>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div data-testid="unsubscribe-done">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Du er nu afmeldt</h1>
        <p className="text-gray-600">
          Tak for tilbagemeldingen. Du modtager ikke længere markedsføringsmails fra qlim8.
          Du vil stadig få vigtige kontomails (fx adgangskode og sikkerhed).
        </p>
      </div>
    );
  }

  // state === "form"
  return (
    <div data-testid="unsubscribe-form">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Afmeld nyhedsbrev</h1>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        Vi er kede af at se dig gå. Vil du fortælle os hvorfor? Det hjælper os med at blive
        bedre.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-gray-900 mb-1">
            Hvorfor afmelder du dig?
          </legend>
          {REASONS.map((r) => (
            <label key={r.value} className="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                name="reason"
                value={r.value}
                checked={reason === r.value}
                onChange={(e) => setReason(e.target.value)}
                className="accent-primary"
                data-testid={`reason-${r.value}`}
              />
              {r.label}
            </label>
          ))}
        </fieldset>

        <textarea
          placeholder="Vil du uddybe? (valgfrit)"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value.slice(0, 1000))}
          rows={3}
          className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          data-testid="unsubscribe-freetext"
        />

        <button
          type="submit"
          disabled={!reason || submitting}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          data-testid="unsubscribe-submit"
        >
          {submitting ? "Afmelder…" : "Afmeld mig"}
        </button>
        {error && (
          <p className="p-3 rounded-lg text-sm bg-red-100 text-red-800" data-testid="unsubscribe-error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
