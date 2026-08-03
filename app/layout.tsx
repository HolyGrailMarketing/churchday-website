import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChurchDay - Church Management Made Simple',
  description: 'All-in-one church management platform to connect, manage, and grow your congregation',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ChurchDay',
  },
  themeColor: '#142535',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-stone-50">
        {children}
        {/* Cookieless — collects no personal data, so no consent banner needed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
