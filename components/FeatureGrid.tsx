import { Users, Calendar, BarChart3, MessageSquare, Zap, Layers } from 'lucide-react'

const FEATURES = [
  {
    icon: Users,
    title: 'Member Management',
    description: 'Centralize all member information, roles, contact details, and engagement history in one place',
  },
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Create, schedule, and manage church events, services, and activities with ease',
  },
  {
    icon: BarChart3,
    title: 'Attendance Tracking',
    description: 'Track attendance automatically with check-in system and gain insights into member engagement',
  },
  {
    icon: MessageSquare,
    title: 'Communications Hub',
    description: 'Send announcements, prayer requests, and updates to your entire church community instantly',
  },
  {
    icon: Zap,
    title: 'Donation Management',
    description: 'Manage online giving, track contributions, and generate financial reports effortlessly',
  },
  {
    icon: Layers,
    title: 'Ministry Groups',
    description: "Organize and coordinate ministry teams (choir, youth, women's, men's groups, etc.)",
  },
]

export function FeatureGrid() {
  return (
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
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="flex gap-4 p-6 rounded-xl hover:bg-primary-50/50 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-900 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{feature.title}</h3>
                  <p className="text-primary-700/70">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
