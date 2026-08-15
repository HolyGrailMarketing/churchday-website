import type { Metadata } from 'next'
import localFont from 'next/font/local'

// The one typeface this page adds: a reading face for chapter titles and the
// pastoral letter. Body copy stays on the system stack the rest of the site uses.
//
// Self-hosted rather than pulled from next/font/google: the Google loader needs
// network at build time, and a font outage should not be able to fail a deploy.
// Both files are the latin subset of the Literata variable font (OFL), so one
// file covers the whole 400-700 range.
const literata = localFont({
  src: [
    { path: '../../public/fonts/literata-latin.woff2', weight: '400 700', style: 'normal' },
    { path: '../../public/fonts/literata-latin-italic.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'For Pastors: Run Your Church Without the Spreadsheets | ChurchDay Jamaica',
  description:
    'An interactive brief for church leaders: membership, giving, events and daily discipleship in one simple app.',
  alternates: {
    canonical: '/for-pastors',
  },
  openGraph: {
    title: 'ChurchDay for Pastors',
    description:
      'Everything your church needs — membership, giving, events and daily discipleship — in one simple, beautiful app.',
    url: 'https://www.church-day.com/for-pastors',
    siteName: 'ChurchDay',
    images: ['/logo.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'ChurchDay for Pastors',
    description:
      'Everything your church needs — membership, giving, events and daily discipleship — in one simple, beautiful app.',
    images: ['/logo.png'],
  },
}

export default function ForPastorsLayout({ children }: { children: React.ReactNode }) {
  return <div className={literata.variable}>{children}</div>
}
