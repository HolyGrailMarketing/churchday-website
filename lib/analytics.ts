import { track as vercelTrack } from '@vercel/analytics'

type EventProps = Parameters<typeof vercelTrack>[1]

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Empty until NEXT_PUBLIC_META_PIXEL_ID is set in the Vercel project, which is
 * what keeps the pixel out of local dev and preview builds by default.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

/**
 * Ads Manager optimises far better against Meta's own standard event names
 * than against custom ones, so the moments that are worth buying map onto a
 * standard event. Everything else still reaches Meta, just as a custom event
 * under its own name.
 */
const STANDARD_EVENTS: Record<string, string> = {
  // Booked a demo — the real conversion, and what campaigns should optimise for.
  demo_submitted: 'Lead',
  android_tester_signup: 'Lead',
  // Created a portal account.
  portal_signup: 'CompleteRegistration',
  // Opened the demo form. Mid-funnel, but at Jamaica-sized volumes a campaign
  // will collect these long before it collects 50 Leads a week, which is what
  // the delivery system needs to leave the learning phase.
  demo_opened: 'InitiateCheckout',
  // Read the pastor brief or a denomination page — genuine intent, and the best
  // signal available for building a retargeting audience.
  pastors_brief_opened: 'ViewContent',
  denomination_page_opened: 'ViewContent',
}

/**
 * Reports one event to Vercel Analytics and to the Meta pixel. Every existing
 * `track()` call site keeps working unchanged — swapping the import is the
 * whole integration.
 */
export function track(name: string, props?: EventProps) {
  vercelTrack(name, props)

  const standard = STANDARD_EVENTS[name]
  // `content_name` keeps our own event name visible in the Events Manager
  // breakdowns even when several of them collapse onto one standard event.
  const params = { content_name: name, ...(props ?? {}) }

  window.fbq?.(standard ? 'track' : 'trackCustom', standard ?? name, params)
}
