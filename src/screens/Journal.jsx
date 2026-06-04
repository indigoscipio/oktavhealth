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
        <button onClick={() => setEditing(true)}>New Entry</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Write something..."
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
      <hr />
      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.title && <h3>{entry.title}</h3>}
          <p>{entry.body}</p>
          <small>{formatDate(entry.createdAt)}</small>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  )
}
