import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { leftIcon: LeftIcon, rightIcon: RightIcon, className = '', ...props },
  ref
) {
  return (
    <div className="relative">
      {LeftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <LeftIcon size={16} />
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-800/20 focus:border-brand-800 transition-colors ${LeftIcon ? 'pl-9' : 'pl-3'} ${RightIcon ? 'pr-9' : 'pr-3'} ${className}`}
        {...props}
      />
      {RightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <RightIcon size={16} />
        </span>
      )}
    </div>
  )
})

export default Input
