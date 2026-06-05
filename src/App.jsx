import { useState } from 'react'
import Layout from './components/Layout'
import Landing from './screens/Landing'
import Home from './screens/Home'
import MoodLog from './screens/MoodLog'
import Journal from './screens/Journal'
import Settings from './screens/Settings'

export default function App() {
  const [view, setView] = useState('landing')

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
