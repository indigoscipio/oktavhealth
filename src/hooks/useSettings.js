import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

const DEFAULT_SETTINGS = { id: 'app-settings', userName: '', theme: 'light' }

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.settings.get('app-settings')
      .then((result) => {
        if (result) setSettings(result)
      })
      .catch((e) => console.error('Failed to load settings', e))
      .finally(() => setLoading(false))
  }, [])

  const updateSettings = useCallback(async (updates) => {
    const merged = { ...DEFAULT_SETTINGS, ...updates, id: 'app-settings' }
    await db.settings.put(merged)
    setSettings(merged)
  }, [])

  return { settings, loading, updateSettings }
}
