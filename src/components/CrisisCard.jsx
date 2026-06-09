import { useState } from 'react'
import { Heart, ChevronDown } from 'lucide-react'

export default function CrisisCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
      >
        <p className="font-bold text-brand-800 dark:text-brand-300 flex items-center gap-1.5">
          Need help? <Heart size={14} className="text-brand-600 dark:text-brand-400" fill="currentColor" />
        </p>
        <ChevronDown
          size={16}
          className={`text-brand-600 dark:text-brand-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>988 Suicide & Crisis Lifeline:</strong> call or text{' '}
            <a href="tel:988" className="font-bold text-brand-800 dark:text-brand-300 underline">988</a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Crisis Text Line:</strong> text <strong>HOME</strong> to{' '}
            <a href="sms:741741?body=HOME" className="font-bold text-brand-800 dark:text-brand-300 underline">741741</a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 pt-1">
            Outside the US?{' '}
            <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-800 dark:hover:text-brand-300">
              Find a helpline near you →
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
