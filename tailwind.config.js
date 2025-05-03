/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0e0e10",
        foreground: "#ffffff",
        primary: "#dc2626",
        "primary-hover": "#b91c1c",
        secondary: "#171717",
        accent: "#ef4444",
      },
    },
  },
  plugins: [],
}; 