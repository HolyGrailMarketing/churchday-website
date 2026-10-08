'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  HandCoins,
  Layers,
  MessageSquare,
  Users,
} from 'lucide-react'
import { track } from '@/lib/analytics'
import { PORTAL_SIGNUP_URL } from '@/lib/constants'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PricingSection } from '@/components/PricingSection'
import { AppTour, Phone } from '@/components/home/AppTour'
import { DemoScheduler } from '@/components/home/DemoScheduler'
import { Reveal } from '@/components/home/Reveal'
import { StoreBadges } from '@/components/home/StoreBadges'

// Before → after, in a pastor's own terms. Each "after" is something the app
// shows on screen today, not a roadmap item.
const SHIFTS = [
  {
    before: 'Member details live in a spreadsheet, a WhatsApp group and somebody’s notebook.',
    after: 'One directory your leaders keep, current for everyone.',
  },
  {
    before: 'Envelopes counted after service, totals carried home in a book.',
    after: 'Tithes and offerings in J$, with every giver’s history kept for them.',
  },
  {
    before: 'No way to tell who is drifting, or whether attendance is up or down.',
    after: 'Check-ins and attendance you can read at a glance.',
  },
]

export default function Home() {
  // Each opening gets a fresh key, so the wizard always starts at step one.
  const [demoKey, setDemoKey] = useState(0)

  // `source` tells us which CTA actually drives demo requests, so the weak ones
  // can be cut rather than guessed at.
  const openSchedule = (source: string = 'unknown') => {
    track('demo_opened', { source })
    setDemoKey((k) => k + 1)
  }

  const signupLink = (from: string) => ({
    href: PORTAL_SIGNUP_URL,
    onClick: () => track('portal_signup', { from }),
  })

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-ground text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-0 lg:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <p className="enter inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[13px] font-medium text-white/75 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
              Built in Jamaica, for Jamaican churches
            </p>

            <h1 className="display enter mt-6" style={{ '--d': '80ms' } as React.CSSProperties}>
              Your whole church,
              <br />
              <span className="text-gold-400">in one app.</span>
            </h1>

            <p
              className="enter mt-6 text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-[1.5] text-white/70 max-w-xl mx-auto lg:mx-0 text-pretty"
              style={{ '--d': '160ms' } as React.CSSProperties}
            >
              Members, events, sermons, prayer and giving in J$ — in your congregation&apos;s
              pocket, and <span className="text-white font-medium">free for your whole church</span>.
            </p>

            <div
              className="enter mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              style={{ '--d': '240ms' } as React.CSSProperties}
            >
              <button onClick={() => openSchedule('hero')} className="btn-gold">
                Schedule a demo <ArrowRight className="w-[18px] h-[18px]" aria-hidden />
              </button>
              <a {...signupLink('hero')} className="btn-glass">
                Create your church free
              </a>
            </div>

            {/* "Free" invites the question, so it is answered right under the button. */}
            <p className="enter mt-4 text-sm text-white/45" style={{ '--d': '300ms' } as React.CSSProperties}>
              <span className="whitespace-nowrap">No card</span> &nbsp;·&nbsp;{' '}
              <span className="whitespace-nowrap">no trial to run out</span> &nbsp;·&nbsp;{' '}
              <span className="whitespace-nowrap">giving works on day one</span>
            </p>

            {/* Deliberately quiet: the demo request is the conversion. */}
            <Link
              href="/for-pastors"
              onClick={() => track('pastors_brief_opened', { source: 'hero' })}
              className="enter press mt-2 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-gold-400"
              style={{ '--d': '320ms' } as React.CSSProperties}
            >
              Or read the five-minute brief <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>

            <div
              className="enter mt-10 flex justify-center lg:justify-start"
              style={{ '--d': '380ms' } as React.CSSProperties}
            >
              <StoreBadges placement="hero" />
            </div>
          </div>

          {/* Two real screens, Give tucked behind Home. On phones the pair is
              cropped by the section edge, so it reads as rising out of the page. */}
          <div
            className="enter relative mx-auto w-full max-w-[420px] h-[360px] sm:h-[460px] lg:h-[600px]"
            style={{ '--d': '200ms' } as React.CSSProperties}
            aria-hidden
          >
            <div className="absolute left-[46%] top-[7%] w-[54%] max-w-[230px] rotate-[6deg] opacity-80">
              <Phone src="/app-screens/give.png" alt="" />
            </div>
            <div className="absolute left-[8%] top-0 w-[60%] max-w-[260px] -rotate-[2deg]">
              <Phone src="/app-screens/home.png" alt="" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem, as shifts ───────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why ChurchDay</p>
            <h2 className="headline mt-3">Church admin shouldn&apos;t eat the week.</h2>
            <p className="lede mt-5">
              Spreadsheets, group chats and counting books are stealing time that belongs to your
              people. Here is what changes.
            </p>
          </Reveal>

          <ol className="mt-14 divide-y divide-primary-900/[0.08] border-y border-primary-900/[0.08]">
            {SHIFTS.map((s, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 80}
                className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-10 items-center py-7 md:py-9"
              >
                <p className="text-[17px] leading-relaxed text-primary-800/50 line-through decoration-primary-800/20">
                  {s.before}
                </p>
                <ArrowRight className="hidden md:block w-5 h-5 text-gold-600" aria-hidden />
                <p className="text-[19px] sm:text-xl font-semibold leading-snug tracking-[-0.012em] text-primary-900">
                  {s.after}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <AppTour />

      {/* ── Features, as a bento ─────────────────────────────────────────── */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Everything in one place</p>
            <h2 className="headline mt-3">Built for the way a church actually runs.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Giving — the reason most churches come, so it gets the big tile */}
            <Reveal className="md:col-span-4 md:row-span-2">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] bg-primary-900 p-8 sm:p-10 text-white">
                <div className="relative z-10 max-w-[19rem]">
                  <HandCoins className="w-7 h-7 text-gold-400" aria-hidden />
                  <h3 className="mt-5 text-[28px] sm:text-[32px] font-bold leading-[1.1] tracking-[-0.025em]">
                    Giving in J$, from the first Sunday.
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-white/65">
                    Online tithes and offerings, contribution history for every giver, and
                    campaigns your church can watch fill up.
                  </p>
                </div>
                <div className="absolute -bottom-24 sm:-bottom-32 right-[-8%] sm:right-8 w-[62%] sm:w-[250px] rotate-[-4deg]">
                  <Phone src="/app-screens/give.png" alt="ChurchDay Give tab" />
                </div>
              </div>
            </Reveal>

            <Tile
              className="md:col-span-2 bg-gold-50"
              delay={60}
              icon={BookOpen}
              title="A daily devotion"
              body="A verse, a reflection and a prayer waiting every morning — the reason members open the app between Sundays."
            />
            <Tile
              className="md:col-span-2"
              delay={120}
              icon={Users}
              title="Member directory"
              body="Roles, contact details and engagement history, in one place your leaders keep."
            />
            <Tile
              className="md:col-span-2"
              icon={CalendarDays}
              title="Events"
              body="Services, rehearsals and special days, scheduled once and seen by everyone."
            />
            <Tile
              className="md:col-span-2"
              delay={60}
              icon={BarChart3}
              title="Attendance"
              body="Check-ins that show who is coming, week by week, and how engaged your church is."
            />
            <Tile
              className="md:col-span-2"
              delay={120}
              icon={Layers}
              title="Ministries"
              body="Choir, youth, women’s and men’s groups, each with its own people and plans."
            />
            <Tile
              className="md:col-span-6"
              icon={MessageSquare}
              title="Announcements and prayer"
              body="Send an update to the whole church in seconds, and give your people a prayer wall to carry one another."
              wide
            />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl">
            <p className="eyebrow !text-gold-400">How it works</p>
            <h2 className="headline mt-3 !text-white">Up and running in an afternoon.</h2>
          </Reveal>

          <ol className="mt-14 grid md:grid-cols-3 gap-px overflow-hidden rounded-[28px] bg-white/10">
            {[
              {
                title: 'Create your church',
                body: 'Sign up free in the church portal, or book a demo and we’ll set it up with you.',
              },
              {
                title: 'Bring your people in',
                body: 'We help you import your members and configure the settings your church needs.',
              },
              {
                title: 'Open the doors',
                body: 'Members download ChurchDay, find your church, and the week starts happening in one place.',
              },
            ].map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="bg-primary-900 p-8 sm:p-10">
                <span className="text-[15px] font-semibold tabular-nums text-gold-400">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-white/60">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <PricingSection onContactSales={() => openSchedule('pricing_multisite')} />

      {/* ── Closing call ─────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto text-center">
          <Image src="/logo.png" alt="" width={64} height={64} className="mx-auto rounded-[16px] shadow-lg" />
          <h2 className="headline mt-8">Bring your church together this Sunday.</h2>
          <p className="lede mt-5 max-w-xl mx-auto">
            Set up free today, or let us show you around first. Either way, there&apos;s nothing to pay
            until your giving grows.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => openSchedule('closing')} className="btn-ink">
              Schedule a demo <ArrowRight className="w-[18px] h-[18px]" aria-hidden />
            </button>
            <a
              {...signupLink('closing')}
              className="btn-gold"
            >
              Create your church free
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />

      {demoKey > 0 && <DemoScheduler key={demoKey} onClose={() => setDemoKey(0)} />}
    </div>
  )
}

function Tile({
  icon: Icon,
  title,
  body,
  className = '',
  delay = 0,
  wide = false,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  body: string
  className?: string
  delay?: number
  wide?: boolean
}) {
  return (
    <Reveal delay={delay} className={`${className} rounded-[28px] ${className.includes('bg-') ? '' : 'bg-white'}`}>
      <div
        className={`h-full rounded-[28px] p-7 sm:p-8 shadow-[inset_0_0_0_1px_rgb(20_37_53/0.07)] ${
          wide ? 'sm:flex sm:items-center sm:gap-8' : ''
        }`}
      >
        <div className="grid place-items-center w-11 h-11 shrink-0 rounded-[12px] bg-primary-900 text-gold-400">
          <Icon className="w-[22px] h-[22px]" aria-hidden />
        </div>
        <div className={wide ? 'mt-5 sm:mt-0' : 'mt-5'}>
          <h3 className="text-[21px] font-semibold tracking-[-0.018em] text-primary-900">{title}</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-primary-800/60">{body}</p>
        </div>
      </div>
    </Reveal>
  )
}
