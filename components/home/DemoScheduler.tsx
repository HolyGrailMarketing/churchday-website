'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Check, X } from 'lucide-react'
import { track } from '@/lib/analytics'
import { DEMO_DENOMINATION_OPTIONS } from '@/data/denominations'

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
const EMPTY_FORM = { name: '', email: '', church: '', denomination: '', phone: '' }

// Next 6 weekdays (Mon–Fri), computed client-side.
function getUpcomingDays() {
  const days: { value: string; label: string; sub: string }[] = []
  const date = new Date()
  date.setDate(date.getDate() + 1)
  while (days.length < 6) {
    const day = date.getDay()
    if (day !== 0 && day !== 6) {
      days.push({
        value: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        sub: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })
    }
    date.setDate(date.getDate() + 1)
  }
  return days
}

/**
 * The schedule-a-demo wizard. Mount it fresh (new `key`) for each opening so
 * every visit starts at step one with an empty form.
 */
export function DemoScheduler({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0) // 0=day, 1=time, 2=details, 3=success
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [demoForm, setDemoForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [leaving, setLeaving] = useState(false)
  const [upcomingDays] = useState(getUpcomingDays)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Leave the way it came in: the exit animation plays, then the parent unmounts.
  const close = () => setLeaving(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    sheetRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [])

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...demoForm, preferredDate: selectedDate, preferredTime: selectedTime }),
      })

      if (!res.ok) throw new Error('Failed to submit')

      // The conversion. No name/email/church here — Vercel Analytics is
      // cookieless and should stay free of personal data; the lead itself
      // arrives by email via /api/demo.
      track('demo_submitted', {
        preferredTime: selectedTime,
        denomination: demoForm.denomination || 'unspecified',
        gavePhone: Boolean(demoForm.phone),
      })

      setStep(3)
      setDemoForm(EMPTY_FORM)
    } catch {
      // Worth its own event: a spike here means the Resend key or DEMO_EMAIL
      // is broken and leads are being silently lost.
      track('demo_failed')
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full px-4 py-3.5 bg-primary-900/[0.04] border border-transparent rounded-xl text-[17px] text-primary-900 placeholder-primary-800/40 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors'

  return (
    <div
      onClick={close}
      data-leaving={leaving}
      className="sheet-scrim fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4"
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        tabIndex={-1}
        data-leaving={leaving}
        onAnimationEnd={(e) => {
          if (leaving && e.target === e.currentTarget) onClose()
        }}
        onClick={(e) => e.stopPropagation()}
        className="sheet relative w-full sm:max-w-md bg-[#fbfaf8] rounded-t-[28px] sm:rounded-[28px] shadow-[0_24px_80px_rgba(10,20,30,0.35)] focus:outline-none pb-[env(safe-area-inset-bottom)]"
      >
        {/* Grabber on phones, where this is a bottom sheet */}
        <div className="sm:hidden mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-primary-900/15" aria-hidden />

        <button
          onClick={close}
          aria-label="Close"
          className="press absolute top-4 right-4 z-20 grid place-items-center w-8 h-8 rounded-full bg-primary-900/[0.06] text-primary-900/60 hover:text-primary-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 pt-6">
          {step < 3 && (
            <div className="flex gap-1.5 mb-7 w-24" aria-label={`Step ${step + 1} of 3`}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? 'bg-gold-500' : 'bg-primary-900/10'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step 0 — Pick a day */}
          {step === 0 && (
            <div className="animate-caption">
              <h2 id="demo-title" className="text-[26px] font-semibold tracking-[-0.02em] text-primary-900">
                When works for you?
              </h2>
              <p className="mt-1.5 text-[15px] text-primary-800/60 mb-6">
                We&apos;ll walk you through ChurchDay with your church in mind. Pick a day.
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {upcomingDays.map((day) => (
                  <button
                    key={day.value}
                    onClick={() => {
                      track('demo_step', { step: 'date_picked' })
                      setSelectedDate(day.value)
                      setStep(1)
                    }}
                    className={`press py-4 rounded-2xl border transition-colors duration-150 ${
                      selectedDate === day.value
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-primary-900/10 bg-white hover:border-gold-400'
                    }`}
                  >
                    <span className="block text-xs font-medium text-primary-800/50 uppercase tracking-[0.06em]">{day.label}</span>
                    <span className="block text-[15px] font-semibold text-primary-900 mt-1">{day.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Pick a time */}
          {step === 1 && (
            <div className="animate-caption">
              <h2 id="demo-title" className="text-[26px] font-semibold tracking-[-0.02em] text-primary-900">
                Pick a time
              </h2>
              <p className="mt-1.5 text-[15px] text-primary-800/60 mb-6">{selectedDate}</p>

              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      track('demo_step', { step: 'time_picked' })
                      setSelectedTime(slot)
                      setStep(2)
                    }}
                    className={`press py-4 rounded-2xl border text-[17px] font-semibold transition-colors duration-150 ${
                      selectedTime === slot
                        ? 'border-gold-500 bg-gold-50 text-primary-900'
                        : 'border-primary-900/10 bg-white text-primary-900 hover:border-gold-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(0)}
                className="press inline-flex items-center gap-1 text-[15px] text-primary-800/60 hover:text-primary-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>
          )}

          {/* Step 2 — Your details */}
          {step === 2 && (
            <form onSubmit={handleDemoSubmit} className="animate-caption">
              <h2 id="demo-title" className="text-[26px] font-semibold tracking-[-0.02em] text-primary-900">
                Almost there
              </h2>
              <p className="mt-1.5 mb-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-gold-700">
                <Calendar className="w-4 h-4" /> {selectedDate} at {selectedTime}
              </p>

              {error && (
                <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2.5">
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className={field}
                  placeholder="Full name"
                  aria-label="Full name"
                />
                <input
                  type="text"
                  required
                  autoComplete="organization"
                  value={demoForm.church}
                  onChange={(e) => setDemoForm({ ...demoForm, church: e.target.value })}
                  className={field}
                  placeholder="Church name"
                  aria-label="Church name"
                />
                <select
                  value={demoForm.denomination}
                  onChange={(e) => setDemoForm({ ...demoForm, denomination: e.target.value })}
                  aria-label="Which body your church is part of, optional"
                  className={`${field} ${demoForm.denomination ? '' : 'text-primary-800/40'}`}
                >
                  <option value="">Which body is your church part of? (optional)</option>
                  {DEMO_DENOMINATION_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  className={field}
                  placeholder="Email address"
                  aria-label="Email address"
                />
                <input
                  type="tel"
                  autoComplete="tel"
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  className={field}
                  placeholder="Phone (optional)"
                  aria-label="Phone, optional"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : <>Book the demo <ArrowRight className="w-[18px] h-[18px]" /></>}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="press mt-4 inline-flex items-center gap-1 text-[15px] text-primary-800/60 hover:text-primary-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </form>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <div className="text-center py-2 animate-caption">
              <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-full bg-gold-500 text-white animate-pop">
                <Check className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h2 id="demo-title" className="text-[26px] font-semibold tracking-[-0.02em] text-primary-900">
                You&apos;re booked in
              </h2>
              <p className="mt-2 text-[15px] text-primary-800/60">We&apos;ll be in touch to confirm your demo for</p>
              <p className="mt-1 mb-8 inline-flex items-center gap-1.5 text-[17px] font-semibold text-gold-700">
                <Calendar className="w-[18px] h-[18px]" /> {selectedDate} at {selectedTime}
              </p>
              <button onClick={close} className="btn-gold w-full">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
