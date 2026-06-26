import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/sections/HeroSection'
import DestinationSection from '../components/sections/DestinationSection'
import ExperiencesSection from '../components/sections/ExperiencesSection'
import WhyUsSection from '../components/sections/WhyUsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import ScrollToTop from '../components/ui/ScrollToTop'

function CtASection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()

  const animProps = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: shouldReduce ? 0.3 : 0.6, delay: shouldReduce ? 0 : delay },
  })

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-bark to-bark-light relative overflow-hidden">
      {/* Decorative wool texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #c9a96e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.span
          {...animProps()}
          className="inline-block text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-light font-medium mb-6"
        >
          {t('ctaSection.tag')}
        </motion.span>

        <motion.h2
          {...animProps(0.15)}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6"
        >
          {t('ctaSection.title')}
        </motion.h2>

        <motion.p
          {...animProps(0.3)}
          className="text-base sm:text-lg text-mist max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t('ctaSection.body')}
        </motion.p>

        <motion.div
          {...animProps(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bark rounded-xl font-semibold text-lg hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
          >
            {t('ctaSection.cta')}
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <DestinationSection />
      <ExperiencesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtASection />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
