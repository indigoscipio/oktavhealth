import { Heart } from 'lucide-react'

export default function CrisisCard() {
  return (
    <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 rounded-2xl p-4">
      <p className="font-bold text-brand-800 dark:text-brand-300 flex items-center gap-1.5 mb-1">
        Need Help? <Heart size={14} className="text-brand-600 dark:text-brand-400" fill="currentColor" />
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>988 Suicide & Crisis Lifeline:</strong> call or text{' '}
        <a href="tel:988" className="font-bold text-brand-800 dark:text-brand-300 underline">988</a>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Crisis Text Line:</strong> text <strong>HOME</strong> to{' '}
        <a href="sms:741741?body=HOME" className="font-bold text-brand-800 dark:text-brand-300 underline">741741</a>
      </p>
    </div>
  )
}
