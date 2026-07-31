"use client"
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { resolveSignupSource, trackNewsletterSignup } from '@/lib/tracking'

// Opening the dialog from a link: /?nyhedsbrev=1 lands on the homepage with the
// signup already open, so one URL can point at the newsletter without leaving the
// marketing page behind.
const DEEP_LINK_PARAM = 'nyhedsbrev'

export function NewsletterSignupDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Read the param after mount rather than with useSearchParams: the homepage is
  // prerendered (app/page.tsx sets revalidate = 300), and useSearchParams would
  // force a Suspense boundary and a client-side bailout on it. Same
  // window.location + replaceState approach as the checkout status on /priser.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has(DEEP_LINK_PARAM)) return
    setOpen(true)
    // Drop our own param but keep the rest — resolveSignupSource reads ?ref and
    // ?utm_source straight off the URL when the form is submitted, so clearing the
    // whole query string here would throw the campaign token away first.
    params.delete(DEEP_LINK_PARAM)
    const query = params.toString()
    window.history.replaceState({}, '', query ? `${window.location.pathname}?${query}` : window.location.pathname)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    setMessage(null)
    try {
      // The newsletter endpoint lives on the app, not on this landing site — use an
      // absolute URL (same pattern as the pricing checkout).
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://app.qlim8.com'
      const res = await fetch(`${API_BASE}/api/newsletter/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        trackNewsletterSignup(resolveSignupSource('forside-dialog'))
        setMessage({ type: 'success', text: 'Tak for tilmeldingen! Check din email.' })
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
          data-testid="button-open-newsletter"
        >
          Skriv dig op til nyheder og udgivelser
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skriv dig op til nyheder og udgivelser</DialogTitle>
          <DialogDescription>
            Få besked om nye funktioner, udgivelser og indhold om klimaregnskab — uden spam.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Dit navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            data-testid="input-newsletter-name"
          />
          <input
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            data-testid="input-newsletter-email"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-newsletter-subscribe"
          >
            {loading ? 'Tilmelder...' : 'Skriv mig op'}
          </button>
        </form>
        {message && (
          <p
            className={`p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-accent text-accent-foreground'
                : 'bg-red-100 text-red-800'
            }`}
            data-testid={`message-${message.type}`}
          >
            {message.text}
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
