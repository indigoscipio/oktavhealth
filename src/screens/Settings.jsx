import { useState, useRef, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import { exportData, getStorageItem } from '../utils/export'
import { validateMood, validateEntry } from '../utils/validate'
import { requestNotificationPermission, startReminder } from '../utils/notifications'
import { hashPin, verifyPin } from '../utils/security'

export default function Settings() {
  const { settings, updateSettings } = useSettings()
  const [name, setName] = useState(settings.userName || '')
  const [reminderEnabled, setReminderEnabled] = useState(settings.reminderEnabled || false)
  const [reminderTime, setReminderTime] = useState(settings.reminderTime || '20:00')
  const [pinEnabled, setPinEnabled] = useState(settings.pinEnabled || false)
  const [settingPin, setSettingPin] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinConfirm, setPinConfirm] = useState('')
  const [pinError, setPinError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    startReminder({
      enabled: reminderEnabled,
      hour: parseInt(reminderTime.split(':')[0]),
      minute: parseInt(reminderTime.split(':')[1]),
    })
  }, [reminderEnabled, reminderTime])

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings({ userName: name })
  }

  const handleReminderToggle = async () => {
    if (!reminderEnabled) {
      const granted = await requestNotificationPermission()
      if (!granted) {
        window.alert('Notification permission is needed for reminders. Please allow notifications in your browser settings.')
        return
      }
    }
    const next = !reminderEnabled
    setReminderEnabled(next)
    updateSettings({ reminderEnabled: next })
  }

  const handleReminderTime = (e) => {
    const time = e.target.value
    setReminderTime(time)
    const [hour, minute] = time.split(':').map(Number)
    updateSettings({ reminderTime: time, reminderHour: hour, reminderMinute: minute })
  }

  const handleSetPin = async () => {
    setPinError('')
    if (pinInput.length !== 4 || !/^\d{4}$/.test(pinInput)) {
      setPinError('PIN must be 4 digits')
      return
    }
    if (pinInput !== pinConfirm) {
      setPinError('PINs do not match')
      return
    }
    const pinHash = await hashPin(pinInput)
    updateSettings({ pinHash, pinEnabled: true })
    setPinEnabled(true)
    setSettingPin(false)
    setPinInput('')
    setPinConfirm('')
  }

  const handleRemovePin = async () => {
    if (!window.confirm('Remove PIN lock? The app will no longer require a PIN to open.')) return
    updateSettings({ pinHash: undefined, pinEnabled: false })
    setPinEnabled(false)
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
          localStorage.setItem('oktav-moods', JSON.stringify([...newMoods, ...existing]))
        }

        if (data.journal?.length) {
          const existing = getStorageItem('oktav-journal')
          const existingIds = new Set(existing.map((e) => e.id))
          const newEntries = data.journal.filter((e) => !existingIds.has(e.id) && validateEntry(e))
          localStorage.setItem('oktav-journal', JSON.stringify([...newEntries, ...existing]))
        }

        if (hasSettings) {
          const existing = JSON.parse(localStorage.getItem('oktav-settings') || '{}')
          localStorage.setItem('oktav-settings', JSON.stringify({ ...existing, ...data.settings }))
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
        <h3>Reminders</h3>
        <p className="card-description">Get a daily reminder to check in with yourself.</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>Daily reminder</span>
          <button className={`toggle-btn ${reminderEnabled ? 'active' : ''}`} onClick={handleReminderToggle} type="button">
            <span className="toggle-knob" />
          </button>
        </div>
        {reminderEnabled && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted)' }}>Remind at</label>
            <input type="time" value={reminderTime} onChange={handleReminderTime}
              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'inherit' }} />
          </div>
        )}
      </div>
      <hr />

      <div className="card">
        <h3>Security</h3>
        <p className="card-description">Require a PIN to open the app. If you forget your PIN, your data cannot be recovered.</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>App lock</span>
          <button className={`toggle-btn ${pinEnabled ? 'active' : ''}`}
            onClick={() => {
              if (pinEnabled) { handleRemovePin() }
              else { setSettingPin(true) }
            }} type="button">
            <span className="toggle-knob" />
          </button>
        </div>
        {settingPin && (
          <div style={{ marginTop: 8 }}>
            <input className="mood-note" type="password" placeholder="Enter 4-digit PIN" maxLength={4}
              value={pinInput} onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError('') }} />
            <input className="mood-note" type="password" placeholder="Confirm PIN" maxLength={4}
              value={pinConfirm} onChange={(e) => { setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError('') }} />
            {pinError && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginBottom: 8 }}>{pinError}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={handleSetPin} type="button">Set PIN</button>
              <button className="btn btn-secondary" onClick={() => { setSettingPin(false); setPinInput(''); setPinConfirm(''); setPinError('') }} type="button">Cancel</button>
            </div>
          </div>
        )}
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
