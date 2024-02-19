/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    screens: {
      phone: { max: "850px" },
      smallphone: { max: "400px" },
    },
    colors: {
      "taskify-lightBlue": "#17223b",
      "taskify-DarkBlue": "#101728",
      "taskify-Green": "#32ba7c",
      "taskify-lightBackground": "#fffff2",
      "taskify-lightElement": "#f7f7f2",
      "taskify-lightDarkElement": "#F5E2C8",
    },
  },
  plugins: [require("flowbite/plugin")],
};
