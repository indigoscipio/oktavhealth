import { formatDate, formatTime } from '../utils/date'

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

export default function MoodCard({ mood, onDelete }) {
  return (
    <div>
      <p>
        <strong>{labels[mood.rating - 1]}</strong> ({mood.rating}/5)
      </p>
      <p>{formatDate(mood.createdAt)} at {formatTime(mood.createdAt)}</p>
      {mood.note && <p>{mood.note}</p>}
      {mood.tags?.length > 0 && <p>Tags: {mood.tags.join(', ')}</p>}
      {onDelete && <button onClick={() => onDelete(mood.id)}>Delete</button>}
    </div>
  )
}
