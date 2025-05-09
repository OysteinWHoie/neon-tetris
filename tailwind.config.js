/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00FFFF',
        'neon-pink': '#FF00FF',
        'neon-cyan': '#00FFFF',
        'neon-purple': '#8B00FF',
        'neon-green': '#00FF00',
        'neon-yellow': '#FFFF00',
        'neon-red': '#FF0000',
        'glow-blue': '#00FFFF',
        'glow-purple': '#8B00FF',
        'glow-cyan': '#00FFFF',
        'glow-green': '#00FF00',
        'glow-yellow': '#FFFF00',
        'glow-red': '#FF0000',
        'high-contrast-blue': '#00FF88',
        'high-contrast-red': '#FF0088',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(45deg, #00FFFF, #8B00FF, #00FFFF, #8B00FF)',
        'glow-gradient': 'linear-gradient(45deg, rgba(0,255,255,0.3), rgba(139,0,255,0.3), rgba(0,255,255,0.3), rgba(139,0,255,0.3))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'dissolve': 'dissolve 0.5s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 10px rgba(0,255,255,0.5)' },
          '50%': { 'box-shadow': '0 0 20px rgba(0,255,255,0.8), 0 0 30px rgba(139,0,255,0.8)' },
        },
        'neon-pulse': {
          '0%, 100%': { 'transform': 'scale(1)' },
          '50%': { 'transform': 'scale(1.05)' },
        },
        'dissolve': {
          '0%': { 
            'opacity': '1',
            'transform': 'scale(1)',
            'box-shadow': '0 0 10px rgba(0,255,255,0.8)',
          },
          '50%': { 
            'opacity': '0.5',
            'transform': 'scale(1.2)',
            'box-shadow': '0 0 20px rgba(0,255,255,1)',
          },
          '100%': { 
            'opacity': '0',
            'transform': 'scale(1.5)',
            'box-shadow': '0 0 30px rgba(0,255,255,0)',
          },
        },
      },
      fontFamily: {
        'futuristic': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
