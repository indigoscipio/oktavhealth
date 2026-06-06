import { useState } from 'react'
import { formatDate, formatTime } from '../utils/date'
import MoodInput from './MoodInput'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

export default function MoodCard({ mood, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <MoodInput
        initialValues={{ rating: mood.rating, note: mood.note, tags: mood.tags, gratitude: mood.gratitude }}
        onSave={(rating, note, tags, gratitude) => {
          onEdit(mood.id, { rating, note, tags, gratitude })
          setEditing(false)
        }}
        onCancel={() => setEditing(false)}
        submitLabel="Save"
      />
    )
  }

  return (
    <div className="card">
      <p>
        <span className="mood-emoji">{emojis[mood.rating - 1]}</span>{' '}
        <strong>{labels[mood.rating - 1]}</strong>
      </p>
      <p className="mood-meta">{formatDate(mood.createdAt)} at {formatTime(mood.createdAt)}</p>
      {mood.note && <p className="mood-note-text">{mood.note}</p>}
      {mood.tags?.length > 0 && (
        <div className="tag-row">
          {mood.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      )}
      {mood.gratitude && <p className="mood-gratitude">🙏 {mood.gratitude}</p>}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {onEdit && <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit</button>}
        {onDelete && <button className="btn btn-danger" onClick={() => onDelete(mood.id)}>Delete</button>}
      </div>
    </div>
  )
}
