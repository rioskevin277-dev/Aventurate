import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FormTextarea({
  label,
  name,
  placeholder,
  error,
  register,
  rows = 3,
  maxLength = 1000,
  className = '',
}) {
  const { t } = useTranslation()
  const errorId = `${name}-error`
  const [charCount, setCharCount] = useState(0)
  const remaining = maxLength - charCount

  const { onChange, ...rest } = register(name)

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-bark mb-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        className={`input-base resize-y ${
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-wool-dark'
        }`}
        onChange={(e) => {
          setCharCount(e.target.value.length)
          onChange(e)
        }}
        {...rest}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-red-600"
          >
            {error.message}
          </p>
        )}
        <p
          className={`text-xs ml-auto ${
            remaining < 50 ? 'text-amber-600' : 'text-bark-light/60'
          }`}
          aria-live="polite"
        >
          {t('contact.form.charactersRemaining', { count: remaining })}
        </p>
      </div>
    </div>
  )
}
