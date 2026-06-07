import { useState } from 'react'
import { useJournal } from '../hooks/useJournal'
import JournalEntryCard from '../components/JournalEntryCard'
import Button from '../components/Button'
import { formatDate, groupByDay } from '../utils/date'

export default function Journal() {
  const { entries, addEntry, editEntry, deleteEntry } = useJournal()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [showForm, setShowForm] = useState(false)
  const groups = groupByDay(entries)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    addEntry({ title: title.trim() || undefined, body: body.trim() })
    setTitle('')
    setBody('')
    setShowForm(false)
  }

  return (
    <div className="space-y-4 pt-2">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Journal</h1>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>New Entry</Button>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
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
              <Button variant="secondary" type="button" onClick={() => { setShowForm(false); setTitle(''); setBody('') }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Recent Journals</h2>
        {entries.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No journal entries yet.</p>
        ) : (
          groups.map(([day, dayEntries]) => (
            <div key={day} className="mb-4">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">{formatDate(day)}</p>
              <div className="space-y-3">
                {dayEntries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} onDelete={deleteEntry} onEdit={editEntry} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
