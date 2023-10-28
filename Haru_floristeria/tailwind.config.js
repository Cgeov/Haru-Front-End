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
        "grey-400": "#afafaf",
        "primary-500": "#2666cf",
        "background-white": "#fff",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        "caption-regular": "Montserrat",
        inter: "Inter",
      },
      borderRadius: {
        "31xl": "50px",
      },
    },
    fontSize: {
      base: "16px",
      "11xl": "30px",
      "29xl": "48px",
      lgi: "19px",
      xs: "12px",
      mini: "15px",
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
