module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {

    screens: { md: { max: "720px" }, sm: { max: "420px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff" },
        blue_gray: {
          100: "#d9d9d9",
          900: "#1d2b53",
          "900_b2": "#1d2b53b2",
          "100_7f": "#d9d9d97f",
          "900_a0": "#1d2b53a0",
        },
        black: { 900: "#000000" },
        yellow: { 400: "#faef5d" },
        red: { 400: "#ed4c5c" },
        yellow_400_c9: "#faef5dc9",
      },
      boxShadow: { xs: "0px 4px 4px 0px #0000003f" },
      fontFamily: { josefinsans: "Josefin Sans", montserrat: "Montserrat" },
      textShadow: { ts: "0px 4px 4px #0000003f" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
