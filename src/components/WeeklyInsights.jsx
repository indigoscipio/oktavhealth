import { toDayKey } from '../utils/date'
import { Flame, TrendingUp } from 'lucide-react'

const emojis = ['😞', '😕', '😐', '🙂', '😊']

function getStreak(moods) {
  if (moods.length === 0) return 0
  const daySet = new Set(moods.map((m) => toDayKey(m.createdAt)))
  let streak = 0
  const d = new Date()
  while (daySet.has(toDayKey(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function getWeekRange() {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((day + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  return monday
}

export default function WeeklyInsights({ moods }) {
  if (moods.length === 0) return null

  const monday = getWeekRange()
  const weekMoods = moods.filter((m) => new Date(m.createdAt) >= monday)
  if (weekMoods.length === 0) return null

  const streak = getStreak(moods)
  const avg = (weekMoods.reduce((s, m) => s + m.rating, 0) / weekMoods.length).toFixed(1)

  const dist = [0, 0, 0, 0, 0]
  weekMoods.forEach((m) => { if (m.rating >= 1 && m.rating <= 5) dist[m.rating - 1]++ })

  const tagCounts = {}
  weekMoods.forEach((m) => (m.tags || []).forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1 }))
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]

  const dayAvgs = {}
  weekMoods.forEach((m) => {
    const key = toDayKey(m.createdAt)
    if (!dayAvgs[key]) dayAvgs[key] = { sum: 0, count: 0 }
    dayAvgs[key].sum += m.rating
    dayAvgs[key].count++
  })
  const bestDay = Object.entries(dayAvgs).sort((a, b) => (b[1].sum / b[1].count) - (a[1].sum / a[1].count))[0]
  const bestDayName = bestDay ? new Date(bestDay[0] + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' }) : null

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">This Week</h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <Flame size={16} className="text-brand-800 dark:text-brand-400 mb-1" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{streak}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">day streak</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <TrendingUp size={16} className="text-brand-800 dark:text-brand-400 mb-1" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avg}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">avg / 5</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-1.5 flex-wrap">
          {emojis.map((e, i) => dist[i] > 0 ? (
            <span key={i} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 font-medium">
              {e} {dist[i]}
            </span>
          ) : null)}
        </div>
        {topTag && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Most common: <strong>{topTag[0]}</strong>
          </p>
        )}
        {bestDayName && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Best day: <strong>{bestDayName}</strong>
          </p>
        )}
      </div>
    </div>
  )
}
