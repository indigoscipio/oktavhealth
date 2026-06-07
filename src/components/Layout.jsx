import { Home, Smile, BookOpen, Settings, User } from 'lucide-react'

const navItems = [
  { key: 'Home', label: 'Home', icon: Home },
  { key: 'MoodLog', label: 'Mood', icon: Smile },
  { key: 'Journal', label: 'Journal', icon: BookOpen },
  { key: 'Settings', label: 'Settings', icon: Settings },
]

export default function Layout({ view, onNavigate, children }) {
  const isLanding = view === 'landing'

  if (isLanding) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="mx-auto max-w-[480px] min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <img src="/logo.svg" alt="oktavhealth" height="28" />
        <button onClick={() => onNavigate('Settings')} className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-white cursor-pointer">
          <User size={18} />
        </button>
      </header>

      <main className="flex-1 px-4 pb-20">{children}</main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around py-2 z-10">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = view === key
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-colors cursor-pointer ${
                active ? 'text-brand-800 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <div className={`p-1.5 rounded-full ${active ? 'bg-brand-50 dark:bg-brand-900/30' : ''}`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
