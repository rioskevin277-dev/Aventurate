# Design: produccion-cliente

## Resumen de arquitectura

6 cambios paralelos sobre la misma base: assets/performance, SEO dinámico, accesibilidad, refactor de código. El orden de ejecución importa parcialmente — assets (WebP, OG image) deben existir antes que SEO los referencie. El resto puede ejecutarse en cualquier orden porque operan sobre archivos distintos. No se requieren nuevas dependencias npm excepto `react-helmet-async` (SEO). Los scripts de assets (optimize-images.mjs) son herramientas dev, no afectan el bundle.

## 1. Assets y Performance

| Ítem | Archivos | Patrón | Deps |
|------|----------|--------|------|
| **1.1 OG Image** | `public/images/og-image.webp` | 1200×630, WebP q80. Contenido: "La Ruta de la Lana — Marulanda, Caldas". Crear con sharp script o herramienta externa. | Ninguna |
| **1.2 WebP batch** | `scripts/optimize-images.mjs` | Lee `public/images/*.{jpg,jpeg,png}`, produce `*.webp` al lado con sharp. | `npm i -D sharp` |
| **1.2 `<picture>` wrapper** | `HeroSection.jsx`, `DestinationSection.jsx`, `Navbar.jsx`, `ExperienceCard.jsx`, `ExperiencePage.jsx` | `<picture><source srcSet="/img.webp" type="image/webp"/><img src="/img.jpg" width="X" height="Y" alt="..."/></picture>` con width/height nativos desde los JPG originales. | 1.2 completo |
| **1.3 Video hero** | `public/videohero.mp4` (sobrescribir), `public/videohero.webm`, `videos/videohero.mp4` (eliminar) | ffmpeg: H.265 CRF 28 + VP9 CRF 30. En HeroSection, agregar `<source type="video/webm">` antes del MP4, `preload="metadata"`. | ffmpeg CLI |
| **1.4 Lazy routes** | `src/App.jsx` | `const ContactPage = React.lazy(() => import('./pages/ContactPage'))` — idem para ExperiencePage. LandingPage queda eager. | Suspense ya existe |
| **1.5 will-change** | `WhatsAppButton.jsx`, `TestimonialsSection.jsx` | `style={{ willChange: 'transform' }}` en el `motion.a` (WhatsApp) y `motion.div` flotante (Sheep). | Ninguna |

### Script de optimización (`scripts/optimize-images.mjs`)
```js
import sharp from 'sharp'
import { glob } from 'fs/promises'
for await (const file of glob('public/images/*.{jpg,jpeg,png}')) {
  const out = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  await sharp(file).webp({ quality: 80 }).toFile(out)
}
```

## 2. SEO Dinámico

| Ítem | Archivos | Patrón | Deps |
|------|----------|--------|------|
| **2.1 react-helmet-async** | `package.json`, `src/main.jsx` | `npm install react-helmet-async`. En main.jsx: `<HelmetProvider><App/></HelmetProvider>`. | `react-helmet-async` |
| **2.2 SEOHead component** | `src/components/seo/SEOHead.jsx` (CREAR) | Componente puro que recibe `{ title, description, image, url }` y renderiza `<Helmet>`. Ver API abajo. | 2.1 |
| **2.3 Meta tags en ExperiencePage** | `src/pages/ExperiencePage.jsx` | `<SEOHead title={...} description={...} image={exp.image} url={'/experiencia/'+id} />` | 2.2 |
| **2.4 Lang dinámico** | `src/i18n.js` + `src/main.jsx` | `i18n.on('languageChanged', (lng) => { document.documentElement.lang = lng })` en main.jsx | i18next (ya existe) |
| **2.5 hreflang** | `src/components/seo/SEOHead.jsx` | Dentro de `<Helmet>`: `<link rel="alternate" hreflang="es" href="..."/><link rel="alternate" hreflang="en" href="..."/>` | 2.2 |
| **2.6 sitemap.xml** | `public/sitemap.xml` (CREAR) | 3 URLs: `/` (1.0), `/contacto` (0.8), `/experiencia/lana` (0.9) | Ninguna |
| **2.7 robots.txt** | `public/robots.txt` (CREAR) | `User-agent: *\nAllow: /\nSitemap: https://larutadelalana.co/sitemap.xml` | Ninguna |

### API del componente SEOHead
```jsx
SEOHead({ title, description, image, url })
// Renderiza: <Helmet>
//   <title>{title} | La Ruta de la Lana</title>
//   <meta name="description" content={description} />
//   <meta property="og:title" content={title} />
//   <meta property="og:description" content={description} />
//   <meta property="og:image" content={image} />
//   <meta property="og:url" content={url} />
//   <meta name="twitter:card" content="summary_large_image" />
//   <link rel="alternate" hreflang="es" href={`https://larutadelalana.co${url}`} />
//   <link rel="alternate" hreflang="en" href={`https://larutadelalana.co/en${url}`} />
// </Helmet>
// title default: site name
// image default: /images/og-image.webp
```

## 3. Accesibilidad

| Ítem | Archivos | Patrón |
|------|----------|--------|
| **3.1 prefers-reduced-motion** | `HeroSection.jsx`, `DestinationSection.jsx`, `ExperiencesSection.jsx`, `LandingPage.jsx` (CtaSection), `TestimonialsSection.jsx`, `ContactSection.jsx`, `ExperiencePage.jsx` | `const shouldReduce = useReducedMotion()` de framer-motion. En cada `motion.*` con animación: `animate={shouldReduce ? { opacity: 1 } : variant}`. NO tocar animaciones inline de `Sheep.jsx` ni `WhatsAppButton.jsx` (son decorativas, no bloquean uso). |
| **3.2 Contraste gold/wool** | `tailwind.config.js` | Cambiar `gold: '#C8A96E'` → `'#8B6914'` (WCAG AA ≥ 4.5:1 sobre wool #F5E6D0). Mantener `gold-light` (#D4BC8E) solo para fondos oscuros. |
| **3.3 Aria-labels traducidos** | `TestimonialsSection.jsx` | Botones: `aria-label={t('testimonials.prev')}` / `aria-label={t('testimonials.next')}`. Dots: `aria-label={t('testimonials.goTo', { n: i+1 })}`. Agregar claves al JSON de locales. |
| **3.4 Escape en Navbar** | `Navbar.jsx` | En el `motion.div` del menú mobile: agregar `onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}` + `role="dialog"`. En el efecto de menuOpen, agregar focus management: `if (menuOpen) menuRef.current?.focus()` con `tabIndex={-1}`. |

## 4. Código y Refactor

| Ítem | Archivos | Patrón |
|------|----------|--------|
| **4.1 API real en useFormSubmit** | `src/hooks/useFormSubmit.js` | Reemplazar mock por: `const res = await fetch(import.meta.env.VITE_API_URL + '/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })`. Si `!res.ok` → throw. Catch → setStatus('error'). El contrato queda: `{ status: 'idle'|'submitting'|'success'|'error', submitLead: (data) => Promise<{success, error?}>, reset: () => void }`. |
| **4.2 Clases base inputs** | `src/index.css` | Agregar antes de `@tailwind utilities`: `@layer components { .input-base { @apply w-full rounded-lg border border-wool-dark bg-white px-4 py-3 text-bark placeholder:text-bark-light/50 focus:border-transparent focus:ring-2 focus:ring-moss focus:outline-none transition-shadow text-sm; } }`. Aplicar en `FormInput.jsx`, `FormSelect.jsx`, `FormTextarea.jsx`. Remover `@import url()` de index.css. |
| **4.3 Animaciones centralizadas** | `src/lib/animations.js` (CREAR) | Exportar: `fadeInUp`, `staggerContainer`, `scaleIn`, `slideInLeft` (ver variantes abajo). Refactorizar `HeroSection.jsx`, `ExperiencePage.jsx` para importar desde allí. |
| **4.4 Constantes extraídas** | `src/lib/constants.js`, `ContactSection.jsx` | Mover `INTEREST_OPTIONS` y `GROUP_SIZE_OPTIONS` a `constants.js`. ContactSection los importa. Nota: los labels usan `t()` dinámico — pasar función t o exportar factory `createInterestOptions(t)`. |
| **4.5 Grid experiencias** | `ExperiencesSection.jsx` | Reemplazar `[&>*:last-child:nth-child(odd)]` por layout explícito. Separar en 2 grupos: primer y segundo par en grid definido, o usar `<div className="md:col-span-2">` para card destacada. |
| **4.6 Favicon** | `public/favicon.ico`, `public/apple-touch-icon.png` + `index.html` | Linkear en `<head>`: `<link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="apple-touch-icon" href="/apple-touch-icon.png">`. |
| **4.7 Error Boundary** | `src/components/ErrorBoundary.jsx` (CREAR) + `src/App.jsx` | Class component con `state = { hasError: false }`. `static getDerivedStateFromError() { return { hasError: true } }`. Renderiza UI con botón "Volver al inicio" → `window.location.href = '/'`. Envuelve `<Routes>` en App.jsx. |

### Variantes de animación (`src/lib/animations.js`)
```js
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

### ErrorBoundary UI
```jsx
// Estado: hasError (boolean)
// Render: div centrado con título "Algo salió mal", mensaje "Intenta de nuevo",
//         y botón <a href="/" className="bg-moss text-white rounded-lg px-6 py-3">
//         Volver al inicio</a>
```

## Decisiones de arquitectura

### ADR-1: Gold #8B6914 en vez de text-shadow
| | Opción | Tradeoff |
|---|--------|----------|
| ❌ | text-shadow sobre gold original | Mantiene color bonito pero no resuelve contraste real (ratio sigue <3:1) |
| ✅ | Darken gold a #8B6914 | Pierde un tono cálido, pero cumple WCAG AA (4.6:1) y es mantenible |

### ADR-2: Class component para Error Boundary
| | Opción | Tradeoff |
|---|--------|----------|
| ❌ | Functional + hook custom | `componentDidCatch` no existe en hooks, solo class components |
| ✅ | Class component | Única forma React 18 nativa. No hay alternativa idiomática. |

### ADR-3: H.265 + WebM para video hero
| | Opción | Tradeoff |
|---|--------|----------|
| ❌ | Solo H.264 | Mayor tamaño de archivo (~4-5 MB) vs target <2 MB |
| ✅ | H.265 + WebM VP9 | Mejor compresión. WebM cubre Firefox y Safari <13 que no soportan H.265. |

## Próximos pasos

Ready for `sdd-tasks`. El orden sugerido: (1) dependencias npm, (2) assets pipeline (imágenes, video, favicon), (3) SEO + accesibilidad en paralelo, (4) refactor al final.
