import React from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const variantStyles = {
  primary:
    'bg-moss text-white hover:bg-moss-dark focus-visible:ring-moss',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1ea853] focus-visible:ring-[#25D366]',
  outline:
    'bg-transparent border-2 border-wool-dark text-bark hover:bg-wool-dark focus-visible:ring-wool-dark',
}

export default function Button({
  variant = 'primary',
  children,
  href,
  onClick,
  type,
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base'

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer'

  const style = variantStyles[variant] || variantStyles.primary

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${base} ${style} ${className}`}
        {...props}
      >
        {variant === 'whatsapp' && <WhatsAppIcon size={20} />}
        {children}
      </a>
    )
  }

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${style} ${disabledStyles} ${className}`}
      {...props}
    >
      {variant === 'whatsapp' && <WhatsAppIcon size={20} />}
      {children}
    </button>
  )
}
