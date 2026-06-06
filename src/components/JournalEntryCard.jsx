import { useState } from 'react'
import { formatDate } from '../utils/date'

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
      <div className="card">
        <form onSubmit={handleSave}>
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
            <button className="btn btn-secondary" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="card journal-entry">
      {entry.title && <h3>{entry.title}</h3>}
      <p>{entry.body}</p>
      <p className="mood-meta">{formatDate(entry.createdAt)}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(entry.id)}>Delete</button>
      </div>
    </div>
  )
}
