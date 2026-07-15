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
        navy: {
          50: "#eef4ff",
          100: "#d9e5ff",
          200: "#bcceff",
          300: "#8eacff",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1E3A8A",
          800: "#142860",
          900: "#0F172A",
          950: "#070B14",
        },
        surface: {
          DEFAULT: "#111827",
          light: "#1a2332",
          lighter: "#1f2d3f",
        },
      },
      fontFamily: { vazir: ["Vazirmatn", "system-ui", "sans-serif"] },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "hero": ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "hero-sub": ["clamp(1rem, 2.5vw, 1.5rem)", { lineHeight: "1.6" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "blur-in": "blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "floatSlow 14s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "glow-intense": "glowIntensity 2s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 8s ease infinite",
        "border-rotate": "borderRotate 4s linear infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "float-particle": "floatParticle 20s linear infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay-1": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        "fade-in-up-delay-3": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-8px) rotate(0.5deg) scale(1.01)" },
          "66%": { transform: "translateY(-16px) rotate(-0.5deg) scale(0.99)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(30,58,138,0.15)" },
          "100%": { boxShadow: "0 0 40px rgba(30,58,138,0.3)" },
        },
        glowIntensity: {
          "0%": { boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 0 60px rgba(30,58,138,0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(59,130,246,0.35), 0 0 80px rgba(30,58,138,0.2)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderRotate: {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        floatParticle: {
          "0%": { transform: "translateY(100vh) translateX(0) scale(0)", opacity: "0" },
          "10%": { opacity: "1", scale: "1" },
          "90%": { opacity: "1", scale: "1" },
          "100%": { transform: "translateY(-10vh) translateX(100px) scale(0.5)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(0,0,0,0.2), 0 8px 16px -4px rgba(0,0,0,0.15)",
        "soft-lg": "0 4px 32px -6px rgba(0,0,0,0.3), 0 12px 24px -6px rgba(0,0,0,0.2)",
        "soft-xl": "0 8px 48px -8px rgba(0,0,0,0.4), 0 16px 32px -8px rgba(0,0,0,0.25)",
        "glow-navy": "0 0 32px rgba(30,58,138,0.25)",
        "glow-blue": "0 0 32px rgba(59,130,246,0.2)",
        "glow-intense": "0 0 60px rgba(59,130,246,0.25), 0 0 120px rgba(30,58,138,0.15)",
        glass:
          "0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-lg":
          "0 24px 80px -16px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        premium:
          "0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 60px -12px rgba(0,0,0,0.3), 0 8px 20px -8px rgba(0,0,0,0.2)",
        "premium-lg":
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 32px 80px -16px rgba(0,0,0,0.5), 0 12px 32px -8px rgba(0,0,0,0.3)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0,0,0,0.1)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
