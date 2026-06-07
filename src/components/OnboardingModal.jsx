import { Shield, Download, Lock } from 'lucide-react'
import Button from './Button'

export default function OnboardingModal({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
        <img src="/favicon.svg" alt="oktavhealth" className="mx-auto mb-5 h-16" />

        <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome to oktavhealth!</h1>
        <p className="text-sm text-gray-500 mb-5">
          A privacy-first mental health app. Here's what that means:
        </p>

        <div className="text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-brand-700 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">Your data stays on this device.</p>
          </div>
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-brand-700 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">Export your data anytime as a backup.</p>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-brand-700 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">Set a passcode to keep it private.</p>
          </div>
        </div>

        <Button onClick={onDismiss} className="w-full">
          Got It, Let's Start
        </Button>
      </div>
    </div>
  )
}
