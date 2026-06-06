import { useState } from 'react'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
const tagOptions = ['work', 'family', 'health', 'sleep', 'social', 'weather']

export default function MoodInput({ onSave, initialValues, onCancel, submitLabel }) {
  const [rating, setRating] = useState(initialValues?.rating ?? null)
  const [note, setNote] = useState(initialValues?.note ?? '')
  const [tags, setTags] = useState(initialValues?.tags ?? [])
  const [gratitude, setGratitude] = useState(initialValues?.gratitude ?? '')

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) return
    onSave(rating, note, tags, gratitude)
    if (!initialValues) {
      setRating(null)
      setNote('')
      setTags([])
      setGratitude('')
    }
  }

  return (
    <form className="card mood-form" onSubmit={handleSubmit}>
      <p>How are you feeling?</p>
      <div className="rating-row">
        {[0, 1, 2, 3, 4].map((i) => (
          <button type="button" key={i}
            className={`rating-btn ${rating === i + 1 ? 'selected' : ''}`}
            onClick={() => setRating(i + 1)}
            aria-label={labels[i]}
          >
            {emojis[i]}
          </button>
        ))}
      </div>
      <div className="rating-label">{rating ? labels[rating - 1] : 'Tap an emoji'}</div>

      <input className="mood-note" placeholder="Add a note (optional)"
        value={note} onChange={(e) => setNote(e.target.value)} />

      <div className="tag-row">
        {tagOptions.map((tag) => (
          <button type="button" key={tag}
            className={`tag-btn ${tags.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggleTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <input className="mood-note" placeholder="What are you grateful for?"
        value={gratitude} onChange={(e) => setGratitude(e.target.value)} />

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" type="submit" disabled={!rating}>{submitLabel || 'Log Mood'}</button>
        {onCancel && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
