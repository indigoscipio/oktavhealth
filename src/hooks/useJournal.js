import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

const STORAGE_KEY = 'oktav-journal'

function loadFromStorage() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

function saveToStorage(entries) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useJournal() {
  const [entries, setEntries] = useState(loadFromStorage)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    db.journalEntries.orderBy('createdAt').reverse().toArray()
      .then((result) => {
        if (result.length > 0) {
          setEntries(result)
          saveToStorage(result)
        }
      })
      .catch(() => {})
  }, [])

  const addEntry = useCallback(({ title, body, moodId }) => {
    const entry = { title, body, moodId, createdAt: new Date() }
    const tempId = Date.now()
    const updated = [{ ...entry, id: tempId }, ...loadFromStorage()]
    setEntries(updated)
    saveToStorage(updated)
    db.journalEntries.add(entry).then((realId) => {
      const final = updated.map((e) => e.id === tempId ? { ...e, id: realId } : e)
      setEntries(final)
      saveToStorage(final)
    }).catch(() => {})
  }, [])

  const deleteEntry = useCallback((id) => {
    const updated = loadFromStorage().filter((e) => e.id !== id)
    setEntries(updated)
    saveToStorage(updated)
    db.journalEntries.delete(id).catch(() => {})
  }, [])

  return { entries, loading, addEntry, deleteEntry }
}
