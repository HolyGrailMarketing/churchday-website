'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { track } from '@/lib/analytics'
import { DEMO_DENOMINATION_OPTIONS } from '@/data/denominations'
import { PORTAL_SIGNUP_URL } from '@/lib/constants'
import { PLANS, FOUNDING_OFFER, planForGiving, formatJmd } from '@/lib/plans'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  HandCoins,
  HeartHandshake,
  LineChart,
  MessageSquare,
  Printer,
  Users,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * The brief is a document: numbered chapters, read in order.
 * The rail, the page counter and the arrow keys all page through this
 * one list, so it is the single source of truth for chapter order.
 * ------------------------------------------------------------------ */
const CHAPTERS = [
  { id: 'cover', label: 'Cover' },
  { id: 'letter', label: 'A note for you' },
  { id: 'gap', label: 'The gap' },
  { id: 'meet', label: 'What it is' },
  { id: 'tour', label: 'Look inside' },
  { id: 'inside', label: "What's inside" },
  { id: 'questions', label: 'Your questions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'start', label: 'Getting started' },
  { id: 'demo', label: 'Request a demo' },
] as const

const PROBLEMS = [
  {
    title: 'Scattered records',
    body: 'Member details live in notebooks, phones, spreadsheets and memory — never in one place when you need them.',
    answer: 'One directory holds every member, family and visitor — on your phone and on your desktop.',
  },
  {
    title: 'Cash with no clarity',
    body: 'Offerings are counted by hand. Giving is hard to track, harder to report, and members rarely get receipts.',
    answer: 'Members give from their phone. Every gift is recorded, receipted and ready to report.',
  },
  {
    title: 'Admin eats your time',
    body: 'Hours each week go to logistics that pull you away from prayer, preparation and people.',
    answer: 'Attendance, events and announcements take seconds instead of evenings.',
  },
  {
    title: 'People drift midweek',
    body: 'Between Sundays the connection fades. Announcements get missed and quiet members slip away unseen.',
    answer: 'A daily devotional, a prayer wall and a church feed keep your people close all week.',
  },
]

const SIDES = [
  {
    label: 'For your members',
    heading: 'Everything in their pocket, every day of the week.',
    body: 'Devotionals, events, giving, groups and community — the church they belong to, on the phone they already carry.',
    points: ['A fresh devotional every morning', 'The church calendar', 'Giving in a few taps', 'Prayer and community'],
  },
  {
    label: 'For you & your leaders',
    heading: 'Shepherd with clarity, not guesswork.',
    body: 'Members, attendance, finances and insight in one place — with a web dashboard your team can help you run.',
    points: ['The member directory', 'Attendance and check-in', 'Giving reports', 'A dashboard on your computer'],
  },
]

/* The five tabs along the bottom of the real app, in the order the app puts
   them (lib/bottom_nav_bar.dart). Home is the middle tab and the default.
   The tap targets are positioned over the nav bar in the screenshot itself,
   which lands in the same place on every screen because it is one widget. */
const TOUR = [
  {
    key: 'events',
    label: 'Events',
    src: '/app-screens/events.png',
    heading: 'One calendar, the whole church',
    body: 'Services, prayer meetings, choir rehearsals and special events, marked across the month so nobody misses what is on.',
    points: [
      'Recurring services set up once',
      'Members see it the moment you publish',
    ],
  },
  {
    key: 'media',
    label: 'Media',
    src: '/app-screens/media.png',
    heading: 'Sermons that outlive Sunday',
    body: 'Video, audio and photos your congregation can come back to during the week — or send to someone who needs it.',
    points: [
      'Video, audio and photo libraries',
      'Watch again, or send to a friend',
    ],
  },
  {
    key: 'home',
    label: 'Home',
    src: '/app-screens/home.png',
    heading: 'What your members open to',
    body: "Today's devotional — a verse, something to reflect on, and a prayer. You and your leaders get the admin panel right at the top.",
    points: [
      'A new devotional every morning',
      'Leaders reach the admin panel here',
    ],
  },
  {
    key: 'community',
    label: 'Community',
    src: '/app-screens/community.png',
    heading: 'The week between Sundays',
    body: 'The church feed, prayer wall, circles and Bible challenges — where your announcements land and your people carry one another.',
    points: [
      'Announcements land where people look',
      'Prayer wall, circles and testimonies',
    ],
  },
  {
    key: 'give',
    label: 'Give',
    src: '/app-screens/give.png',
    heading: 'Giving, in a few taps',
    body: 'Tithes and offerings straight from the phone, plus live campaigns — a roof, a youth camp — your church can watch fill up.',
    points: [
      'Give once, or set it to repeat',
      'Campaigns show the church its progress',
    ],
  },
] as const

const FEATURES = [
  {
    icon: Users,
    name: 'Know your people',
    heading: 'Care for every member',
    lead: 'Every member, family and visitor in one organised place — so no one falls through the cracks.',
    points: [
      ['One directory', "Names, families, roles, contact details and how long they've been with you."],
      ['Visitor follow-up', 'Capture new faces on Sunday and follow up before the week slips away.'],
      ['Roles & teams', 'See who serves where, and reach the right people in a tap.'],
    ],
  },
  {
    icon: HandCoins,
    name: 'Receive giving',
    heading: 'Giving made simple — and transparent',
    lead: 'Members give securely in seconds from their phone, and you get clear, accountable records of every gift.',
    points: [
      ['Give in seconds', 'Tithes and offerings from the app — no cash to count, no envelopes to chase.'],
      ['Recurring giving', 'Members set it once and give faithfully every week or month.'],
      ['Clear records', 'Contributions tracked automatically, with reports for you and receipts for them.'],
      ['Giving campaigns', 'Rally your church around a building fund, missions or a special need.'],
    ],
  },
  {
    icon: CalendarDays,
    name: 'Plan & gather',
    heading: 'Events and attendance, handled',
    lead: 'Publish what is happening and see who was there — without the clipboard and the guesswork.',
    points: [
      ['One church calendar', 'Services, prayer meetings, youth nights and special events in a single place.'],
      ['Easy check-in', 'Take attendance in seconds and watch engagement over time.'],
      ['Recurring events', 'Set up your weekly rhythm once; ChurchDay keeps it going.'],
    ],
  },
  {
    icon: MessageSquare,
    name: 'Stay connected',
    heading: 'Reach your church all week',
    lead: 'Keep your people close between Sundays — informed, prayed-for and serving together.',
    points: [
      ['Announcements', 'Send a message to the whole church and know it landed.'],
      ['Push notifications', 'Announcements arrive on the phone, not just in a feed nobody opened.'],
      ['Prayer requests', "A shared wall where your church carries one another's burdens."],
      ['Direct messages', 'A private line between members and leaders, with nothing left unread.'],
      ['Ministries & groups', "Coordinate choir, youth, men's and women's ministries with ease."],
    ],
  },
  {
    icon: BookOpen,
    name: 'Disciple daily',
    heading: 'Keep them in the Word',
    lead: 'Discipleship that does not stop on Sunday — a fresh devotional waiting every morning.',
    points: [
      ['Daily devotionals', 'Scripture-based devotions, reflection questions and prayer prompts.'],
      ['Always fresh', 'New content each day, so the app becomes a daily habit, not a one-off.'],
      ['Sermons on demand', 'Video, audio and photos your congregation can return to during the week.'],
      ['Bible challenges', 'Read through Scripture together, with streaks to keep the church going.'],
      ['Saveable & shareable', 'Members keep the devotions that speak to them and share them with friends.'],
    ],
  },
  {
    icon: HeartHandshake,
    name: 'Answer requests',
    heading: 'Every ask in one place, none forgotten',
    lead: 'The requests that used to arrive by phone call, after service or through somebody else now come to you properly, with the details already filled in.',
    points: [
      ['Weddings and baptisms', 'Members submit the request and the details from the app, so nothing depends on remembering a conversation.'],
      ['Christenings', 'The same simple form, routed to whoever in your leadership handles them.'],
      ['Counselling', 'A private way for someone to ask for a conversation, sent straight to you.'],
      ['Approve and track', 'Every request has a status, and your leaders are notified the moment one comes in.'],
    ],
  },
  {
    icon: LineChart,
    name: 'Lead with insight',
    heading: 'See your church clearly',
    lead: 'A private dashboard that turns scattered information into clarity, so you can lead with confidence.',
    points: [
      ['Attendance & giving trends', "Know what is growing and where to lean in, at a glance."],
      ['Member engagement', "Spot who is active and who may need a shepherd's call."],
      ['Web dashboard for leaders', 'Manage everything from your computer; your team helps, with the right access.'],
    ],
  },
]

// The chapter title counts the capabilities out loud, so the word comes from the
// list rather than being typed twice.
const NUMBER_WORDS = ['no', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

const QUESTIONS = [
  {
    q: 'Is it simple enough for everyone?',
    a: 'If your members can use WhatsApp, they can use ChurchDay. The app is clean, familiar and uncluttered, and there is nothing to learn before the first Sunday.',
  },
  {
    q: 'Who sets it up?',
    a: 'You can, in a few minutes — create your church from any browser and add your people at your own pace. If you would rather not do it alone, we will set it up with you. Most churches are live within the same week either way.',
  },
  {
    q: 'Will it work on our phones and our data?',
    a: 'ChurchDay is built to be light and fast, with real-world phones and data plans in mind. It works on both iPhone and Android.',
  },
  {
    q: 'Is it safe for our young people?',
    a: 'The community feed is your church, not the open internet — only your members are in it. Anyone can report a post or block another member, blocked people disappear from their view entirely, and your leaders get a review queue where reported content can be dealt with quickly.',
  },
  {
    q: 'Is our information safe?',
    a: 'Giving is secure and private. Leaders see only what their role allows, and members’ personal information is protected.',
  },
]

const STEPS = [
  {
    title: 'Create your church',
    body: 'Sign up from any browser — no call to book, nothing to install. Your church is ready in a few minutes.',
  },
  {
    title: 'Add your people',
    body: 'Bring in members, ministries and giving details at your own pace. We will help you if you want a hand.',
  },
  {
    title: 'Invite your congregation',
    body: 'Share one link. Your people download the app, find your church and connect right away.',
  },
]

// Imported rather than re-declared: local copies of the signup URL and of the
// tier table both drifted out of step with the real ones before.

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']

/* Personalisation comes from the link itself, e.g.
   /for-pastors?for=Pastor%20Brown&church=Bethel%20Baptist%20Church
   Untrusted input, so it is stripped to name-shaped characters and capped. */
function cleanParam(raw: string | null) {
  if (!raw) return ''
  return raw
    .replace(/[^\p{L}\p{N}\s'.\-&]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)
}

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

function Sheet({
  id,
  eyebrow,
  tone = 'paper',
  children,
}: {
  id: string
  eyebrow: string
  tone?: 'paper' | 'navy'
  children: React.ReactNode
}) {
  const navy = tone === 'navy'
  // The printed page number is the chapter's place in the document, so it can
  // only ever come from CHAPTERS — never from a hand-kept prop.
  const index = CHAPTERS.findIndex((c) => c.id === id) + 1
  return (
    <section
      id={id}
      data-chapter={id}
      className={`doc-sheet doc-reveal relative mx-auto mb-8 w-full max-w-5xl scroll-mt-24 rounded-[3px] px-6 py-14 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] sm:px-12 sm:py-16 lg:px-16 ${
        navy ? 'bg-primary-900 text-white' : 'bg-[#fbfaf8] text-primary-900'
      }`}
    >
      <header className="mb-10 flex items-baseline justify-between gap-6 sm:mb-12">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            navy ? 'text-gold-400' : 'text-gold-700'
          }`}
        >
          {eyebrow}
        </p>
        <p
          className={`shrink-0 font-display text-[13px] tabular-nums ${
            navy ? 'text-white/35' : 'text-primary-900/30'
          }`}
        >
          {String(index).padStart(2, '0')}
        </p>
      </header>
      {children}
    </section>
  )
}

export default function ForPastors() {
  const [active, setActive] = useState(0)
  const [dedication, setDedication] = useState({ pastor: '', church: '' })
  const [tourTab, setTourTab] = useState(2) // Home, the app's own default tab
  const [tourTouched, setTourTouched] = useState(false)
  const [feature, setFeature] = useState(0)
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)
  // Banded on monthly digital giving, not member count — the pricing model
  // meters what comes through the app. Default sits just inside Ministry, which
  // is where a church with a working giving flow lands within a month or two.
  const [giving, setGiving] = useState(250_000)
  const [revealed, setRevealed] = useState<number | null>(null)

  const [form, setForm] = useState({ name: '', email: '', church: '', denomination: '', phone: '', day: '', time: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const days = useRef<string[]>([])
  if (days.current.length === 0) days.current = getUpcomingDays()

  // Read personalisation from the URL rather than useSearchParams, so the page
  // stays a plain client component with no Suspense boundary.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pastor = cleanParam(params.get('for'))
    const church = cleanParam(params.get('church'))
    setDedication({ pastor, church })
    if (church) setForm((f) => ({ ...f, church }))
  }, [])

  // Which chapter is being read, for the rail and the page counter.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-chapter]'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.getAttribute('data-chapter')
          const index = CHAPTERS.findIndex((c) => c.id === id)
          if (index >= 0) setActive(index)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Reveal-on-scroll, once per sheet.
  useEffect(() => {
    const sheets = Array.from(document.querySelectorAll('.doc-reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-shown', 'true')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08 }
    )
    sheets.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Chapters read once are worth knowing about: it says how far a prospect got.
  // Chapter names only — Vercel Analytics is cookieless and stays personal-data free.
  const seen = useRef(new Set<string>())
  useEffect(() => {
    const id = CHAPTERS[active]?.id
    if (!id || seen.current.has(id)) return
    seen.current.add(id)
    track('pastors_chapter_view', { chapter: id })
  }, [active])

  const goTo = useCallback((index: number) => {
    const chapter = CHAPTERS[index]
    if (!chapter) return
    document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Left/right page through the document the way a PDF viewer would. Vertical
  // arrows are left alone so ordinary scrolling still works.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(Math.min(active + 1, CHAPTERS.length - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(Math.max(active - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goTo])

  const recommended = planForGiving(giving)
  const plan = PLANS.findIndex((p) => p.id === recommended.id)

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
      track('demo_submitted', { source: 'for_pastors', denomination: form.denomination || 'unspecified' })
      setSent(true)
    } catch {
      track('demo_failed', { source: 'for_pastors' })
      setError('That did not go through. Please try again, or email demos@church-day.com.')
    } finally {
      setSubmitting(false)
    }
  }

  const activeFeature = FEATURES[feature]
  const ActiveIcon = activeFeature.icon

  return (
    <div className="doc-ground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: QUESTIONS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
      {/* Viewer chrome */}
      <header className="doc-no-print fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0e1b26]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} className="rounded" />
            <span className="font-display text-[15px] font-semibold text-gold-400">ChurchDay</span>
          </Link>
          <span className="hidden text-[13px] text-white/40 sm:inline">for Pastors</span>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="font-display text-[13px] tabular-nums text-white/45">
              {String(active + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => {
                track('pastors_print')
                window.print()
              }}
              className="hidden items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-[13px] text-white/70 transition hover:border-gold-500/50 hover:text-gold-400 sm:flex"
            >
              <Printer className="h-3.5 w-3.5" /> Save as PDF
            </button>
            <button
              type="button"
              onClick={() => {
                track('pastors_cta', { placement: 'chrome' })
                goTo(CHAPTERS.length - 1)
              }}
              className="rounded-md bg-gradient-to-r from-gold-500 to-gold-400 px-3.5 py-1.5 text-[13px] font-semibold text-primary-900 transition hover:shadow-lg hover:shadow-gold-500/20"
            >
              Request a demo
            </button>
          </div>
        </div>
        {/* Reading progress */}
        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-500"
            style={{ width: `${((active + 1) / CHAPTERS.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Chapter rail */}
      <nav
        aria-label="Chapters"
        className="doc-no-print fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ol className="space-y-1">
          {CHAPTERS.map((chapter, i) => (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={active === i ? 'true' : undefined}
                className="group flex items-center gap-3 py-1.5 text-left"
              >
                <span
                  className={`font-display text-[11px] tabular-nums transition ${
                    active === i ? 'text-gold-400' : 'text-white/25 group-hover:text-white/50'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`h-px transition-all duration-300 ${
                    active === i ? 'w-6 bg-gold-400' : 'w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/40'
                  }`}
                />
                <span
                  className={`text-[12px] transition ${
                    active === i ? 'text-white/80' : 'text-white/0 group-hover:text-white/45'
                  }`}
                >
                  {chapter.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <main className="px-4 pb-16 pt-20 sm:px-6">
        {/* 01 — Cover */}
        <section
          id="cover"
          data-chapter="cover"
          className="doc-sheet relative mx-auto mb-8 w-full max-w-5xl scroll-mt-24 overflow-hidden rounded-[3px] bg-primary-900 px-6 py-20 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-12 sm:py-28"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,94,0.28)_0%,rgba(212,168,94,0.08)_35%,transparent_70%)]" />

          <div className="relative">
            <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              {dedication.pastor
                ? `Prepared for ${dedication.pastor}`
                : 'Prepared for pastors and church leaders'}
              {dedication.church ? ` · ${dedication.church}` : ''}
            </p>

            <Image src="/logo.png" alt="" width={64} height={64} className="mx-auto mb-8 drop-shadow-2xl" />

            <h1 className="font-display text-5xl font-bold tracking-tight text-gold-400 sm:text-6xl">
              ChurchDay
            </h1>
            <p className="mt-2 font-display text-2xl italic text-white/70 sm:text-3xl">for Pastors</p>

            <p className="mx-auto mt-10 max-w-xl text-[17px] leading-relaxed text-white/70">
              Everything your church needs — membership, giving, events and daily discipleship — in one
              simple, beautiful app.
            </p>

            <p className="mt-10 text-[11px] uppercase tracking-[0.35em] text-white/35">
              Connect &nbsp;·&nbsp; Worship &nbsp;·&nbsp; Grow
            </p>

            <div className="doc-no-print mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => goTo(1)}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 font-semibold text-primary-900 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/25"
              >
                Read the brief <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  track('pastors_cta', { placement: 'cover' })
                  goTo(CHAPTERS.length - 1)
                }}
                className="rounded-md border border-gold-500/40 px-6 py-3 font-semibold text-gold-400 transition hover:bg-gold-500/10"
              >
                Request a demo
              </button>
            </div>

            <p className="doc-no-print mt-8 text-[12px] text-white/30">
              {CHAPTERS.length} pages · about five minutes
              <span className="hidden sm:inline"> · use ← → to turn the page</span>
            </p>
          </div>
        </section>

        {/* 02 — The letter */}
        <Sheet id="letter" eyebrow="A note for the pastor">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-snug text-primary-900 sm:text-[38px]">
              You were called to shepherd people — not to wrestle spreadsheets.
            </h2>

            <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-primary-900/75">
              <p>
                Yet so much of ministry today gets lost in admin: chasing attendance, counting offerings by
                hand, juggling WhatsApp groups, and trying to remember who needs a visit. The week fills up,
                and the work of shepherding gets squeezed.
              </p>
              <p>
                ChurchDay was built to give that time back to you — so the tools fade into the background and
                your people come to the front.
              </p>
            </div>

            <figure className="mt-12 border-t border-primary-900/10 pt-8">
              <blockquote className="font-display text-2xl italic leading-snug text-primary-800">
                &ldquo;Shepherd the flock of God that is among you.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-700">
                1 Peter 5:2
              </figcaption>
            </figure>
          </div>
        </Sheet>

        {/* 03 — The gap */}
        <Sheet id="gap" eyebrow="The Sunday-to-Sunday gap">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            Ministry happens all week. Most tools don&rsquo;t.
          </h2>
          <p className="doc-no-print mt-3 text-[14px] text-primary-900/50">
            Tap a card to see how ChurchDay answers it.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PROBLEMS.map((problem, i) => {
              const open = revealed === i
              return (
                <button
                  key={problem.title}
                  type="button"
                  aria-expanded={open}
                  onClick={() => setRevealed(open ? null : i)}
                  onMouseEnter={() => setRevealed(i)}
                  onFocus={() => setRevealed(i)}
                  className={`group relative min-h-[190px] overflow-hidden rounded-[3px] border p-6 text-left transition-colors duration-300 ${
                    open ? 'border-green-600/40' : 'border-primary-900/10'
                  } bg-white`}
                >
                  <h3 className="font-display text-xl font-semibold text-primary-900">{problem.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-primary-900/65">{problem.body}</p>

                  {/* The answer slides over the problem rather than sitting beside it —
                      the card holds one thought at a time. */}
                  <div
                    className={`doc-answer absolute inset-x-0 bottom-0 border-t border-green-700/20 bg-[#eef4f0] px-6 py-5 transition-transform duration-300 ease-out ${
                      open ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      With ChurchDay
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-primary-900/85">{problem.answer}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <p className="mt-10 font-display text-lg italic text-primary-800">
            It doesn&rsquo;t have to be this way. One simple app can carry the load.
          </p>
        </Sheet>

        {/* 04 — Meet ChurchDay */}
        <Sheet id="meet" eyebrow="Meet ChurchDay">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            Your whole church, in one app.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-900/70">
            ChurchDay brings your congregation together in a single app — and gives you a private dashboard
            to lead from. Two sides, one connected church.
          </p>

          {/* Both sides sit side by side rather than behind a toggle: the point of
              the chapter is that they exist together. The phone belongs to the tour. */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-[3px] bg-primary-900/10 md:grid-cols-2">
            {SIDES.map((sideItem) => (
              <div key={sideItem.label} className="flex flex-col bg-white p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
                  {sideItem.label}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-primary-900">
                  {sideItem.heading}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-primary-900/70">{sideItem.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-primary-900/8 pt-5 md:mt-auto">
                  {sideItem.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[15px] text-primary-900/75">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sheet>

        {/* 05 — The tour: the real app, tab by tab */}
        <Sheet id="tour" eyebrow="Look inside">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            Take a look inside
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-900/70">
            This is the app your congregation gets — the real screens, not a mock-up. Tap along the bottom
            of the phone to move between them.
          </p>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {TOUR[tourTab].label}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-primary-900">
                {TOUR[tourTab].heading}
              </h3>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-primary-900/70">
                {TOUR[tourTab].body}
              </p>

              <ul className="mt-6 space-y-2.5">
                {TOUR[tourTab].points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[15px] text-primary-900/75">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="doc-no-print mt-8 flex flex-wrap gap-2">
                {TOUR.map((tab, i) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setTourTab(i)
                      setTourTouched(true)
                    }}
                    aria-pressed={tourTab === i}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition ${
                      tourTab === i
                        ? 'border-primary-900 bg-primary-900 text-white'
                        : 'border-primary-900/15 text-primary-900/60 hover:border-primary-900/35 hover:text-primary-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-auto shrink-0">
              {/* All five screens are stacked and loaded up front: swapping tabs has
                  to feel like the app, and a lazy image would stall the first tap.
                  The frame's aspect ratio is the screenshots' own, 1206x2622. */}
              <div
                className="relative w-[262px] overflow-hidden rounded-[30px] border-[8px] border-primary-900 bg-primary-900 shadow-[0_28px_60px_-24px_rgba(20,37,53,0.65)]"
                style={{ aspectRatio: '1206 / 2622' }}
              >
                {TOUR.map((tab, i) => (
                  <Image
                    key={tab.key}
                    src={tab.src}
                    alt={`The ${tab.label} screen in the ChurchDay app`}
                    fill
                    sizes="262px"
                    loading="eager"
                    priority={i === 2}
                    aria-hidden={i !== tourTab}
                    className={`object-cover transition-opacity duration-300 ${
                      i === tourTab ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* The app's own tab bar is the control: invisible hit targets sit
                    over it, so the prospect taps the interface itself. */}
                <div className="doc-no-print absolute inset-0">
                  {TOUR.map((tab, i) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => {
                        setTourTab(i)
                        setTourTouched(true)
                      }}
                      aria-label={`Open the ${tab.label} screen`}
                      className="absolute rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                      /* Measured off the captured screenshots: the nav pill spans
                         3.48%–96.43% across and 89.47%–97.22% down. */
                      style={{
                        top: '89.5%',
                        height: '7.7%',
                        left: `${3.48 + i * 18.59}%`,
                        width: '18.59%',
                      }}
                    />
                  ))}
                </div>

                {/* Outline the whole tab bar until it is used, so it reads as a control. */}
                {!tourTouched && (
                  <span
                    className="doc-no-print pointer-events-none absolute animate-pulse rounded-full border-2 border-gold-400/80"
                    style={{ top: '89.5%', height: '7.7%', left: '3.48%', width: '92.95%' }}
                  />
                )}
              </div>

              <p className="doc-no-print mt-4 text-center text-[12px] text-primary-900/45">
                {tourTouched ? 'Keep tapping — every tab is live.' : 'Tap the tab bar on the phone.'}
              </p>
            </div>
          </div>
        </Sheet>

        {/* 06 — What's inside */}
        <Sheet id="inside" eyebrow="What's inside">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            {NUMBER_WORDS[FEATURES.length] ?? FEATURES.length} ways ChurchDay serves your church
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-900/70">
            You have just seen what your members hold. This is everything ChurchDay does — including the
            parts only you and your leaders see.
          </p>
          <p className="doc-no-print mt-3 text-[14px] text-primary-900/50">
            Choose one to read it in full.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
            <ul className="doc-no-print space-y-1">
              {FEATURES.map((item, i) => {
                const Icon = item.icon
                const on = feature === i
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => setFeature(i)}
                      aria-current={on ? 'true' : undefined}
                      className={`flex w-full items-center gap-3 rounded-[3px] px-3 py-3 text-left transition ${
                        on ? 'bg-primary-900 text-white' : 'text-primary-900/70 hover:bg-primary-900/5'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${on ? 'text-gold-400' : 'text-gold-600'}`} />
                      <span className="text-[15px] font-medium">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="min-h-[320px] border-t border-primary-900/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[3px] bg-primary-900">
                <ActiveIcon className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary-900">
                {activeFeature.heading}
              </h3>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-primary-900/70">
                {activeFeature.lead}
              </p>
              <dl className="mt-7 space-y-5">
                {activeFeature.points.map(([term, detail]) => (
                  <div key={term} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                    <div>
                      <dt className="text-[15px] font-semibold text-primary-900">{term}</dt>
                      <dd className="mt-0.5 text-[15px] leading-relaxed text-primary-900/65">{detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Sheet>

        {/* 06 — Questions */}
        <Sheet id="questions" eyebrow="Your questions">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            &ldquo;But will my church actually use it?&rdquo;
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-900/70">
            We built ChurchDay with that worry in mind. Here is what pastors ask us first.
          </p>

          <div className="mt-10 divide-y divide-primary-900/10 border-y border-primary-900/10">
            {QUESTIONS.map((item, i) => {
              const open = openQuestion === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenQuestion(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-primary-900">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-[16px] leading-relaxed text-primary-900/70">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ChurchDay has no congregations to quote yet. Rather than invent one,
              the early stage is stated plainly and offered as the advantage it is. */}
          <div className="mt-12 rounded-[3px] bg-primary-900 p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Founding churches
            </p>
            <p className="mt-4 max-w-2xl font-display text-xl leading-relaxed text-white/85 sm:text-[22px]">
              ChurchDay is early, and that is deliberate.
            </p>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/60">
              We are working closely with a small number of founding churches — helping them set up,
              learning from how their congregations actually use the app, and building what they ask for
              next. If yours is one of them, you get our full attention and a real say in where ChurchDay
              goes.
            </p>
          </div>
        </Sheet>

        {/* 07 — Pricing */}
        <Sheet id="pricing" eyebrow="Simple pricing">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            A plan that fits your congregation
          </h2>

          <div className="doc-no-print mt-8 max-w-xl">
            <label htmlFor="giving" className="text-[14px] text-primary-900/70">
              Roughly how much giving would come through the app each month?
            </label>
            <div className="mt-3 flex items-center gap-4">
              <input
                id="giving"
                type="range"
                min={0}
                max={1_200_000}
                step={25_000}
                value={giving}
                onChange={(e) => setGiving(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-900/15 accent-gold-500"
              />
              <span className="w-28 shrink-0 text-right font-display text-xl font-semibold tabular-nums text-primary-900">
                {giving >= 1_200_000 ? 'J$1.2M+' : `J$${formatJmd(giving)}`}
              </span>
            </div>
            <p className="mt-3 text-[14px] text-primary-900/60">
              We recommend{' '}
              <span className="font-semibold text-primary-900">{recommended.name}</span>
              {recommended.price === 0
                ? ' — free.'
                : ` — J$${formatJmd(recommended.price)} per month.`}{' '}
              Your members are never counted or capped.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PLANS.map((item, i) => {
              const on = plan === i
              return (
                <div
                  key={item.name}
                  className={`relative rounded-[3px] border p-6 transition-all duration-300 ${
                    on
                      ? 'border-gold-500 bg-white shadow-[0_18px_40px_-24px_rgba(20,37,53,0.5)] md:-translate-y-1'
                      : 'border-primary-900/10 bg-white/60'
                  }`}
                >
                  {on && (
                    <p className="doc-no-print absolute -top-2.5 left-6 bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-900">
                      Recommended
                    </p>
                  )}
                  <h3 className="font-display text-xl font-semibold text-primary-900">{item.name}</h3>
                  <p className="mt-1 text-[13px] text-primary-900/55">{item.description}</p>
                  <p className="mt-5 font-display text-3xl font-bold text-primary-900">
                    {item.price === 0 ? 'Free' : `J$${formatJmd(item.price)}`}
                    {item.price > 0 && (
                      <span className="ml-1 text-[14px] font-normal text-primary-900/50">/month</span>
                    )}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-gold-700">
                    {item.givingCeiling === null
                      ? 'No ceiling on giving'
                      : `Giving up to J$${formatJmd(item.givingCeiling)} a month`}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-primary-900/8 pt-5">
                    {item.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-primary-900/70">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <p className="mt-8 text-[14px] text-primary-900/55">
            The Congregation plan is free for your whole church, with no card and no trial
            running out. Plans are banded on the giving that comes through the app, never on
            your membership — and every paid plan costs under 1.6% of the giving it covers.
            Annual billing is ten months for twelve.
            {FOUNDING_OFFER && (
              <>
                {' '}
                The first {FOUNDING_OFFER.slots} churches get Ministry at J$
                {formatJmd(FOUNDING_OFFER.price)} a month, locked for {FOUNDING_OFFER.months}{' '}
                months.
              </>
            )}
          </p>
        </Sheet>

        {/* 08 — Getting started */}
        <Sheet id="start" eyebrow="Getting started">
          <h2 className="font-display text-3xl font-semibold text-primary-900 sm:text-[38px]">
            Set up your church yourself, today
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-900/70">
            There is no queue and no sales call to sit through. Everything below happens in your browser,
            whenever suits you.
          </p>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <ol className="space-y-8">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-900 font-display text-[15px] font-semibold text-gold-400">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary-900">{step.title}</h3>
                    <p className="mt-1.5 max-w-lg text-[16px] leading-relaxed text-primary-900/68">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mx-auto w-[200px] shrink-0 overflow-hidden rounded-[24px] border-[7px] border-primary-900 bg-primary-900 shadow-2xl">
              <Image
                src="/find-church.PNG"
                alt="A member finding their church in the ChurchDay app"
                width={200}
                height={433}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="doc-no-print mt-12 flex flex-col items-start gap-4 border-t border-primary-900/10 pt-8 sm:flex-row sm:items-center">
            <a
              href={PORTAL_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('portal_signup', { from: 'for_pastors' })}
              className="inline-flex items-center gap-2 rounded-md bg-primary-900 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-900/25"
            >
              Set up your church <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-[15px] text-primary-900/60">
              Free for 30 days — card verified at signup, nothing charged until day 30. Would rather be walked through it?{' '}
              <button
                type="button"
                onClick={() => {
                  track('pastors_cta', { placement: 'getting_started' })
                  goTo(CHAPTERS.length - 1)
                }}
                className="font-semibold text-gold-700 underline underline-offset-4 transition hover:text-gold-600"
              >
                Ask for a demo instead
              </button>
              .
            </p>
          </div>
        </Sheet>

        {/* 09 — Request a demo */}
        <Sheet id="demo" eyebrow="Request a demo" tone="navy">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-snug text-white sm:text-[38px]">
                Let&rsquo;s bring your church online together.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/65">
                Spend less time on admin and more time with your people. Try ChurchDay free for 30 days —
                we&rsquo;ll help you every step of the way.
              </p>
              <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-gold-400/70">
                Connect &nbsp;·&nbsp; Worship &nbsp;·&nbsp; Grow
              </p>
              <p className="mt-4 text-[14px] text-white/45">
                demos@church-day.com &nbsp;·&nbsp; church-day.com
              </p>
              <p className="doc-no-print mt-8 text-[15px] text-white/55">
                Rather not wait?{' '}
                <a
                  href={PORTAL_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('portal_signup', { from: 'for_pastors_footer' })}
                  className="font-semibold text-gold-400 underline underline-offset-4 transition hover:text-gold-300"
                >
                  Set up your church now
                </a>{' '}
                and explore it yourself.
              </p>
            </div>

            {sent ? (
              <div className="flex flex-col justify-center rounded-[3px] border border-gold-500/30 bg-white/5 p-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500">
                  <Check className="h-5 w-5 text-primary-900" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  Your request is in{form.name ? `, ${form.name.trim().split(' ')[0]}` : ''}.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                  We&rsquo;ll confirm your demo time by email shortly. A confirmation is on its way to your
                  inbox now.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="doc-no-print space-y-3.5">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    aria-label="Your name"
                    className="w-full rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-gold-500/60"
                  />
                  <input
                    required
                    value={form.church}
                    onChange={(e) => setForm({ ...form, church: e.target.value })}
                    placeholder="Church name"
                    aria-label="Church name"
                    className="w-full rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-gold-500/60"
                  />
                </div>
                <div className="relative">
                  <select
                    value={form.denomination}
                    onChange={(e) => setForm({ ...form, denomination: e.target.value })}
                    aria-label="Which body your church is part of, optional"
                    className={`w-full appearance-none rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 pr-10 text-[15px] outline-none transition focus:border-gold-500/60 ${
                      form.denomination ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    <option value="" className="bg-primary-900 text-white/60">
                      Which body is your church part of? (optional)
                    </option>
                    {DEMO_DENOMINATION_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-primary-900 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-gold-500/60"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone (optional)"
                  aria-label="Phone number, optional"
                  className="w-full rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-gold-500/60"
                />
                {/* appearance-none so the selects match the inputs beside them;
                    the native control paints its own light chrome otherwise. */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {[
                    { label: 'Preferred day', value: form.day, key: 'day' as const, options: days.current },
                    { label: 'Preferred time', value: form.time, key: 'time' as const, options: TIME_SLOTS },
                  ].map((field) => (
                    <div key={field.key} className="relative">
                      <select
                        value={field.value}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        aria-label={field.label}
                        className={`w-full appearance-none rounded-[3px] border border-white/15 bg-white/5 px-4 py-3 pr-10 text-[15px] outline-none transition focus:border-gold-500/60 ${
                          field.value ? 'text-white' : 'text-white/40'
                        }`}
                      >
                        <option value="" className="bg-primary-900 text-white/60">
                          {field.label}
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option} className="bg-primary-900 text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    </div>
                  ))}
                </div>

                {error && <p className="text-[14px] text-red-300">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 font-semibold text-primary-900 transition hover:shadow-xl hover:shadow-gold-500/20 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Request your demo'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="text-[12px] text-white/35">
                  No card required. We reply within one business day.
                </p>
              </form>
            )}
          </div>
        </Sheet>

        <p className="doc-no-print mx-auto max-w-5xl pt-4 text-center text-[12px] text-white/25">
          © {new Date().getFullYear()} ChurchDay
        </p>
      </main>
    </div>
  )
}
