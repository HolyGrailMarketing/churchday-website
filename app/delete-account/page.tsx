/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Delete Your Account — ChurchDay',
  description:
    'How to request deletion of your ChurchDay account and associated data, what is deleted, and what is retained.',
  alternates: {
    canonical: '/delete-account',
  },
  robots: { index: false, follow: true },
}

const SUPPORT_EMAIL = 'support@church-day.com'

const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  'Account deletion request — ChurchDay'
)}&body=${encodeURIComponent(
  [
    'I would like my ChurchDay account and associated data deleted.',
    '',
    'Email address on the account:',
    'Name on the account:',
    'Church:',
    '',
    'Please confirm once the deletion is complete.',
  ].join('\n')
)}`

/** Rows for the "what is deleted / what is kept" tables. */
const DELETED: [string, string][] = [
  ['Sign-in credentials', 'Your email address and password, and any Google or Apple sign-in link.'],
  [
    'Profile information',
    'Name, profile photo, bio, phone number, home address and saved location.',
  ],
  [
    'Church membership',
    'Your membership of your church, your role, and your position in its member directory.',
  ],
  [
    'Attendance history',
    'Check-in records, attendance streaks and devotional streaks held on your profile.',
  ],
  [
    'Saved personal content',
    'Saved verses, private reflections and your in-app notification history.',
  ],
  ['Photos you uploaded', 'Images you posted to Moments, and your profile photo, in our file storage.'],
  ['Push notification tokens', 'The device tokens used to send you notifications.'],
]

const KEPT: [string, string, string][] = [
  [
    'Donation records',
    'The amount, date and reference of any gift you made, kept for financial and tax recordkeeping. Card and bank details are never stored by us — they stay with our payment processor.',
    'Up to 7 years',
  ],
  [
    'Content posted to your church',
    'Posts, comments and prayer requests you shared with your congregation are part of that church\'s record. Ask us to remove them and we will, but they are not removed automatically.',
    'Until you ask us to remove it',
  ],
  [
    'Moderation and safety records',
    'If you were the subject of a report or a block, a minimal record is kept so the safety decision cannot be undone by deleting and re-creating an account.',
    'Up to 2 years',
  ],
  [
    'Anonymised analytics',
    'Aggregated counts of screen views and feature usage. These carry no name, email or device identifier and cannot be traced back to you.',
    'Indefinite (not personal data)',
  ],
  [
    'Encrypted backups',
    'Deleted data can persist in routine database backups for a short window before those backups expire.',
    'Up to 30 days',
  ],
]

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="w-full bg-primary-900 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ChurchDay" width={28} height={28} className="rounded-lg" />
            <span className="font-bold text-gold-400">ChurchDay</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Delete Your Account</h1>
        <p className="text-sm text-stone-500 mb-8">Last updated: August 7, 2026</p>

        <p className="text-stone-700 leading-relaxed mb-10">
          This page explains how to delete your account for <strong>ChurchDay</strong>, the church
          management app published by <strong>Holy Grail Marketing</strong>, and exactly what happens
          to your data when you do. You can delete your account yourself inside the app, or ask us to
          do it for you.
        </p>

        {/* ── Option 1: in-app ──────────────────────────────────────────── */}

        <section className="rounded-2xl border-2 border-primary-200 bg-white p-6 sm:p-8 mb-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 mb-1">
            Option 1 — fastest
          </p>
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Delete it yourself in the app</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Takes about a minute and happens immediately. You will need to be signed in.
          </p>
          <ol className="space-y-4">
            {[
              'Open the ChurchDay app and sign in.',
              'Tap Profile in the bottom navigation bar.',
              'Scroll to the very bottom of the Profile screen.',
              'Tap Delete Account.',
              'Read the warning and tap Delete to confirm.',
              'Confirm your identity — enter your password, or sign in again with Google or Apple, depending on how you normally sign in.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-primary-900 text-white font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-1 text-stone-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-stone-600 bg-stone-100 rounded-lg p-4">
            Your account and profile are removed straight away and you are returned to the sign-in
            screen. <strong>This cannot be undone.</strong> Photos you uploaded and content you
            posted to your church are cleared separately — use Option 2 below if you want those
            erased as well.
          </p>
        </section>

        {/* ── Option 2: request ─────────────────────────────────────────── */}

        <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 mb-12 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 mb-1">
            Option 2
          </p>
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Ask us to delete it</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Use this if you cannot sign in, no longer have the app installed, or want everything
            erased including your uploaded photos and the content you posted to your church.
          </p>
          <ol className="space-y-4 mb-6">
            {[
              <>
                Email{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 underline font-medium">
                  {SUPPORT_EMAIL}
                </a>{' '}
                with the subject <strong>&ldquo;Account deletion request&rdquo;</strong>.
              </>,
              <>
                Include the <strong>email address on your account</strong>, your <strong>name</strong>,
                and the <strong>church</strong> you belong to, so we can find the right account.
              </>,
              <>
                We will email you back to confirm the request came from you. Reply to that message to
                confirm.
              </>,
              <>
                We delete the account and confirm in writing. This is normally done within{' '}
                <strong>7 days</strong>, and always within <strong>30 days</strong> of your confirmed
                request.
              </>,
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-stone-200 text-primary-900 font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-1 text-stone-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <a
            href={MAILTO}
            className="inline-block bg-primary-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-800 transition"
          >
            Email a deletion request
          </a>
        </section>

        {/* ── What is deleted ───────────────────────────────────────────── */}

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-primary-800 mb-2">What we delete</h2>
          <p className="text-stone-700 leading-relaxed mb-5">
            When your deletion request is complete, the following are permanently erased and cannot
            be recovered:
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-primary-900">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Data</th>
                  <th className="px-4 py-3 font-semibold">What it covers</th>
                </tr>
              </thead>
              <tbody>
                {DELETED.map(([label, detail]) => (
                  <tr key={label} className="border-t border-stone-200 align-top">
                    <td className="px-4 py-3 font-medium text-primary-800 whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-stone-700 leading-relaxed">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What is kept ──────────────────────────────────────────────── */}

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-primary-800 mb-2">What we keep, and for how long</h2>
          <p className="text-stone-700 leading-relaxed mb-5">
            A small amount of data outlives your account, either because the law requires it or
            because it does not identify you. Nothing in this list can be used to sign in as you or
            to restore your profile.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-primary-900">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Data</th>
                  <th className="px-4 py-3 font-semibold">Why we keep it</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Retention period</th>
                </tr>
              </thead>
              <tbody>
                {KEPT.map(([label, why, period]) => (
                  <tr key={label} className="border-t border-stone-200 align-top">
                    <td className="px-4 py-3 font-medium text-primary-800 whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-stone-700 leading-relaxed">{why}</td>
                    <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-stone-700 leading-relaxed">
            Once these periods expire, the data is deleted on our normal retention schedule.
          </p>
        </section>

        {/* ── Notes ─────────────────────────────────────────────────────── */}

        <section className="mb-12 space-y-6 text-stone-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">
              Deleting data without deleting your account
            </h2>
            <p>
              You do not have to close your account to remove information. You can edit or clear your
              photo, bio, phone number and address at any time from the Profile screen, delete
              individual posts and prayer requests you have shared, and turn off location and push
              notifications in your device settings. If you want a specific item removed and cannot do
              it yourself, email us and we will remove it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">If you are a church admin</h2>
            <p>
              Deleting your personal account does not delete your church, its members, its events or
              its giving records — those belong to the congregation, not to you. If you are the only
              administrator, please hand the role to someone else before deleting your account, or
              email us so the church is not left without an administrator. To close a church account
              entirely, contact us from the administrator's email address.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">Questions</h2>
            <p>
              Write to us and a person will answer. See our{' '}
              <Link href="/privacy" className="text-primary-600 underline">
                Privacy Policy
              </Link>{' '}
              for the full picture of what we collect and why.
            </p>
            <div className="mt-3 pl-4 border-l-2 border-gold-400">
              <p className="font-semibold text-primary-900">Holy Grail Marketing</p>
              <p>ChurchDay Support</p>
              <p>
                Email:{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 underline">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 mt-16 py-8 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} Holy Grail Marketing. All rights reserved.{' '}
        <Link href="/" className="underline hover:text-primary-600">
          Back to ChurchDay
        </Link>
      </footer>
    </div>
  )
}
