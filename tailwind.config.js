const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["var(--font-caveat)", "cursive"],
        lora: ["var(--font-lora)", "serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        exo: ["var(--font-exo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/*
theme: {
    // CHANGES DEFAULTS... (CHANGES WHAT ALREADY EXISTS IN TAILWIND)
    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop1: "1280px",
      desktop2: "1536px",
    },
    extend: {
      // EXTENDS DEFAULTS... (ADD WHAT TAILWIND DIDN'T HAVE BEFORE)
      screens: {
        tv: "1600px",
      },
      fontSize: {
        gargantuan: "10rem", // Example
      },
      fontFamily: {
        layout_header: ["Nunito"],
        layout_links: ["Kalam"],
      },
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        extasy: "#5fc23d", // Example
      },
    },
  },


*/
