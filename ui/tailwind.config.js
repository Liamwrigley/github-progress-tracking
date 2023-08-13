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
    },
  },
  plugins: [],
}
