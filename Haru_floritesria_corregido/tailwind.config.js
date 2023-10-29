/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palevioletred: "#932150",
        mediumvioletred: {
          "100": "rgba(206, 52, 121, 0)",
          "200": "rgba(206, 52, 121, 0.52)",
        },
        pink: "#fbd0d5",
        gray: "#48091a",
        "primary-100": "#d3e9fc",
        "grey-900": "#000",
        hotpink: "#eb7bb7",
        "primary-500": "#2666cf",
        "background-white": "#fff",
        "grey-400": "#afafaf",
      },
      spacing: {},
      fontFamily: {
        "buttons-large-semibold": "Montserrat",
        inter: "Inter",
      },
      borderRadius: {
        "8xs": "5px",
        "31xl": "50px",
      },
    },
    fontSize: {
      "11xl": "30px",
      "29xl": "48px",
      base: "16px",
      lgi: "19px",
      mini: "15px",
      xs: "12px",
      "17xl": "36px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
