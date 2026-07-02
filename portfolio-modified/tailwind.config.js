
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        'ink-light': '#121212',
        bone: '#F5F2EB',
        'bone-dark': '#E8E4DB',
        ash: '#6B6B6B',
        'ash-light': '#8A8A8A',
        paper: '#1A1A1A',
        'paper-light': '#222222',
        vermilion: '#DC2626',
        'vermilion-dark': '#B91C1C',
        'vermilion-light': '#EF4444',
        hairline: '#2A2A2A',
        'hairline-light': '#333333',
        surface: '#161616',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        wide: '.05em',
        wider: '.1em',
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'heading': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'body': ['0.875rem', { lineHeight: '1.7' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 8rem)',
        'gutter': 'clamp(1rem, 3vw, 1.5rem)',
      },
      maxWidth: {
        'content': '1400px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.2)',
        'card': '0 2px 16px rgba(0,0,0,0.15)',
        'glow': '0 0 20px rgba(220,38,38,0.15)',
      },
    },
  },
  plugins: [],
}
