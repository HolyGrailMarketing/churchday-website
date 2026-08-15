import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

// www is the canonical host — church-day.com already 301s here at the Vercel
// domain level, so metadata must agree with what's actually being served.
const SITE_URL = 'https://www.church-day.com'
const APP_STORE_URL = 'https://apps.apple.com/us/app/churchday/id6765494714'
const TITLE = 'Church Management Software Jamaica | ChurchDay'
const DESCRIPTION =
  'Run your whole church from one app — members, attendance, tithes in JMD, and a daily devotion. Built in Jamaica. Set up in an afternoon.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ChurchDay — church management built in Jamaica',
    description:
      'Members, attendance, tithes in JMD, and a daily devotion — all in one app. Built in Jamaica, for Jamaican churches.',
    url: '/',
    siteName: 'ChurchDay Jamaica',
    locale: 'en_JM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChurchDay — church management built in Jamaica',
    description:
      'Members, attendance, tithes in JMD, and a daily devotion — all in one app. Built in Jamaica, for Jamaican churches.',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ChurchDay',
  },
}

export const viewport: Viewport = {
  themeColor: '#142535',
}

// One @graph so Organization, WebSite and SoftwareApplication share an
// identity via @id rather than being declared as three disconnected things.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'ChurchDay',
      alternateName: 'ChurchDay Jamaica',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: 'support@church-day.com',
      slogan: 'Connect. Worship. Grow.',
      areaServed: { '@type': 'Country', name: 'Jamaica' },
      description: DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'ChurchDay Jamaica',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-JM',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'ChurchDay',
      operatingSystem: 'iOS',
      applicationCategory: 'BusinessApplication',
      url: APP_STORE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '4500',
          priceCurrency: 'JMD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '4500',
            priceCurrency: 'JMD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON',
          },
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '8500',
          priceCurrency: 'JMD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '8500',
            priceCurrency: 'JMD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '12500',
          priceCurrency: 'JMD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '12500',
            priceCurrency: 'JMD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-JM">
      <body className="antialiased bg-stone-50">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Cookieless — collects no personal data, so no consent banner needed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
