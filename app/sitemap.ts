import type { MetadataRoute } from 'next'
import { DENOMINATION_SLUGS } from '@/data/denominations'

const SITE_URL = 'https://www.church-day.com'

// /privacy and /delete-account are noindexed (see their page metadata), so
// they're deliberately left out here — a sitemap entry says "please index this".
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/for-pastors`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...DENOMINATION_SLUGS.map((slug) => ({
      url: `${SITE_URL}/for/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
