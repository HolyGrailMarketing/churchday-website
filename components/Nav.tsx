'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { PORTAL_URL } from '@/lib/constants'

// Every page that mounts this must include matching #features/#pricing/
// #how-it-works section ids — the links are always same-page anchors, no
// cross-page homepage-anchor variant needed.
export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-primary-900/90 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ChurchDay" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gold-400">ChurchDay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
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
            <a
              href={PORTAL_URL}
              onClick={() => track('portal_signin', { from: 'nav' })}
              className="btn-primary"
            >
              Church sign in
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
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
              href={PORTAL_URL}
              onClick={() => {
                setMobileMenuOpen(false)
                track('portal_signin', { from: 'mobile_nav' })
              }}
              className="btn-primary block w-full mt-2 text-center"
            >
              Church sign in
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
