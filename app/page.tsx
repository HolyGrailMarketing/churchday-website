'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight, ArrowLeft, CheckCircle2, Users, Calendar, Clock, BarChart3, MessageSquare, Zap, Layers, Database, HandCoins, TrendingUp, Apple, Smartphone, PartyPopper } from 'lucide-react'

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']

// Next 6 weekdays (Mon–Fri), computed client-side.
function getUpcomingDays() {
  const days: { value: string; label: string; sub: string }[] = []
  const date = new Date()
  date.setDate(date.getDate() + 1)
  while (days.length < 6) {
    const day = date.getDay()
    if (day !== 0 && day !== 6) {
      days.push({
        value: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        sub: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })
    }
    date.setDate(date.getDate() + 1)
  }
  return days
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoForm, setDemoForm] = useState({ name: '', email: '', church: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [downloadModal, setDownloadModal] = useState<'ios' | 'android' | null>(null)

  // Schedule-a-demo wizard
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [step, setStep] = useState(0) // 0=day, 1=time, 2=details, 3=success
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const upcomingDays = getUpcomingDays()

  const openSchedule = () => {
    setStep(0)
    setSelectedDate('')
    setSelectedTime('')
    setError('')
    setDemoForm({ name: '', email: '', church: '', phone: '' })
    setScheduleOpen(true)
  }

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...demoForm, preferredDate: selectedDate, preferredTime: selectedTime }),
      })

      if (!res.ok) throw new Error('Failed to submit')

      setStep(3)
      setDemoForm({ name: '', email: '', church: '', phone: '' })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-primary-900/90 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="ChurchDay" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-lg text-gold-400">ChurchDay</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <a href="#features" className="text-white/70 hover:text-gold-400 transition">Features</a>
              <a href="#pricing" className="text-white/70 hover:text-gold-400 transition">Pricing</a>
              <a href="#how-it-works" className="text-white/70 hover:text-gold-400 transition">How It Works</a>
              <button
                onClick={openSchedule}
                className="btn-primary"
              >
                Request Demo
              </button>
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  openSchedule()
                }}
                className="btn-primary w-full mt-2"
              >
                Request Demo
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Matching App Splash Screen */}
      <section className="gradient-hero min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo with glow */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 w-24 h-24 -m-4 bg-gold-400/20 rounded-full blur-2xl" />
              <Image
                src="/logo.png"
                alt="ChurchDay"
                width={80}
                height={80}
                className="mx-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>

          {/* ChurchDay title in gold */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gold-400 mb-4 animate-slide-up tracking-tight">
            ChurchDay
          </h1>

          {/* Connect • Worship • Grow subtitle */}
          <p className="text-lg sm:text-xl text-white/50 mb-12 tracking-[0.35em] uppercase font-light animate-slide-up">
            Connect &nbsp;•&nbsp; Worship &nbsp;•&nbsp; Grow
          </p>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl mx-auto animate-slide-up leading-relaxed">
            The all-in-one platform that brings your congregation closer together. Manage, engage, and grow your church community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={openSchedule}
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-2xl hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Schedule Your Demo <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gold-500/40 text-gold-400 rounded-lg font-semibold hover:bg-gold-500/10 transition-all duration-300"
            >
              Explore Features
            </button>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 animate-slide-up">
            <button
              onClick={() => setDownloadModal('ios')}
              className="inline-block hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg width="150" height="50" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="50" rx="10" fill="black"/>
                <text x="52" y="17" fill="white" fontSize="8" fontFamily="system-ui" fontWeight="400">Download on the</text>
                <text x="52" y="33" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="600">App Store</text>
                <g transform="translate(14, 8) scale(0.7)">
                  <path d="M24.769 20.3a5.68 5.68 0 0 1 2.706-4.77 5.823 5.823 0 0 0-4.59-2.483c-1.93-.203-3.81 1.157-4.797 1.157-.999 0-2.503-1.137-4.12-1.104a6.076 6.076 0 0 0-5.115 3.118c-2.21 3.832-.563 9.466 1.56 12.564 1.062 1.52 2.3 3.22 3.916 3.16 1.582-.066 2.174-1.012 4.084-1.012 1.9 0 2.458 1.012 4.104.975 1.697-.028 2.77-1.526 3.793-3.06a12.575 12.575 0 0 0 1.736-3.539 5.49 5.49 0 0 1-3.277-5.006z" fill="white"/>
                  <path d="M21.607 11.13a5.593 5.593 0 0 0 1.28-4.01 5.7 5.7 0 0 0-3.687 1.907 5.327 5.327 0 0 0-1.313 3.862 4.71 4.71 0 0 0 3.72-1.76z" fill="white"/>
                </g>
              </svg>
            </button>
            <button
              onClick={() => setDownloadModal('android')}
              className="inline-block hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg width="168" height="50" viewBox="0 0 168 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Church Management is Getting Harder
            </h2>
            <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
              Spreadsheets, multiple apps, and manual processes are stealing your time. We get it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Scattered Data",
                description: "Member info spread across spreadsheets, emails, and different platforms",
                icon: <Database className="w-8 h-8 text-gold-500" />
              },
              {
                title: "Tithes & Offerings",
                description: "Simplify giving with seamless online donations, contribution tracking, and financial reporting",
                icon: <HandCoins className="w-8 h-8 text-gold-500" />
              },
              {
                title: "No Real Insights",
                description: "Can't see who's engaged, attendance trends, or community needs",
                icon: <TrendingUp className="w-8 h-8 text-gold-500" />
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-xl bg-white border border-primary-100 hover:border-gold-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary-900 flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-primary-700/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-gold-300 text-gold-600 rounded-full text-xs font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Powerful Features Built for Church Leaders
            </h2>
            <p className="text-lg text-primary-700/70">
              Everything you need to manage and grow your church in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                icon: <Users className="w-6 h-6 text-gold-600" />,
                title: "Member Management",
                description: "Centralize all member information, roles, contact details, and engagement history in one place"
              },
              {
                icon: <Calendar className="w-6 h-6 text-gold-600" />,
                title: "Event Planning",
                description: "Create, schedule, and manage church events, services, and activities with ease"
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-gold-600" />,
                title: "Attendance Tracking",
                description: "Track attendance automatically with check-in system and gain insights into member engagement"
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-gold-600" />,
                title: "Communications Hub",
                description: "Send announcements, prayer requests, and updates to your entire church community instantly"
              },
              {
                icon: <Zap className="w-6 h-6 text-gold-600" />,
                title: "Donation Management",
                description: "Manage online giving, track contributions, and generate financial reports effortlessly"
              },
              {
                icon: <Layers className="w-6 h-6 text-gold-600" />,
                title: "Ministry Groups",
                description: "Organize and coordinate ministry teams (choir, youth, women's, men's groups, etc.)"
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl hover:bg-primary-50/50 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-900 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{feature.title}</h3>
                  <p className="text-primary-700/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 border border-gold-300 text-gold-600 rounded-full text-xs font-medium mb-4">
              App Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Designed for Your Church
            </h2>
            <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
              An intuitive mobile experience your team will love
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {[
              { src: '/IMG_5686.PNG', label: 'Home' },
              { src: '/daily inspiration.PNG', label: 'Daily Inspiration' },
              { src: '/ministries.PNG', label: 'Ministries' },
              { src: '/create event.PNG', label: 'Create Event' },
              { src: '/find-church.PNG', label: 'Find Church' },
              { src: '/login.PNG', label: 'Login' },
              { src: '/settings.PNG', label: 'Settings' },
            ].map((screenshot, i) => (
              <div key={i} className="flex-shrink-0 snap-center flex flex-col items-center gap-3">
                <div className="w-[200px] rounded-[24px] overflow-hidden shadow-lg border-[6px] border-primary-900 bg-primary-900">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.label}
                    width={200}
                    height={433}
                    className="w-full h-auto"
                  />
                </div>
                <span className="text-sm font-medium text-primary-700/70">{screenshot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Getting Started is Simple
            </h2>
            <p className="text-lg text-white/60">
              In just a few steps, you&apos;ll have your church community organized
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Schedule Demo", description: "Tell us about your church and see ChurchDay in action" },
              { step: "2", title: "Setup Your Church", description: "We'll help you import members and configure your settings" },
              { step: "3", title: "Start Managing", description: "Invite your team and begin transforming your operations" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 text-primary-900 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Why Churches Choose ChurchDay
            </h2>
            <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
              Built by people who understand the unique needs of church communities
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Centralize member data in one secure place",
              "Track attendance and engagement effortlessly",
              "Manage tithes, offerings, and financial reports",
              "Coordinate ministries, events, and volunteers",
              "Send announcements and prayer requests instantly",
              "Easy to use — minimal training required"
            ].map((benefit, i) => (
              <div key={i} className="flex gap-3 items-start bg-white p-5 rounded-xl border border-primary-100">
                <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-primary-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-gold-300 text-gold-600 rounded-full text-xs font-medium mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-primary-700/70 max-w-2xl mx-auto">
              Choose the plan that fits your congregation. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "4,500",
                description: "For small churches getting started",
                members: "Up to 100 members",
                features: [
                  "Member management",
                  "Attendance tracking",
                  "Event calendar",
                  "Announcements",
                  "Prayer requests",
                  "Basic reports",
                ],
                highlighted: false,
              },
              {
                name: "Growth",
                price: "8,500",
                description: "For growing congregations",
                members: "Up to 500 members",
                features: [
                  "Everything in Starter",
                  "Online tithes & offerings",
                  "Ministry group management",
                  "Advanced analytics",
                  "Communication hub",
                  "Donation reports",
                  "Multiple admin roles",
                ],
                highlighted: true,
              },
              {
                name: "Pro",
                price: "12,500",
                description: "For established churches",
                members: "Unlimited members",
                features: [
                  "Everything in Growth",
                  "Priority support",
                  "Custom branding",
                  "Advanced financial reports",
                  "Bulk member import",
                  "API access",
                  "Dedicated account manager",
                ],
                highlighted: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  plan.highlighted
                    ? "border-gold-400 bg-primary-900 shadow-2xl shadow-gold-500/10 relative"
                    : "border-primary-100 bg-white hover:border-gold-300"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 text-sm font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-gold-400" : "text-primary-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-white/60" : "text-primary-700/70"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-primary-900"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-primary-700/70"}`}>
                    {" "}JMD/month
                  </span>
                </div>
                <p className={`text-sm font-medium mb-6 pb-6 border-b ${
                  plan.highlighted ? "text-gold-400 border-white/10" : "text-primary-600 border-primary-100"
                }`}>
                  {plan.members}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex gap-2 items-start">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-gold-400" : "text-gold-500"
                      }`} />
                      <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-primary-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openSchedule}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 hover:shadow-lg hover:shadow-gold-500/25"
                      : "border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white/60 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="ChurchDay" width={32} height={32} className="rounded-lg" />
                <span className="font-bold text-gold-400">ChurchDay</span>
              </div>
              <p className="text-sm text-white/40 mb-4">Connect. Worship. Grow.</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setDownloadModal('ios')}
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
                </button>
                <button
                  onClick={() => setDownloadModal('android')}
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
                <li><a href="#" className="hover:text-gold-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition">About</a></li>
                <li><a href="#" className="hover:text-gold-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-gold-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gold-400 transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>&copy; 2026 ChurchDay. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {downloadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-slide-up">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-100 rounded-full -mr-20 -mt-20 opacity-30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-100 rounded-full -ml-16 -mb-16 opacity-20" />

            {/* Close button */}
            <button
              onClick={() => setDownloadModal(null)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-primary-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-primary-900" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-8 text-center">
              {downloadModal === 'ios' ? (
                <>
                  {/* iOS Modal */}
                  <div className="mb-6 inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                      <Apple className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-primary-900 mb-3">
                    Get ChurchDay on iOS
                  </h2>
                  <p className="text-gold-600 font-semibold mb-2">Coming Soon to the App Store</p>
                  <p className="text-sm text-primary-500 mb-8">
                    Be notified when ChurchDay launches. Join thousands of church leaders ready to Connect, Worship, and Grow.
                  </p>

                  {/* Features list */}
                  <div className="bg-primary-50 rounded-lg p-6 mb-6 text-left">
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Instant member access</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Real-time notifications</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Seamless sync with web</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setDownloadModal(null)
                      setTimeout(openSchedule, 300)
                    }}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1 mb-3"
                  >
                    Notify Me
                  </button>
                  <p className="text-xs text-primary-500">
                    Launch: Q1 2026
                  </p>
                </>
              ) : (
                <>
                  {/* Android Modal */}
                  <div className="mb-6 inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-primary-900 mb-3">
                    Get ChurchDay on Android
                  </h2>
                  <p className="text-gold-600 font-semibold mb-2">Coming Soon to Google Play</p>
                  <p className="text-sm text-primary-500 mb-8">
                    Be notified when ChurchDay launches. Join thousands of church leaders ready to Connect, Worship, and Grow.
                  </p>

                  {/* Features list */}
                  <div className="bg-primary-50 rounded-lg p-6 mb-6 text-left">
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Offline support</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Fast performance</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-700">Device optimization</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setDownloadModal(null)
                      setTimeout(openSchedule, 300)
                    }}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1 mb-3"
                  >
                    Notify Me
                  </button>
                  <p className="text-xs text-primary-500">
                    Launch: Q1 2026
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule a Demo Wizard */}
      {scheduleOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-slide-up">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-100 rounded-full -mr-20 -mt-20 opacity-30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-100 rounded-full -ml-16 -mb-16 opacity-20" />

            {/* Close button */}
            <button
              onClick={() => setScheduleOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-primary-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-primary-900" />
            </button>

            <div className="relative z-10 p-8">
              {/* Progress indicator */}
              {step < 3 && (
                <div className="flex gap-2 mb-8 max-w-[180px]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i <= step ? 'bg-gradient-to-r from-gold-500 to-gold-400' : 'bg-primary-100'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Step 0 — Pick a day */}
              {step === 0 && (
                <div className="text-center">
                  <div className="mb-5 inline-block">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">When works for you?</h2>
                  <p className="text-sm text-primary-500 mb-6">Pick a day that suits your church best.</p>

                  <div className="grid grid-cols-3 gap-3 mb-2">
                    {upcomingDays.map((day) => (
                      <button
                        key={day.value}
                        onClick={() => {
                          setSelectedDate(day.value)
                          setStep(1)
                        }}
                        className={`py-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedDate === day.value
                            ? 'border-gold-400 bg-gold-50'
                            : 'border-primary-100 hover:border-gold-300 hover:bg-gold-50/40'
                        }`}
                      >
                        <span className="block text-xs font-medium text-primary-500 uppercase tracking-wide">{day.label}</span>
                        <span className="block text-sm font-bold text-primary-900 mt-1">{day.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1 — Pick a time */}
              {step === 1 && (
                <div className="text-center">
                  <div className="mb-5 inline-block">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">Pick a time</h2>
                  <p className="text-sm text-primary-500 mb-6">{selectedDate}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedTime(slot)
                          setStep(2)
                        }}
                        className={`py-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
                          selectedTime === slot
                            ? 'border-transparent bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900'
                            : 'border-primary-100 text-primary-900 hover:border-gold-300 hover:bg-gold-50/40'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(0)}
                    className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-gold-600 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </div>
              )}

              {/* Step 2 — Your details */}
              {step === 2 && (
                <form onSubmit={handleDemoSubmit}>
                  <h2 className="text-2xl font-bold text-primary-900 mb-1 text-center">Almost there!</h2>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-gold-600 mb-6">
                    <Calendar className="w-4 h-4" /> {selectedDate} at {selectedTime}
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-100 rounded-lg text-primary-900 placeholder-primary-400 focus:outline-none focus:border-gold-400 focus:bg-white transition"
                      placeholder="Full name"
                    />
                    <input
                      type="text"
                      required
                      value={demoForm.church}
                      onChange={(e) => setDemoForm({ ...demoForm, church: e.target.value })}
                      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-100 rounded-lg text-primary-900 placeholder-primary-400 focus:outline-none focus:border-gold-400 focus:bg-white transition"
                      placeholder="Church name"
                    />
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-100 rounded-lg text-primary-900 placeholder-primary-400 focus:outline-none focus:border-gold-400 focus:bg-white transition"
                      placeholder="Email address"
                    />
                    <input
                      type="tel"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-100 rounded-lg text-primary-900 placeholder-primary-400 focus:outline-none focus:border-gold-400 focus:bg-white transition"
                      placeholder="Phone (optional)"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitting ? 'Sending...' : <>Lock it in <ArrowRight className="inline-block ml-1 w-5 h-5" /></>}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-4 inline-flex items-center gap-1 text-sm text-primary-500 hover:text-gold-600 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </form>
              )}

              {/* Step 3 — Success */}
              {step === 3 && (
                <div className="text-center py-2">
                  <div className="mb-5 inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                      <PartyPopper className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">You&apos;re all set!</h2>
                  <p className="text-sm text-primary-500 mb-2">
                    We&apos;ll reach out to confirm your demo for
                  </p>
                  <div className="inline-flex items-center gap-2 text-base font-semibold text-gold-600 mb-8">
                    <Calendar className="w-5 h-5" /> {selectedDate} at {selectedTime}
                  </div>
                  <button
                    onClick={() => setScheduleOpen(false)}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
