import { formatDate, formatTime } from '../utils/date'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

export default function MoodCard({ mood, onDelete }) {
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
      {onDelete && (
        <button className="btn btn-danger mood-delete" onClick={() => onDelete(mood.id)}>
          Delete
        </button>
      )}
    </div>
  )
}
