'use client'

import { useEffect, useRef } from 'react'

/** Fades its children up once, the first time they come into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.shown = 'true'
        io.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  )
}
