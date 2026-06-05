import { toDayKey } from '../utils/date'

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
    <div className="card">
      <h3 style={{ marginBottom: 8 }}>Insights</h3>
      {streak > 0 && <p className="insight">🔥 {streak} day streak — keep it up!</p>}
      {weekAvg && <p className="insight">📊 This week's average: {weekAvg}/5</p>}
      {weekMoods.length > 0 && <p className="insight">📝 {weekMoods.length} mood{weekMoods.length !== 1 && 's'} this week</p>}
    </div>
  )
}
