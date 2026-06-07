import { useState } from 'react'
import { useJournal } from '../hooks/useJournal'
import JournalEntryCard from '../components/JournalEntryCard'
import MoodInput from '../components/MoodInput'
import Button from '../components/Button'

export default function Journal() {
  const { entries, addEntry, editEntry, deleteEntry } = useJournal()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [showForm, setShowForm] = useState(false)

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
      <h1 className="text-2xl font-bold text-gray-900">Journal</h1>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>New Entry</Button>
      ) : (
        <div className="bg-white rounded-2xl p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title (optional)</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Entry</label>
              <textarea
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800 resize-none"
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
        <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Journals</h2>
        {entries.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No journal entries yet.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} onDelete={deleteEntry} onEdit={editEntry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
