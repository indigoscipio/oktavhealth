import { useState } from 'react'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
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
    <form className="card mood-form" onSubmit={handleSubmit}>
      <p>How are you feeling?</p>
      <div className="rating-row">
        {[0, 1, 2, 3, 4].map((i) => (
          <button type="button" key={i}
            className={`rating-btn ${rating === i + 1 ? 'selected' : ''}`}
            onClick={() => setRating(i + 1)}
          >
            {emojis[i]}
          </button>
        ))}
      </div>
      <div className="rating-label">{rating ? labels[rating - 1] : 'Tap an emoji'}</div>
      <input className="mood-note" placeholder="Add a note (optional)"
        value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="btn" type="submit" disabled={!rating}>Log Mood</button>
    </form>
  )
}
