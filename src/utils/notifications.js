export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function sendNotification(title, options) {
  if (Notification.permission === 'granted') {
    new Notification(title, options)
  }
}

let reminderInterval = null

export function startReminder({ enabled, hour, minute }) {
  stopReminder()
  if (!enabled || !('Notification' in window)) return

  reminderInterval = setInterval(() => {
    const now = new Date()
    if (now.getHours() === hour && now.getMinutes() === minute) {
      const lastFired = localStorage.getItem('oktav-lastReminder')
      const today = now.toISOString().split('T')[0]
      if (lastFired !== today) {
        localStorage.setItem('oktav-lastReminder', today)
        sendNotification('oktavhealth', {
          body: 'Hey, how are you feeling?',
          icon: '/logo.svg',
          tag: 'oktav-reminder',
        })
      }
    }
  }, 60000)
}

export function stopReminder() {
  if (reminderInterval) {
    clearInterval(reminderInterval)
    reminderInterval = null
  }
}
