import { useState } from 'react'
import { formatDate, formatTime } from '../utils/date'
import MoodInput from './MoodInput'
import Button from './Button'

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
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shrink-0">
          {emojis[mood.rating - 1]}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900">{labels[mood.rating - 1]}</p>
          <p className="text-xs text-gray-500">{formatDate(mood.createdAt)} at {formatTime(mood.createdAt)}</p>
        </div>
      </div>

      {mood.tags?.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-2">
          {mood.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600 font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}

      {mood.note && <p className="text-sm text-gray-700 mb-2">{mood.note}</p>}
      {mood.gratitude && <p className="text-xs text-gray-400 italic mb-2">🙏 {mood.gratitude}</p>}

      <div className="flex gap-2">
        {onDelete && (
          <Button variant="outline" size="sm" onClick={() => onDelete(mood.id)} className="text-danger-500 border-danger-100 hover:bg-danger-50">
            Delete
          </Button>
        )}
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
      </div>
    </div>
  )
}
