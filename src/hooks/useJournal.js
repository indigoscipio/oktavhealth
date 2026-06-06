import { useState, useCallback } from 'react'

const STORAGE_KEY = 'oktav-journal'

function loadFromStorage() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return data.map((e) => ({ ...e, createdAt: new Date(e.createdAt) }))
  } catch { return [] }
}

function saveToStorage(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useJournal() {
  const [entries, setEntries] = useState(loadFromStorage)

  const addEntry = useCallback(({ title, body }) => {
    const entry = {
      title,
      body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setEntries((prev) => {
      const updated = [entry, ...prev]
      saveToStorage(updated)
      return updated
    })
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id)
      saveToStorage(updated)
      return updated
    })
  }, [])

  return { entries, addEntry, deleteEntry }
}
