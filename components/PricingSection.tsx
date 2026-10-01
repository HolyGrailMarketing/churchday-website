'use client'

import { track } from '@/lib/analytics'
import { CheckCircle2 } from 'lucide-react'
import { portalSignupUrl } from '@/lib/constants'
import { PLANS, FOUNDING_OFFER, formatJmd, shareOfGiving, type Plan } from '@/lib/plans'

/**
 * `sourcePrefix` tags which page a pricing conversion came from — homepage
 * stays 'pricing' (matching the original analytics history), denomination
 * pages pass e.g. 'ntcog_pricing' for attribution.
 *
 * `onContactSales` is for the sales-led tier. The homepage passes its own
 * demo-scheduling wizard; without a handler the button falls back to the
 * `#demo` anchor that the denomination pages already render.
 */
export function PricingSection({
  sourcePrefix = 'pricing',
  onContactSales,
}: {
  sourcePrefix?: string
  onContactSales?: () => void
}) {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 border border-gold-300 text-gold-600 rounded-full text-xs font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Start free. Pay when your giving grows.
          </h2>
          <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
            Your whole congregation can use ChurchDay for free, with giving working from
            day one. Plans are banded on what comes through the app each month &mdash; not
            on how many members you have.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              sourcePrefix={sourcePrefix}
              onContactSales={onContactSales}
            />
          ))}
        </div>

        {/* The answer to "it's expensive", stated once rather than per card. */}
        <p className="mt-10 text-center text-sm text-primary-700/60">
          Every paid plan costs under 1.6% of the giving it covers. Annual billing is ten
          months for twelve, and you can move between plans whenever you like.
        </p>
      </div>
    </section>
  )
}

function PlanCard({
  plan,
  sourcePrefix,
  onContactSales,
}: {
  plan: Plan
  sourcePrefix: string
  onContactSales?: () => void
}) {
  const dark = plan.highlighted
  const share = shareOfGiving(plan)
  const founding = plan.id === 'ministry' ? FOUNDING_OFFER : null

  return (
    <div
      className={`p-8 rounded-2xl border-2 transition-all ${
        dark
          ? 'border-gold-400 bg-primary-900 shadow-2xl shadow-gold-500/10 relative'
          : 'border-primary-100 bg-white hover:border-gold-300'
      }`}
    >
      {dark && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 text-sm font-bold rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <h3 className={`text-xl font-bold mb-1 ${dark ? 'text-gold-400' : 'text-primary-900'}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mb-6 ${dark ? 'text-white/60' : 'text-primary-700/70'}`}>
        {plan.description}
      </p>

      <div className="mb-2">
        {plan.price === 0 ? (
          <span className={`text-4xl font-bold ${dark ? 'text-white' : 'text-primary-900'}`}>
            Free
          </span>
        ) : (
          <>
            <span className={`text-4xl font-bold ${dark ? 'text-white' : 'text-primary-900'}`}>
              ${formatJmd(plan.price)}
            </span>
            <span className={`text-sm ${dark ? 'text-white/60' : 'text-primary-700/70'}`}>
              {' '}JMD/month
            </span>
          </>
        )}
      </div>

      {/* Annual line, and the share-of-giving ratio that justifies the price. */}
      <p className={`text-xs mb-6 ${dark ? 'text-white/45' : 'text-primary-700/55'}`}>
        {plan.annual
          ? `or J$${formatJmd(plan.annual)} a year — ten months for twelve`
          : 'No card, and no end date'}
        {share !== null && ` · ${(share * 100).toFixed(2)}% of the giving it covers`}
      </p>

      <p
        className={`text-sm font-medium mb-6 pb-6 border-b ${
          dark ? 'text-gold-400 border-white/10' : 'text-primary-600 border-primary-100'
        }`}
      >
        {plan.givingCeiling === null
          ? 'No ceiling on giving'
          : `Giving up to J$${formatJmd(plan.givingCeiling)} a month`}
      </p>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2 items-start">
            <CheckCircle2
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${dark ? 'text-gold-400' : 'text-gold-500'}`}
            />
            <span className={`text-sm ${dark ? 'text-white/80' : 'text-primary-700'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {founding && (
        <p
          className={`mb-6 rounded-lg px-4 py-3 text-xs leading-relaxed ${
            dark ? 'bg-gold-500/15 text-gold-200' : 'bg-gold-50 text-primary-800'
          }`}
        >
          <span className="font-semibold">Founding Church rate:</span>{' '}
          J${formatJmd(founding.price)} a month, locked for {founding.months} months. First{' '}
          {founding.slots} churches only.
        </p>
      )}

      {plan.salesLed ? (
        <button
          type="button"
          onClick={() => {
            track('demo_opened', { source: `${sourcePrefix}_${plan.id}` })
            if (onContactSales) {
              onContactSales()
            } else {
              document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
            dark
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 hover:shadow-lg hover:shadow-gold-500/25'
              : 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
          }`}
        >
          Talk to us
        </button>
      ) : (
        <a
          href={portalSignupUrl(plan.id)}
          onClick={() => track('portal_signup', { from: `${sourcePrefix}_${plan.id}` })}
          className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
            dark
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 hover:shadow-lg hover:shadow-gold-500/25'
              : 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
          }`}
        >
          {plan.price === 0 ? 'Create your church free' : `Start on ${plan.name}`}
        </a>
      )}
    </div>
  )
}
