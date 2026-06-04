import MoodInput from '../components/MoodInput'
import MoodCard from '../components/MoodCard'
import { useMoods } from '../hooks/useMoods'

export default function Home() {
  const { todayMoods, latestMood, addMood, deleteMood } = useMoods()

  return (
    <div>
      <h2>Home</h2>
      {!latestMood ? (
        <MoodInput onSave={(rating, note) => addMood(rating, note)} />
      ) : (
        <div>
          <p>Today's mood logged already.</p>
          <MoodCard mood={latestMood} onDelete={deleteMood} />
          <button onClick={() => addMood(3, '')}>Log another</button>
        </div>
      )}
      <hr />
      <h3>Today's Entries ({todayMoods.length})</h3>
      {todayMoods.map((mood) => (
        <MoodCard key={mood.id} mood={mood} onDelete={deleteMood} />
      ))}
    </div>
  )
}
