import { useState, useEffect, useCallback } from 'react'
import db from '../db/db'

export function useMoods() {
  const [moods, setMoods] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMoods = useCallback(async () => {
    try {
      const result = await db.moods.orderBy('createdAt').reverse().toArray()
      setMoods(result)
    } catch (e) {
      console.error('Failed to fetch moods', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMoods()
  }, [fetchMoods])

  const addMood = useCallback(async (rating, note, tags) => {
    await db.moods.add({ rating, note, tags: tags || [], createdAt: new Date() })
    await fetchMoods()
  }, [fetchMoods])

  const deleteMood = useCallback(async (id) => {
    await db.moods.delete(id)
    await fetchMoods()
  }, [fetchMoods])

  const todayMoods = moods.filter(
    (m) => new Date(m.createdAt).toDateString() === new Date().toDateString()
  )

  const latestMood = todayMoods.length > 0 ? todayMoods[0] : null

  return { moods, todayMoods, latestMood, loading, addMood, deleteMood }
}
