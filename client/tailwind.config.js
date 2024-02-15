/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    ,
  ],
  theme: {
    extend: {},
    screens: {
      phone: { max: "850px" },
      // => @media (max-width: 767px) { ... }
      smallphone: { max: "400px" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
