/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgAccent: "var(--bgAccent)",
        textColor: "var(--textColor)",
      },
      spacing: {
        navSize: "var(--navSize)",
        border: "var(--border)",
        borderRadius: "var(--borderRadius)",
      },
      variables: {
        speed: "var(--speed)",

      },
    },
  },
};
