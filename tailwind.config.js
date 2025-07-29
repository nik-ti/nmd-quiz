/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#283741',
        accent: '#3b82f6',
        secondary: '#3D6785',
        highlight: '#FFF3B3',
        background: '#FFFFFF',
        text: '#000A0B',
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}