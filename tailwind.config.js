/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7A1E1E",
        accent: "#B68A67",
        paper: "#F6F3EE",
        ink: "#201A17",
        muted: "#6B5F56",
      },
      boxShadow: {
        panel: "0 24px 50px -24px rgba(32, 26, 23, 0.45)",
      },
    },
  },
  plugins: [],
};
