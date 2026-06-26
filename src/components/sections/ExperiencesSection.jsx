import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ExperienceCard from '../ui/ExperienceCard'
import useScrollReveal from '../../hooks/useScrollReveal'
import { experiences } from '../../data/experiences'

export default function ExperiencesSection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="experiencias" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('experiencias.heading')}
          subtitle={t('experiencias.subtitle')}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduce ? 0.3 : 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8"
        >
          {experiences.map((exp, i) => {
            const isLastOdd = i === experiences.length - 1 && experiences.length % 2 !== 0
            return (
              <div
                key={exp.id}
                className={isLastOdd ? 'md:col-span-2 md:justify-self-center md:max-w-md md:w-full' : ''}
              >
                <ExperienceCard
                  id={exp.id}
                  icon={exp.icon}
                  title={t(`${exp.tKey}.title`)}
                  description={t(`${exp.tKey}.description`)}
                  image={exp.image}
                />
              </div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduce ? 0.3 : 0.5, ease: 'easeOut', delay: shouldReduce ? 0 : 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-moss text-white rounded-xl font-medium text-lg hover:bg-moss-dark transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
          >
            {t('experiencias.cta')}
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
