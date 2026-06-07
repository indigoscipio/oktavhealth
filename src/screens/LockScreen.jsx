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
    <div className="fixed inset-0 z-50 bg-gray-50 flex items-center justify-center">
      <div className="text-center w-[280px]">
        <img src="/logo.svg" alt="oktavhealth" height="48" className="mx-auto mb-4" />
        <p className="text-sm text-gray-500 mb-6">Enter PIN to unlock</p>

        <div className={`flex gap-4 justify-center mb-8 ${error ? 'animate-[shake_0.4s]' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-colors ${
                error
                  ? 'border-danger-500'
                  : digits.length > i
                    ? 'bg-brand-800 border-brand-800'
                    : 'bg-white border-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              className="w-14 h-14 rounded-full border border-gray-200 bg-white text-lg font-medium cursor-pointer hover:bg-gray-50 active:scale-95 transition-all mx-auto flex items-center justify-center"
              onClick={() => handleDigit(String(d))}
            >
              {d}
            </button>
          ))}
          <span />
          <button
            className="w-14 h-14 rounded-full border border-gray-200 bg-white text-lg font-medium cursor-pointer hover:bg-gray-50 active:scale-95 transition-all mx-auto flex items-center justify-center"
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <button
            className="w-14 h-14 rounded-full border border-gray-200 bg-white text-lg font-medium cursor-pointer hover:bg-gray-50 active:scale-95 transition-all mx-auto flex items-center justify-center"
            onClick={handleDelete}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  )
}
