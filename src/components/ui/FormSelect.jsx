import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function FormSelect({
  label,
  name,
  options = [],
  error,
  register,
  required = false,
  className = '',
}) {
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-bark mb-1"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      <div className="relative">
        <select
          id={name}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={`input-base appearance-none pr-10 ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-wool-dark'
          }`}
          {...register(name)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bark-light pointer-events-none"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-sm text-red-600"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}
