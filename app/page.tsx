'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight, CheckCircle2, Users, Calendar, BarChart3, MessageSquare, Zap, Layers, Database, HandCoins, TrendingUp } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoForm, setDemoForm] = useState({ name: '', email: '', church: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Demo request submitted:', demoForm)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setDemoForm({ name: '', email: '', church: '', phone: '' })
    }, 3000)
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
                onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
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
                  document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
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
              onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
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
            <a href="#" className="inline-block hover:opacity-80 transition-opacity">
              <svg width="150" height="50" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="50" rx="10" fill="black"/>
                <text x="52" y="17" fill="white" fontSize="8" fontFamily="system-ui" fontWeight="400">Download on the</text>
                <text x="52" y="33" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="600">App Store</text>
                <g transform="translate(14, 8) scale(0.7)">
                  <path d="M24.769 20.3a5.68 5.68 0 0 1 2.706-4.77 5.823 5.823 0 0 0-4.59-2.483c-1.93-.203-3.81 1.157-4.797 1.157-.999 0-2.503-1.137-4.12-1.104a6.076 6.076 0 0 0-5.115 3.118c-2.21 3.832-.563 9.466 1.56 12.564 1.062 1.52 2.3 3.22 3.916 3.16 1.582-.066 2.174-1.012 4.084-1.012 1.9 0 2.458 1.012 4.104.975 1.697-.028 2.77-1.526 3.793-3.06a12.575 12.575 0 0 0 1.736-3.539 5.49 5.49 0 0 1-3.277-5.006z" fill="white"/>
                  <path d="M21.607 11.13a5.593 5.593 0 0 0 1.28-4.01 5.7 5.7 0 0 0-3.687 1.907 5.327 5.327 0 0 0-1.313 3.862 4.71 4.71 0 0 0 3.72-1.76z" fill="white"/>
                </g>
              </svg>
            </a>
            <a href="#" className="inline-block hover:opacity-80 transition-opacity">
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
            </a>
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
              { src: '/IMG_5686.PNG', label: 'Dashboard' },
              { src: '/IMG_5690.PNG', label: 'Members' },
              { src: '/IMG_5692.PNG', label: 'Attendance' },
              { src: '/IMG_5693.PNG', label: 'Events' },
              { src: '/IMG_5694.PNG', label: 'Donations' },
              { src: '/IMG_5695.PNG', label: 'Messages' },
              { src: '/IMG_5696.PNG', label: 'Reports' },
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
                  onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* Demo Form Section */}
      <section id="demo-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              See ChurchDay in Action
            </h2>
            <p className="text-lg text-primary-700/70">
              Schedule a personalized demo and discover how ChurchDay can transform your church management
            </p>
          </div>

          <form onSubmit={handleDemoSubmit} className="bg-primary-900 p-8 rounded-2xl shadow-2xl">
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300">
                ✓ Thank you! We&apos;ll be in touch soon to schedule your demo.
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                  placeholder="Pastor John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Church Name</label>
                <input
                  type="text"
                  required
                  value={demoForm.church}
                  onChange={(e) => setDemoForm({ ...demoForm, church: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                  placeholder="Your Church Name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    placeholder="you@church.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-lg py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 rounded-lg font-semibold hover:shadow-2xl hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Request Your Demo <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>

              <p className="text-sm text-white/50 text-center">
                We&apos;ll respond within 24 hours. No credit card required.
              </p>
            </div>
          </form>
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
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
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
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
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
                </a>
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
    </div>
  )
}
