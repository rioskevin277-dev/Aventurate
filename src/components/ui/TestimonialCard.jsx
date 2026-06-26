import React from 'react'

export default function TestimonialCard({ quote, author, location }) {
  return (
    <article className="bg-wool rounded-xl p-6 sm:p-8 border border-wool-dark/20 relative">
      {/* Decorative quote mark */}
      <span
        className="absolute top-4 left-4 text-7xl font-display text-gold opacity-20 leading-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote className="relative">
        <p className="text-bark-light italic leading-relaxed text-sm sm:text-base mb-5 pt-4">
          {quote}
        </p>
        <footer>
          <cite className="not-italic font-semibold text-bark block text-sm sm:text-base">
            {author}
          </cite>
          <span className="text-bark-light/70 text-xs sm:text-sm">
            {location}
          </span>
        </footer>
      </blockquote>
    </article>
  )
}
