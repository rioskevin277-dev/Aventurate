import sharp from 'sharp'
import { join } from 'path'
import { cwd } from 'process'

const SIZES = {
  OG_IMAGE: { width: 1200, height: 630 },
}

/**
 * Genera la imagen OG (1200×630) para redes sociales.
 * Usa SVG overlay con texto sobre un fondo gradiente.
 */
async function generateOGImage() {
  const outputDir = join(cwd(), 'public/images')
  const outputPath = join(outputDir, 'og-image.webp')

  // SVG overlay — usando colores de la paleta del proyecto
  const svgText = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D4A2E" />
        <stop offset="50%" stop-color="#3B5E3C" />
        <stop offset="100%" stop-color="#2D1F14" />
      </linearGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(0,0,0,0.2)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#overlay)" />
    <!-- Decorative wool dots -->
    <circle cx="100" cy="100" r="2" fill="#C8A96E" opacity="0.3" />
    <circle cx="1100" cy="530" r="2" fill="#C8A96E" opacity="0.3" />
    <circle cx="200" cy="400" r="1.5" fill="#C8A96E" opacity="0.2" />
    <circle cx="1000" cy="150" r="1.5" fill="#C8A96E" opacity="0.2" />
    <circle cx="600" cy="50" r="2" fill="#C8A96E" opacity="0.25" />
    <circle cx="350" cy="580" r="1.5" fill="#C8A96E" opacity="0.2" />
    <circle cx="850" cy="500" r="2" fill="#C8A96E" opacity="0.3" />
    <!-- Title -->
    <text x="600" y="270" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="700" fill="#D4BC8E" letter-spacing="1">
      La Ruta de la Lana
    </text>
    <!-- Subtitle -->
    <text x="600" y="340" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="500" fill="#E8E4DF" letter-spacing="0.5">
      Turismo Regenerativo
    </text>
    <!-- Location -->
    <rect x="480" y="370" width="240" height="36" rx="18" fill="#C8A96E" opacity="0.2" />
    <text x="600" y="395" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="#C8A96E" letter-spacing="2">
      MARULANDA · CALDAS
    </text>
  </svg>`

  try {
    // Create a base colored image and composite SVG on top
    await sharp({
      create: {
        width: SIZES.OG_IMAGE.width,
        height: SIZES.OG_IMAGE.height,
        channels: 4,
        background: { r: 45, g: 74, b: 46, alpha: 1 },
      },
    })
      .composite([
        {
          input: Buffer.from(svgText),
          top: 0,
          left: 0,
        },
      ])
      .webp({ quality: 80 })
      .toFile(outputPath)

    console.log(`✅ OG Image generada: ${outputPath} (1200×630, WebP q80)`)
  } catch (err) {
    console.error('Error al generar OG Image:', err.message)
    process.exit(1)
  }
}

generateOGImage()
