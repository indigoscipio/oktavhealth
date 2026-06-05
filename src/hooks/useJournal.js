import { useState, useCallback } from 'react'

const STORAGE_KEY = 'oktav-journal'

function loadFromStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

function saveToStorage(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useJournal() {
  const [entries, setEntries] = useState(loadFromStorage)

  const addEntry = useCallback(({ title, body, moodId }) => {
    const entry = { title, body, moodId, id: Date.now(), createdAt: new Date() }
    const updated = [entry, ...loadFromStorage()]
    setEntries(updated)
    saveToStorage(updated)
  }, [])

  const deleteEntry = useCallback((id) => {
    const updated = loadFromStorage().filter((e) => e.id !== id)
    setEntries(updated)
    saveToStorage(updated)
  }, [])

  return { entries, addEntry, deleteEntry }
}
