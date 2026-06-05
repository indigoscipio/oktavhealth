import { useState } from 'react'
import CrisisCard from '../components/CrisisCard'
import MoodInput from '../components/MoodInput'
import MoodCard from '../components/MoodCard'
import MoodChart from '../components/MoodChart'
import MoodInsights from '../components/MoodInsights'
import { useMoods } from '../hooks/useMoods'
import { useJournal } from '../hooks/useJournal'
import { useSettings } from '../hooks/useSettings'
import { formatDate, groupByDay } from '../utils/date'
import { exportData, getDaysSinceExport } from '../utils/export'

export default function Home() {
  const { moods, addMood, deleteMood } = useMoods()
  const { entries } = useJournal()
  const { settings } = useSettings()
  const name = settings.userName || 'you'
  const groups = groupByDay(moods)
  const [dismissed, setDismissed] = useState(() => {
    const ts = sessionStorage.getItem('oktav-dismissExport')
    return ts && (Date.now() - Number(ts)) < 7 * 24 * 60 * 60 * 1000
  })
  const showReminder = !dismissed && getDaysSinceExport() >= 7 && (moods.length > 0 || entries.length > 0)

  return (
    <div>
      <p className="greeting">Hello, {name}! 👋</p>
      {(moods.length > 0 || entries.length > 0) && (
        <p className="stats">{moods.length} mood{moods.length !== 1 && 's'} · {entries.length} journal {entries.length !== 1 ? 'entries' : 'entry'}</p>
      )}

      {showReminder && (
        <div className="export-reminder">
          <span>It's been a while — consider exporting your data.</span>
          <div className="export-reminder-actions">
            <button className="btn" onClick={exportData}>Export</button>
            <button className="export-dismiss" onClick={() => { sessionStorage.setItem('oktav-dismissExport', Date.now()); setDismissed(true) }}>×</button>
          </div>
        </div>
      )}

      <CrisisCard />

      <MoodInput onSave={(rating, note, tags, gratitude) => addMood(rating, note, tags, gratitude)} />

      <MoodInsights moods={moods} />

      {moods.length >= 2 && <MoodChart moods={moods} />}

      <hr />

      <h3>Recent Activity</h3>
      {moods.length === 0 ? (
        <p className="empty-state">No moods logged yet. Tap an emoji above to get started.</p>
      ) : (
        groups.map(([day, dayMoods]) => (
          <div key={day}>
            <p className="date-header">{formatDate(day)}</p>
            {dayMoods.map((mood) => (
              <MoodCard key={mood.id} mood={mood} onDelete={deleteMood} />
            ))}
          </div>
        ))
      )}
    </div>
  )
}
