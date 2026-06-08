import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatDate } from '../utils/date'
import { useTheme } from '../hooks/useTheme'

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
const ranges = { '7d': 7, '30d': 30, '3m': 90, 'All': null }

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
  const [range, setRange] = useState('30d')
  const { theme } = useTheme()
  if (moods.length === 0) return null

  const daysAgo = ranges[range]
  const filtered = daysAgo
    ? moods.filter((m) => (Date.now() - new Date(m.createdAt).getTime()) < daysAgo * 24 * 60 * 60 * 1000)
    : moods

  if (filtered.length === 0) return null

  const data = filtered
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((m) => ({
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
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12, fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} width={20} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="rating" stroke={theme === 'dark' ? '#5eead4' : '#115e59'} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-1.5 justify-center mt-3">
        {Object.keys(ranges).map((key) => (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              range === key
                ? 'bg-brand-800 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}
