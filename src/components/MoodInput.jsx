import { useState } from 'react'
import { FileText, HelpCircle, PlusCircle } from 'lucide-react'
import Button from './Button'

const emojis = ['😞', '😕', '😐', '🙂', '😊']
const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
const tagOptions = ['work', 'family', 'health', 'sleep', 'social', 'weather']

export default function MoodInput({ onSave, initialValues, onCancel, submitLabel }) {
  const [rating, setRating] = useState(initialValues?.rating ?? null)
  const [note, setNote] = useState(initialValues?.note ?? '')
  const [tags, setTags] = useState(initialValues?.tags ?? [])
  const [gratitude, setGratitude] = useState(initialValues?.gratitude ?? '')

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) return
    onSave(rating, note, tags, gratitude)
    if (!initialValues) {
      setRating(null)
      setNote('')
      setTags([])
      setGratitude('')
    }
  }

  return (
    <form className="bg-white border border-gray-200 rounded-2xl p-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold text-gray-900 mb-1">How are you feeling?</h2>
      <p className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-3">Tap an emoji</p>

      <div className="flex gap-3 mb-3 justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            type="button"
            key={i}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all cursor-pointer ${
              rating === i + 1
                ? 'border-brand-800 bg-brand-50 scale-110'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => setRating(i + 1)}
            aria-label={labels[i]}
          >
            {emojis[i]}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center mb-4">
        {rating ? labels[rating - 1] : ''}
      </p>

      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FileText size={16} />
        </span>
        <input
          className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800"
          placeholder="Add a note (Optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {tagOptions.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
              tags.includes(tag)
                ? 'bg-brand-800 text-white border-brand-800'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <HelpCircle size={16} />
        </span>
        <input
          className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800"
          placeholder="What are you grateful for?"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={!rating} rightIcon={PlusCircle} className="w-full">
        {submitLabel || 'Log Mood'}
      </Button>
      {onCancel && (
        <Button variant="secondary" type="button" onClick={onCancel} className="w-full mt-2">
          Cancel
        </Button>
      )}
    </form>
  )
}
