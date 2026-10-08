'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, HandHeart, Home, PlayCircle, Users } from 'lucide-react'
import { track } from '@/lib/analytics'
import { Spring, prefersReducedMotion, project, rubberband, velocityFrom } from '@/lib/spring'

// The five bottom-nav tabs, in the app's own order, captured from the demo
// church. Copy matches /for-pastors so the two pages describe the same app.
const TABS = [
  {
    id: 'events',
    label: 'Events',
    icon: CalendarDays,
    src: '/app-screens/events.png',
    heading: 'One calendar, the whole church',
    body: 'Services, prayer meetings, choir rehearsals and special events, marked across the month so nobody misses what is on.',
    alt: 'ChurchDay Events tab showing a month calendar of church services and activities',
  },
  {
    id: 'media',
    label: 'Media',
    icon: PlayCircle,
    src: '/app-screens/media.png',
    heading: 'Sermons that outlive Sunday',
    body: 'Video, audio and photos your congregation can come back to during the week — or send to someone who needs it.',
    alt: 'ChurchDay Media tab with sermon videos, audio and photo albums',
  },
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    src: '/app-screens/home.png',
    heading: 'What your members open to',
    body: "Today's devotional — a verse, something to reflect on, and a prayer. You and your leaders get the admin panel right at the top.",
    alt: "ChurchDay Home tab with today's devotional, check-in streak and the admin panel",
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    src: '/app-screens/community.png',
    heading: 'The week between Sundays',
    body: 'The church feed, prayer wall, circles and Bible challenges — where your announcements land and your people carry one another.',
    alt: 'ChurchDay Community tab with the church feed and prayer wall',
  },
  {
    id: 'give',
    label: 'Give',
    icon: HandHeart,
    src: '/app-screens/give.png',
    heading: 'Giving, in a few taps',
    body: 'Tithes and offerings straight from the phone, plus live campaigns — a roof, a youth camp — your church can watch fill up.',
    alt: 'ChurchDay Give tab with a Give Now button, giving history and active campaigns',
  },
] as const

const START = 2 // Home sits in the middle, with a neighbour showing on each side
const HYSTERESIS = 8 // px of travel before a press becomes a horizontal drag

// Taps and keys move at damping 1; only a release that carried momentum earns a bounce.
const SETTLE = { damping: 1, response: 0.38 }
const FLING = { damping: 0.86, response: 0.42 }

export function AppTour() {
  const stageRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pillRef = useRef<HTMLSpanElement>(null)

  // Everything the animation reads per frame lives in a ref, so a drag never
  // waits on a React render.
  const geo = useRef({ pitch: 300, center: 0, tabs: [] as { left: number; width: number }[] })
  const [active, setActive] = useState(START)
  const activeRef = useRef(START)

  const render = useCallback((x: number) => {
    const { pitch, center, tabs } = geo.current
    const progress = -x / pitch // 0 = first slide centred, fractional mid-drag

    slideRefs.current.forEach((el, i) => {
      if (!el) return
      const d = i - progress
      const dist = Math.min(Math.abs(d), 2)
      // Neighbours recede and dim, continuously with the finger — the in-between
      // frames already show which phone is about to take the centre.
      el.style.transform = `translate3d(${center + x + i * pitch}px,0,0) scale(${1 - dist * 0.09})`
      el.style.opacity = String(1 - dist * 0.32)
      el.style.zIndex = String(10 - Math.round(dist * 2))
    })

    // The segmented control's pill tracks the drag too, interpolating between tabs.
    if (pillRef.current && tabs.length) {
      const p = Math.max(0, Math.min(TABS.length - 1, progress))
      const a = tabs[Math.floor(p)]
      const b = tabs[Math.ceil(p)]
      const t = p - Math.floor(p)
      pillRef.current.style.transform = `translate3d(${a.left + (b.left - a.left) * t}px,0,0)`
      pillRef.current.style.width = `${a.width + (b.width - a.width) * t}px`
    }

    const nearest = Math.max(0, Math.min(TABS.length - 1, Math.round(progress)))
    if (nearest !== activeRef.current) {
      activeRef.current = nearest
      setActive(nearest)
    }
  }, [])

  const spring = useRef<Spring | null>(null)
  if (!spring.current) spring.current = new Spring(0, (v) => render(v))

  const measure = useCallback(() => {
    const stage = stageRef.current
    const first = slideRefs.current[0]
    if (!stage || !first) return
    const width = first.offsetWidth
    const gap = Math.max(20, Math.min(56, width * 0.18))
    const g = geo.current
    const oldPitch = g.pitch
    g.pitch = width + gap
    g.center = (stage.clientWidth - width) / 2
    g.tabs = tabRefs.current.map((el) => ({ left: el?.offsetLeft ?? 0, width: el?.offsetWidth ?? 0 }))
    // Keep the same slide centred across a resize.
    const s = spring.current!
    s.set((s.value / oldPitch) * g.pitch)
  }, [])

  useLayoutEffect(() => {
    geo.current.pitch = 1
    spring.current!.value = -START
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    return () => {
      ro.disconnect()
      spring.current?.stop()
    }
  }, [measure])

  const goTo = useCallback((index: number, how: 'tab' | 'key' | 'slide') => {
    const i = Math.max(0, Math.min(TABS.length - 1, index))
    const target = -i * geo.current.pitch
    if (prefersReducedMotion()) spring.current!.set(target)
    else spring.current!.to(target, SETTLE)
    track('tour_tab', { tab: TABS[i].id, how })
  }, [])

  // --- Direct manipulation -------------------------------------------------

  const drag = useRef({
    state: 'idle' as 'idle' | 'pending' | 'dragging',
    id: 0,
    startX: 0,
    startY: 0,
    origin: 0,
    samples: [] as { x: number; t: number }[],
    moved: false,
  })

  const bounds = () => ({ min: -(TABS.length - 1) * geo.current.pitch, max: 0 })

  const resist = (x: number) => {
    const { min, max } = bounds()
    const dim = stageRef.current?.clientWidth ?? 400
    if (x > max) return max + rubberband(x - max, dim)
    if (x < min) return min + rubberband(x - min, dim)
    return x
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    const s = spring.current!
    // Catch it mid-flight: stop where it is on screen, not where it was going.
    s.stop()
    const d = drag.current
    d.state = 'pending'
    d.id = e.pointerId
    d.startX = e.clientX
    d.startY = e.clientY
    d.origin = s.value
    d.samples = [{ x: e.clientX, t: e.timeStamp }]
    d.moved = false
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (d.state === 'idle' || e.pointerId !== d.id) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY

    if (d.state === 'pending') {
      if (Math.abs(dy) > HYSTERESIS && Math.abs(dy) > Math.abs(dx)) {
        // A vertical intent — hand the page back its scroll and settle.
        d.state = 'idle'
        release(0)
        return
      }
      if (Math.abs(dx) < HYSTERESIS) return
      d.state = 'dragging'
      d.moved = true
      stageRef.current?.setPointerCapture(e.pointerId)
    }

    d.samples.push({ x: e.clientX, t: e.timeStamp })
    if (d.samples.length > 12) d.samples.shift()
    spring.current!.set(resist(d.origin + dx))
  }

  const release = (velocity: number) => {
    const s = spring.current!
    const { pitch } = geo.current
    const from = Math.round(-s.value / pitch)
    // Choose the destination from where the throw would land, not where the finger let go.
    let index = Math.round(-(s.value + project(velocity, 0.995)) / pitch)
    if (index === from && Math.abs(velocity) > 350) index -= Math.sign(velocity)
    index = Math.max(0, Math.min(TABS.length - 1, index))
    const target = -index * pitch

    if (prefersReducedMotion()) return s.set(target)
    const flung = Math.abs(velocity) > 350
    // Hand the finger's speed straight to the spring, so drag and animation have no seam.
    s.to(target, { ...(flung ? FLING : SETTLE), velocity })
    if (index !== from) track('tour_tab', { tab: TABS[index].id, how: 'swipe' })
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current
    if (d.state === 'idle' || e.pointerId !== d.id) return
    const wasDragging = d.state === 'dragging'
    d.state = 'idle'
    if (wasDragging) {
      d.samples.push({ x: e.clientX, t: e.timeStamp })
      release(velocityFrom(d.samples))
    } else {
      // A tap that caught the carousel mid-flight: settle wherever it was caught.
      release(0)
    }
  }

  // Two-finger trackpad swipes, which never produce pointer events.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let settle = 0
    let samples: { x: number; t: number }[] = []
    let x = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      const s = spring.current!
      if (!samples.length) x = s.value
      x -= e.deltaX
      samples.push({ x, t: e.timeStamp })
      if (samples.length > 12) samples.shift()
      s.set(resist(x))
      window.clearTimeout(settle)
      settle = window.setTimeout(() => {
        // Trackpads already decelerate on their own, so don't throw any further.
        release(velocityFrom(samples) * 0.25)
        samples = []
      }, 90)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      stage.removeEventListener('wheel', onWheel)
      window.clearTimeout(settle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(activeRef.current + 1, 'key')
    else if (e.key === 'ArrowLeft') goTo(activeRef.current - 1, 'key')
    else return
    e.preventDefault()
  }

  const tab = TABS[active]

  return (
    <section id="tour" className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-white overflow-hidden" aria-labelledby="tour-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow">Inside the app</p>
        <h2 id="tour-title" className="headline mt-3">
          Five tabs. The whole week of church.
        </h2>
        <p className="lede mt-5 max-w-2xl mx-auto">
          This is what your members carry in their pocket. Drag the phones, or pick a tab.
        </p>

        {/* Segmented control — mirrors the app's own tab bar */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="App tabs"
            onKeyDown={onKeyDown}
            className="relative inline-flex max-w-full overflow-x-auto scrollbar-hide rounded-full bg-primary-900/[0.06] p-1"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute top-1 bottom-1 left-0 rounded-full bg-white shadow-[0_1px_2px_rgba(20,37,53,0.12),0_4px_14px_rgba(20,37,53,0.08)] will-change-transform"
            />
            {TABS.map((t, i) => {
              const Icon = t.icon
              const selected = i === active
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`tour-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="tour-stage"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goTo(i, 'tab')}
                  className={`press relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    selected ? 'text-primary-900' : 'text-primary-800/55 hover:text-primary-900'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                  <span className={selected ? '' : 'hidden sm:inline'}>{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* The stage. touch-action: pan-y leaves vertical scrolling to the browser
          and gives every horizontal movement to the carousel. */}
      <div
        id="tour-stage"
        ref={stageRef}
        role="tabpanel"
        aria-labelledby={`tour-tab-${tab.id}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mt-12 h-[min(560px,128vw)] sm:h-[600px] cursor-grab active:cursor-grabbing select-none touch-pan-y focus-visible:outline-none"
      >
        {TABS.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            onClick={() => {
              if (!drag.current.moved && i !== activeRef.current) goTo(i, 'slide')
            }}
            className="absolute left-0 top-0 w-[min(250px,56vw)] sm:w-[268px] will-change-transform origin-center"
            style={{ transform: 'translate3d(-9999px,0,0)' }}
          >
            <Phone src={t.src} alt={t.alt} priority={i === START} />
          </div>
        ))}
      </div>

      {/* Caption — keyed, so it cross-fades when the centre phone changes */}
      <div className="max-w-xl mx-auto px-4 text-center mt-8 min-h-[7.5rem]" aria-live="polite">
        <div key={tab.id} className="animate-caption">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-primary-900">{tab.heading}</h3>
          <p className="mt-2 text-base sm:text-[17px] leading-relaxed text-primary-800/65">{tab.body}</p>
        </div>
      </div>
    </section>
  )
}

/** A screenshot in a bezel. The captures already include the status bar and Dynamic Island. */
export function Phone({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="phone">
      <Image
        src={src}
        alt={alt}
        width={603}
        height={1311}
        sizes="(max-width: 640px) 56vw, 280px"
        priority={priority}
        draggable={false}
        className="block w-full h-auto rounded-[inherit] pointer-events-none"
      />
    </div>
  )
}
