import React from 'react'

export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
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
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        className={`input-base ${
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-wool-dark'
        }`}
        {...register(name)}
      />
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
