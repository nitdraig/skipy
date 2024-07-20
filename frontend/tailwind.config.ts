// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: "#162255",
            foreground: "#dae9ff",
            primary: {
              "50": "#eff5ff",
              "100": "#dae9ff",
              "200": "#bed9ff",
              "300": "#91c1ff",
              "400": "#72abfd",
              "500": "#387af9",
              "600": "#225aee",
              "700": "#1a45db",
              "800": "#1b39b2",
              "900": "#1c358c",
              "950": "#162255",
              DEFAULT: "#91c1ff",
              foreground: "#162255",
            },
            focus: "#F182F6",
            secondary: {
              900: "#fff",
              DEFAULT: "#fff",
            },
          },
        },
      },
    }),
  ],
};
