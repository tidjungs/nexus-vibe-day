import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1628',
          navyMid: '#0F2040',
          navyLight: '#1A3057',
          green: '#00C896',
          greenDim: '#00A07A',
          gold: '#F5A623',
          red: '#E84545',
          muted: '#6B8099',
          surface: '#132035',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontVariantNumeric: ['tabular-nums'],
    },
  },
  plugins: [],
} satisfies Config
