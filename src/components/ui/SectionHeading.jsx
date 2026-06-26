import React from 'react'

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {tag && (
        <span
          className={`inline-block text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 font-medium ${
            light ? 'text-gold-light' : 'text-earth'
          }`}
        >
          {tag}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${
          light ? 'text-white' : 'text-bark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-wool-dark' : 'text-bark-light'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
