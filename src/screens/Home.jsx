import { useState } from 'react'
import { Download } from 'lucide-react'
import CrisisCard from '../components/CrisisCard'
import MoodInput from '../components/MoodInput'
import MoodCard from '../components/MoodCard'
import MoodChart from '../components/MoodChart'
import MoodInsights from '../components/MoodInsights'
import WeeklySummary from '../components/WeeklySummary'
import Button from '../components/Button'
import { useMoods } from '../hooks/useMoods'
import { useJournal } from '../hooks/useJournal'
import { useSettings } from '../hooks/useSettings'
import { formatDate, groupByDay } from '../utils/date'
import { exportData, getDaysSinceExport } from '../utils/export'

export default function Home() {
  const { moods, addMood, editMood, deleteMood } = useMoods()
  const { entries } = useJournal()
  const { settings } = useSettings()
  const name = settings.userName || 'you'
  const groups = groupByDay(moods)
  const [dismissed, setDismissed] = useState(() => {
    const ts = localStorage.getItem('oktav-dismissExport')
    return ts && (Date.now() - Number(ts)) < 7 * 24 * 60 * 60 * 1000
  })
  const showReminder = !dismissed && getDaysSinceExport() >= 7 && (moods.length > 0 || entries.length > 0)

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hello, {name}! 👋</h1>
        {(moods.length > 0 || entries.length > 0) && (
          <p className="text-sm text-gray-500 mt-0.5">
            {moods.length} mood{moods.length !== 1 && 's'}  ·  {entries.length} journal {entries.length !== 1 ? 'entries' : 'entry'}
          </p>
        )}
      </div>

      {showReminder && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-700">Let's backup your health data weekly.</p>
          <Button size="sm" onClick={exportData} leftIcon={Download}>
            Backup Now
          </Button>
        </div>
      )}

      <CrisisCard />

      <MoodInput onSave={(rating, note, tags, gratitude) => addMood(rating, note, tags, gratitude)} />

      <MoodInsights moods={moods} />

      <WeeklySummary moods={moods} />

      {moods.length >= 2 && <MoodChart moods={moods} />}

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Activity</h2>
        {moods.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No moods logged yet. Tap an emoji above to get started.</p>
        ) : (
          groups.map(([day, dayMoods]) => (
            <div key={day} className="mb-4">
              <p className="text-xs font-semibold text-gray-400 mb-2">{formatDate(day)}</p>
              <div className="space-y-3">
                {dayMoods.map((mood) => (
                  <MoodCard key={mood.id} mood={mood} onDelete={deleteMood} onEdit={editMood} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
