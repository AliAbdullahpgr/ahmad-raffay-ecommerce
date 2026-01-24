import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        emerald: {
          DEFAULT: "#1B4D3E",
          50: "#E8F5F0",
          100: "#C5E6DA",
          200: "#9FD4C3",
          300: "#78C2AB",
          400: "#5BB399",
          500: "#3DA487",
          600: "#2F8A70",
          700: "#246B57",
          800: "#1B4D3E",
          900: "#0F2D24",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FCF8EB",
          100: "#F7EDCD",
          200: "#EFDEA0",
          300: "#E7CF73",
          400: "#DFC046",
          500: "#D4AF37",
          600: "#B8952A",
          700: "#8E7321",
          800: "#645117",
          900: "#3A2F0E",
        },
        terracotta: {
          DEFAULT: "#C75B39",
          50: "#FCF0EC",
          100: "#F7D9D0",
          200: "#EFB8A6",
          300: "#E7977C",
          400: "#DF7652",
          500: "#C75B39",
          600: "#A64A2E",
          700: "#7F3923",
          800: "#582818",
          900: "#31170E",
        },
        cream: {
          DEFAULT: "#FDF8F3",
          50: "#FFFFFF",
          100: "#FDF8F3",
          200: "#F8EDE1",
          300: "#F3E2CF",
          400: "#EED7BD",
          500: "#E9CCAB",
        },
        charcoal: {
          DEFAULT: "#2D2D2D",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#999999",
          400: "#666666",
          500: "#4D4D4D",
          600: "#3D3D3D",
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
