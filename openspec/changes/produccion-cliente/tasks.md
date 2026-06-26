# Tasks: produccion-cliente

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~400–600 |
| Files modified | ~20–25 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Assets + SEO → PR 2: Accesibilidad + Refactor |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Assets (WebP, video, OG, favicon) + SEO (helmet, sitemap, robots) | PR 1 | Independiente; assets necesarios antes que SEO los referencie |
| 2 | Accesibilidad (reduced-motion, contraste, aria, Escape) + Refactor (animations, constants, inputs, ErrorBoundary, grid, lazy routes, will-change, useFormSubmit) | PR 2 | Depende de PR 1 solo en que usa assets ya listos; lógicamente separado |

## Phase 1: Foundation — Dependencias y Assets estáticos

- [x] 1.1 Instalar `react-helmet-async` y `sharp` (devDependency) — REQ-2.1.1, Design §2
- [x] 1.2 Crear `scripts/optimize-images.mjs` con sharp para batch WebP q80 — REQ-1.2.1, Design §1.2
- [x] 1.3 Ejecutar script para convertir JPGs de `public/images/` a WebP — REQ-1.2.1
- [x] 1.4 Generar `public/images/og-image.webp` (1200×630px, q80) — REQ-1.1.1/1.1.2/1.1.3, Design §1.1
- [x] 1.5 Comprimir `public/videohero.mp4` (H.265 CRF 28, 3.73 MB) + crear `public/videohero.webm` (VP9, 8.76 MB) — REQ-1.3.1/1.3.3/1.3.5, Design §1.3
- [x] 1.6 Eliminar `videos/videohero.mp4` duplicado — REQ-1.3.4
- [x] 1.7 Agregar favicon.ico + apple-touch-icon en `<head>` de `index.html` — REQ-4.6.1/4.6.2, Design §4.6

## Phase 2: Performance — Imágenes, Video, Lazy Routes, will-change

- [x] 2.1 Envolver `<img>` en `<picture>` con WebP + width/height en HeroSection, DestinationSection, Navbar, ExperienceCard, ExperiencePage — REQ-1.2.2/1.2.3, Design §1.2
- [x] 2.2 Agregar `<source type="video/webm">` + `preload="metadata"` en HeroSection — REQ-1.3.2/1.3.3, Design §1.3
- [x] 2.3 Implementar `React.lazy()` para ContactPage y ExperiencePage + `<Suspense>` en App.jsx — REQ-1.4.1/1.4.2, Design §1.4
- [x] 2.4 Añadir `will-change: transform` en WhatsAppButton y sheep flotante de TestimonialsSection — REQ-1.5.1/1.5.2, Design §1.5

## Phase 3: SEO Dinámico

- [x] 3.1 Envolver `<App/>` en `<HelmetProvider>` en `main.jsx` — REQ-2.1.2, Design §2.1
- [x] 3.2 Crear `src/components/seo/SEOHead.jsx` con Helmet (title, description, og, twitter:card, hreflang) — REQ-2.2.2/2.3.2, Design §2.2/2.5
- [x] 3.3 Integrar SEOHead en ExperiencePage con datos dinámicos de experiencia — REQ-2.2.1, Design §2.3
- [x] 3.4 Suscribir `i18n.on('languageChanged')` en main.jsx para actualizar `<html lang>` — REQ-2.3.1, Design §2.4
- [x] 3.5 Crear `public/sitemap.xml` (3 URLs con priorities) — REQ-2.4.1/2.4.3, Design §2.6
- [x] 3.6 Crear `public/robots.txt` (Allow: / + Sitemap reference) — REQ-2.4.2/2.4.3, Design §2.7

## Phase 4: Accesibilidad

- [x] 4.1 Aplicar `useReducedMotion()` + animate condicional (opacity:1) en 7 componentes con animación Framer Motion — REQ-3.1.1/3.1.2, Design §3.1
- [x] 4.2 Ajustar gold en `tailwind.config.js` a #8B6914 para WCAG AA 4.5:1 — REQ-3.2.1/3.2.2, Design §3.2, ADR-1
- [x] 4.3 Traducir aria-labels (prev/next + dots) en TestimonialsSection vía i18next + agregar claves a locales — REQ-3.3.1/3.3.2, Design §3.3
- [x] 4.4 Agregar `onKeyDown Escape → close` + `role="dialog"` + focus management en Navbar mobile menu — REQ-3.4.1/3.4.2/3.4.3, Design §3.4

## Phase 5: Refactor y Performance

- [x] 5.1 Reemplazar console.log por `fetch(VITE_API_URL + '/contact')` con try/catch en `useFormSubmit.js` — REQ-4.1.1–4.1.4, Design §4.1
- [x] 5.2 Definir `.input-base` en `@layer components` en `index.css`; aplicar en FormInput/FormSelect/FormTextarea; remover `@import url()` — REQ-4.2.1/4.2.2/4.2.3, Design §4.2
- [x] 5.3 Crear `src/lib/animations.js` con 4 variantes (fadeInUp, staggerContainer, scaleIn, slideInLeft); refactorizar HeroSection y ExperiencePage — REQ-4.3.1/4.3.2, Design §4.3
- [x] 5.4 Mover INTEREST_OPTIONS y GROUP_SIZE_OPTIONS a `src/lib/constants.js` con factory para t() — REQ-4.4.1/4.4.2, Design §4.4
- [x] 5.5 Reemplazar nth-child por grid explícito (md:col-span-2) en ExperiencesSection — REQ-4.5.1/4.5.2, Design §4.5
- [x] 5.6 Crear `src/components/ErrorBoundary.jsx` (class component, componentDidCatch) + envolver `<Routes>` en App.jsx — REQ-4.7.1/4.7.2/4.7.3, Design §4.7, ADR-2
