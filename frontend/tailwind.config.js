/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ✅ Global Font */
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },

      /* ✅ Typography System */
      fontSize: {
        /* Main page headings */
        h1: ["3rem", { lineHeight: "1.1", fontWeight: "700" }], // 48px
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }], // 36px

        /* Section / side headings */
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }], // 20px

        /* Body text */
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
