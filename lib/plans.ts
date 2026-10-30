/**
 * The plan table, priced by church size (October 2026).
 *
 * Three facts drive the shape of this file:
 *
 * 1. **Plans are sized by active members, never by giving.** ChurchDay takes
 *    no cut of a church's giving and does not price on it, so a harvest month
 *    or a building-fund drive can never push a church onto a paid plan.
 *    "Active" means seen in the app or checked in within 90 days.
 * 2. **Giving is in every plan, including the free one.**
 * 3. **Oversight is free.** Deacons and finance viewers never take a seat.
 *
 * This is the only place the plans are declared, and it mirrors
 * DEFAULT_BILLING_CONFIG in functions/src/billingPlans.ts. The pricing table,
 * the pastors' brief and the JSON-LD all read from here.
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
  /** Active members the plan covers. `null` means no limit. */
  activeMembers: number | null
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
    activeMembers: 100,
    description: 'Free, for churches up to 100 active members',
    features: [
      'Up to 100 active members, and unlimited member records',
      'Giving through your own account, with no cut taken',
      'Events, announcements, prayer wall and testimonies',
      'Daily devotional, community feed, moments and polls',
      'Attendance check-in for your weekly service',
      '2 editing seats · deacons and finance viewers free',
    ],
    salesLed: false,
    highlighted: false,
  },
  {
    id: 'ministry',
    name: 'Ministry',
    price: 4_500,
    annual: 45_000,
    activeMembers: null,
    description: 'For a church that has grown past 100 active members',
    features: [
      'Everything in Congregation',
      'Any number of active members',
      'Recurring giving and campaigns',
      'Unlimited check-in, with attendance trends',
      '10 editing seats with role permissions',
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
    price: 9_500,
    annual: 95_000,
    activeMembers: null,
    description: 'For a church with more than one location',
    features: [
      'Everything in Ministry',
      'Several sites on one account, with reporting per site',
      'Your own branding: icon, splash screen and colours',
      'Unlimited editing seats',
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
 * The Founding Church launch offer.
 *
 * Closed to new churches now that J$4,500 is the list price for Ministry.
 * Churches that took it keep their 24-month lock, which lives on their
 * subscription server-side, not here. Kept as a typed `null` so the pages
 * that rendered it fall back to list pricing with no other edit.
 */
export const FOUNDING_OFFER: {
  planId: PlanId
  price: number
  annual: number
  months: number
  slots: number
} | null = null

/** The offer for `plan`, or null when none applies. */
export function foundingOfferFor(plan: Plan) {
  return FOUNDING_OFFER && FOUNDING_OFFER.planId === plan.id ? FOUNDING_OFFER : null
}

/** `28,000` — the thousands separator every price on the site is written with. */
export function formatJmd(amount: number): string {
  return amount.toLocaleString('en-JM')
}

/**
 * The plan that fits a church of a given number of active members.
 *
 * Used by the pastors' brief, where a pastor moves a slider and the matching
 * card is highlighted. A church sitting exactly on the limit still fits free.
 * Multi-site is chosen for having several sites, never for size, so it is
 * never the answer here.
 */
export function planForMembers(activeMembers: number): Plan {
  return activeMembers <= (FREE_PLAN.activeMembers ?? Infinity) ? FREE_PLAN : ENTRY_PAID_PLAN
}

/**
 * "ChurchDay takes no cut of giving", in the exact words used everywhere it
 * appears: under the plans, in the homepage giving section and in the
 * pastors' FAQ. One constant so the three can never drift apart.
 *
 * Deliberately names no percentage: the processor can change its fee, and the
 * receipt is where the giver sees the real number.
 */
export const NO_CUT_LINE =
  "ChurchDay never takes a percentage of your church's giving. The only deduction is the card processor's fee, shown on every receipt."

export const NO_CUT_FAQ = {
  q: 'Does ChurchDay take a cut of our offering?',
  a: "No. ChurchDay earns nothing from your offering. When a member gives by card, the payment processor (DimePay) charges its standard fee, and that fee is shown separately on the member's receipt and in your reports. The rest goes to your church.",
}
