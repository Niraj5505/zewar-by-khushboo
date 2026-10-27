/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F0',
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F4EFE6',
        },
        champagne: {
          DEFAULT: '#C6A15B',
          light: '#D9BC7F',
          hover: '#A8843F',
          dark: '#8C6C2E',
        },
        espresso: {
          DEFAULT: '#30251F',
          light: '#4A3B32',
          muted: '#6E5C51',
          subtle: '#9A877B',
        },
        sand: {
          DEFAULT: '#EAE0D2',
          light: '#F5EFE6',
          border: '#DDD2C1',
        },
        brandWhite: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
        script: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      borderRadius: {
        brand: '4px',
        brandSm: '2px',
        brandLg: '6px',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(48, 37, 31, 0.05)',
        hover: '0 6px 20px rgba(48, 37, 31, 0.09)',
        drawer: '-4px 0 24px rgba(48, 37, 31, 0.12)',
      },
      aspectRatio: {
        '4/5': '4 / 5',
      }
    },
  },
  plugins: [],
}
