'use client'

import { createContext, useContext, useState } from 'react'
import { track } from '@vercel/analytics'
import { Smartphone, X } from 'lucide-react'

type AndroidWaitlistContextValue = {
  openWaitlist: () => void
}

const AndroidWaitlistContext = createContext<AndroidWaitlistContextValue | null>(null)

// Any button anywhere in the tree (hero, footer, a denomination page) can
// trigger the same modal instance without prop-drilling through Nav/Footer.
export function useAndroidWaitlist() {
  const ctx = useContext(AndroidWaitlistContext)
  if (!ctx) throw new Error('useAndroidWaitlist must be used within AndroidWaitlistProvider')
  return ctx
}

export function AndroidWaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [testerForm, setTesterForm] = useState({ email: '', name: '', church: '' })
  const [testerSubmitting, setTesterSubmitting] = useState(false)
  const [testerDone, setTesterDone] = useState(false)
  const [testerError, setTesterError] = useState('')

  const openWaitlist = () => {
    track('android_waitlist_opened', { platform: 'android' })
    setTesterDone(false)
    setTesterError('')
    setTesterForm({ email: '', name: '', church: '' })
    setOpen(true)
  }

  const handleTesterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTesterSubmitting(true)
    setTesterError('')
    try {
      const res = await fetch('/api/android-tester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testerForm),
      })
      if (!res.ok) throw new Error('failed')
      // No email here — Vercel Analytics is cookieless and stays free of personal data.
      track('android_tester_signup', { gaveChurch: Boolean(testerForm.church) })
      setTesterDone(true)
    } catch {
      track('android_tester_failed')
      setTesterError('That did not go through. Please try again, or email demos@church-day.com.')
    } finally {
      setTesterSubmitting(false)
    }
  }

  return (
    <AndroidWaitlistContext.Provider value={{ openWaitlist }}>
      {children}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-100 rounded-full -mr-20 -mt-20 opacity-30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-100 rounded-full -ml-16 -mb-16 opacity-20" />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 hover:bg-primary-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-primary-900" />
            </button>

            <div className="relative z-10 p-8 text-center">
              <div className="mb-6 inline-block">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>

              {testerDone ? (
                <>
                  <h2 className="text-3xl font-bold text-primary-900 mb-3">You&apos;re on the list</h2>
                  <p className="text-sm text-primary-500 mb-6">
                    We&apos;ll add your Google account to the test and email you a link to accept the
                    invitation. Check your inbox for a confirmation now.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-gold-500/25"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-primary-900 mb-3">
                    Test ChurchDay on Android
                  </h2>
                  <p className="text-gold-600 font-semibold mb-2">Closed test on Google Play</p>
                  <p className="text-sm text-primary-500 mb-6">
                    ChurchDay is in closed testing on Android. Add your Google account and we&apos;ll send
                    you an invitation to install it.
                  </p>

                  <form onSubmit={handleTesterSubmit} className="text-left space-y-3">
                    <div>
                      <label htmlFor="tester-email" className="block text-sm font-medium text-primary-800 mb-1">
                        Google account email
                      </label>
                      <input
                        id="tester-email"
                        type="email"
                        required
                        value={testerForm.email}
                        onChange={(e) => setTesterForm({ ...testerForm, email: e.target.value })}
                        placeholder="you@gmail.com"
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 text-primary-900 placeholder-gray-400 outline-none transition focus:border-gold-500"
                      />
                      {/* Play matches testers by Google account, so a work address
                          that isn't signed in on the phone will never get the invite. */}
                      <p className="mt-1.5 text-xs text-primary-500">
                        Use the Google account you&apos;re signed into on your Android phone, or the
                        invitation won&apos;t reach you.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={testerForm.name}
                        onChange={(e) => setTesterForm({ ...testerForm, name: e.target.value })}
                        placeholder="Your name"
                        aria-label="Your name, optional"
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 text-primary-900 placeholder-gray-400 outline-none transition focus:border-gold-500"
                      />
                      <input
                        type="text"
                        value={testerForm.church}
                        onChange={(e) => setTesterForm({ ...testerForm, church: e.target.value })}
                        placeholder="Church"
                        aria-label="Church name, optional"
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 text-primary-900 placeholder-gray-400 outline-none transition focus:border-gold-500"
                      />
                    </div>

                    {testerError && <p className="text-sm text-red-600">{testerError}</p>}

                    <button
                      type="submit"
                      disabled={testerSubmitting}
                      className="block w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-gold-500/25 disabled:opacity-60"
                    >
                      {testerSubmitting ? 'Sending…' : 'Join the test'}
                    </button>
                    <p className="text-xs text-primary-500 text-center">
                      Places are limited while we test. Name and church are optional.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AndroidWaitlistContext.Provider>
  )
}
