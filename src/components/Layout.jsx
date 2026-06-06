export default function Layout({ view, onNavigate, children }) {
  const isLanding = view === 'landing'
  const navItems = ['Home', 'MoodLog', 'Journal', 'Settings']

  return (
    <div className={isLanding ? 'lp' : 'app'}>
      {!isLanding && <header><img src="/logo.svg" alt="" height="24" className="logo-icon" />oktavhealth</header>}
      <main>{children}</main>
      {!isLanding && (
        <nav>
          {navItems.map((item) => (
            <button key={item} className={view === item ? 'active' : ''}
              onClick={() => onNavigate(item)}>
              {item === 'Home' && '🏠 '}
              {item === 'MoodLog' && '📊 '}
              {item === 'Journal' && '📝 '}
              {item === 'Settings' && '⚙️ '}
              {item}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
