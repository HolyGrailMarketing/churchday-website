'use client'

import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { APP_STORE_URL, PORTAL_URL } from '@/lib/constants'
import { DENOMINATION_SLUGS, denominations } from '@/data/denominations'
import { useAndroidWaitlist } from './AndroidWaitlistModal'

export function Footer() {
  const { openWaitlist } = useAndroidWaitlist()

  return (
    <footer className="bg-primary-900 text-white/60 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="ChurchDay" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-gold-400">ChurchDay</span>
            </div>
            <p className="text-sm text-white/40 mb-4">Connect. Worship. Grow.</p>
            <div className="flex flex-col gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download ChurchDay on the App Store"
                onClick={() => track('app_store_click', { placement: 'footer' })}
                className="inline-block hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <svg width="120" height="40" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="150" height="50" rx="10" fill="black"/>
                  <text x="52" y="17" fill="white" fontSize="8" fontFamily="system-ui" fontWeight="400">Download on the</text>
                  <text x="52" y="33" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="600">App Store</text>
                  <g transform="translate(14, 8) scale(0.7)">
                    <path d="M24.769 20.3a5.68 5.68 0 0 1 2.706-4.77 5.823 5.823 0 0 0-4.59-2.483c-1.93-.203-3.81 1.157-4.797 1.157-.999 0-2.503-1.137-4.12-1.104a6.076 6.076 0 0 0-5.115 3.118c-2.21 3.832-.563 9.466 1.56 12.564 1.062 1.52 2.3 3.22 3.916 3.16 1.582-.066 2.174-1.012 4.084-1.012 1.9 0 2.458 1.012 4.104.975 1.697-.028 2.77-1.526 3.793-3.06a12.575 12.575 0 0 0 1.736-3.539 5.49 5.49 0 0 1-3.277-5.006z" fill="white"/>
                    <path d="M21.607 11.13a5.593 5.593 0 0 0 1.28-4.01 5.7 5.7 0 0 0-3.687 1.907 5.327 5.327 0 0 0-1.313 3.862 4.71 4.71 0 0 0 3.72-1.76z" fill="white"/>
                  </g>
                </svg>
              </a>
              <button
                onClick={openWaitlist}
                className="inline-block hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <svg width="135" height="40" viewBox="0 0 168 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="168" height="50" rx="10" fill="black"/>
                  <text x="62" y="17" fill="white" fontSize="8" fontFamily="system-ui" fontWeight="400">GET IT ON</text>
                  <text x="62" y="34" fill="white" fontSize="15" fontFamily="system-ui" fontWeight="600">Google Play</text>
                  <g transform="translate(14, 10) scale(0.65)">
                    <path d="M4.4 2.1L24.3 13.4c.5.3.8.8.8 1.4v22.4c0 .6-.3 1.1-.8 1.4L4.4 49.9c-.8.5-1.8-.1-1.8-1V3.1c0-.9 1-1.5 1.8-1z" fill="#4285F4"/>
                    <path d="M4.4 2.1L24.3 13.4l7.2-7.5L5.6.7C4.8.2 3.6.7 3.6 1.6v.1c0 .2.3.3.8.4z" fill="#EA4335"/>
                    <path d="M31.5 5.9L24.3 13.4 4.4 2.1C3.6 1.6 2.6 2.2 2.6 3.1v45.8c0 .9 1 1.5 1.8 1L24.3 38.6l7.2 7.5c.5.5 1.3.1 1.3-.5V6.4c0-.6-.8-1-1.3-.5z" fill="#34A853"/>
                    <path d="M24.3 38.6L4.4 49.9c-.8.5-1.8-.1-1.8-1V48.8c0 .2.3.3.8.4L31.5 46.1l-7.2-7.5z" fill="#FBBC05"/>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-gold-400 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-gold-400 transition">Pricing</a></li>
              <li><Link href="/for-pastors" className="hover:text-gold-400 transition">For Pastors</Link></li>
              <li>
                <a
                  href={PORTAL_URL}
                  onClick={() => track('portal_signin', { from: 'footer' })}
                  className="hover:text-gold-400 transition"
                >
                  Church sign in
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Your Denomination</h4>
            <ul className="space-y-2 text-sm">
              {DENOMINATION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/for/${slug}`} className="hover:text-gold-400 transition">
                    {denominations[slug].shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@church-day.com" className="hover:text-gold-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-gold-400 transition">Privacy</a></li>
              <li><a href="/delete-account" className="hover:text-gold-400 transition">Delete your account</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>&copy; 2026 ChurchDay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
