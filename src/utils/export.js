function getStorageItem(key) {
  try { return JSON.parse(sessionStorage.getItem(key) || '[]') }
  catch { return [] }
}

export function exportData() {
  const moods = getStorageItem('oktav-moods')
  const journal = getStorageItem('oktav-journal')
  const settings = getStorageItem('oktav-settings')
  const data = { exportedAt: new Date().toISOString(), moods, journal, settings }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `oktavhealth-export-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  sessionStorage.setItem('oktav-lastExport', new Date().toISOString())
}

export function getDaysSinceExport() {
  const last = sessionStorage.getItem('oktav-lastExport')
  if (!last) return 999
  const diff = Date.now() - new Date(last).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}
