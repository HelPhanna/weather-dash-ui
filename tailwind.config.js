/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dashboard: {
          background: '#0B1426',
          card: '#1E293B',
          accent: '#38BDF8',
          text: '#F8FAFC',
        },
      },
      boxShadow: {
        glass: '0 24px 80px rgba(3, 7, 18, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'weather-radial':
          'radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.14), transparent 32%), radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 55%)',
      },
    },
  },
  plugins: [],
};
