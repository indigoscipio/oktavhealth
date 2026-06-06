import { toDayKey } from '../utils/date'

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
    <div className="card">
      <h3>This Week</h3>
      <p className="insight">📊 Average: {avg}/5</p>
      {topTag && <p className="insight">🏷️ Most common: {topTag[0]}</p>}
      <p className="insight">
        {emojis.map((e, i) => dist[i] > 0 ? `${e}: ${dist[i]}` : null).filter(Boolean).join('  ')}
      </p>
      {bestDayName && <p className="insight">📅 Best day: {bestDayName}</p>}
    </div>
  )
}
