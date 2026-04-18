"use client"
import { useState } from 'react'

export function NewsletterForm() {
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
      const res = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
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
    <div className="bg-emerald-50 rounded-2xl p-8 lg:p-12">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Vil du have artiklerne direkte i indbakken?
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Tilmeld dig og få nye artikler om klimaregnskab, compliance og bæredygtighed —
          uden spam, kun indhold der gavner din virksomhed.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Dit navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            data-testid="input-newsletter-name"
          />
          <input
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            data-testid="input-newsletter-email"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            data-testid="button-newsletter-subscribe"
          >
            {loading ? 'Tilmelder...' : 'Tilmeld nyhedsbrev'}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-red-100 text-red-800'
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
