import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'

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

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSave}>
        <label>
          Your Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
      <hr />
      <p>Data is stored locally in your browser.</p>
    </div>
  )
}
