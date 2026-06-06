import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Landing from './screens/Landing'
import Home from './screens/Home'
import MoodLog from './screens/MoodLog'
import Journal from './screens/Journal'
import Settings from './screens/Settings'
import LockScreen from './screens/LockScreen'

export default function App() {
  const [view, setView] = useState('landing')
  const [locked, setLocked] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
      return s.pinEnabled && !!s.pinHash
    } catch { return false }
  })
  const [pinHash, setPinHash] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
      return s.pinHash || null
    } catch { return null }
  })

  useEffect(() => {
    const handleStorage = () => {
      try {
        const s = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
        setPinHash(s.pinHash || null)
        setLocked(s.pinEnabled && !!s.pinHash)
      } catch {}
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  if (locked && pinHash) {
    return <LockScreen pinHash={pinHash} onUnlock={() => setLocked(false)} />
  }

  const renderView = () => {
    switch (view) {
      case 'landing': return <Landing onEnter={() => setView('Home')} />
      case 'Home': return <Home />
      case 'MoodLog': return <MoodLog />
      case 'Journal': return <Journal />
      case 'Settings': return <Settings />
      default: return <Landing onEnter={() => setView('Home')} />
    }
  }

  return (
    <Layout view={view} onNavigate={setView}>
      {renderView()}
    </Layout>
  )
}
