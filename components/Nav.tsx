'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { PORTAL_URL, PORTAL_SIGNUP_URL } from '@/lib/constants'

// Every page that mounts this must include matching #features/#pricing/
// #how-it-works section ids — the links are always same-page anchors, no
// cross-page homepage-anchor variant needed.
export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Over the hero the bar is clear; once content slides underneath, it becomes
  // a translucent material so that content stays legible but still visible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || mobileMenuOpen

  return (
    <nav
      className={`fixed w-full z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid ? 'material-dark shadow-[0_1px_0_rgb(255_255_255/0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ChurchDay" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gold-400">ChurchDay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-7 items-center text-[15px]">
            <a href="#features" className="text-white/70 hover:text-gold-400 transition">Features</a>
            <a href="#pricing" className="text-white/70 hover:text-gold-400 transition">Pricing</a>
            <a href="#how-it-works" className="text-white/70 hover:text-gold-400 transition">How It Works</a>
            <Link
              href="/for-pastors"
              onClick={() => track('pastors_brief_opened', { source: 'nav' })}
              className="text-white/70 hover:text-gold-400 transition"
            >
              For Pastors
            </Link>
            {/* Sign-in is for churches we already have; the nav's one button
                should be working on the ones we don't. */}
            <a
              href={PORTAL_URL}
              onClick={() => track('portal_signin', { from: 'nav' })}
              className="text-white/70 hover:text-gold-400 transition"
            >
              Sign in
            </a>
            <a
              href={PORTAL_SIGNUP_URL}
              onClick={() => track('portal_signup', { from: 'nav' })}
              className="btn-gold btn-sm"
            >
              Get started free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="press md:hidden -mr-2 p-2 text-white/80"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 animate-caption">
            <a href="#features" className="block py-2 text-white/70 hover:text-gold-400">Features</a>
            <a href="#pricing" className="block py-2 text-white/70 hover:text-gold-400">Pricing</a>
            <a href="#how-it-works" className="block py-2 text-white/70 hover:text-gold-400">How It Works</a>
            <Link
              href="/for-pastors"
              onClick={() => {
                setMobileMenuOpen(false)
                track('pastors_brief_opened', { source: 'mobile_nav' })
              }}
              className="block py-2 text-white/70 hover:text-gold-400"
            >
              For Pastors
            </Link>
            <a
              href={PORTAL_SIGNUP_URL}
              onClick={() => {
                setMobileMenuOpen(false)
                track('portal_signup', { from: 'mobile_nav' })
              }}
              className="btn-gold w-full mt-3"
            >
              Get started free
            </a>
            <a
              href={PORTAL_URL}
              onClick={() => {
                setMobileMenuOpen(false)
                track('portal_signin', { from: 'mobile_nav' })
              }}
              className="block w-full mt-2 py-2 text-center text-white/70 hover:text-gold-400"
            >
              Church sign in
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
