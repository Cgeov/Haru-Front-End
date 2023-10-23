/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        secondary: "#fa5992",
        tertiary: "#EB7BB7",
        four: "#FAE9F3",
        five: "#FDF1F1",
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
