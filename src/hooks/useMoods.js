import { useState, useCallback } from 'react'

const STORAGE_KEY = 'oktav-moods'

function loadFromStorage() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return data.map((m) => ({ ...m, createdAt: new Date(m.createdAt) }))
  } catch { return [] }
}

function saveToStorage(moods) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
}

export function useMoods() {
  const [moods, setMoods] = useState(loadFromStorage)

  const addMood = useCallback((rating, note, tags, gratitude) => {
    const entry = {
      rating,
      note,
      tags: tags || [],
      gratitude: gratitude || '',
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setMoods((prev) => {
      const updated = [entry, ...prev]
      saveToStorage(updated)
      return updated
    })
  }, [])

  const editMood = useCallback((id, updates) => {
    setMoods((prev) => {
      const updated = prev.map((m) => m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m)
      saveToStorage(updated)
      return updated
    })
  }, [])

  const deleteMood = useCallback((id) => {
    setMoods((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      saveToStorage(updated)
      return updated
    })
  }, [])

  const restoreMood = useCallback((mood) => {
    setMoods((prev) => {
      const updated = [...prev, mood].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      saveToStorage(updated)
      return updated
    })
  }, [])

  return { moods, addMood, editMood, deleteMood, restoreMood }
}
