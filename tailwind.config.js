/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans"],
        interBold: ["Inter-Bold", "sans"],
        berkshire: ["Berkshire Swash", "cursive"],
      },
      colors: {
        primary: "#7c2750",
        secondary: "#ff5b7b",
        tertiary: "#EB7BB7",
        four: "#FAE9F3",
        five: "#FDF1F1",
        white: "#FFFFFF",
      },
      gradientColorStopPositions: {
        100: "100%",
        74: "74%",
        61: "61%",
      },
    },
  },
  plugins: [],
};
