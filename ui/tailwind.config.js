/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      backgroundColor: {
        'primary': '#1a202c',
        'secondary': '#2d3748'
      },
      textColor: {
        'text-primary': '#e2e8f0'
      },
      colors: {
        custom: {
          primarybg: '#16171A',
          secondarybg: '#282A32',
          tertiarybg: '#3C3E48',
          primarytext: '#E4E5E7',
          secondarytext: '#B2B3B5',
          highlight: '#FF4444',
          highlight2: '#4BA6A9',
          hover: '#FF5A5A',
          active: '#FF2F2F',
          success: '#43B581',
          info: '#7289DA',
          warning: '#FAA61A',
          error: '#F04747',
        }
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-15px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
        blink: {
          '0%': { opacity: 1 },
          '50%': { opacity: 1 },
          '51%': { opacity: 0 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        slide: 'slide 500ms ease-in',
        blink: 'blink 1s infinite'
      }
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [require("daisyui")],
}