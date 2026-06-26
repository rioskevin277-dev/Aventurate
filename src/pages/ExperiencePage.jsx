import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  BarChart3,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { experiences } from '../data/experiences'
import SEOHead from '../components/seo/SEOHead'
import Button from '../components/ui/Button'
import { fadeInUp, staggerContainer } from '../lib/animations'

const difficultyStyles = {
  easy: 'bg-green-100 text-moss-dark border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
}

export default function ExperiencePage() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()
  const { id } = useParams()
  const experience = experiences.find((exp) => exp.id === id)

  const fadeIn = shouldReduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : fadeInUp

  const stagger = shouldReduce
    ? { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }
    : staggerContainer

  if (!experience) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-bark mb-4">
          {t('experiencePage.notFound')}
        </h1>
        <p className="text-bark-light text-lg mb-8 max-w-md">
          {t('experiencePage.notFoundMsg')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-white rounded-lg font-medium hover:bg-moss-dark transition-colors"
        >
          <ArrowLeft size={18} />
          {t('experiencePage.404back')}
        </Link>
      </div>
    )
  }

  const expTitle = t(`${experience.tKey}.title`)
  const expSubtitle = t(`${experience.tKey}.subtitle`)
  const expDuration = t(`${experience.tKey}.duration`)
  const expDifficulty = t(`${experience.tKey}.difficulty`)
  const expLongDescription = t(`${experience.tKey}.longDescription`)
  const expIncludes = t(`${experience.tKey}.includes`, { returnObjects: true })
  const expItinerary = t(`${experience.tKey}.itinerary`, { returnObjects: true })
  const expWhatToBring = t(`${experience.tKey}.whatToBring`, { returnObjects: true })
  const expTips = t(`${experience.tKey}.tips`)

  return (
    <>
      <SEOHead
        title={expTitle}
        description={expSubtitle}
        image={experience.image || undefined}
        url={`/experiencia/${id}`}
      />
      <article>
      {/* Hero Banner */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] max-h-[600px] overflow-hidden pt-16 md:pt-20">
        {experience.image ? (
          <picture>
            <source srcSet={experience.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={experience.image}
              alt={expTitle}
              width="1440"
              height="1567"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-moss to-moss-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-20 md:top-24 left-4 sm:left-6 z-10">
            <Link
              to="/#experiencias"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-bark rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-sm"
            >
            <ArrowLeft size={16} />
            {t('experiencePage.backToExperiencias')}
            </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0.3 : 0.5 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 leading-tight"
            >
              {expTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0.3 : 0.5, delay: shouldReduce ? 0 : 0.15 }}
              className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl"
            >
              {expSubtitle}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Info cards: Duration & Difficulty */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-4 p-5 bg-mist/50 rounded-xl border border-mist"
          >
            <div className="flex-shrink-0 w-11 h-11 bg-moss/10 rounded-lg flex items-center justify-center">
              <Clock size={22} className="text-moss" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-bark-light mb-1 font-medium">
                {t('experiencePage.duration')}
              </p>
              <p className="text-bark font-medium">{expDuration}</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-4 p-5 bg-mist/50 rounded-xl border border-mist"
          >
            <div className="flex-shrink-0 w-11 h-11 bg-moss/10 rounded-lg flex items-center justify-center">
              <BarChart3 size={22} className="text-moss" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-bark-light mb-1 font-medium">
                {t('experiencePage.difficulty')}
              </p>
              <span
                className={`inline-block px-3 py-0.5 rounded-full text-sm font-medium border ${
                  difficultyStyles[experience.difficultyKey]
                }`}
              >
                {expDifficulty}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Long description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-bark-light leading-relaxed text-base sm:text-lg"
          >
            {expLongDescription}
          </motion.p>
        </motion.div>

        {/* ¿Qué incluye? */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl text-bark mb-6"
          >
            {t('experiencePage.includes')}
          </motion.h2>
          <motion.ul variants={stagger} className="space-y-3">
            {Array.isArray(expIncludes) && expIncludes.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-moss/10 rounded-full flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-moss" />
                </span>
                <span className="text-bark-light">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Itinerario */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl text-bark mb-6"
          >
            {t('experiencePage.itinerary')}
          </motion.h2>
          <motion.ol variants={stagger} className="space-y-4">
            {Array.isArray(expItinerary) && expItinerary.map((step, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-bark-light pt-1">{step}</span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.section>

        {/* ¿Qué llevar? */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl text-bark mb-6"
          >
            {t('experiencePage.whatToBring')}
          </motion.h2>
          <motion.ul variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.isArray(expWhatToBring) && expWhatToBring.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <ChevronRight size={18} className="text-moss flex-shrink-0 mt-0.5" />
                <span className="text-bark-light">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Consejo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="bg-wool rounded-xl p-6 sm:p-8 border-l-4 border-gold"
          >
            <h3 className="font-display text-xl text-bark mb-2">{t('experiencePage.tip')}</h3>
            <p className="text-bark-light leading-relaxed">{expTips}</p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center pt-8 border-t border-mist"
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl text-bark mb-3"
          >
            {t('experiencePage.ctaTitle')}
          </motion.h2>
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.4 }}
            className="text-bark-light text-lg mb-8 max-w-lg mx-auto"
          >
            {t('experiencePage.ctaBody')}
          </motion.p>
          <motion.div variants={fadeIn} transition={{ duration: 0.4 }}>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-moss text-white rounded-xl font-medium text-lg hover:bg-moss-dark transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
            >
              {t('experiencePage.ctaButton')}
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </article>
    </>
  )
}
