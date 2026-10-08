'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { FeatureGrid } from '@/components/FeatureGrid'
import { PricingSection } from '@/components/PricingSection'
import { DemoForm } from '@/components/DemoForm'
import type { Denomination } from '@/data/denominations'

const STEPS = [
  { step: '1', title: 'Request a Demo', description: 'Tell us about your church and see ChurchDay in action' },
  { step: '2', title: 'Set Up Your Church', description: "We'll help you import members and configure your settings" },
  { step: '3', title: 'Start Managing', description: 'Invite your team and begin transforming your operations' },
]

export function DenominationPage({ denomination: d }: { denomination: Denomination }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Nav />

      {/* Hero */}
      <section className="gradient-hero min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1 border border-gold-500/40 text-gold-400 rounded-full text-xs font-medium mb-6 uppercase tracking-wide">
            {d.shortName}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-400 mb-6 tracking-tight leading-tight">
            {d.heroFraming}
          </h1>
          {(d.congregationCount || d.foundingNote) && (
            <p className="text-lg text-white/60 mb-10">
              {d.congregationCount && <>{d.congregationCount} congregations across Jamaica</>}
              {d.congregationCount && d.foundingNote && <> &middot; </>}
              {d.foundingNote}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#demo"
              className="press hover-glow px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold"
            >
              Request a Demo <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </a>
            <Link
              href="/for-pastors"
              className="press px-8 py-4 border-2 border-gold-500/40 text-gold-400 rounded-lg font-semibold hover:bg-gold-500/10"
            >
              Read the five-minute brief
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Church Management is Getting Harder
            </h2>
            <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
              Spreadsheets, multiple apps, and manual processes are stealing your time. We get it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {d.painPoints.map((point, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-white border border-primary-100 hover:border-gold-300 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{point.title}</h3>
                <p className="text-primary-700/70">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Getting Started is Simple</h2>
            <p className="text-lg text-white/60">
              In just a few steps, you&apos;ll have your church community organized
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 text-primary-900 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection sourcePrefix={`${d.demoSourceTag}_pricing`} />

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Your Questions</h2>
          </div>
          <div className="divide-y divide-primary-900/10 border-y border-primary-900/10">
            {d.faq.map((item, i) => (
              <details key={i} className="faq group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-primary-900">
                  {item.q}
                  <span className="text-gold-600 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180">&#8964;</span>
                </summary>
                <p className="mt-3 leading-relaxed text-primary-700/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Request a Demo</h2>
            <p className="text-lg text-primary-700/70">
              See how ChurchDay fits {d.fullName} congregations — no card required.
            </p>
          </div>
          <DemoForm source={d.demoSourceTag} defaultDenomination={d.fullName} />
        </div>
      </section>

      <p className="text-center text-xs text-primary-400 pb-8 px-4">
        Congregation figures for {d.fullName} sourced from{' '}
        <a
          href={d.officialSite}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gold-600"
        >
          {d.officialSite.replace('https://', '')}
        </a>
        .
      </p>

      <Footer />
    </div>
  )
}
