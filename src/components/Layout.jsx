export default function Layout({ view, onNavigate, children }) {
  const navItems = ['Home', 'MoodLog', 'Journal', 'Settings']

  return (
    <div className="app">
      <header>OktavHealth</header>
      <main>{children}</main>
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
    </div>
  )
}
