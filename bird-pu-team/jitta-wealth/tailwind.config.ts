import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Content area — light theme
          bg: '#EFF4FB',        // page background
          surface: '#FFFFFF',   // cards
          border: '#DDE6F0',    // borders
          text: '#0D1D35',      // primary text
          muted: '#64748B',     // secondary text

          // Sidebar — stays dark
          navy: '#0A1628',
          navyMid: '#0F2040',
          navyLight: '#1A3057',

          // Brand / status
          green: '#059669',     // emerald (readable on white)
          greenDim: '#047857',
          red: '#DC2626',       // clear red
          gold: '#D97706',      // amber
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
