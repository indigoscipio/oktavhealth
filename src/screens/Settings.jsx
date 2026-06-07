import { useState, useRef } from 'react'
import { useSettings } from '../hooks/useSettings'
import { exportData, getStorageItem } from '../utils/export'
import { validateMood, validateEntry } from '../utils/validate'
import { requestNotificationPermission, startReminder } from '../utils/notifications'
import { hashPin } from '../utils/security'
import Button from '../components/Button'
import Input from '../components/Input'
import { User, Lock, Download, Upload, AlertTriangle, Shield } from 'lucide-react'

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
    startReminder({
      enabled: next,
      hour: parseInt(reminderTime.split(':')[0]),
      minute: parseInt(reminderTime.split(':')[1]),
    })
  }

  const handleReminderTime = (e) => {
    const time = e.target.value
    setReminderTime(time)
    const [hour, minute] = time.split(':').map(Number)
    updateSettings({ reminderTime: time, reminderHour: hour, reminderMinute: minute })
    startReminder({
      enabled: reminderEnabled,
      hour,
      minute,
    })
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
    localStorage.removeItem('oktav-onboarded')
    window.location.reload()
  }

  return (
    <div className="space-y-4 pt-2">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Name */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">Name</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <Input
            leftIcon={User}
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Save</Button>
        </form>
      </div>

      {/* Reminders */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Reminders</h2>
        <p className="text-sm text-gray-500 mb-3">
          Get a daily reminder to check in with yourself. Allow browser notifications when prompted, and make sure OS notifications are on (Windows: Action Center · Mac: System Settings → Notifications).
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Daily reminder</span>
          <button
            onClick={handleReminderToggle}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${reminderEnabled ? 'bg-brand-800' : 'bg-gray-200'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${reminderEnabled ? 'translate-x-5' : ''}`}
            />
          </button>
        </div>
        {reminderEnabled && (
          <div className="flex items-center gap-2 mt-2">
            <label className="text-sm text-gray-500">Remind at</label>
            <input
              type="time"
              value={reminderTime}
              onChange={handleReminderTime}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800"
            />
          </div>
        )}
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Security</h2>
        <p className="text-sm text-gray-500 mb-3">
          Require a PIN to open the app. If you forget your PIN, your data cannot be recovered.
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">App lock</span>
          <button
            onClick={() => {
              if (pinEnabled) handleRemovePin()
              else setSettingPin(true)
            }}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${pinEnabled ? 'bg-brand-800' : 'bg-gray-200'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${pinEnabled ? 'translate-x-5' : ''}`}
            />
          </button>
        </div>
        {settingPin && (
          <div className="mt-3 space-y-2">
            <div className="bg-danger-50 text-danger-600 text-sm font-medium px-3 py-2 rounded-xl">
              ⚠️ If you forget your PIN, there is no way to recover your data.
            </div>
            <Input
              type="password"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError('') }}
            />
            <Input
              type="password"
              placeholder="Confirm PIN"
              maxLength={4}
              value={pinConfirm}
              onChange={(e) => { setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError('') }}
            />
            {pinError && <p className="text-danger-500 text-sm">{pinError}</p>}
            <div className="flex gap-2">
              <Button onClick={handleSetPin}>Set PIN</Button>
              <Button variant="secondary" onClick={() => { setSettingPin(false); setPinInput(''); setPinConfirm(''); setPinError('') }}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Backup & Restore */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Backup & Restore</h2>
        <p className="text-sm text-gray-500 mb-3">
          Export your data regularly to avoid losing it. You can import it back anytime.
        </p>
        <div className="flex gap-2">
          <Button onClick={exportData} leftIcon={Download}>Export as JSON</Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()} leftIcon={Upload}>Import JSON</Button>
        </div>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
      </div>

      {/* Danger Zone */}
      <div className="bg-danger-50 border border-danger-100 rounded-2xl p-4">
        <h2 className="text-base font-bold text-danger-500 mb-1">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-3">
          Permanently delete all your moods, journal entries, and settings. WARNING: This operation cannot be undone!
        </p>
        <Button variant="danger" onClick={handleClearData}>Clear All Data</Button>
      </div>

      <div className="text-center py-4">
        <Lock size={16} className="mx-auto text-gray-400 mb-2" />
        <p className="text-xs text-gray-400">
          Your data is stored locally in your browser.<br />
          No account needed.
        </p>
      </div>
    </div>
  )
}
