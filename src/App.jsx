import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Landing from './screens/Landing'
import Home from './screens/Home'
import MoodLog from './screens/MoodLog'
import Journal from './screens/Journal'
import Settings from './screens/Settings'
import LockScreen from './screens/LockScreen'
import OnboardingModal from './components/OnboardingModal'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'
import { startReminder, stopReminder } from './utils/notifications'

export default function App() {
  const [view, setView] = useState('landing')
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('oktav-onboarded')
  })
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
  const { toast, showToast, dismissToast } = useToast()

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
    startReminder({
      enabled: s.reminderEnabled,
      hour: s.reminderHour ?? 20,
      minute: s.reminderMinute ?? 0,
    })
    return () => stopReminder()
  }, [])

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
      case 'Home': return <Home showToast={showToast} />
      case 'MoodLog': return <MoodLog showToast={showToast} />
      case 'Journal': return <Journal showToast={showToast} />
      case 'Settings': return <Settings showToast={showToast} />
      default: return <Landing onEnter={() => setView('Home')} />
    }
  }

  return (
    <>
      <Layout view={view} onNavigate={setView}>
        {renderView()}
      </Layout>
      {showOnboarding && view !== 'landing' && (
        <OnboardingModal onDismiss={() => {
          localStorage.setItem('oktav-onboarded', 'true')
          setShowOnboarding(false)
        }} />
      )}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}
