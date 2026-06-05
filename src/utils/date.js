export function today() {
  return new Date().toISOString().split('T')[0]
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function toDayKey(date) {
  return new Date(date).toISOString().split('T')[0]
}

export function groupByDay(items) {
  const groups = {}
  for (const item of items) {
    const key = toDayKey(item.createdAt)
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}
