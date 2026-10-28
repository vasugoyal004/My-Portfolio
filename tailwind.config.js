/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#050505',
          surface: '#0D0D0D',
          card: '#121212',
          elevated: '#171717',
        },
        accent: {
          DEFAULT: '#C6FF3D',
          hover: '#B5F22B',
          glow: 'rgba(198, 255, 61, 0.25)',
          muted: 'rgba(198, 255, 61, 0.12)',
          dark: '#91C414'
        },
        primary: '#FFFFFF',
        secondary: '#A1A1AA',
        muted: '#71717A',
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(198, 255, 61, 0.3)',
          light: 'rgba(255, 255, 255, 0.15)'
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        }
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
