import { formatDate, formatTime } from '../utils/date'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

export default function MoodCard({ mood, onDelete }) {
  return (
    <div className="card">
      <p>
        <span style={{ fontSize: 20 }}>{emojis[mood.rating - 1]}</span>{' '}
        <strong>{labels[mood.rating - 1]}</strong>
      </p>
      <p className="mood-meta">{formatDate(mood.createdAt)} at {formatTime(mood.createdAt)}</p>
      {mood.note && <p className="mood-note-text">{mood.note}</p>}
      {onDelete && (
        <button className="btn btn-danger" style={{ marginTop: 8 }} onClick={() => onDelete(mood.id)}>
          Delete
        </button>
      )}
    </div>
  )
}
