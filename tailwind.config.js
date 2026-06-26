/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: '#3B5E3C',
        'moss-light': '#4A7A4B',
        'moss-dark': '#2D4A2E',
        earth: '#8B5E3C',
        'earth-light': '#A87D5A',
        wool: '#F5F0E8',
        'wool-dark': '#E8E4DF',
        bark: '#2D1F14',
        'bark-light': '#4A3528',
        gold: '#8B6914',
        'gold-light': '#D4BC8E',
        mist: '#E8E4DF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
