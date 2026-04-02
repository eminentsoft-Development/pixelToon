import animate from "tailwindcss-animate";

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
  plugins: [animate],
};

export default config;
