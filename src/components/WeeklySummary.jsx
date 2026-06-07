import { toDayKey } from '../utils/date'
import { TrendingUp, Hash, Calendar, Star } from 'lucide-react'

const emojis = ['😞', '😕', '😐', '🙂', '😊']

function getWeekRange() {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((day + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)
  return { monday, sunday }
}

export default function WeeklySummary({ moods }) {
  if (moods.length === 0) return null

  const { monday } = getWeekRange()
  const weekMoods = moods.filter((m) => new Date(m.createdAt) >= monday)

  if (weekMoods.length === 0) return null

  const avg = (weekMoods.reduce((s, m) => s + m.rating, 0) / weekMoods.length).toFixed(1)

  const tagCounts = {}
  weekMoods.forEach((m) => (m.tags || []).forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1 }))
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]

  const dist = [0, 0, 0, 0, 0]
  weekMoods.forEach((m) => { if (m.rating >= 1 && m.rating <= 5) dist[m.rating - 1]++ })

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
    <div className="bg-white rounded-2xl p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-3">This Week</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <TrendingUp size={14} className="text-brand-800" />
          <span>Average: <strong>{avg}/5</strong></span>
        </div>
        {topTag && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Hash size={14} className="text-brand-800" />
            <span>Most common: <strong>{topTag[0]}</strong></span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Star size={14} className="text-brand-800" />
          <span>
            {emojis.map((e, i) => dist[i] > 0 ? `${e}: ${dist[i]}` : null).filter(Boolean).join('  ')}
          </span>
        </div>
        {bestDayName && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar size={14} className="text-brand-800" />
            <span>Best day: <strong>{bestDayName}</strong></span>
          </div>
        )}
      </div>
    </div>
  )
}
