import { useState, useCallback } from 'react'

const STORAGE_KEY = 'oktav-moods'

function loadFromStorage() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

function saveToStorage(moods) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
}

export function useMoods() {
  const [moods, setMoods] = useState(loadFromStorage)

  const addMood = useCallback((rating, note, tags, gratitude) => {
    const entry = { rating, note, tags: tags || [], gratitude: gratitude || '', id: Date.now(), createdAt: new Date() }
    const updated = [entry, ...loadFromStorage()]
    setMoods(updated)
    saveToStorage(updated)
  }, [])

  const deleteMood = useCallback((id) => {
    const updated = loadFromStorage().filter((m) => m.id !== id)
    setMoods(updated)
    saveToStorage(updated)
  }, [])

  return { moods, loading: false, addMood, deleteMood }
}
