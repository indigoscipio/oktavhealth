import { useState } from 'react'
import { useJournal } from '../hooks/useJournal'
import { formatDate } from '../utils/date'

export default function Journal() {
  const { entries, loading, addEntry, deleteEntry } = useJournal()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editing, setEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    addEntry({ title: title.trim() || undefined, body: body.trim() })
    setTitle('')
    setBody('')
    setEditing(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Journal</h2>
      {!editing ? (
        <button className="btn" onClick={() => setEditing(true)}>New Entry</button>
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
            <button className="btn" type="submit">Save</button>{' '}
            <button className="btn btn-secondary" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
      <hr />
      {entries.length === 0 ? (
        <p className="empty-state">No journal entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div className="card journal-entry" key={entry.id}>
            {entry.title && <h3>{entry.title}</h3>}
            <p>{entry.body}</p>
            <p className="mood-meta">{formatDate(entry.createdAt)}</p>
            <button className="btn btn-danger" onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  )
}
