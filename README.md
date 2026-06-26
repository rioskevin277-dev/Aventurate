# La Ruta de la Lana — Turismo Regenerativo en Marulanda, Caldas

Landing page profesional para agencia de turismo regenerativo en Marulanda, Caldas (Colombia). Construida con React + Vite + Tailwind CSS.

## 🚀 Stack

| Capa | Tecnología |
|------|-----------|
| **Framework** | React 18 |
| **Build** | Vite 5 |
| **Estilos** | Tailwind CSS 3.4 |
| **Animaciones** | Framer Motion |
| **SEO** | react-helmet-async |
| **i18n** | i18next + react-i18next (es, en, fr, de) |
| **Formularios** | react-hook-form + Zod |
| **Routing** | react-router-dom v7 |
| **Iconos** | Lucide React |

## ✨ Características

- **Diseño responsive** mobile-first (375px → 1280px+)
- **4 idiomas** con detección automática y persistencia
- **SEO dinámico** por página (Open Graph, Twitter Card, hreflang)
- **Accesibilidad WCAG AA** (contraste, reduced-motion, teclado)
- **Imágenes optimizadas** WebP con fallback + dimensiones explícitas (sin CLS)
- **Video hero comprimido** H.265 + WebM con precarga
- **Lazy loading** de rutas para carga inicial rápida
- **Formulario** con validación Zod y feedback visual
- **Error Boundary** para recuperación ante fallos

## 📦 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
```

## 🛠️ Scripts auxiliares

| Script | Propósito |
|--------|-----------|
| `scripts/optimize-images.mjs` | Convierte JPG/PNG a WebP (calidad 80) |
| `scripts/generate-og-image.mjs` | Genera la OG image para redes sociales |
| `scripts/compress-video.mjs` | Comprime video a H.265 + WebM VP9 |
| `scripts/generate-favicon.mjs` | Genera favicon e icono iOS desde OG image |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout
│   ├── sections/      # Hero, Destination, Experiences, etc.
│   ├── seo/           # SEOHead (helmet component)
│   └── ui/            # Button, Inputs, Cards, etc.
├── data/              # Experiences, Testimonials
├── hooks/             # useFormSubmit, useScrollReveal
├── lib/               # Constants, Validation, Animations
├── locales/           # es.json, en.json, fr.json, de.json
├── pages/             # LandingPage, ContactPage, ExperiencePage
├── App.jsx
├── i18n.js
├── index.css
└── main.jsx
```

## 🌐 Configuración

Las constantes editables están en `src/lib/constants.js`:

- `WHATSAPP_NUMBER` — número de WhatsApp
- `EMAIL` — correo de contacto
- `INSTAGRAM_URL` — perfil de Instagram
- `SITE_NAME` — nombre del sitio

La URL base de la API del formulario se configura vía variable de entorno:

```bash
VITE_API_URL=https://tu-api.com
```

## 📄 Licencia

Uso interno — La Ruta de la Lana / Aventurate Marulanda.
