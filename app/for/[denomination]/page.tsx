import { notFound } from 'next/navigation'
import { DENOMINATION_SLUGS, getDenomination } from '@/data/denominations'
import { DenominationPage } from './DenominationPage'

export function generateStaticParams() {
  return DENOMINATION_SLUGS.map((denomination) => ({ denomination }))
}

export default async function Page({ params }: { params: Promise<{ denomination: string }> }) {
  const { denomination } = await params
  const d = getDenomination(denomination)
  if (!d) notFound()
  return <DenominationPage denomination={d} />
}
