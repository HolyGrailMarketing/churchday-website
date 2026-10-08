'use client'

import { useRef, useState } from 'react'
import { track } from '@/lib/analytics'
import { DEMO_DENOMINATION_OPTIONS } from '@/data/denominations'
import { ArrowRight, Calendar } from 'lucide-react'

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']

// Next 6 weekdays (Mon–Fri), computed client-side. Same logic as
// /for-pastors's getUpcomingDays — shared here so every page that embeds a
// demo form agrees on what "preferred day" means.
function getUpcomingDays() {
  const days: string[] = []
  const date = new Date()
  date.setDate(date.getDate() + 1)
  while (days.length < 6) {
    const day = date.getDay()
    if (day !== 0 && day !== 6) {
      days.push(date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    date.setDate(date.getDate() + 1)
  }
  return days
}

// `source` tags which page a demo request came from (Vercel Analytics),
// mirroring the `source: 'for_pastors'` tag /for-pastors already uses.
export function DemoForm({
  source,
  defaultChurch = '',
  // Denomination pages already know which body the visitor belongs to, so they
  // pre-select it rather than asking a question they've answered by arriving.
  defaultDenomination = '',
}: {
  source: string
  defaultChurch?: string
  defaultDenomination?: string
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    church: defaultChurch,
    denomination: defaultDenomination,
    phone: '',
    day: '',
    time: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const days = useRef<string[]>([])
  if (days.current.length === 0) days.current = getUpcomingDays()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          church: form.church,
          denomination: form.denomination,
          phone: form.phone,
          preferredDate: form.day,
          preferredTime: form.time,
        }),
      })
      if (!res.ok) throw new Error('failed')
      track('demo_submitted', { source, denomination: form.denomination || 'unspecified' })
      setSent(true)
    } catch {
      track('demo_failed', { source })
      setError('That did not go through. Please try again, or email demos@church-day.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="animate-caption rounded-2xl border border-gold-300 bg-white p-8 text-center">
        <div className="animate-pop mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500">
          <Calendar className="h-5 w-5 text-primary-900" />
        </div>
        <h3 className="text-2xl font-bold text-primary-900">
          Your request is in{form.name ? `, ${form.name.trim().split(' ')[0]}` : ''}.
        </h3>
        <p className="mt-3 text-primary-700/70">
          We&apos;ll confirm your demo time by email shortly. A confirmation is on its way to your inbox now.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3.5 rounded-2xl border border-primary-100 bg-white p-8">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          aria-label="Your name"
          className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 placeholder-primary-400 outline-none transition focus:border-gold-500"
        />
        <input
          required
          value={form.church}
          onChange={(e) => setForm({ ...form, church: e.target.value })}
          placeholder="Church name"
          aria-label="Church name"
          className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 placeholder-primary-400 outline-none transition focus:border-gold-500"
        />
      </div>
      <select
        value={form.denomination}
        onChange={(e) => setForm({ ...form, denomination: e.target.value })}
        aria-label="Which body your church is part of, optional"
        className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 outline-none transition focus:border-gold-500"
      >
        <option value="">Which body is your church part of? (optional)</option>
        {DEMO_DENOMINATION_OPTIONS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <input
        required
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email address"
        aria-label="Email address"
        className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 placeholder-primary-400 outline-none transition focus:border-gold-500"
      />
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone (optional)"
        aria-label="Phone number, optional"
        className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 placeholder-primary-400 outline-none transition focus:border-gold-500"
      />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <select
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          aria-label="Preferred day"
          className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 outline-none transition focus:border-gold-500"
        >
          <option value="">Preferred day</option>
          {days.current.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          aria-label="Preferred time"
          className="w-full rounded-lg border border-primary-200 px-4 py-3 text-primary-900 outline-none transition focus:border-gold-500"
        >
          <option value="">Preferred time</option>
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="press hover-glow w-full rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 py-3.5 font-semibold text-primary-900 disabled:opacity-50"
      >
        {submitting ? 'Sending…' : <>Request your demo <ArrowRight className="ml-1 inline-block h-4 w-4" /></>}
      </button>
      <p className="text-center text-xs text-primary-500">No card required. We reply within one business day.</p>
    </form>
  )
}
