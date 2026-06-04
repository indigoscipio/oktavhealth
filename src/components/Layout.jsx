export default function Layout({ view, onNavigate, children }) {
  const navItems = ['Home', 'MoodLog', 'Journal', 'Settings']

  return (
    <div>
      <header>
        <h1>OktavHealth</h1>
      </header>
      <main>{children}</main>
      <nav>
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            style={{ fontWeight: view === item ? 'bold' : 'normal' }}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  )
}
