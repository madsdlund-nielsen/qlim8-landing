"use client"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function NewsletterSignupDialog() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setMessage(null)
    try {
      // The newsletter endpoint lives on the app, not on this landing site — use an
      // absolute URL (same pattern as the pricing checkout). The app requires a name,
      // but this dialog only collects an email, so derive a display name from it.
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://app.qlim8.com'
      const res = await fetch(`${API_BASE}/api/newsletter/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: email.split('@')[0], email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Tak for tilmeldingen! Check din email.' })
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
    <Dialog>
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
