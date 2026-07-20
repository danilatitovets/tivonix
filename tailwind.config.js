/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  /* Partners (Family-style) tokens — safelist so Vite cache can’t drop them */
  safelist: [
    {
      pattern:
        /^(bg|text|border|outline|ring|shadow|font|rounded|max-w|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap)-partners(-[a-z0-9-]+)?$/,
    },
    {
      pattern:
        /^bg-partners-(cream|stone|sand|white|ink|charcoal|brown|muted|border|blue|sky|green|mint|ember|yellow|honey|pink|violet|red|black)(\/\d+)?$/,
    },
    {
      pattern:
        /^text-partners-(cream|stone|sand|white|ink|charcoal|brown|muted|blue|sky|green|mint|ember|yellow|gold|honey|pink|violet|red|micro|caption|body|body-lg|sub|heading|heading-lg|display)(\/\d+)?$/,
    },
    "font-partners",
    "font-partners-display",
    "shadow-partners-inset",
    "shadow-partners-sm",
    "shadow-partners-lg",
    "rounded-partners-sm",
    "rounded-partners-md",
    "rounded-partners-card",
    "rounded-partners-btn",
    "rounded-partners-pill",
    "rounded-partners-icon",
    "max-w-partners",
    "py-partners-section",
    "p-partners-card",
    "gap-partners-gap",
  ],
  theme: {
    extend: {
      fontFamily: {
        hero: ['"Bebas Neue"', "Anton", "Impact", "sans-serif"],
        display: ['"Bebas Neue"', "Anton", "Impact", "sans-serif"],
        sans: ['"DM Sans"', "Manrope", "Inter", "system-ui", "sans-serif"],
        "caldera-display": ['"Bebas Neue"', "Anton", "Impact", "sans-serif"],
        caldera: ['"DM Sans"', "Manrope", "Inter", "system-ui", "sans-serif"],
        /* Partners — Family display substitute (Archivo Medium ≈ condensed utility display) */
        "partners-display": [
          "Archivo",
          '"Inter Tight"',
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        partners: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        partners: {
          cream: "#fbfaf9",
          stone: "#f2f0ed",
          sand: "#f6f4ef",
          white: "#ffffff",
          ink: "#121212",
          charcoal: "#343433",
          brown: "#474645",
          muted: "#7e7e7d",
          border: "#e5d5c3",
          blue: "#0086fc",
          sky: "#64c6ff",
          green: "#00c978",
          mint: "#00ca48",
          ember: "#ff3e00",
          yellow: "#ffcd6c",
          gold: "#d48f00",
          honey: "#ffbb26",
          pink: "#ff58ae",
          violet: "#9f4fff",
          red: "#ff2b3a",
          black: "#000000",
        },
      },
      fontSize: {
        "partners-micro": [
          "12px",
          { lineHeight: "19px", letterSpacing: "-0.01px", fontWeight: "400" },
        ],
        "partners-caption": [
          "15px",
          { lineHeight: "22px", letterSpacing: "-0.14px", fontWeight: "400" },
        ],
        "partners-body": [
          "17px",
          { lineHeight: "26px", letterSpacing: "-0.22px", fontWeight: "400" },
        ],
        "partners-body-lg": [
          "17px",
          { lineHeight: "26px", letterSpacing: "-0.22px", fontWeight: "400" },
        ],
        "partners-sub": [
          "19px",
          { lineHeight: "27px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],
        "partners-heading": [
          "23px",
          { lineHeight: "25px", letterSpacing: "-0.44px", fontWeight: "500" },
        ],
        "partners-heading-lg": [
          "44px",
          { lineHeight: "53px", letterSpacing: "-0.88px", fontWeight: "500" },
        ],
        "partners-display": [
          "68px",
          { lineHeight: "75px", letterSpacing: "-2.1px", fontWeight: "500" },
        ],
      },
      maxWidth: {
        partners: "1200px",
      },
      spacing: {
        "partners-section": "96px",
        "partners-card": "32px",
        "partners-gap": "12px",
      },
      borderRadius: {
        "partners-sm": "2px",
        "partners-md": "6px",
        "partners-card": "10px",
        "partners-btn": "32px",
        "partners-pill": "9999px",
        "partners-icon": "40px",
      },
      boxShadow: {
        "partners-inset": "inset 0 0 0 1px #f2f0ed",
        "partners-sm": "0 1px 6px 0 rgba(0,0,0,0.04), 0 0 24px 0 rgba(0,0,0,0.05)",
        "partners-lg": "0 0 24px 0 rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
