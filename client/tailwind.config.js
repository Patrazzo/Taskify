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
      smallphone: { max: "450px" },
      dashboard: { max: "1050px" },
      sidebar: { max: "1450px" },
    },
    colors: {
      "taskify-lightBlue": "#17223b",
      "taskify-DarkBlue": "#101728",
      "taskify-Green": "#32ba7c",
      "taskify-lightBackground": "#fffff2",
      "taskify-lightElement": "#f7f7f2",
      "taskify-lightDarkElement": "#e0e1dd",
      "taskify-textLightDarkColor": "#1e6091",
      "taskify-lightGreenBackground": "#0f9690",
    },
  },
  safelist: ["rounded-l-3xl", "rounded-r-3xl"],
  plugins: [require("flowbite/plugin")],
};
