import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import WhyUsCard from '../ui/WhyUsCard'
import useScrollReveal from '../../hooks/useScrollReveal'

const whyUsIcons = ['MapPin', 'Users', 'Leaf', 'Compass']

export default function WhyUsSection() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section className="py-20 md:py-28 bg-moss">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          title={t('whyUs.heading')}
        />

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-wool-dark text-center max-w-3xl mx-auto mb-12 text-sm sm:text-base leading-relaxed"
        >
          {t('whyUs.body')}
        </motion.p>

        <div className="max-w-2xl mx-auto mt-8">
          {whyUsIcons.map((icon, i) => (
            <WhyUsCard
              key={icon}
              icon={icon}
              title={t(`whyUs.cards.${i}.title`)}
              description={t(`whyUs.cards.${i}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
