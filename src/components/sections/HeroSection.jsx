import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import { WHATSAPP_LINK } from '../../lib/constants'
import { fadeInUp } from '../../lib/animations'

export default function HeroSection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()

  const reduceProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  }

  const anim = (delay = 0) =>
    shouldReduce
      ? { ...reduceProps, transition: { ...reduceProps.transition, delay } }
      : { variants: fadeInUp, initial: 'hidden', animate: 'visible', transition: { delay, duration: 0.7, ease: 'easeOut' } }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero video background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-bg.webp"
          className="w-full h-full object-cover"
          width="1440"
          height="1289"
        >
          <source src="/videohero.webm" type="video/webm" />
          <source src="/videohero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bark/60 via-bark/40 to-bark/70"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
        <motion.span
          {...anim(0)}
          className="inline-block text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-light font-medium mb-6"
        >
          {t('hero.siteName')}
        </motion.span>

        <motion.h1
          {...anim(0.2)}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          {...anim(0.4)}
          className="text-base sm:text-lg text-mist max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          {...anim(0.6)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contacto" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full">
              {t('hero.cta')}
            </Button>
          </Link>
          <Button variant="whatsapp" href={WHATSAPP_LINK}>
            {t('hero.whatsapp')}
          </Button>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#destino"
        aria-label={t('hero.scrollLabel')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} className="text-gold-light" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  )
}
