import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatDate } from '../utils/date'

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{labels[d.rating - 1]} ({d.rating}/5)</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(d.createdAt)}</p>
      {d.note && <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{d.note}</p>}
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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">Mood Over Time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} width={20} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="rating" stroke="#115e59" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
