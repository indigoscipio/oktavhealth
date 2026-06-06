export function validateMood(m) {
  return m
    && typeof m.rating === 'number' && m.rating >= 1 && m.rating <= 5
    && typeof m.id !== 'undefined'
    && m.createdAt
}

export function validateEntry(e) {
  return e
    && typeof e.body === 'string' && e.body.length > 0
    && typeof e.id !== 'undefined'
    && e.createdAt
}
