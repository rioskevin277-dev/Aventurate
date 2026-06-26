import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_NAME } from '../../lib/constants'
import LanguageSwitcher from '../ui/LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = React.useRef(null)
  const hamburgerRef = React.useRef(null)

  const navLinks = [
    { label: t('nav.destino'), href: '/#destino' },
    { label: t('nav.experiencias'), href: '/#experiencias' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Focus management: when menu opens, focus the dialog container
  useEffect(() => {
    if (menuOpen) {
      // Small timeout to let the animation start, then focus
      const timer = setTimeout(() => {
        menuRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [menuOpen])

  const handleLinkClick = () => {
    setMenuOpen(false)
    // Return focus to hamburger after closing
    hamburgerRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false)
      // Return focus to hamburger button
      hamburgerRef.current?.focus()
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center h-16 md:h-20"
        aria-label={t('nav.ariaLabel')}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className={`justify-self-start rounded-lg transition-all duration-300 ${
            scrolled ? '' : 'bg-white/20 backdrop-blur-sm p-1.5'
          }`}
        >
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img
              src="/images/logo.jpg"
              alt={SITE_NAME}
              width="1080"
              height="1080"
              className="h-10 md:h-12 w-auto"
            />
          </picture>
        </Link>

        {/* Center: Site name */}
        <Link
          to="/"
          className={`justify-self-center font-display text-lg md:text-2xl font-bold tracking-wide transition-colors duration-300 hidden sm:block ${
            scrolled ? 'text-bark' : 'text-white'
          }`}
        >
          {SITE_NAME}
        </Link>

        {/* Right: Desktop links */}
        <div className="justify-self-end hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                    scrolled ? 'text-bark-light' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher scrolled={scrolled} />
          <Link
            to="/contacto"
            className="px-4 py-2 rounded-lg bg-moss text-white text-sm font-medium hover:bg-moss-dark transition-colors"
          >
            {t('nav.contacto')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold ${
            scrolled ? 'text-bark' : 'text-white'
          }`}
          aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.ariaLabel')}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden border-b border-wool-dark"
          >
            <ul className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className="block py-2 text-bark font-medium text-lg hover:text-moss transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-wool-dark">
                <Link
                  to="/contacto"
                  onClick={handleLinkClick}
                  className="block py-2 text-moss font-semibold text-lg hover:text-moss-dark transition-colors"
                >
                  {t('nav.contacto')}
                </Link>
              </li>
              <li className="pt-2 border-t border-wool-dark">
                <div className="py-2">
          <LanguageSwitcher scrolled={true} />
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
