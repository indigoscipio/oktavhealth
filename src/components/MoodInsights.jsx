import { toDayKey } from '../utils/date'
import { Flame, TrendingUp, Calendar, BarChart3 } from 'lucide-react'

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

function getWeekMoods(moods) {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((day + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  return moods.filter((m) => new Date(m.createdAt) >= monday)
}

export default function MoodInsights({ moods }) {
  if (moods.length === 0) return null

  const streak = getStreak(moods)
  const weekMoods = getWeekMoods(moods)
  const weekAvg = weekMoods.length > 0
    ? (weekMoods.reduce((s, m) => s + m.rating, 0) / weekMoods.length).toFixed(1)
    : null

  return (
    <div className="bg-white rounded-2xl p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Insights</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <Flame size={16} className="text-brand-800 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{streak}</p>
          <p className="text-xs text-gray-500">day streak</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <TrendingUp size={16} className="text-brand-800 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{weekAvg || '—'}</p>
          <p className="text-xs text-gray-500">weekly avg</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <Calendar size={16} className="text-brand-800 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{weekMoods.length}</p>
          <p className="text-xs text-gray-500">moods this week</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <BarChart3 size={16} className="text-brand-800 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{moods.length}</p>
          <p className="text-xs text-gray-500">total moods</p>
        </div>
      </div>
    </div>
  )
}
