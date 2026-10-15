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
import { useToast } from '@/hooks/use-toast'
import { buttonStyles } from '@/components/ds/Button'

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
  const { toast } = useToast()

  // Read the param after mount rather than with useSearchParams: the homepage is
  // prerendered (app/page.tsx sets revalidate = 300), and useSearchParams would
  // force a Suspense boundary and a client-side bailout on it. Same
  // window.location + replaceState approach as the checkout status on /priser.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has(DEEP_LINK_PARAM)) return
    setOpen(true)
    // Drop our own param but keep the rest: resolveSignupSource reads ?ref and
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
        trackNewsletterSignup(resolveSignupSource('forside-dialog'))
        setName('')
        setEmail('')
        // The dialog closes on success, so the confirmation lives in a toast
        // rather than inside the dialog the visitor no longer sees.
        setOpen(false)
        toast({
          title: 'Tak for tilmeldingen!',
          description: 'Tjek din indbakke, vi har sendt dig en velkomstmail.',
        })
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
          className={buttonStyles({ variant: "outline" })}
          data-testid="button-open-newsletter"
        >
          Skriv dig op til nyheder og udgivelser
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skriv dig op til nyheder og udgivelser</DialogTitle>
          <DialogDescription>
            Få besked om nye funktioner, udgivelser og indhold om klimaregnskab, uden spam.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Dit navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="min-h-12 rounded-md border border-border-strong bg-card px-4 py-3 text-body-sm text-foreground"
            data-testid="input-newsletter-name"
          />
          <input
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="min-h-12 rounded-md border border-border-strong bg-card px-4 py-3 text-body-sm text-foreground"
            data-testid="input-newsletter-email"
          />
          <button
            type="submit"
            disabled={loading}
            className={`${buttonStyles({ variant: "primary" })} disabled:cursor-not-allowed disabled:opacity-50`}
            data-testid="button-newsletter-subscribe"
          >
            {loading ? 'Tilmelder...' : 'Skriv mig op'}
          </button>
        </form>
        {message && (
          <p
            className={`p-3 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-band text-primary'
                : 'bg-destructive/10 text-destructive'
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
