import { useState, useEffect, useRef } from 'react'
import { useSettings } from '../hooks/useSettings'
import { exportData } from '../utils/export'
import db from '../db/db'

function getStorageItem(key) {
  try { return JSON.parse(sessionStorage.getItem(key) || '[]') }
  catch { return [] }
}

export default function Settings() {
  const { settings, loading, updateSettings } = useSettings()
  const [name, setName] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (settings) setName(settings.userName || '')
  }, [settings])

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings({ userName: name })
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result)
        if (!data.moods && !data.journal) {
          window.alert('Invalid file format. Please use an OktavHealth export file.')
          return
        }
        if (!window.confirm(`Import ${data.moods?.length || 0} moods and ${data.journal?.length || 0} journal entries? This will merge with your existing data.`)) return

        if (data.moods?.length) {
          const existing = getStorageItem('oktav-moods')
          const existingIds = new Set(existing.map((m) => m.id))
          const newMoods = data.moods.filter((m) => !existingIds.has(m.id))
          const merged = [...newMoods, ...existing]
          sessionStorage.setItem('oktav-moods', JSON.stringify(merged))
          await Promise.all(newMoods.map((m) => db.moods.put(m)))
        }

        if (data.journal?.length) {
          const existing = getStorageItem('oktav-journal')
          const existingIds = new Set(existing.map((e) => e.id))
          const newEntries = data.journal.filter((e) => !existingIds.has(e.id))
          const merged = [...newEntries, ...existing]
          sessionStorage.setItem('oktav-journal', JSON.stringify(merged))
          await Promise.all(newEntries.map((e) => db.journalEntries.put(e)))
        }

        window.location.reload()
      } catch {
        window.alert('Could not parse file. Please use a valid OktavHealth export file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleClearData = async () => {
    if (!window.confirm('This will delete all your moods, journal entries, and settings. This cannot be undone. Continue?')) return
    sessionStorage.removeItem('oktav-moods')
    sessionStorage.removeItem('oktav-journal')
    sessionStorage.removeItem('oktav-settings')
    sessionStorage.removeItem('oktav-lastExport')
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
        <h3 style={{ marginBottom: 8 }}>Backup & Restore</h3>
        <p style={{ fontSize: 14, color: '#6b7a8f', marginBottom: 12 }}>
          Export your data regularly to avoid losing it. You can import it back anytime.
        </p>
        <button className="btn" onClick={exportData}>Export as JSON</button>{' '}
        <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
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
