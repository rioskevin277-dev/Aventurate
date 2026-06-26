import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ContactSection from '../components/sections/ContactSection'
import WhatsAppButton from '../components/ui/WhatsAppButton'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-wool">
      {/* Top bar with back button */}
      <div className="pt-24 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-moss hover:text-moss-dark transition-colors font-medium text-sm"
            >
              <ArrowLeft size={18} />
              {t('contact.backToHome')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Full contact section */}
      <ContactSection />

      <WhatsAppButton />
    </div>
  )
}
