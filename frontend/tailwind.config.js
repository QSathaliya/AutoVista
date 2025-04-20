/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '3xl': '1792px'
      },
      colors: {
        'primary-main': '#4F46E5',
        'primary-light': '#6366F1',
        'primary-dark': '#4338CA',
        'secondary-main': '#10B981',
        'background-dark': '#111827',
        'background-light': '#1F2937',
        'text-primary': '#F9FAFB',
        'text-secondary': '#D1D5DB',
        primary: {
          DEFAULT: '#FF3E41', // Vibrant red
          50: '#FFF2F2',
          100: '#FFE5E5',
          200: '#FFCCCC',
          300: '#FF9999',
          400: '#FF6666',
          500: '#FF3E41',
          600: '#E63638',
          700: '#CC2F32',
          800: '#B3282B',
          900: '#991F22',
        },
        secondary: {
          DEFAULT: '#1A2E44', // Deep blue
          50: '#F0F4F9',
          100: '#E1E9F2',
          200: '#C3D3E5',
          300: '#95ADC5',
          400: '#6787A5',
          500: '#476C8A',
          600: '#355070',
          700: '#2A3F59',
          800: '#1A2E44',
          900: '#0D1A29',
        },
        accent: {
          DEFAULT: '#FFB400', // Gold
          50: '#FFF8E5',
          100: '#FFF1CC',
          200: '#FFE499',
          300: '#FFD666',
          400: '#FFC933',
          500: '#FFB400',
          600: '#E6A300',
          700: '#CC9100',
          800: '#B38000',
          900: '#996E00',
        },
        success: '#34D399',
        warning: '#FBBF24',
        error: '#EF4444',
        dark: '#111827',
        light: '#F9FAFB',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'card': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #1A2E44 0%, #355070 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FFB400 0%, #FBBF24 100%)',
        'hero-pattern': "url('https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      },
      spacing: {
        18: '4.5rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
  },
}
