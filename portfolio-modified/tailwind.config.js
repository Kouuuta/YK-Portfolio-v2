
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        bone: '#F5F2EB',
        ash: '#6B6B6B',
        paper: '#1A1A1A',
        vermilion: '#DC2626',
        hairline: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
      }
    },
  },
  plugins: [],
}
