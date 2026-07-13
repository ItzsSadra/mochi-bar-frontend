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
          50: "#f4f8f5", 100: "#e4ede6", 200: "#c9dbcd", 300: "#a3c2a9",
          400: "#6B8F71", 500: "#567a5c", 600: "#446249", 700: "#384f3c",
          800: "#2f4033", 900: "#28352b", 950: "#131d16",
        },
        sand: { 50: "#FAF9F6", 100: "#F5F3EE", 200: "#EDE9E0", 300: "#E0D9CC", 400: "#CFC5B4", 500: "#B8AB96" },
        cream: { 50: "#FAF9F6", 100: "#F5F3EE", 200: "#EDE9E0", 300: "#E0D9CC", 400: "#CFC5B4", 500: "#B8AB96" },
        ember: { 50: "#FEF6F7", 100: "#FDE8EC", 200: "#FAD1DA", 300: "#F5ADC0", 400: "#ED849E", 500: "#E05C80" },
        sakura: { 50: "#FEF6F7", 100: "#FDE8EC", 200: "#FAD1DA", 300: "#F5ADC0", 400: "#ED849E", 500: "#E05C80" },
      },
      fontFamily: { vazir: ["Vazirmatn", "system-ui", "sans-serif"] },
      fontSize: { "2xs": ["0.6875rem", { lineHeight: "1rem" }] },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      spacing: { 18: "4.5rem", 22: "5.5rem", 26: "6.5rem", 30: "7.5rem" },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "blur-in": "blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.92)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        blurIn: { "0%": { opacity: "0", filter: "blur(8px)" }, "100%": { opacity: "1", filter: "blur(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%, 100%": { transform: "translateY(0) rotate(0deg)" }, "50%": { transform: "translateY(-12px) rotate(1deg)" } },
        pulseSoft: { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "0.7" } },
      },
      boxShadow: {
        "soft": "0 2px 20px -4px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.02)",
        "soft-lg": "0 4px 32px -6px rgba(0,0,0,0.05), 0 12px 24px -6px rgba(0,0,0,0.03)",
        "glow-matcha": "0 0 32px rgba(107,143,113,0.15)",
        "glass": "0 8px 32px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.4)",
        "glass-lg": "0 24px 80px -16px rgba(0,0,0,0.08), 0 8px 24px -8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
        "premium": "0 1px 0 rgba(255,255,255,0.5) inset, 0 20px 60px -12px rgba(0,0,0,0.06), 0 8px 20px -8px rgba(0,0,0,0.03)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0,0,0,0.02)",
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
