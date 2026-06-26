import sharp from 'sharp'
import { writeFileSync } from 'fs'

try {
  // Generate favicon.ico (32x32) from og-image
  await sharp('public/images/og-image.webp')
    .resize(32, 32)
    .toFile('public/favicon.ico')
  console.log('✅ favicon.ico created (32x32)')
} catch (e) {
  console.log('⚠️  sharp ico failed, creating SVG fallback:', e.message)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="4" fill="#8B6914"/>
    <text x="16" y="22" text-anchor="middle" font-size="16" font-family="sans-serif" fill="white">RL</text>
  </svg>`
  writeFileSync('public/favicon.ico', svg)
  console.log('✅ favicon.ico created (SVG fallback)')
}

try {
  // Generate apple-touch-icon (180x180) from og-image
  await sharp('public/images/og-image.webp')
    .resize(180, 180)
    .toFile('public/apple-touch-icon.png')
  console.log('✅ apple-touch-icon.png created (180x180)')
} catch (e) {
  console.log('⚠️  apple-touch-icon failed:', e.message)
}
