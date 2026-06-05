import MoodInput from '../components/MoodInput'
import MoodCard from '../components/MoodCard'
import { useMoods } from '../hooks/useMoods'

export default function MoodLog() {
  const { moods, loading, addMood, deleteMood } = useMoods()

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Mood Log</h2>
      <MoodInput onSave={(rating, note, tags, gratitude) => addMood(rating, note, tags, gratitude)} />
      <hr />
      {moods.length === 0 ? (
        <p className="empty-state">No entries yet.</p>
      ) : (
        moods.map((mood) => (
          <MoodCard key={mood.id} mood={mood} onDelete={deleteMood} />
        ))
      )}
    </div>
  )
}
