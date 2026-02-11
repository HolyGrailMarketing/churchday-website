/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f6f9',
          100: '#d9ecf3',
          200: '#b3d9e7',
          300: '#7db8a8',
          400: '#5a9a8f',
          500: '#4a7ba7',
          600: '#3d6a95',
          700: '#2c4d6f',
          800: '#1f3448',
          900: '#142535',
        },
        'gold': {
          50: '#fef9f3',
          100: '#fceee3',
          200: '#f8d9c2',
          300: '#f5c9a5',
          400: '#ecc869',
          500: '#d4a85e',
          600: '#c09950',
          700: '#a68343',
          800: '#7f6335',
          900: '#5f4828',
        },
        'green': {
          50: '#f0f5f3',
          100: '#d9eae3',
          200: '#b3d9d0',
          300: '#7db8a8',
          400: '#6ba891',
          500: '#6b9e7f',
          600: '#5f8f73',
          700: '#4a7560',
          800: '#355849',
          900: '#234033',
        },
        'accent': {
          50: '#faf6f0',
          100: '#f5e6dd',
          200: '#e8cdb8',
          300: '#dab392',
          400: '#c9a0b3',
          500: '#b4a8d8',
          600: '#9e91c1',
          700: '#8779aa',
          800: '#695e87',
          900: '#4d4265',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
