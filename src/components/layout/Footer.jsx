import React from 'react'
import { Mail, Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WHATSAPP_NUMBER, EMAIL as EMAIL_ADDR, INSTAGRAM, INSTAGRAM_URL, SITE_NAME } from '../../lib/constants'
import WhatsAppIcon from '../ui/WhatsAppIcon'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Logo / About */}
          <div>
            <span className="font-display text-2xl font-bold text-white mb-3 block">
              {SITE_NAME}
            </span>
            <p className="text-wool-dark text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-display text-lg text-gold-light mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-wool-dark">
                <WhatsAppIcon size={16} />
                <span>{WHATSAPP_NUMBER}</span>
              </li>
              <li className="flex items-center gap-2 text-wool-dark">
                <Mail size={16} aria-hidden="true" className="text-wool-dark flex-shrink-0" />
                <a
                  href={`mailto:${EMAIL_ADDR}`}
                  className="hover:text-gold transition-colors"
                >
                  {EMAIL_ADDR}
                </a>
              </li>
              <li className="flex items-center gap-2 text-wool-dark">
                <Instagram size={16} aria-hidden="true" className="text-wool-dark flex-shrink-0" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {INSTAGRAM}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-display text-lg text-gold-light mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-wool-dark hover:text-gold transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-wool-dark hover:text-gold transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-wool-dark/60">
          &copy; {currentYear} {SITE_NAME} — {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
