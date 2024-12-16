/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.15s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            transform: 'translate(-50%, 20px)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translate(-50%, 0)',
            opacity: '1' 
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'translate(-50%, -50%) scale(0.95)',
            opacity: '0' 
          },
          '100%': { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '1' 
          },
        },
      },
    },
  },
  plugins: [],
};