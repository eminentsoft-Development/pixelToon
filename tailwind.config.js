import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        quoteEnter: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          from: { transform: "scaleX(0)", opacity: "0" },
          to: { transform: "scaleX(1)", opacity: "1" },
        },
        ringSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        numberFade: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        glowPulse: "glowPulse 4s ease-in-out infinite",
        quoteEnter: "quoteEnter 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        lineGrow: "lineGrow 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        ringSpin: "ringSpin 8s linear infinite",
        numberFade: "numberFade 0.5s ease forwards",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "4rem",
        },
      },
      colors: {
        primary: {
          DEFAULT: "#f07822",
          light: "#f39a5d",
          dark: "#c85f1b",
        },
        textColor: {
          DEFAULT: "#131313",
        },
        bgColor: {
          DEFAULT: "#080808",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
