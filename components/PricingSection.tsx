'use client'

import { track } from '@vercel/analytics'
import { CheckCircle2 } from 'lucide-react'
import { PORTAL_SIGNUP_URL } from '@/lib/constants'

const PLANS = [
  {
    name: 'Starter',
    price: '4,500',
    description: 'For small churches getting started',
    members: 'Up to 100 members',
    features: [
      'Member management',
      'Attendance tracking',
      'Event calendar',
      'Announcements',
      'Prayer requests',
      'Basic reports',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '8,500',
    description: 'For growing congregations',
    members: 'Up to 500 members',
    features: [
      'Everything in Starter',
      'Online tithes & offerings',
      'Ministry group management',
      'Advanced analytics',
      'Communication hub',
      'Donation reports',
      'Multiple admin roles',
    ],
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '12,500',
    description: 'For established churches',
    members: 'Unlimited members',
    features: [
      'Everything in Growth',
      'Priority support',
      'Custom branding',
      'Advanced financial reports',
      'Bulk member import',
      'API access',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
]

// `sourcePrefix` tags which page a pricing conversion came from — homepage
// stays 'pricing' (matching the original analytics history), denomination
// pages pass e.g. 'ntcog_pricing' for attribution.
export function PricingSection({ sourcePrefix = 'pricing' }: { sourcePrefix?: string }) {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 border border-gold-300 text-gold-600 rounded-full text-xs font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
            Choose the plan that fits your congregation. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border-2 transition-all ${
                plan.highlighted
                  ? 'border-gold-400 bg-primary-900 shadow-2xl shadow-gold-500/10 relative'
                  : 'border-primary-100 bg-white hover:border-gold-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 text-sm font-bold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-gold-400' : 'text-primary-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/60' : 'text-primary-700/70'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-primary-900'}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-primary-700/70'}`}>
                  {' '}JMD/month
                </span>
              </div>
              <p className={`text-sm font-medium mb-6 pb-6 border-b ${
                plan.highlighted ? 'text-gold-400 border-white/10' : 'text-primary-600 border-primary-100'
              }`}>
                {plan.members}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'text-gold-400' : 'text-gold-500'
                    }`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-primary-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={PORTAL_SIGNUP_URL}
                onClick={() =>
                  track('portal_signup', { from: `${sourcePrefix}_${plan.name.toLowerCase()}` })
                }
                className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 hover:shadow-lg hover:shadow-gold-500/25'
                    : 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
