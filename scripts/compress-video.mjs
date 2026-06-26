/**
 * Script para comprimir videohero.mp4 con ffmpeg.
 *
 * Uso:
 *   node scripts/compress-video.mjs
 */

import { execSync } from 'child_process'
import { existsSync, statSync, renameSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const _require = createRequire(import.meta.url)

// Use ffmpeg-static if available, otherwise fallback to PATH
let FFMPEG
try {
  FFMPEG = _require('ffmpeg-static')
  console.log(`✓ Usando ffmpeg-static: ${FFMPEG}`)
} catch {
  FFMPEG = 'ffmpeg'
  console.log('ℹ️  Usando ffmpeg desde PATH')
}

const PUBLIC_DIR = join(PROJECT_ROOT, 'public')
const INPUT_MP4 = join(PUBLIC_DIR, 'videohero.mp4')
const OUTPUT_MP4 = join(PUBLIC_DIR, 'videohero-compressed.mp4')
const OUTPUT_WEBM = join(PUBLIC_DIR, 'videohero.webm')

const TARGET_MAX_BYTES = 2 * 1024 * 1024 // 2 MB

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: PROJECT_ROOT })
}

async function compressVideo() {
  if (!existsSync(INPUT_MP4)) {
    console.error(`✗ No se encuentra ${INPUT_MP4}`)
    process.exit(1)
  }

  const inputSize = statSync(INPUT_MP4).size
  console.log(`\n📹 Archivo original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`)

  // Step 1: Compress to H.265 MP4 (CRF 28)
  console.log('\n🔹 Paso 1/2 — Comprimiendo a H.265 (CRF 28)...')
  run(
    `"${FFMPEG}" -i "${INPUT_MP4}" -c:v libx265 -crf 28 -preset medium ` +
    `-c:a aac -b:a 64k -movflags +faststart ` +
    `-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ` +
    `-y "${OUTPUT_MP4}"`
  )

  const compressedSize = statSync(OUTPUT_MP4).size
  console.log(`  → H.265: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`)

  if (compressedSize > TARGET_MAX_BYTES) {
    console.warn(`  ⚠️  Supera el límite de 2 MB (${(compressedSize / 1024 / 1024).toFixed(2)} MB). Considera CRF 30.`)
  } else {
    console.log(`  ✅ Dentro del límite de 2 MB`)
  }

  // Step 2: Create WebM VP9 version
  console.log('\n🔹 Paso 2/2 — Creando WebM (VP9 CRF 30)...')
  run(
    `"${FFMPEG}" -i "${INPUT_MP4}" -c:v libvpx-vp9 -crf 30 -b:v 0 ` +
    `-c:a libopus -b:a 64k ` +
    `-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ` +
    `-y "${OUTPUT_WEBM}"`
  )

  const webmSize = statSync(OUTPUT_WEBM).size
  console.log(`  → WebM: ${(webmSize / 1024 / 1024).toFixed(2)} MB`)

  // Replace original with compressed version
  console.log('\n🔹 Reemplazando archivo original por versión comprimida...')
  unlinkSync(INPUT_MP4)
  renameSync(OUTPUT_MP4, INPUT_MP4)

  const finalSize = statSync(INPUT_MP4).size
  const savedPercent = ((1 - finalSize / inputSize) * 100).toFixed(1)

  console.log(`\n✅ Video comprimido exitosamente.`)
  console.log(`   📁 MP4:  ${INPUT_MP4} — ${(finalSize / 1024 / 1024).toFixed(2)} MB (${savedPercent}% ahorro)`)
  console.log(`   📁 WebM: ${OUTPUT_WEBM} — ${(webmSize / 1024 / 1024).toFixed(2)} MB`)
}

compressVideo().catch(console.error)
