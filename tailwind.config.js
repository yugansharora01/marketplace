/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#4c5773",
          dark: "#4c5773",
          light: "#4c577341",
        },
        secondary: {
          DEFAULT: "#d3dae7",
          dark: "#d3dae7",
          light: "#fff",
        },
        tertiary: {
          DEFAULT: "#ecf0f3",
          dark: "#ecf0f3",
          light: "#ecf0f3",
        },
      },
      boxShadow: {
        custom1: "1rem 1rem 1rem #d3dae7,-1rem -1rem 1rem #4c577341",
        custom2: "0rem 0rem 0rem #d3dae7,-0.3rem -0.3rem 1rem #4c577341",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

/** @type {import('tailwindcss').Config} */
// const { nextui } = require("@nextui-org/react");

// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [nextui()],
// };
