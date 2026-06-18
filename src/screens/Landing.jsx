import { useState } from 'react'
import { ArrowRight, Activity, BookOpen, Shield, TrendingUp, Download, Lock, ChevronDown } from 'lucide-react'
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
    icon: TrendingUp,
    title: 'Pattern Insights',
    description: 'Discover which habits affect your mood. See correlations between tags and how you feel.',
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'No accounts, no servers, no data collection. Everything lives in your browser.',
  },
  {
    icon: Download,
    title: 'Backup & Restore',
    description: 'Export your data as JSON anytime. Import it back on any device. You own your data.',
  },
  {
    icon: Lock,
    title: 'PIN Lock',
    description: 'Protect your app with a 4-digit PIN. Your journal stays private, even on shared devices.',
  },
]

const stats = [
  {
    number: '11',
    text: 'out of 26 data brokers are actively selling mental health data to anyone who asks.',
    source: '*2023 Journal Of Science, Duke University.',
  },
  {
    number: '44%',
    text: 'of mental health apps share your data with third parties.',
    source: '**2022 JAMA Network Open.',
  },
  {
    number: '92%',
    text: 'of mental health apps send your data to third parties — most don\'t tell you.',
    source: '***2019 JAMA Network Open.',
  },
]

const faqs = [
  {
    q: 'How does walden work?',
    a: 'walden runs entirely in your browser. When you log a mood or write a journal entry, it\'s saved to your browser\'s local storage. Nothing is ever sent to a server. You can export your data as a JSON file anytime.',
  },
  {
    q: 'Why should I trust walden with my data?',
    a: 'Because your data never leaves your device. There are no servers, no cloud storage, no analytics, and no tracking. We can\'t see your data even if we wanted to. It\'s stored locally in your browser only.',
  },
  {
    q: 'What features do you have?',
    a: 'Mood tracking with emoji ratings and tags, journal writing, pattern insights that show how your habits affect your mood, weekly summaries with streaks and averages, backup/restore via JSON export, and optional PIN lock.',
  },
  {
    q: 'Is walden free?',
    a: 'Yes, completely free. No premium tiers, no subscriptions, no hidden costs. The app is open source.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes. Go to Settings > Backup & Restore and tap "Export as JSON". You\'ll get a file with all your moods, journal entries, and settings. You can import it back anytime.',
  },
]

function PhoneMockup() {
  return (
    <img src="/hero-img.png" alt="walden app screenshot" className="w-full h-auto rounded-2xl" />
  )
}

export default function Landing({ onEnter }) {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img src="/logo.svg" alt="walden" height="24" />
        <Button onClick={onEnter} rightIcon={ArrowRight}>
          Open App
        </Button>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your mental health,<br />tracked privately.
            </h1>
            <p className="text-lg text-gray-500 mb-4">
              No account. No cloud. No judgment.
            </p>
            <p className="text-base text-gray-400 mb-8">
              Simple mood tracking and journaling that stays on your device. Get started instantly — no signup required.
            </p>
            <Button onClick={onEnter} rightIcon={ArrowRight} className="text-base px-8 py-3.5">
              Get Started
            </Button>
          </div>
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Purple Banner */}
      <section className="py-8 px-4 bg-accent-500">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 max-w-3xl mx-auto">
          {['Mental Health.', 'Fully Private.', 'No Signups.', 'No Servers.', 'No Analytics.', 'No Tracking.', 'No AI.', 'No Ads.', '0 Data Collection.'].map((word) => (
            <span key={word} className="text-white font-bold text-lg md:text-xl">{word}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-brand-800 text-center mb-10">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 text-left shadow-sm border border-gray-200"
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

      {/* Data Broker Stats */}
      <section className="py-16 px-6 bg-brand-800 text-white">
        <div className="max-w-2xl mx-auto space-y-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-3">{stat.number}</p>
              <p className="text-base md:text-lg text-brand-100 mb-2">{stat.text}</p>
              <p className="text-xs text-brand-300 italic">{stat.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-brand-800 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center bg-accent-500 text-white">
        <img src="/favicon.svg" alt="" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Mind, Your Data.</h2>
        <p className="text-accent-100 mb-6">Free, private, and open source.</p>
        <Button variant="secondary" onClick={onEnter} rightIcon={ArrowRight}>
          No sign-up. Just start.
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-4 px-6 bg-brand-800 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-brand-200">
            &copy; 2026 walden by{' '}
            <a href="https://www.oktavsoftware.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              oktavsoftware
            </a>
          </p>
          <div className="flex items-center gap-4 text-brand-200">
            <span className="text-brand-300">v2.5</span>
            <a href="https://github.com/indigoscipio/oktavhealth" target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
