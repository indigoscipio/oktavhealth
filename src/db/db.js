import Dexie from 'dexie'

const db = new Dexie('oktavhealth')

db.version(2).stores({
  moods: '++id, rating, createdAt',
  journalEntries: '++id, createdAt',
  habits: '++id, name',
  settings: 'id',
})

export default db
