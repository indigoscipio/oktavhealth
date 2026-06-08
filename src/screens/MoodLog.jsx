import MoodInput from '../components/MoodInput'
import MoodCard from '../components/MoodCard'
import { useMoods } from '../hooks/useMoods'
import { formatDate, groupByDay } from '../utils/date'

export default function MoodLog({ showToast }) {
  const { moods, addMood, editMood, deleteMood, restoreMood } = useMoods()
  const groups = groupByDay(moods)

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

  const handleSave = (rating, note, tags, gratitude) => {
    addMood(rating, note, tags, gratitude)
    showToast?.('Mood logged')
  }

  return (
    <div className="space-y-4 pt-2">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mood</h1>

      <MoodInput onSave={handleSave} />

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h2>
        {moods.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No entries yet.</p>
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
