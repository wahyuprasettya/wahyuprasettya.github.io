/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        void: '#050816',
        orbit: '#0b1026',
        plasma: '#8b5cf6',
        ion: '#22d3ee',
        ember: '#f97316'
      },
      boxShadow: {
        glow: '0 0 32px rgba(34, 211, 238, 0.24)',
        violet: '0 0 34px rgba(139, 92, 246, 0.28)'
      },
      backgroundImage: {
        'radial-space': 'radial-gradient(circle at top left, rgba(34, 211, 238, 0.16), transparent 30%), radial-gradient(circle at 75% 20%, rgba(139, 92, 246, 0.20), transparent 32%), linear-gradient(135deg, #050816, #0b1026 52%, #14071f)'
      }
    }
  },
  plugins: []
}
