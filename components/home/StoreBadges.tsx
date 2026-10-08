'use client'

import { track } from '@/lib/analytics'
import { APP_STORE_URL } from '@/lib/constants'
import { useAndroidWaitlist } from '@/components/AndroidWaitlistModal'

/** App Store link plus the Android waitlist, which stands in for Google Play until launch. */
export function StoreBadges({ placement }: { placement: string }) {
  const { openWaitlist } = useAndroidWaitlist()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download ChurchDay on the App Store"
        onClick={() => track('app_store_click', { placement })}
        className="press inline-block rounded-[10px] hover:opacity-85"
      >
        <svg width="135" height="45" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="150" height="50" rx="10" fill="black"/>
          <rect x="0.5" y="0.5" width="149" height="49" rx="9.5" stroke="white" strokeOpacity="0.25"/>
          <text x="52" y="17" fill="white" fontSize="8" fontFamily="system-ui" fontWeight="400">Download on the</text>
          <text x="52" y="33" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="600">App Store</text>
          <g transform="translate(14, 8) scale(0.7)">
            <path d="M24.769 20.3a5.68 5.68 0 0 1 2.706-4.77 5.823 5.823 0 0 0-4.59-2.483c-1.930-.203-3.810 1.157-4.797 1.157-.999 0-2.503-1.137-4.120-1.104a6.076 6.076 0 0 0-5.115 3.118c-2.210 3.832-.563 9.466 1.560 12.564 1.062 1.520 2.300 3.220 3.916 3.160 1.582-.066 2.174-1.012 4.084-1.012 1.900 0 2.458 1.012 4.104.975 1.697-.028 2.770-1.526 3.793-3.060a12.575 12.575 0 0 0 1.736-3.539 5.490 5.490 0 0 1-3.277-5.006z" fill="white"/>
            <path d="M21.607 11.13a5.593 5.593 0 0 0 1.280-4.010 5.700 5.700 0 0 0-3.687 1.907 5.327 5.327 0 0 0-1.313 3.862 4.710 4.710 0 0 0 3.720-1.760z" fill="white"/>
          </g>
        </svg>
      </a>
      <button
        type="button"
        onClick={openWaitlist}
        aria-label="Join the Android waitlist"
        className="press inline-block rounded-[10px] hover:opacity-85"
      >
        <svg width="151" height="45" viewBox="0 0 168 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="168" height="50" rx="10" fill="black"/>
          <rect x="0.5" y="0.5" width="167" height="49" rx="9.5" stroke="white" strokeOpacity="0.25"/>
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
  )
}
