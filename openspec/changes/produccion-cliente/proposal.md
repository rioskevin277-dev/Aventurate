# Propuesta: produccion-cliente

## Resumen ejecutivo
Llevar la landing page de "funcional" a nivel producción profesional para entrega a cliente: optimización de assets (WebP, video comprimido, OG image), SEO dinámico con react-helmet-async, accesibilidad (reduced-motion, contraste, keyboard), performance (lazy routes, will-change, CLS elimination), y refactor de código (animaciones centralizadas, Error Boundary, constantes). Impacto esperado: Core Web Vitals saludables, experiencia accesible, y código mantenible.

## Scope — Incluye

### Assets / Performance
- OG image 1200×630px en `public/images/og-image.webp`
- Convertir JPGs de `public/images/` a WebP (calidad 80), añadir width + height en HTML
- Comprimir `videohero.mp4` (<2 MB, H.265 + WebM fallback), `preload="metadata"`, eliminar duplicado en `videos/`
- Lazy-load rutas con `React.lazy()` para ContactPage y ExperiencePage
- Añadir `will-change: transform` a elementos con animaciones continuas

### SEO Dinámico
- Integrar `react-helmet-async` — HelmetProvider en App.jsx
- Meta tags dinámicos en ExperiencePage (title, description, og:image, og:url desde data de experiencia)
- Lang dinámico en `<html>` + hreflang alternates por idioma
- `sitemap.xml` (3 URLs: /, /contacto, /experiencia/lana) y `robots.txt` en `public/`

### Accesibilidad
- `prefers-reduced-motion` en TODOS los componentes Framer Motion (uso de `useReducedMotion`)
- Corregir contraste gold/wool en SectionHeading (subir gold a #8B6914 o añadir text-shadow)
- Traducir `aria-label` del carrusel de testimonios vía i18next
- Cerrar menú mobile con tecla Escape en Navbar

### Código / Refactor
- Implementar API real en `useFormSubmit` (fetch con try/catch, endpoint desde `VITE_API_URL`, manejo de errores)
- Remover `@import url()` de `index.css` (fonts ya cargadas desde `index.html`)
- Clases base compartidas para inputs via `@layer components` en Tailwind
- Centralizar variantes de animación en `src/lib/animations.js`
- Separar `INTEREST_OPTIONS` y `GROUP_SIZE_OPTIONS` a `src/lib/constants.js`
- Refinar grid de experiencias (reemplazar `nth-child` frágil por grid explícito)
- Agregar favicon (`.ico` 32×32 + `apple-touch-icon` 180×180) en `public/` + link en `index.html`
- Añadir Error Boundary class-based envolviendo `<Routes>` en App.jsx

## Scope — Excluye (explícitamente)
- **PWA manifest.json + service worker** — scope completo aparte, requiere estrategia de caching offline
- **rollup-plugin-visualizer** — herramienta interna de dev, no impacta entregable a cliente
- **Prefetch ruta /contacto** — optimización especulativa sin datos de navegación reales
- **Extraer NotFound a archivo propio / staggerChildren / cerrar modal click-outside / eliminar carpeta imagen/** — P2 menor, se difiere a cambio futuro de polish
- **Pruebas automatizadas (Vitest, Playwright)** — requiere cambio separado de infraestructura de testing

## Enfoque técnico

### Assets / Performance
- **Imágenes**: Usar `sharp` (vía script Node) para convertir batch: `sharp(input).webp({ quality: 80 }).toFile(output)`. Añadir `width` y `height` nativos en cada `<img>` con los valores originales de los JPG.
- **Video**: `ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium output.mp4` + versión WebM con `libvpx-vp9 -crf 30 -b:v 0`. `<video>` con dos `<source>` (WebM primero, MP4 segundo) y `preload="metadata"`.
- **OG Image**: Diseño con texto "La Ruta de la Lana — Marulanda, Caldas" + logo, exportado a WebP.
- **Lazy routes**: `const ContactPage = React.lazy(() => import('./pages/ContactPage'))` + `<Suspense fallback={<Spinner />}>` en App.jsx.
- **will-change**: Añadir `style={{ willChange: 'transform' }}` solo en elementos con animación continua (Sheep flotando, cards con hover scale).

### SEO Dinámico
- Instalar `react-helmet-async`. `HelmetProvider` envuelve App en main.jsx.
- Componente `SEOHead` reutilizable que recibe `{ title, description, image, url }` y renderiza `<Helmet>` con tags Open Graph y Twitter Card.
- En `main.jsx`, suscribirse a cambio de idioma de i18next para actualizar `document.documentElement.lang` e inyectar `<link rel="alternate" hreflang="...">`.
- `sitemap.xml` estático con prioridades: `1.0` para `/`, `0.8` para `/contacto`, `0.9` para experiencias.

### Accesibilidad
- **Reduced motion**: En cada `motion.div` con animación, condicionar con `const shouldReduce = useReducedMotion()` y pasar `animate={shouldReduce ? { opacity: 1 } : fullVariant}`.
- **Contraste**: WCAG AA requiere ratio ≥ 4.5:1. Gold #B8860B sobre wool #F5E6D0 da ~2.8:1. Cambiar gold a #8B6914 (más oscuro) o mantener color con `text-shadow: 0 1px 2px rgba(0,0,0,0.3)` como mejora visual.
- **Aria-labels**: En TestimonialSection, labels de botones "Anterior"/"Siguiente" e indicador de slide actual traducidos desde i18next.
- **Keyboard**: En Navbar, `<div role="dialog" onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}>`.

### Código / Refactor
- **useFormSubmit**: Cambiar de console.log a `fetch(import.meta.env.VITE_API_URL + '/contact', { method: 'POST', body: formData })`. Manejar 200 → success toast, 4xx/5xx → error message contextual.
- **@layer components**: `@layer components { .input-base { @apply w-full rounded-lg border border-wool-300 px-4 py-2 text-foreground bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-200; } }`
- **animations.js**: Extraer `fadeInUp`, `staggerContainer`, `scaleIn`, `slideInLeft` como objetos exportados. Cada componente importa desde allí.
- **constants.js**: Mover arrays desde ContactSection.
- **Grid**: Reemplazar `&:nth-child(3n+2)` por `<div className="md:col-span-2 md:row-span-2">` y variantes según layout deseado.
- **Favicon**: Generar .ico con 32×32 y apple-touch-icon 180×180 (usar https://realfavicongenerator.net). Linkear en `<head>` de index.html.
- **Error Boundary**: Clase `class ErrorBoundary extends React.Component` con `componentDidCatch` y estado `hasError`. Renderiza UI amigable con botón "Volver al inicio".

## Riesgos
| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Conversión a WebP degrada calidad de hero-bg (gradiente + texto) | Media | Comparar visualmente. Si no pasa, mantener JPEG con `<picture>` y WebP como fallback |
| H.265 no soportado en Safari <13 / Firefox | Media | WebM fallback con `<source type="video/webm">` antes del `<source type="video/mp4">` |
| will-change mal usado causa repaints en GPU | Baja | Limitar a 3-4 elementos identificados, probar con DevTools "Rendering → Paint flashing" |
| react-helmet-async no actualiza meta tags en SPA para crawlers | Baja | Sin SSR no hay solución completa; meta tags funcionan para compartir en redes sociales. Si se requiere SEO total, diferir a cambio con SSR/SSG |

## Dependencias
1. **Asset pipeline** (OG image, WebP, video comprimido) — primero porque meta tags SEO y HTML los referencian
2. **SEO + Accesibilidad** — en paralelo, no tienen dependencias entre sí
3. **Refactor + Performance** — al final, para minimizar conflictos de merge con cambios visuales

## Estimación de esfuerzo
**2-3 días hábiles** (1 persona). La mayoría de cambios son independientes y pueden parallelizarse. El estimado incluye verificación manual en mobile, tablet y desktop.
