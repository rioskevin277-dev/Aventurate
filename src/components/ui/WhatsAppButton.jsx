import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../../lib/constants'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappButton.ariaLabel')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ea853] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      style={{ willChange: 'transform' }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{
        repeat: Infinity,
        repeatDelay: 2,
        duration: 0.6,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  )
}
