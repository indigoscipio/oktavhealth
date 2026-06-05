import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatDate } from '../utils/date'

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="card" style={{ padding: '8px 12px', fontSize: 13 }}>
      <p><strong>{labels[d.rating - 1]}</strong> ({d.rating}/5)</p>
      <p style={{ color: '#6b7a8f' }}>{formatDate(d.createdAt)}</p>
      {d.note && <p>{d.note}</p>}
    </div>
  )
}

export default function MoodChart({ moods }) {
  if (moods.length === 0) return null

  const data = moods.slice().reverse().map((m) => ({
    rating: m.rating,
    note: m.note || '',
    createdAt: m.createdAt,
    label: new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }))

  return (
    <div className="card">
      <h3 style={{ marginBottom: 12 }}>Mood Over Time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="rating" stroke="#2c6e6f" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
