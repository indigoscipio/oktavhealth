import { Heart } from 'lucide-react'

export default function CrisisCard() {
  return (
    <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4">
      <p className="font-bold text-brand-800 flex items-center gap-1.5 mb-1">
        Need Help? <Heart size={14} className="text-brand-600" fill="currentColor" />
      </p>
      <p className="text-sm text-gray-600">
        <strong>988 Suicide & Crisis Lifeline:</strong> call or text{' '}
        <a href="tel:988" className="font-bold text-brand-800 underline">988</a>
      </p>
      <p className="text-sm text-gray-600">
        <strong>Crisis Text Line:</strong> text <strong>HOME</strong> to{' '}
        <a href="sms:741741?body=HOME" className="font-bold text-brand-800 underline">741741</a>
      </p>
    </div>
  )
}
