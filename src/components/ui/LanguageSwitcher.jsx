import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
]

export default function LanguageSwitcher({ scrolled }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = i18n.language?.split('-')[0] || 'es'

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-gold ${
          scrolled ? 'text-bark-light' : 'text-white'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.languageSelector')}
      >
        {current}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1.5 bg-white rounded-lg shadow-lg border border-wool-dark py-1 min-w-[64px] z-50"
          role="listbox"
        >
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => {
                i18n.changeLanguage(code)
                setOpen(false)
              }}
              role="option"
              aria-selected={current === code}
              className={`block w-full text-left px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                current === code
                  ? 'bg-moss/10 text-moss'
                  : 'text-bark-light hover:bg-wool hover:text-moss'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
