import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://larutadelalana.co'
const DEFAULT_OG_IMAGE = '/images/og-image.webp'

/**
 * SEOHead — Componente reutilizable para meta tags SEO.
 *
 * @param {string}  title       - Título de la página (se concatena con " | La Ruta de la Lana")
 * @param {string}  description - Meta description
 * @param {string}  [image]     - URL de la imagen OG (default: /images/og-image.webp)
 * @param {string}  [url]       - Ruta relativa (ej: "/experiencia/lana")
 */
export default function SEOHead({ title, description, image = DEFAULT_OG_IMAGE, url = '/' }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const fullTitle = title ? `${title} | La Ruta de la Lana` : 'La Ruta de la Lana — Turismo Regenerativo en Marulanda, Caldas'
  const fullUrl = `${SITE_URL}${url}`
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={currentLang === 'es' ? 'es_CO' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="es" href={`${SITE_URL}${currentLang === 'en' ? '/en' : ''}${url}`} />
      <link rel="alternate" hreflang="en" href={`${SITE_URL}/en${url}`} />
    </Helmet>
  )
}
