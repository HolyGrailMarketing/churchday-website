/**
 * The tier design from `founder/pricing-strategy.md`.
 *
 * Three facts drive the shape of this file:
 *
 * 1. **Tiers band on monthly digital giving, not member count.** Member count
 *    does not track value — a 400-member rural congregation moving J$60,000
 *    digitally can pay less than a 150-member uptown church moving J$600,000.
 *    `dimepayWebhook` already writes `processedAmount` on every approved
 *    donation, so giving volume is a meter we can actually read.
 * 2. **Giving is in every tier, including the free one.** It is both the hook
 *    and the meter: gate it and the meter never spins.
 * 3. **The free tier replaced the 30-day trial.** Nothing here asks for a card,
 *    so any copy about card verification is stale — see `PricingSection`.
 *
 * This is the only place the tiers are declared. They used to be copied into
 * the pricing table, the pastors' brief and the JSON-LD separately, and the
 * three copies had already drifted apart.
 */

export type PlanId = 'congregation' | 'ministry' | 'multisite'

export type Plan = {
  id: PlanId
  name: string
  /** Monthly list price in JMD. 0 on the free tier. */
  price: number
  /**
   * Annual list price in JMD — ten months for twelve. `null` where there is
   * nothing to bill. Churches approve budgets once in a board meeting, so one
   * annual line passes more easily than twelve card charges.
   */
  annual: number | null
  /**
   * Top of the plan's monthly digital giving band, in JMD. `null` means no
   * ceiling. This is what a church is actually buying at each step up.
   */
  givingCeiling: number | null
  description: string
  features: string[]
  /** Self-serve plans link to the portal; sales-led ones open the demo form. */
  salesLed: boolean
  highlighted: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'congregation',
    name: 'Congregation',
    price: 0,
    annual: null,
    givingCeiling: 150_000,
    description: 'Free, for every church',
    features: [
      'Unlimited member records and the member app',
      'Giving through your own account, up to J$150,000 a month',
      'Events, announcements, prayer wall and testimonies',
      'Daily devotional, community feed, moments and polls',
      'Attendance check-in for your weekly service',
      '2 leader seats on the web portal',
    ],
    salesLed: false,
    highlighted: false,
  },
  {
    id: 'ministry',
    name: 'Ministry',
    price: 9_500,
    annual: 95_000,
    givingCeiling: 600_000,
    description: 'For a church whose giving has outgrown free',
    features: [
      'Everything in Congregation',
      'Giving up to J$600,000 a month, with recurring giving and campaigns',
      'Unlimited check-in, with attendance trends',
      '10 leader seats with role permissions',
      'Unlimited ministry groups and circles',
      'Finance: donations, expenses, campaigns and monthly statements',
      'Giving statements for members, ready to export',
      '8 push announcements a month',
    ],
    salesLed: false,
    highlighted: true,
  },
  {
    id: 'multisite',
    name: 'Multi-site',
    price: 28_000,
    annual: 280_000,
    givingCeiling: null,
    description: 'For a church with more than one location',
    features: [
      'Everything in Ministry',
      'No ceiling on giving',
      'Several sites on one account, with reporting per site',
      'Your own branding: icon, splash screen and colours',
      'Unlimited leader seats',
      'We import your records for you, up to 2,000',
      'A named contact on WhatsApp, same or next business day',
    ],
    salesLed: true,
    highlighted: false,
  },
]

export const FREE_PLAN = PLANS[0]
export const ENTRY_PAID_PLAN = PLANS[1]

/**
 * The Founding Church launch offer — `founder/pricing-strategy.md` §6.
 *
 * This is a real price lock, not a banner: a church that takes it is charged
 * this rate for `months` months, stamped onto its subscription server-side so a
 * later change to the list price cannot touch it. Mirrors `foundingOffer` in
 * `functions/src/billingPlans.ts`, which is what actually decides whether a
 * given church gets it.
 *
 * The list price stays on the page, struck through. A discount with nothing to
 * compare it against is just a price — and J$9,500 is also the number the
 * church will pay once the lock ends, so hiding it would be a bad surprise
 * rather than a good deal.
 *
 * "Locked for 24 months", never "forever": at roughly 48 paying churches the
 * margin is needed, and a promise broken later costs more than the discount.
 *
 * Set to null to take the offer down — the page falls back to list pricing
 * with no other edit.
 */
export const FOUNDING_OFFER: {
  planId: PlanId
  price: number
  annual: number
  months: number
  slots: number
} | null = {
  planId: 'ministry',
  price: 4_500,
  annual: 45_000,
  months: 24,
  slots: 25,
}

/** The offer for `plan`, or null when none applies. */
export function foundingOfferFor(plan: Plan) {
  return FOUNDING_OFFER && FOUNDING_OFFER.planId === plan.id ? FOUNDING_OFFER : null
}

/** `28,000` — the thousands separator every price on the site is written with. */
export function formatJmd(amount: number): string {
  return amount.toLocaleString('en-JM')
}

/**
 * The plan that covers a given month of digital giving.
 *
 * Used by the pastors' brief, where a pastor moves a slider and the matching
 * card is highlighted. A church sitting exactly on a ceiling still fits the
 * cheaper plan, which is how the bands are written on the page.
 */
export function planForGiving(monthlyGiving: number): Plan {
  return (
    PLANS.find((p) => p.givingCeiling !== null && monthlyGiving <= p.givingCeiling) ??
    PLANS[PLANS.length - 1]
  )
}

/**
 * The share of the giving at the top of its band that a plan costs — the answer
 * when a pastor says it is expensive. Every paid plan lands under 1.6%.
 */
export function shareOfGiving(plan: Plan): number | null {
  if (plan.price === 0 || plan.givingCeiling === null) return null
  // Measured against what the church actually pays, so the figure matches the
  // price printed directly above it.
  const offer = foundingOfferFor(plan)
  return (offer ? offer.price : plan.price) / plan.givingCeiling
}
