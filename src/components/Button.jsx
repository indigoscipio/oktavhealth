const variants = {
  primary: 'bg-brand-800 text-white hover:bg-brand-700 active:bg-brand-900',
  secondary: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 active:bg-gray-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-600',
  dangerSoft: 'bg-danger-50 text-danger-600 border border-danger-200 hover:bg-danger-100 active:bg-danger-200',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
  outline: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 active:bg-gray-200',
}

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {LeftIcon && <LeftIcon size={size === 'sm' ? 14 : 16} />}
      {children}
      {RightIcon && <RightIcon size={size === 'sm' ? 14 : 16} />}
    </button>
  )
}
