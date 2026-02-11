import type { Metadata } from 'next'
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
      </body>
    </html>
  )
}
