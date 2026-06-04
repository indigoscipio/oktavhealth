import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

export function useJournal() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = useCallback(async () => {
    try {
      const result = await db.journalEntries.orderBy('createdAt').reverse().toArray()
      setEntries(result)
    } catch (e) {
      console.error('Failed to fetch journal entries', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const addEntry = useCallback(async ({ title, body, moodId }) => {
    await db.journalEntries.add({ title, body, moodId, createdAt: new Date() })
    await fetchEntries()
  }, [fetchEntries])

  const deleteEntry = useCallback(async (id) => {
    await db.journalEntries.delete(id)
    await fetchEntries()
  }, [fetchEntries])

  return { entries, loading, addEntry, deleteEntry }
}
