import { useState } from 'react'
import { useJournal } from '../hooks/useJournal'
import { formatDate } from '../utils/date'

export default function Journal() {
  const { entries, addEntry, editEntry, deleteEntry } = useJournal()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editing, setEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    if (editingId) {
      editEntry(editingId, { title: title.trim() || undefined, body: body.trim() })
    } else {
      addEntry({ title: title.trim() || undefined, body: body.trim() })
    }
    setTitle('')
    setBody('')
    setEditing(false)
    setEditingId(null)
  }

  const startEdit = (entry) => {
    setTitle(entry.title || '')
    setBody(entry.body)
    setEditingId(entry.id)
    setEditing(true)
  }

  const cancelEdit = () => {
    setTitle('')
    setBody('')
    setEditingId(null)
    setEditing(false)
  }

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
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" type="submit">{editingId ? 'Save' : 'Save'}</button>
              <button className="btn btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>
            </div>
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
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => startEdit(entry)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteEntry(entry.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
