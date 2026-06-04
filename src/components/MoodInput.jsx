import { useState } from 'react'

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

export default function MoodInput({ onSave }) {
  const [rating, setRating] = useState(null)
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) return
    onSave(rating, note)
    setRating(null)
    setNote('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How are you feeling?</p>
      <div>
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} onClick={() => setRating(n)}>
            {n} {rating === n && '*'}
          </button>
        ))}
      </div>
      <p>Selected: {rating ? labels[rating - 1] : 'None'}</p>
      <input
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit" disabled={!rating}>Log Mood</button>
    </form>
  )
}
