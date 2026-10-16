/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        panel: '#11161d',
        'panel-2': '#0e131a',
        'panel-3': '#161c24',
        line: '#232a34',
        'line-2': '#39414c',
        ink: '#c9d1d9',
        muted: '#7d8590',
        comment: '#6e7681',
        blue: '#58a6ff',
        cyan: '#39d0d8',
        green: '#7ee787',
        amber: '#ffa657',
        magenta: '#ff79c6',
        red: '#ff7b72',
        purple: '#d2a8ff',
      },
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          'Fira Code',
          'Roboto Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace'
        ],
      },
      borderRadius: {
        none: '0px',
      },
      animation: {
        'wave': 'wave 2.8s cubic-bezier(.2,.7,.3,1) infinite',
        'blink': 'blink 1.1s steps(1, end) infinite',
        'pulse-soft': 'pulse 2.2s cubic-bezier(.2,.7,.3,1) infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '28%': { transform: 'translateY(-11px)' },
          '56%': { transform: 'translateY(3px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  darkMode: 'class',
};
