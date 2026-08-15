import type { Metadata } from 'next'
import { getDenomination } from '@/data/denominations'

const SITE_URL = 'https://www.church-day.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ denomination: string }>
}): Promise<Metadata> {
  const { denomination } = await params
  const d = getDenomination(denomination)
  if (!d) return {}

  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `/for/${d.slug}` },
    openGraph: {
      title: d.metaTitle,
      description: d.metaDescription,
      url: `/for/${d.slug}`,
      siteName: 'ChurchDay Jamaica',
      locale: 'en_JM',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: d.metaTitle,
      description: d.metaDescription,
    },
  }
}

export default async function DenominationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ denomination: string }>
}) {
  const { denomination } = await params
  const d = getDenomination(denomination)

  const breadcrumbJsonLd = d && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: d.shortName, item: `${SITE_URL}/for/${d.slug}` },
    ],
  }

  return (
    <>
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
