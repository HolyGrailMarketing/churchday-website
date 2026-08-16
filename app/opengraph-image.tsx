import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// Node runtime (not edge) so the logo can be read straight off disk as a
// base64 data URI — the `new URL(..., import.meta.url)` + fetch pattern
// resolves to a webpack asset path in dev and breaks ImageResponse's `img`.
export const runtime = 'nodejs'

export const alt = 'ChurchDay — Church management software built in Jamaica'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#142535',
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(212,168,94,0.28) 0%, rgba(212,168,94,0.08) 35%, transparent 70%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={96}
          height={96}
          style={{ borderRadius: 20, marginBottom: 28 }}
        />
        <div style={{ fontSize: 84, fontWeight: 700, color: '#ecc869', letterSpacing: -2, display: 'flex' }}>
          ChurchDay
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginTop: 10,
            display: 'flex',
          }}
        >
          Connect · Worship · Grow
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 36,
            maxWidth: 820,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Church management software built in Jamaica
        </div>
      </div>
    ),
    { ...size }
  )
}
