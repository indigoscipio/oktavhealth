import { useState, useCallback } from 'react'

const STORAGE_KEY = 'oktav-settings'
const DEFAULT_SETTINGS = { userName: '', theme: 'light' }

function loadFromStorage() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } }
  catch { return DEFAULT_SETTINGS }
}

function saveToStorage(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function useSettings() {
  const [settings, setSettings] = useState(loadFromStorage)

  const updateSettings = useCallback((updates) => {
    const merged = { ...loadFromStorage(), ...updates }
    setSettings(merged)
    saveToStorage(merged)
  }, [])

  return { settings, updateSettings }
}
