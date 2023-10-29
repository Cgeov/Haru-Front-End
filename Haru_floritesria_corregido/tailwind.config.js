/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#fbd0d5",
        "grey-400": "#afafaf",
        gray: "#48091a",
        "primary-500": "#2666cf",
        "background-white": "#fff",
        palevioletred: "#932150",
        mediumvioletred: {
          "100": "rgba(206, 52, 121, 0)",
          "200": "rgba(206, 52, 121, 0.52)",
        },
        "primary-100": "#d3e9fc",
        "grey-900": "#000",
        hotpink: "#eb7bb7",
      },
      spacing: {},
      fontFamily: {
        "caption-regular": "Montserrat",
        inter: "Inter",
      },
      borderRadius: {
        "8xs": "5px",
        "31xl": "50px",
      },
    },
    fontSize: {
      xs: "12px",
      base: "16px",
      mini: "15px",
      "17xl": "36px",
      lgi: "19px",
      "29xl": "48px",
      "11xl": "30px",
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
