import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Cloud, TreePalm, Scissors, ArrowRight } from 'lucide-react'

const iconMap = { Cloud, TreePalm, Scissors }

export default function ExperienceCard({ id, icon, title, description, image }) {
  const { t } = useTranslation()
  const IconComponent = iconMap[icon]
  if (!IconComponent) return null

  return (
    <Link
      to={`/experiencia/${id}`}
      className="group block bg-wool rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 flex flex-col"
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden">
          <picture>
            <source srcSet={image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={image}
              alt={title}
              width="640"
              height="1136"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </picture>
        </div>
      )}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="mb-5">
          <IconComponent size={40} className="text-moss" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-bark mb-3">
          {title}
        </h3>
        <p className="text-bark-light leading-relaxed text-sm sm:text-base flex-1">
          {description}
        </p>
        <span className="inline-flex items-center gap-1 mt-5 text-moss font-medium text-sm sm:text-base opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          {t('experiencias.verMas')}
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
