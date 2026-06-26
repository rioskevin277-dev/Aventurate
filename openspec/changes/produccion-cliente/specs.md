# Specs: produccion-cliente

## 1. Assets y Performance

### 1.1 OG Image
- **REQ-1.1.1**: El proyecto MUST incluir `public/images/og-image.webp` con dimensiones exactas de 1200×630px.
- **REQ-1.1.2**: El contenido visual SHOULD mostrar el nombre "La Ruta de la Lana" y "Marulanda, Caldas".
- **REQ-1.1.3**: El archivo MUST estar en formato WebP con calidad ≥ 80.

#### Escenario: Compartir enlace en redes sociales
- GIVEN un usuario comparte la URL de la landing page en WhatsApp o Facebook
- WHEN el enlace se despliega con preview
- THEN la previsualización MUST mostrar la imagen OG en 1200×630px
- AND MUST incluir el texto de la experiencia correspondiente

### 1.2 Optimización de imágenes
- **REQ-1.2.1**: Cada imagen JPG en `public/images/` MUST tener su versión WebP (calidad 80) en el mismo directorio.
- **REQ-1.2.2**: Cada etiqueta `<img>` MUST incluir atributos `width` y `height` explícitos con las dimensiones originales de la imagen.
- **REQ-1.2.3**: El layout MUST mantener el aspect ratio correcto antes de que la imagen cargue (eliminar CLS).

#### Escenario: Carga de hero-bg en conexión lenta
- GIVEN un usuario visita la página con una conexión 3G
- WHEN las imágenes aún no han cargado
- THEN el layout NO MUST experimentar saltos de contenido (CLS = 0)
- AND los contenedores MUST respetar el aspect ratio definido por width/height

### 1.3 Video hero
- **REQ-1.3.1**: El archivo `public/videohero.mp4` MUST pesar ≤ 2 MB.
- **REQ-1.3.2**: La etiqueta `<video>` MUST incluir `preload="metadata"`.
- **REQ-1.3.3**: El `<video>` MUST contener un `<source type="video/webm">` antes del `<source type="video/mp4">`.
- **REQ-1.3.4**: El archivo duplicado en `videos/` (raíz del proyecto) MUST ser eliminado.
- **REQ-1.3.5**: SHOULD incluir versión H.265 para mejor compresión manteniendo calidad visual.

#### Escenario: Navegador sin soporte H.265
- GIVEN un usuario en Firefox (sin soporte H.265)
- WHEN la página carga el hero
- THEN el navegador MUST reproducir el fallback WebM

### 1.4 Lazy loading de rutas
- **REQ-1.4.1**: ContactPage y ExperiencePage MUST cargarse mediante `React.lazy()`.
- **REQ-1.4.2**: `<Routes>` MUST estar envuelto en `<Suspense>` con un fallback visible (Spinner o skeleton).
- **REQ-1.4.3**: Las rutas principales (Home) MUST cargarse de forma eager (sin lazy).

#### Escenario: Navegación a /contacto
- GIVEN un usuario en la página de inicio
- WHEN hace clic en "Contacto"
- THEN MUST mostrar el fallback de Suspense mientras ContactPage carga
- AND MUST mostrar la página completa después de la carga diferida

### 1.5 will-change
- **REQ-1.5.1**: Los elementos con animación continua (sheep flotando, hover scale en cards) MUST tener `will-change: transform`.
- **REQ-1.5.2**: El uso MUST limitarse a máximo 4 elementos simultáneos para evitar abusos de GPU.

#### Escenario: Animación continua activa
- GIVEN la página con la animación de la oveja flotando
- WHEN se inspecciona el elemento con DevTools
- THEN MUST tener `will-change: transform` aplicado
- AND NO MUST causar paint flashing excesivo

## 2. SEO Dinámico

### 2.1 react-helmet-async
- **REQ-2.1.1**: El proyecto MUST instalar e integrar `react-helmet-async`.
- **REQ-2.1.2**: `<HelmetProvider>` MUST envolver la aplicación en `main.jsx`.

#### Escenario: HelmetProvider montado
- GIVEN la aplicación inicia
- WHEN se renderiza el árbol de componentes
- THEN HelmetProvider MUST estar presente como wrapper en la jerarquía

### 2.2 Meta tags dinámicos por experiencia
- **REQ-2.2.1**: Cada ExperiencePage MUST renderizar un `<Helmet>` con `title`, `description`, `og:image` y `og:url` basados en los datos de la experiencia.
- **REQ-2.2.2**: El componente `SEOHead` SHOULD ser reutilizable y aceptar `{ title, description, image, url }`.
- **REQ-2.2.3**: Los meta tags MUST incluir también `twitter:card` para preview en X/Twitter.

#### Escenario: Compartir experiencia en redes sociales
- GIVEN un usuario navega a `/experiencia/lana`
- WHEN se comparte el enlace en redes sociales
- THEN el preview MUST mostrar el título de la experiencia, descripción, e imagen OG específica
- AND la URL MUST apuntar a `/experiencia/lana`

### 2.3 Lang dinámico + hreflang
- **REQ-2.3.1**: El atributo `lang` en `<html>` MUST actualizarse dinámicamente al cambiar de idioma vía i18next.
- **REQ-2.3.2**: Cada página MUST incluir `<link rel="alternate" hreflang="es">` y `<link rel="alternate" hreflang="en">`.

#### Escenario: Cambio de idioma
- GIVEN un usuario en la versión en español
- WHEN cambia a inglés
- THEN `<html lang="es">` MUST cambiar a `<html lang="en">`
- AND el `<link hreflang>` MUST reflejar ambos idiomas disponibles

### 2.4 sitemap.xml + robots.txt
- **REQ-2.4.1**: `public/sitemap.xml` MUST incluir las URLs: `/` (priority 1.0), `/contacto` (priority 0.8), `/experiencia/lana` (priority 0.9).
- **REQ-2.4.2**: `public/robots.txt` MUST permitir rastreo completo (Allow: /) y referenciar el sitemap.
- **REQ-2.4.3**: Ambos archivos MUST estar en la raíz de `public/` para que sean servidos en `/sitemap.xml` y `/robots.txt`.

#### Escenario: Crawler de Google
- GIVEN Googlebot visita el sitio
- WHEN solicita `/robots.txt`
- THEN MUST recibir un archivo que permita rastreo total
- AND MUST encontrar la referencia al sitemap

## 3. Accesibilidad

### 3.1 prefers-reduced-motion
- **REQ-3.1.1**: Todos los componentes con animaciones Framer Motion MUST respetar `prefers-reduced-motion` usando `useReducedMotion()`.
- **REQ-3.1.2**: Cuando `prefers-reduced-motion: reduce` está activo, las animaciones MUST reducirse a `{ opacity: 1 }` (fade simple, sin desplazamiento ni escala).

#### Escenario: Usuario con prefers-reduced-motion
- GIVEN un usuario que activa `prefers-reduced-motion: reduce` en el sistema operativo
- WHEN la landing page carga
- THEN las animaciones de entrada (fadeInUp, scaleIn) NO MUST desplazar ni escalar elementos
- AND los elementos MUST aparecer con un fade suave en su posición final

### 3.2 Contraste gold/wool
- **REQ-3.2.1**: El texto en color gold (#B8860B) sobre fondo wool (#F5E6D0) MUST cumplir WCAG AA (ratio ≥ 4.5:1).
- **REQ-3.2.2**: Si el gold original no cumple el ratio, SHOULD subirse a `#8B6914` o aplicar `text-shadow` para alcanzar el contraste mínimo.
- **REQ-3.2.3**: SectionHeading MUST ser el componente auditado y corregido prioritariamente.

#### Escenario: Usuario con baja visión
- GIVEN un usuario con baja visión visita la landing page
- WHEN el SectionHeading se renderiza con texto gold sobre wool
- THEN el ratio de contraste MUST ser ≥ 4.5:1 (WCAG AA)
- AND el texto MUST ser legible sin ampliación adicional

### 3.3 Aria-labels traducidos
- **REQ-3.3.1**: Los botones "Anterior"/"Siguiente" del carrusel de testimonios MUST tener `aria-label` traducido vía i18next.
- **REQ-3.3.2**: El indicador de slide actual MUST tener `aria-label` descriptivo traducido.

#### Escenario: Cambio de idioma actualiza etiquetas de accesibilidad
- GIVEN un usuario de lector de pantalla en la sección de testimonios
- WHEN cambia el idioma de español a inglés
- THEN los `aria-label` de los botones de navegación MUST actualizarse al nuevo idioma
- AND el indicador de slide MUST reflejar el cambio

### 3.4 Menú mobile con tecla Escape
- **REQ-3.4.1**: El menú mobile en Navbar MUST cerrarse al presionar la tecla Escape.
- **REQ-3.4.2**: El contenedor del menú mobile MUST tener `role="dialog"`.
- **REQ-3.4.3**: El foco MUST retornar al botón de menú al cerrar con Escape.

#### Escenario: Navegación por teclado en mobile
- GIVEN un usuario navega con teclado en un viewport mobile
- WHEN abre el menú de navegación y presiona Escape
- THEN el menú MUST cerrarse
- AND el foco MUST volver al botón hamburguesa

## 4. Código y Refactor

### 4.1 API real en useFormSubmit
- **REQ-4.1.1**: `useFormSubmit` MUST reemplazar `console.log` por un `fetch()` real a `VITE_API_URL + '/contact'`.
- **REQ-4.1.2**: MUST manejar respuesta 200 mostrando un mensaje de éxito al usuario.
- **REQ-4.1.3**: MUST manejar errores 4xx/5xx mostrando un mensaje contextual de error.
- **REQ-4.1.4**: MUST incluir `try/catch` para errores de red sin respuesta del servidor.

#### Escenario: Error de red en formulario de contacto
- GIVEN un usuario completa el formulario de contacto y presiona enviar
- WHEN ocurre un error de red (API no disponible)
- THEN MUST mostrar un mensaje de error claro en la UI
- AND NO MUST lanzar excepciones no controladas a la consola

### 4.2 Clases base de inputs
- **REQ-4.2.1**: MUST definirse una clase `.input-base` en `@layer components` de Tailwind.
- **REQ-4.2.2**: Todos los inputs y textareas del formulario MUST usar esta clase base.
- **REQ-4.2.3**: Los estilos `@import url()` en `index.css` MUST ser removidos (fonts ya cargadas desde `index.html`).

#### Escenario: Estado visual consistente
- GIVEN un usuario interactúa con el formulario de contacto
- WHEN recorre los campos con tabulación
- THEN todos los inputs MUST compartir el mismo estilo base (borde, padding, focus ring)

### 4.3 Animaciones centralizadas
- **REQ-4.3.1**: MUST crearse `src/lib/animations.js` con variantes exportadas: `fadeInUp`, `staggerContainer`, `scaleIn`, `slideInLeft`.
- **REQ-4.3.2**: Los componentes MUST importar estas variantes desde `animations.js`, no definirlas inline.

#### Escenario: Refactor de animación
- GIVEN un componente que usa `fadeInUp`
- WHEN se revisa su código
- THEN la variante MUST estar importada desde `src/lib/animations.js`
- AND NO MUST estar definida como objeto literal dentro del componente

### 4.4 Constantes extraídas
- **REQ-4.4.1**: `INTEREST_OPTIONS` y `GROUP_SIZE_OPTIONS` MUST moverse de `ContactSection` a `src/lib/constants.js`.
- **REQ-4.4.2**: ContactSection MUST importar estas constantes desde `constants.js`.

#### Escenario: Centralización de datos
- GIVEN un desarrollador necesita modificar las opciones del formulario
- WHEN busca dónde están definidas
- THEN MUST encontrarlas en `src/lib/constants.js`
- AND NO MUST estar duplicadas en el componente

### 4.5 Grid de experiencias robusto
- **REQ-4.5.1**: El grid de experiencias MUST reemplazar selectores `nth-child` frágiles por clases explícitas de grid (ej: `md:col-span-2 md:row-span-2`).
- **REQ-4.5.2**: El layout MUST mantener coherencia visual en 375px, 768px y 1280px.

#### Escenario: Responsive grid
- GIVEN un usuario visita la sección de experiencias en desktop (1280px)
- WHEN el grid se renderiza
- THEN las cards MUST distribuirse en un layout de grid explícito sin depender de nth-child
- AND en mobile (375px) MUST apilarse en una sola columna

### 4.6 Favicon
- **REQ-4.6.1**: `public/favicon.ico` (32×32) MUST existir y estar linkeado en `index.html`.
- **REQ-4.6.2**: `public/apple-touch-icon.png` (180×180) MUST existir y estar linkeado en `index.html`.

#### Escenario: Marcador en navegador mobile
- GIVEN un usuario agrega la landing page a la pantalla de inicio en iOS
- WHEN se crea el icono
- THEN MUST mostrar el apple-touch-icon de 180×180px

### 4.7 Error Boundary
- **REQ-4.7.1**: MUST implementarse un componente `ErrorBoundary` (class-based) con `componentDidCatch`.
- **REQ-4.7.2**: ErrorBoundary MUST envolver `<Routes>` en `App.jsx`.
- **REQ-4.7.3**: MUST renderizar una UI amigable con botón "Volver al inicio" que navegue a `/`.

#### Escenario: Error en tiempo de ejecución
- GIVEN un usuario navega a una ruta cuyo componente lazy falla al cargar
- WHEN ocurre el error
- THEN ErrorBoundary MUST capturarlo sin colapsar toda la aplicación
- AND MUST mostrar un mensaje amigable con opción de volver al inicio

---

## Criterios de aceptación generales

| ID | Criterio | Tipo |
|----|----------|------|
| **CA-1** | `npm run build` MUST completar sin errores | MUST |
| **CA-2** | La consola del navegador NO MUST mostrar errores | MUST |
| **CA-3** | Lighthouse Performance ≥ 85 | SHOULD |
| **CA-4** | Lighthouse Accessibility ≥ 90 | SHOULD |
| **CA-5** | La página MUST verse correctamente en 375px, 768px, 1280px | MUST |

## Escenarios clave (Given/When/Then)

### Escenario: Compartir experiencia en redes sociales
- GIVEN un usuario navega a `/experiencia/lana`
- WHEN comparte el enlace en Facebook, WhatsApp o X/Twitter
- THEN el preview MUST incluir título, descripción, imagen OG (1200×630) y URL correcta de la experiencia

### Escenario: Usuario con prefers-reduced-motion
- GIVEN un usuario con `prefers-reduced-motion: reduce` activado en el SO
- WHEN la landing page carga completamente
- THEN todas las animaciones MUST ser reemplazadas por fades simples (`opacity: 1`)
- AND NO MUST haber desplazamientos ni escalas

### Escenario: Error de red en formulario de contacto
- GIVEN un usuario completa todos los campos del formulario
- WHEN el servidor de API no responde (timeout o network error)
- THEN el hook `useFormSubmit` MUST capturar el error con try/catch
- AND MUST mostrar un mensaje de error contextual sin colapsar la página

### Escenario: Navegador sin soporte WebP
- GIVEN un navegador antiguo (ej: Safari 11) que no soporta WebP
- WHEN la página carga las imágenes
- THEN el elemento `<picture>` con fallback JPEG MUST usarse donde exista
- O si no hay `<picture>`, la imagen en JPG original MUST servirse sin break visual

### Escenario: Cambio de idioma actualiza etiquetas de accesibilidad
- GIVEN un usuario de lector de pantalla en el carrusel de testimonios
- WHEN cambia de español a inglés
- THEN los `aria-label` de navegación y el `lang` del `<html>` MUST actualizarse inmediatamente
- AND los textos del carrusel MUST mostrar el contenido en el nuevo idioma

### Escenario: Navegación completa por teclado
- GIVEN un usuario navega solo con teclado (sin mouse)
- WHEN presiona Tab para recorrer la página
- THEN todos los elementos interactivos MUST recibir foco visible
- AND el menú mobile MUST abrirse con Enter/Space y cerrarse con Escape
