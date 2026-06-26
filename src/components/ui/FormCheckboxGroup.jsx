import React from 'react'
import { useController } from 'react-hook-form'
import { Check } from 'lucide-react'

export default function FormCheckboxGroup({
  label,
  name,
  options = [],
  error,
  control,
  required = false,
}) {
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  })

  const errorId = `${name}-error`

  const toggleOption = (value) => {
    const current = field.value || []
    if (current.includes(value)) {
      field.onChange(current.filter((v) => v !== value))
    } else {
      field.onChange([...current, value])
    }
  }

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-bark mb-3">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </legend>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        role="group"
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((opt) => {
          const checked = (field.value || []).includes(opt.value)
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm select-none ${
                checked
                  ? 'border-moss bg-moss/5 text-bark'
                  : 'border-wool-dark bg-white text-bark-light hover:border-earth/30'
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => toggleOption(opt.value)}
                className="sr-only"
              />
              <span
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  checked
                    ? 'bg-moss border-moss text-white'
                    : 'border-wool-dark bg-white'
                }`}
                aria-hidden="true"
              >
                {checked && <Check className="w-3.5 h-3.5" />}
              </span>
              <span>{opt.label}</span>
            </label>
          )
        })}
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error.message}
        </p>
      )}
    </fieldset>
  )
}
