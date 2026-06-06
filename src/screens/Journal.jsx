import { useState } from 'react'
import { useJournal } from '../hooks/useJournal'
import JournalEntryCard from '../components/JournalEntryCard'

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
    <div>
      <h2>Journal</h2>
      {!showForm ? (
        <button className="btn" onClick={() => setShowForm(true)}>New Entry</button>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title (optional)</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Entry</label>
              <textarea rows={5} value={body}
                onChange={(e) => setBody(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" type="submit">Save</button>
              <button className="btn btn-secondary" type="button" onClick={() => { setShowForm(false); setTitle(''); setBody('') }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <hr />
      {entries.length === 0 ? (
        <p className="empty-state">No journal entries yet.</p>
      ) : (
        entries.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} onDelete={deleteEntry} onEdit={editEntry} />
        ))
      )}
    </div>
  )
}
