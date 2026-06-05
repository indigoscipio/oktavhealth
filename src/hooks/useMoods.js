import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    db.moods.orderBy('createdAt').reverse().toArray()
      .then((result) => {
        if (result.length > 0) {
          setMoods(result)
          saveToStorage(result)
        }
      })
      .catch(() => {})
  }, [])

  const addMood = useCallback((rating, note, tags, gratitude) => {
    const entry = { rating, note, tags: tags || [], gratitude: gratitude || '', createdAt: new Date() }
    const tempId = Date.now()
    const updated = [{ ...entry, id: tempId }, ...loadFromStorage()]
    setMoods(updated)
    saveToStorage(updated)
    db.moods.add(entry).then((realId) => {
      const final = updated.map((m) => m.id === tempId ? { ...m, id: realId } : m)
      setMoods(final)
      saveToStorage(final)
    }).catch(() => {})
  }, [])

  const deleteMood = useCallback((id) => {
    const updated = loadFromStorage().filter((m) => m.id !== id)
    setMoods(updated)
    saveToStorage(updated)
    db.moods.delete(id).catch(() => {})
  }, [])

  return { moods, loading, addMood, deleteMood }
}
