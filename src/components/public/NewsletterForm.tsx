"use client"
import { useState } from 'react'
import { Button } from '@/components/ds/Button'
import { resolveSignupSource, trackNewsletterSignup } from '@/lib/tracking'

type NewsletterFormProps = {
  /** Placement label used when the URL carries no campaign token. */
  source?: string
  heading?: string
  description?: string
}

export function NewsletterForm({
  source = 'web',
  heading = 'Vil du have artiklerne direkte i indbakken?',
  description = 'Tilmeld dig og få nye artikler om klimaregnskab, compliance og bæredygtighed, uden spam, kun indhold der gavner din virksomhed.',
}: NewsletterFormProps = {}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    setMessage(null)
    try {
      // Same-origin proxy (app/api/newsletter/signup/route.ts) forwards to the
      // app, like the unsubscribe form does: no CORS, and the response is always
      // JSON even when the app host answers with an nginx or rate-limit page.
      const res = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        trackNewsletterSignup(resolveSignupSource(source))
        setMessage({ type: 'success', text: 'Tak for tilmeldingen! Tjek din indbakke.' })
        setName('')
        setEmail('')
      } else {
        setMessage({ type: 'error', text: data.message || 'Der opstod en fejl. Prøv igen.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Noget gik galt. Prøv igen senere.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-band rounded-lg p-8 lg:p-12">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="mb-3 text-h3">{heading}</h2>
        <p className="text-foreground mb-6 text-body-sm">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Dit navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="min-h-12 px-4 py-3 rounded-md border border-border-strong bg-card text-body text-foreground placeholder:text-muted-foreground"
            data-testid="input-newsletter-name"
          />
          <input
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="min-h-12 px-4 py-3 rounded-md border border-border-strong bg-card text-body text-foreground placeholder:text-muted-foreground"
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            data-testid="button-newsletter-subscribe"
          >
            {loading ? 'Tilmelder...' : 'Tilmeld nyhedsbrev'}
          </Button>
        </form>
        {message && (
          <p
            className={`mt-4 p-3 rounded-md border text-body-sm ${
              message.type === 'success'
                ? 'border-border-strong bg-card text-foreground'
                : 'border-destructive bg-card text-destructive'
            }`}
            data-testid={`message-${message.type}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}
