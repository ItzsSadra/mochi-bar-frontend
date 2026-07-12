import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        matcha: {
          50: "#f4f8f5",
          100: "#e4ede6",
          200: "#c9dbcd",
          300: "#a3c2a9",
          400: "#6B8F71",
          500: "#567a5c",
          600: "#446249",
          700: "#384f3c",
          800: "#2f4033",
          900: "#28352b",
          950: "#131d16",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FDF9F0",
          200: "#FAF3E1",
          300: "#F5E9C8",
          400: "#EDD9A5",
          500: "#E5CA83",
        },
        sakura: {
          50: "#FEF6F7",
          100: "#FDE8EC",
          200: "#FAD1DA",
          300: "#F5ADC0",
          400: "#ED849E",
          500: "#E05C80",
        },
      },
      fontFamily: {
        vazir: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0,0,0,0.04), 0 10px 20px -2px rgba(0,0,0,0.02)",
        "soft-lg": "0 4px 25px -5px rgba(0,0,0,0.06), 0 10px 30px -5px rgba(0,0,0,0.03)",
        "glow-matcha": "0 0 20px rgba(107,143,113,0.15)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0,0,0,0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
