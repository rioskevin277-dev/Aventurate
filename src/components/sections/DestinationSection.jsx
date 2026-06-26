import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function DestinationSection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section id="destino" className="py-20 md:py-28 bg-wool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={t('destino.tag')}
          title={t('destino.title')}
        />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8"
        >
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduce ? 0.3 : 0.6, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <p className="text-bark-light leading-relaxed text-sm sm:text-base mb-4">
              {t('destino.p1')}
            </p>
            <p className="text-bark-light leading-relaxed text-sm sm:text-base mb-4">
              {t('destino.p2')}
            </p>
            <p className="text-bark-light leading-relaxed text-sm sm:text-base">
              {t('destino.p3')}
            </p>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduce ? 0.3 : 0.6, ease: 'easeOut', delay: shouldReduce ? 0 : 0.15 }}
            className="order-1 lg:order-2"
          >
            <picture>
              <source srcSet="/images/marulanda-pueblo.webp" type="image/webp" />
              <img
                src="/images/marulanda-pueblo.jpg"
                alt={t('destino.imgAlt')}
                width="1152"
                height="2048"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-lg"
                loading="lazy"
              />
            </picture>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
