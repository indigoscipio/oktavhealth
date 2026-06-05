import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

const STORAGE_KEY = 'oktav-settings'
const DEFAULT_SETTINGS = { userName: '', theme: 'light' }

function loadFromStorage() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') } }
  catch { return DEFAULT_SETTINGS }
}

function saveToStorage(settings) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function useSettings() {
  const [settings, setSettings] = useState(loadFromStorage)

  useEffect(() => {
    db.settings.get('app-settings')
      .then((result) => {
        if (result) {
          const merged = { ...DEFAULT_SETTINGS, ...result }
          setSettings(merged)
          saveToStorage(merged)
        }
      })
      .catch(() => {})
  }, [])

  const updateSettings = useCallback((updates) => {
    const merged = { ...loadFromStorage(), ...updates }
    setSettings(merged)
    saveToStorage(merged)
    db.settings.put({ ...merged, id: 'app-settings' }).catch(() => {})
  }, [])

  return { settings, loading: false, updateSettings }
}
