import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "#1C3D5A",
          light: "#2A5680",
          dark: "#122A3E",
          foreground: "#FDFBF7",
        },
        gold: {
          DEFAULT: "#C5A059",
          light: "#D6B876",
          dark: "#A8853F",
          foreground: "#1C3D5A",
        },
        charcoal: "#222222",
        border: "#E8E2D5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D6B876 0%, #C5A059 50%, #A8853F 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(28, 61, 90, 0.12)",
        gold: "0 4px 20px -2px rgba(197, 160, 89, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
