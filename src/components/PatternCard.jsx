import { Search } from 'lucide-react'
import { getTagCorrelations } from '../utils/correlations'

export default function PatternCard({ moods }) {
  const result = getTagCorrelations(moods)

  if (!result) return null

  if (result.reason === 'days') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Search size={16} className="text-brand-800 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Patterns</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Log for {result.days} more day{result.days !== 1 && 's'} to unlock patterns.
        </p>
      </div>
    )
  }

  if (result.reason === 'tags') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Search size={16} className="text-brand-800 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Patterns</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Start adding tags to your logs to unlock patterns.
        </p>
      </div>
    )
  }

  if (result.reason === 'usage' || result.reason === 'variation') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Search size={16} className="text-brand-800 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Patterns</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Not enough variation to detect patterns yet. Keep logging!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Search size={16} className="text-brand-800 dark:text-brand-400" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Patterns</h2>
      </div>

      {result.above.length > 0 && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Your mood tends to be <strong>higher</strong> on days you log:{' '}
          <strong>{result.above.map((t) => t.tag).join(', ')}</strong>
        </p>
      )}

      {result.below.length > 0 && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Your mood tends to be <strong>lower</strong> on days you log:{' '}
          <strong>{result.below.map((t) => t.tag).join(', ')}</strong>
        </p>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
        Based on {result.totalEntries} entries
      </p>
    </div>
  )
}
