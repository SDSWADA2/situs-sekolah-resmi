module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Palette inspired by the uploaded school logo
        primary: '#00D3D9',   // bright cyan / aqua (logo outer ring)
        magenta: '#D81B60',   // magenta (logo center)
        laurel: '#1E7A2F',    // green laurel / ribbon
        star: '#D32F2F'       // red star
      }
    }
  },
  plugins: []
}
