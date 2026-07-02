/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070B14",
          900: "#0B1220",
          800: "#101A2E",
          700: "#172238",
          600: "#202E48",
        },
        gold: {
          50: "#FBF6EA",
          200: "#E8D6A4",
          400: "#C9A24B",
          500: "#B8923E",
          600: "#9A7A32",
        },
        slate: {
          250: "#A7B0C2",
          350: "#8893A6",
        },
        brand: {
          blue: "#1B2A6B",
          mauve: "#6E5A66",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(0,0,0,0.55)",
        gold: "0 0 0 1px rgba(201,162,75,0.35)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
