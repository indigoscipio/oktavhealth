import { useState } from 'react'
import { formatDate } from '../utils/date'
import { BookOpen } from 'lucide-react'
import Button from './Button'

export default function JournalEntryCard({ entry, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(entry.title || '')
  const [body, setBody] = useState(entry.body)

  const handleSave = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    onEdit(entry.id, { title: title.trim() || undefined, body: body.trim() })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Entry</label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800 resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button variant="secondary" type="button" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
          <BookOpen size={16} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div className="min-w-0">
          {entry.title && <p className="font-bold text-gray-900 dark:text-gray-100">{entry.title}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(entry.createdAt)}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{entry.body}</p>

      <div className="flex gap-2">
        <Button variant="dangerSoft" size="sm" onClick={() => onDelete(entry.id)}>
          Delete
        </Button>
        <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </div>
    </div>
  )
}
