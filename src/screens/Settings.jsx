import { useState, useRef } from 'react'
import { useSettings } from '../hooks/useSettings'
import { exportData, getStorageItem } from '../utils/export'
import { validateMood, validateEntry } from '../utils/validate'

export default function Settings() {
  const { settings, updateSettings } = useSettings()
  const [name, setName] = useState(settings.userName || '')
  const fileInputRef = useRef(null)

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings({ userName: name })
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        if (!data.moods && !data.journal && !data.settings) {
          window.alert('Invalid file format. Please use an OktavHealth export file.')
          return
        }
        const moodCount = data.moods?.length || 0
        const journalCount = data.journal?.length || 0
        const hasSettings = data.settings && typeof data.settings === 'object' && data.settings.userName
        if (!window.confirm(`Import ${moodCount} moods, ${journalCount} journal entries${hasSettings ? ' and settings' : ''}? This will merge with your existing data.`)) return

        if (data.moods?.length) {
          const existing = getStorageItem('oktav-moods')
          const existingIds = new Set(existing.map((m) => m.id))
          const newMoods = data.moods.filter((m) => !existingIds.has(m.id) && validateMood(m))
          const merged = [...newMoods, ...existing]
          localStorage.setItem('oktav-moods', JSON.stringify(merged))
        }

        if (data.journal?.length) {
          const existing = getStorageItem('oktav-journal')
          const existingIds = new Set(existing.map((e) => e.id))
          const newEntries = data.journal.filter((e) => !existingIds.has(e.id) && validateEntry(e))
          const merged = [...newEntries, ...existing]
          localStorage.setItem('oktav-journal', JSON.stringify(merged))
        }

        if (hasSettings) {
          const existing = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
          const merged = { ...existing, ...data.settings }
          localStorage.setItem('oktav-settings', JSON.stringify(merged))
        }

        window.location.reload()
      } catch {
        window.alert('Could not parse file. Please use a valid OktavHealth export file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleClearData = () => {
    if (!window.confirm('This will delete all your moods, journal entries, and settings. This cannot be undone. Continue?')) return
    localStorage.removeItem('oktav-moods')
    localStorage.removeItem('oktav-journal')
    localStorage.removeItem('oktav-settings')
    localStorage.removeItem('oktav-lastExport')
    localStorage.removeItem('oktav-dismissExport')
    window.location.reload()
  }

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
        <h3>Backup & Restore</h3>
        <p className="card-description">
          Export your data regularly to avoid losing it. You can import it back anytime.
        </p>
        <button className="btn" onClick={exportData}>Export as JSON</button>{' '}
        <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
      </div>
      <hr />
      <div className="card card-danger">
        <h3 className="danger-title">Danger Zone</h3>
        <p className="card-description">
          Permanently delete all your moods, journal entries, and settings. This cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={handleClearData}>Clear All Data</button>
      </div>
      <hr />
      <p className="mood-meta">Data is stored locally in your browser. No account needed.</p>
    </div>
  )
}
