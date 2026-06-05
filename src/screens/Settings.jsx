import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import db from '../db/db'

function getStorageItem(key) {
  try { return JSON.parse(sessionStorage.getItem(key) || '[]') }
  catch { return [] }
}

export default function Settings() {
  const { settings, loading, updateSettings } = useSettings()
  const [name, setName] = useState('')

  useEffect(() => {
    if (settings) setName(settings.userName || '')
  }, [settings])

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings({ userName: name })
  }

  const handleExport = () => {
    const moods = getStorageItem('oktav-moods')
    const journal = getStorageItem('oktav-journal')
    const data = { exportedAt: new Date().toISOString(), moods, journal, settings }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `oktavhealth-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearData = async () => {
    if (!window.confirm('This will delete all your moods, journal entries, and settings. This cannot be undone. Continue?')) return
    sessionStorage.removeItem('oktav-moods')
    sessionStorage.removeItem('oktav-journal')
    sessionStorage.removeItem('oktav-settings')
    await Promise.all([
      db.moods.clear(),
      db.journalEntries.clear(),
      db.settings.clear(),
    ])
    window.location.reload()
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Settings</h2>
      <div className="card">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name" />
          </div>
          <button className="btn" type="submit">Save</button>
        </form>
      </div>
      <hr />
      <div className="card">
        <h3 style={{ marginBottom: 8 }}>Export Data</h3>
        <p style={{ fontSize: 14, color: '#6b7a8f', marginBottom: 12 }}>
          Download all your moods and journal entries as a JSON file.
        </p>
        <button className="btn" onClick={handleExport}>Export as JSON</button>
      </div>
      <hr />
      <div className="card" style={{ borderColor: '#e74c3c' }}>
        <h3 style={{ marginBottom: 8, color: '#e74c3c' }}>Danger Zone</h3>
        <p style={{ fontSize: 14, color: '#6b7a8f', marginBottom: 12 }}>
          Permanently delete all your moods, journal entries, and settings. This cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={handleClearData}>Clear All Data</button>
      </div>
      <hr />
      <p className="mood-meta">Data is stored locally in your browser. No account needed.</p>
    </div>
  )
}
