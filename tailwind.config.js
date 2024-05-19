/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["poppins"],
      inter: ["inter"],
    },

    extend: {
      flex: {
        2: "1 0 10%",
      },
    },
  },
  plugins: [],
};
