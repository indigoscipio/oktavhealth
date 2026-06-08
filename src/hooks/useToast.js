import { useState, useCallback, useRef } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToast(null)
  }, [])

  const showToast = useCallback((message, options = {}) => {
    const { action, onAction, duration = action ? 5000 : 2000 } = options
    dismissToast()

    setToast({ message, action, onAction })

    timeoutRef.current = setTimeout(() => {
      setToast(null)
      timeoutRef.current = null
    }, duration)
  }, [dismissToast])

  return { toast, showToast, dismissToast }
}
