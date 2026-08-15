import { ImageResponse } from 'next/og'

export const alt = 'ChurchDay — Church management software built in Jamaica'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ecc869 0%, #d4a85e 100%)',
            marginBottom: 28,
            fontSize: 48,
            fontWeight: 700,
            color: '#142535',
          }}
        >
          CD
        </div>
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
