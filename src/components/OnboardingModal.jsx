import Button from './Button'

export default function OnboardingModal({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
        <img src="/logo.svg" alt="oktavhealth" className="mx-auto mb-5 h-16" />

        <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome to oktavhealth!</h1>
        <p className="text-sm text-gray-500 mb-5">
          Oktavhealth is a privacy-first mental health app. This means:
        </p>

        <div className="text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">🔒</span>
            <p className="text-sm text-gray-700">Your data lives only on this device.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">📱</span>
            <p className="text-sm text-gray-700">Export regularly so you don't lose it!</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">🔗</span>
            <p className="text-sm text-gray-700">Use QR code to move to a new device.</p>
          </div>
        </div>

        <Button onClick={onDismiss} className="w-full">
          Got It, Let's Start
        </Button>
      </div>
    </div>
  )
}
