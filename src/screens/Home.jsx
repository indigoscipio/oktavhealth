import { useState } from 'react'
import { Download } from 'lucide-react'
import CrisisCard from '../components/CrisisCard'
import MoodCard from '../components/MoodCard'
import MoodChart from '../components/MoodChart'
import WeeklyInsights from '../components/WeeklyInsights'
import PatternCard from '../components/PatternCard'
import Button from '../components/Button'
import { useMoods } from '../hooks/useMoods'
import { useJournal } from '../hooks/useJournal'
import { useSettings } from '../hooks/useSettings'
import { formatDate, groupByDay } from '../utils/date'
import { exportData, getDaysSinceExport } from '../utils/export'

export default function Home({ showToast }) {
  const { moods, editMood, deleteMood, restoreMood } = useMoods()
  const { entries } = useJournal()
  const { settings } = useSettings()
  const name = settings.userName || 'you'
  const groups = groupByDay(moods)
  const [dismissed, setDismissed] = useState(() => {
    const ts = localStorage.getItem('oktav-dismissExport')
    return ts && (Date.now() - Number(ts)) < 7 * 24 * 60 * 60 * 1000
  })
  const showReminder = !dismissed && getDaysSinceExport() >= 7 && (moods.length > 0 || entries.length > 0)

  const handleDelete = (id) => {
    const mood = moods.find((m) => m.id === id)
    deleteMood(id)
    if (showToast && mood) {
      showToast('Mood deleted', {
        action: 'Undo',
        onAction: () => restoreMood(mood),
      })
    }
  }

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hello, {name}! 👋</h1>
        {(moods.length > 0 || entries.length > 0) && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {moods.length} mood{moods.length !== 1 && 's'}  ·  {entries.length} journal {entries.length !== 1 ? 'entries' : 'entry'}
          </p>
        )}
      </div>

      {showReminder && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">Let's backup your health data weekly.</p>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" onClick={exportData} leftIcon={Download}>
              Backup Now
            </Button>
            <Button size="sm" variant="ghost" onClick={() => {
              localStorage.setItem('oktav-dismissExport', Date.now())
              setDismissed(true)
            }}>
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <CrisisCard />

      <WeeklyInsights moods={moods} />

      <PatternCard moods={moods} />

      {moods.length >= 2 && <MoodChart moods={moods} />}

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h2>
        {moods.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">Tap the Mood tab to start tracking, or the Journal tab to write.</p>
        ) : (
          groups.map(([day, dayMoods]) => (
            <div key={day} className="mb-4">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">{formatDate(day)}</p>
              <div className="space-y-3">
                {dayMoods.map((mood) => (
                  <MoodCard key={mood.id} mood={mood} onDelete={handleDelete} onEdit={editMood} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
