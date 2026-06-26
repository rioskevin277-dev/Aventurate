import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { cwd } from 'process'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const imagesDir = join(cwd(), 'public/images')
const supported = ['.jpg', '.jpeg', '.png']

async function optimizeImages() {
  try {
    const files = await readdir(imagesDir)
    const images = files.filter((f) => supported.includes(extname(f).toLowerCase()))

    if (images.length === 0) {
      console.log('No se encontraron imágenes para optimizar.')
      return
    }

    console.log(`Optimizando ${images.length} imágenes a WebP q80...\n`)

    for (const file of images) {
      const inputPath = join(imagesDir, file)
      const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      const outputPath = join(imagesDir, outputName)

      const inputStats = await stat(inputPath)
      const inputSizeKB = (inputStats.size / 1024).toFixed(1)

      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)

      const outputStats = await stat(outputPath)
      const outputSizeKB = (outputStats.size / 1024).toFixed(1)
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

      console.log(`  ✓ ${file} → ${outputName}`)
      console.log(`    ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% ahorro)`)
    }

    console.log('\n✅ Optimización completada.')
  } catch (err) {
    console.error('Error al optimizar imágenes:', err.message)
    process.exit(1)
  }
}

optimizeImages()
