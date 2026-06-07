import { ArrowRight, Activity, BookOpen, Shield } from 'lucide-react'
import Button from '../components/Button'

const features = [
  {
    icon: Activity,
    title: 'Mood Tracking',
    description: 'Log how you feel with a single tap. Track patterns over time with charts and insights.',
  },
  {
    icon: BookOpen,
    title: 'Journal',
    description: 'Write freely about your day. Your thoughts stay on your device, always.',
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'No accounts, no servers, no data collection. Everything lives in your browser.',
  },
]

export default function Landing({ onEnter }) {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="oktavhealth" height="24" />
          <span className="text-lg font-bold text-brand-800 tracking-tight">oktavhealth</span>
        </div>
        <Button onClick={onEnter} rightIcon={ArrowRight}>
          Open App
        </Button>
      </nav>

      <section className="text-center py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Your mental health,<br />tracked privately.
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
          No account. No cloud. No judgment.
        </p>
        <p className="text-base text-gray-400 max-w-md mx-auto mb-8">
          Simple mood tracking and journaling that stays on your device. No accounts, no cloud, no judgment.
        </p>
        <Button onClick={onEnter} rightIcon={ArrowRight} className="text-base px-8 py-3.5">
          Get Started
        </Button>
      </section>

      <section className="py-6 px-4 bg-accent-500">
        <p className="text-center text-white font-bold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Mental Health. Fully Private. No Signups. No Servers. No Analytics. No Tracking. No AI. No Ads. 0 Data Collection.
        </p>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-brand-800 mb-10">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 text-left shadow-sm border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <Icon size={18} className="text-accent-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-brand-800 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Mind, Your Data.</h2>
        <p className="text-brand-200 mb-6">Free, private, and open source.</p>
        <Button variant="secondary" onClick={onEnter} rightIcon={ArrowRight}>
          No sign-up. Just start.
        </Button>
      </section>

      <footer className="py-4 px-6 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>&copy; 2026 oktavhealth. Built with care.</p>
      </footer>
    </div>
  )
}
