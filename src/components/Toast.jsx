import { useEffect } from 'react'

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onDismiss()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-lg max-w-[90vw] animate-slide-up">
        <span className="text-sm font-medium">{toast.message}</span>
        {toast.action && toast.onAction && (
          <button
            onClick={() => {
              toast.onAction()
              onDismiss()
            }}
            className="text-sm font-semibold text-accent-400 dark:text-accent-600 hover:text-accent-300 dark:hover:text-accent-700 ml-1"
          >
            {toast.action}
          </button>
        )}
      </div>
    </div>
  )
}
