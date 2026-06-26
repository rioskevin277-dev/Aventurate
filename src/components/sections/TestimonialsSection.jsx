import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'
import Sheep from '../ui/Sheep'
import { testimonials } from '../../data/testimonials'

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()
  const [[index, direction], setIndex] = useState([0, 0])

  const slideVariants = shouldReduce
    ? {
        enter: { opacity: 0 },
        center: {
          opacity: 1,
          transition: { duration: 0.3 },
        },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter: (direction) => ({
          x: direction > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
        exit: (direction) => ({
          x: direction > 0 ? -300 : 300,
          opacity: 0,
          transition: { duration: 0.4, ease: 'easeIn' },
        }),
      }

  const paginate = useCallback(
    (newDirection) => {
      setIndex(([current]) => {
        const next = current + newDirection
        if (next < 0) return [testimonials.length - 1, newDirection]
        if (next >= testimonials.length) return [0, newDirection]
        return [next, newDirection]
      })
    },
    []
  )

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  const item = testimonials[index]

  return (
    <section className="py-20 md:py-28 bg-wool overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('testimonials.heading')} />

        <div className="relative flex items-center gap-6 md:gap-10 mt-8 min-h-[220px]">
          {/* Sheep — always visible on the left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-shrink-0 relative z-10"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="relative"
              style={{ willChange: 'transform' }}
            >
              <Sheep />

              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-2 -right-14 md:-right-16 bg-white rounded-2xl rounded-br-sm px-2.5 py-1.5 shadow-md text-xs md:text-sm text-bark font-medium whitespace-nowrap"
              >
                ¡Beee! 🐑
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Carousel track */}
          <div className="flex-1 relative overflow-hidden min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <TestimonialCard
                  quote={t(`${item.tKey}.quote`)}
                  author={t(`${item.tKey}.author`)}
                  location={t(`${item.tKey}.location`)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <div className="flex-shrink-0 flex flex-col gap-2 z-10">
            <button
              onClick={() => paginate(-1)}
              className="w-9 h-9 rounded-full bg-white border border-wool-dark flex items-center justify-center text-bark-light hover:bg-wool hover:text-moss transition-colors shadow-sm"
              aria-label={t('testimonials.prev')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-9 h-9 rounded-full bg-white border border-wool-dark flex items-center justify-center text-bark-light hover:bg-wool hover:text-moss transition-colors shadow-sm"
              aria-label={t('testimonials.next')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-moss w-6' : 'bg-wool-dark hover:bg-moss/40'
              }`}
              aria-label={t('testimonials.goTo', { n: i + 1 })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
