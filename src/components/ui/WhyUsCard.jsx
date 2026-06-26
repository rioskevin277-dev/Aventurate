import React from 'react'
import { MapPin, Users, Leaf, Compass } from 'lucide-react'

const iconMap = { MapPin, Users, Leaf, Compass }

export default function WhyUsCard({ icon, title, description }) {
  const IconComponent = iconMap[icon]
  if (!IconComponent) return null

  return (
    <div className="flex items-start gap-4 py-4 border-b border-white/10 last:border-b-0">
      <div className="flex-shrink-0 mt-1">
        <IconComponent size={24} className="text-gold-light" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-lg text-white mb-1">{title}</h3>
        <p className="text-wool-dark text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
