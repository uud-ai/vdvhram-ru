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
          DEFAULT: "#3E6280",
          light: "#7096B0",
          dark: "#2C4A62",
          foreground: "#FBF7EF",
        },
        gold: {
          DEFAULT: "#C9A76B",
          light: "#E0C68F",
          dark: "#A9853F",
          foreground: "#2C4A62",
        },
        sky: {
          DEFAULT: "#B8CFDE",
          light: "#D6E3EB",
          dark: "#8FAEC2",
        },
        terracotta: {
          DEFAULT: "#BD7A5C",
          light: "#DCA98C",
          dark: "#8F5640",
        },
        charcoal: "#2E2B26",
        border: "#E7E0CE",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E0C68F 0%, #C9A76B 50%, #A9853F 100%)",
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
        soft: "0 4px 24px -4px rgba(44, 74, 98, 0.12)",
        gold: "0 4px 20px -2px rgba(201, 167, 107, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
