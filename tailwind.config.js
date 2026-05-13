/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        archivo:  ['"Archivo Black"',    'system-ui', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Georgia',   'serif'],
        inter:    ['Inter',              'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          lime:    '#a3e635',
          cyan:    '#22d3ee',
          mint:    '#4ADE80',
          amber:   '#f59e0b',
          blue:    '#60a5fa',
          base:    '#0a0b0f',
          dark:    '#0f1014',
          mid:     '#13151a',
          surface: '#1a1c24',
          border:  '#1e2028',
        },
      },
      backgroundImage: {
        'lime-gradient': 'linear-gradient(135deg, #a3e635, #22d3ee)',
        'dark-gradient': 'linear-gradient(135deg, #13151a, #1a1c24)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow':       'glow 2.5s ease-in-out infinite alternate',
        'float':      'float 7s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(22px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glow:    { '0%': { boxShadow: '0 0 5px rgba(163,230,53,0.2)' }, '100%': { boxShadow: '0 0 28px rgba(163,230,53,0.5)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      boxShadow: {
        'lime':      '0 4px 20px rgba(163,230,53,0.2)',
        'lime-lg':   '0 8px 40px rgba(163,230,53,0.3)',
        'mint':      '0 4px 20px rgba(74,222,128,0.15)',
        'mint-lg':   '0 8px 40px rgba(74,222,128,0.2)',
        'indigo':    '0 4px 20px rgba(99,102,241,0.2)',
        'indigo-lg': '0 8px 40px rgba(99,102,241,0.3)',
        'glass':     '0 8px 32px rgba(0,0,0,0.6)',
        'card':      '0 4px 24px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
