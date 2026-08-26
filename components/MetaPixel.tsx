'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { META_PIXEL_ID } from '@/lib/analytics'

/**
 * Meta pixel base code. Renders nothing at all unless NEXT_PUBLIC_META_PIXEL_ID
 * is set, so local dev and preview deploys stay out of the ad account's data.
 *
 * Deliberately not using `usePathname` + `useSearchParams` together: reading
 * search params here would opt every page in the site out of static rendering.
 */
export function MetaPixel() {
  const pathname = usePathname()
  const isInitialLoad = useRef(true)

  // The base snippet's PageView only fires on a full document load. Every
  // internal link on this site is a client-side navigation, so those views have
  // to be reported by hand or the pixel sees a one-page session.
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    window.fbq?.('track', 'PageView')
  }, [pathname])

  if (!META_PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
