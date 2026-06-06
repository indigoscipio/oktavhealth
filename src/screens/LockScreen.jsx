import { useState } from 'react'
import { verifyPin } from '../utils/security'

export default function LockScreen({ pinHash, onUnlock }) {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)

  const handleDigit = (d) => {
    if (digits.length >= 4) return
    const next = digits + d
    setDigits(next)
    setError(false)
    if (next.length === 4) {
      verifyPin(next, pinHash).then((ok) => {
        if (ok) {
          onUnlock()
        } else {
          setError(true)
          setTimeout(() => { setDigits(''); setError(false) }, 600)
        }
      })
    }
  }

  const handleDelete = () => {
    setDigits((prev) => prev.slice(0, -1))
    setError(false)
  }

  return (
    <div className="lock-screen">
      <div className="lock-content">
        <img src="/logo.svg" alt="" height="48" style={{ marginBottom: 16 }} />
        <p style={{ marginBottom: 24, color: 'var(--color-muted)' }}>Enter PIN to unlock</p>
        <div className={`lock-dots ${error ? 'lock-error' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`lock-dot ${digits.length > i ? 'filled' : ''}`} />
          ))}
        </div>
        <div className="lock-numpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button key={d} className="lock-key" onClick={() => handleDigit(String(d))}>{d}</button>
          ))}
          <span />
          <button className="lock-key" onClick={() => handleDigit('0')}>0</button>
          <button className="lock-key" onClick={handleDelete}>⌫</button>
        </div>
      </div>
    </div>
  )
}
