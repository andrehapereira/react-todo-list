/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      height: {
        "page-header": "250px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
